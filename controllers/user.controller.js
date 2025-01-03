import { STATUS_CODES } from "../config/app.config.js";
import * as userService from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "User fetched successfully !", data: users });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "User data fetched successfully !", data: user });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const disableUser = async (req, res) => {
  try {
    const user_deleted = await userService.getUserById(req.params.id);
    user_deleted.status = "disabled";
    await user_deleted.save();
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "User deleted successfully !", data: user_deleted });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
export const activateUser = async (req, res) => {
  try {
    const userExist = await userService.getUserById(req.params.id);
    if (!userExist)
      return res.json({
        message: `Sorry no user found with id ${req.params.id}`,
      });
    const user_Activated = await userService.getOneUser({
      $and: [{ _id: req.params.id }, { status: "disabled" }],
    });
    if (!user_Activated)
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: `User is Not Suspended, Rather ${userExist.status}`,
      });
    else {
      user_Activated.status = "complete";
      await user_Activated.save();
      return res.status(STATUS_CODES.OK).json({
        message: "User Activated successfully !",
        data: user_Activated,
      });
    }
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userExist = await userService.getUserById(req.params.id);

    if (!userExist) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: `No user found with id ${req.params.id}` });
    }
    if (req.body.email) {
      const emailExist = await userService.getOneUser({
        email: req.body.email,
      });

      if (emailExist)
        return res
          .status(STATUS_CODES.CONFLICT)
          .json({ message: "This Email Already Exist." });

      req.body.email_verified = false;
      req.body.status = "pending";
    } else if (req.body.tel) {
      const telExist = await userService.getOneUser({
        tel: req.body.tel,
      });
      if (telExist)
        return res
          .status(STATUS_CODES.CONFLICT)
          .json({ message: "Phone Number already exist." });
    } else if (req.body.studentID) {
      const studentid_exist = await userService.getOneUser({
        studentID: req.body.studentID,
      });
      if (studentid_exist)
        return res
          .status(STATUS_CODES.CONFLICT)
          .json({ message: "StudentID already exist." });
    }

    const updatedUser = await userService.updateUserById(
      req.params.id,
      req.body
    );

    return res.status(STATUS_CODES.OK).json({
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const userExist = await userService.getUserById(req.params.id);

    if (!userExist) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: `User not found` });
    } else {
      const updatedUserRole = await userService.updateUserRole(req.params.id, {
        role: req.body.role,
      });
      return res.status(STATUS_CODES.OK).json({
        message: "User Role updated successfully !",
        data: updatedUserRole,
      });
    }
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
