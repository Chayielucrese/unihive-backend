import * as userServices from "../services/user.service.js";
import * as tokenService from "../services/token.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { config, STATUS_CODES } from "../config/app.config.js";
import { generateString, mailMessages } from "../utils/helper.js";
import { SENDMAIL } from "../utils/sendmail.js";
import { io } from "../index.js";

const userSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[A-Za-z\s]+$/i)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  tel: Joi.string()
    .required()
    .pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/),
  password: Joi.string().min(8).required(),
  cpassword: Joi.string().min(8).required(),
  studentID: Joi.string().max(8).required(),
});

const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: error.message });
    }
    const { password, cpassword } = req.body;
    if (password !== cpassword) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Passwords do not match!" });
    }
    const user = await userServices.getOneUser({ email: req.body.email });
    if (user) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User with this email already exists!" });
    }
    const user_with_tel = await userServices.getOneUser({ tel: req.body.tel });
    if (user_with_tel) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User with this phone number already exists!" });
    }
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const { cpassword: _, ...body_without_cpass } = req.body;

    const create_user = await userServices.createUser({
      ...body_without_cpass,
      password: hashed_password,
    });
    let token = "";
    let isTokenExist = true;
    do {
      token = generateString(4);
      const result = await tokenService.getOneToken({ token });
      if (!result) isTokenExist = false;
    } while (isTokenExist);
    const tokenPayload = jwt.sign(
      { token, email: req.body.email },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: config.OTP_EXPIRE_TIME,
      }
    );

    const saveToken = await tokenService.createToken({
      token,
      email: req.body.email,
      jwt_value: tokenPayload,
    });

    if (saveToken) {
      const msg = {
        to: req.body.email,
        subject: "Unihive Email Verification",
        content: mailMessages(
          "create-account",
          tokenPayload,
          create_user.username,
          create_user.email
        ),
        html: true,
      };
      SENDMAIL(msg, (info) => {});
      return res.status(STATUS_CODES.CREATED).json({
        data: create_user,
        status: "success",
        message: "User created successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userServices.getOneUser({ email: req.body.email });

    if (!user) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Authentication failed. Invalid credentials." });
    }

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Authentication failed. Invalid credentials." });

    const { password, ...user_without_password } = user._doc;
    return res.status(STATUS_CODES.OK).json({
      data: user,
      token: jwt.sign({ user_without_password }, process.env.JWT_TOKEN_KEY, {
        expiresIn: config.JWT_EXPIRE_TIME,
      }),
      message: "User logged in successfully",
    });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const user = await userServices.getOneUser({
      email: req.body.email,
      role: "admin",
      status: { $in: ["pending", "complete"] },
    });

    if (!user) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Authentication failed. Invalid credentials." });
    }

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Authentication failed. Invalid credentials." });
    const { password, ...user_without_password } = user._doc;
    return res.status(STATUS_CODES.OK).json({
      data: user_without_password,
      token: jwt.sign({ user_without_password }, process.env.JWT_TOKEN_KEY, {
        expiresIn: config.JWT_EXPIRE_TIME,
      }),
      message: "Admin logged in successfully",
    });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await userServices.getOneUser({ email });
    user.password = hash;
    await user.save();
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "Password updated successfully !" });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
export const sendForgotPasswordCode = async (req, res) => {
  try {
    let token = "";
    let isTokenExist = true;
    const userExists = await userServices.getOneUser({ email: req.body.email });
    if (!userExists)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "No user found with this email address !" });
    do {
      token = generateString(5);
      const result = await tokenService.getOneToken({ token });
      if (!result) isTokenExist = false;
    } while (isTokenExist);
    const tokenPayload = jwt.sign(
      { token, email: req.body.email },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: config.OTP_EXPIRE_TIME,
      }
    );
    const saveToken = await tokenService.createToken({
      token,
      email: req.body.email,
      jwt_value: tokenPayload,
    });
    if (saveToken) {
      const msg = {
        to: req.body.email,
        subject: "Unihive OTP verification code",
        content: mailMessages(
          "forgot-password",
          token,
          userExists.username,
          req.body.email
        ),
        html: true,
      };
      SENDMAIL(msg, (info) => {});
      return res
        .json({
          data: userExists,
          status: "success",
          message: "Check your mail for account verification !",
        })
        .status(STATUS_CODES.OK);
    }
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const sendAccountVerificationCode = async (req, res) => {
  try {
    let token = "";
    let isTokenExist = true;
    do {
      token = generateString(4);
      const result = await tokenService.getOneToken({ token });
      if (!result) isTokenExist = false;
    } while (isTokenExist);
    const tokenPayload = jwt.sign(
      { token, email: req.body.email },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: config.OTP_EXPIRE_TIME,
      }
    );
    const saveToken = await tokenService.createToken({
      token,
      email: req.body.email,
      jwt_value: tokenPayload,
    });
    const user = await userServices.getOneUser({ email: req.body.email });
    if (saveToken) {
      const msg = {
        to: req.body.email,
        subject: "Unihive Account Confirmation",
        content: mailMessages(
          "create-account",
          tokenPayload,
          user?.username,
          req.body.email
        ),
        html: true,
      };
      SENDMAIL(msg, (info) => {
        if (info.messageId) {
          console.log("Mail sent: ", info.messageId);
        }
      });
      return res
        .json({
          data: user,
          status: "success",
          message: "Check your mail for account verification !!!",
        })
        .status(STATUS_CODES.OK);
    }
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const validateOTP = async (req, res) => {
  const { token, email } = req.body;
  const verifyIfTokenIsInvalid = false;
  if (!token) {
    io.emit("invalidToken", verifyIfTokenIsInvalid);
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send({ message: "Invalid token make sure its not expired" });
  }
  const isTokenFound = await tokenService.getUserToken({ jwt_value: token });
  if (!isTokenFound || isTokenFound.email != email)
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send({ message: "Sorry invalid token !!!" });
  try {
    const decoded_payload = jwt.verify(
      isTokenFound?.jwt_value,
      process.env.JWT_TOKEN_KEY
    );
    if (decoded_payload) {
      const user = await userServices.getOneUser({ email });
      const userUpdate = await userServices.updateUserById(user?._id, {
        email_verified: true,
        status: "complete",
      });
      io.emit("userVerified", userUpdate);
      return res
        .status(STATUS_CODES.OK)
        .send({ message: "Valid Token", data: userUpdate });
    }
  } catch (err) {
    io.emit("invalidToken", verifyIfTokenIsInvalid);
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .send({ message: "Invalid token make sure its not expired" });
  }
};
