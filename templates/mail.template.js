import { IMAGES } from "../assets/index.js";
import { config } from "../config/app.config.js";

// function to format OTP email
export const OTP_EMAIl = (token, user = "", email = "") => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UNIHIVE TEMPLATE</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
        }
            table,tr,td,th {
                border:none;
            }
    </style>
</head>
<body>
    <table style="width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; margin-top: 1cm; height: 12cm;background-color:white">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td colspan="5">
                <div style="width: 100%; padding: 24px; height: 30%;">
                <div style="color: Black; font-weight:bold; font-size: 32px; text-align: start;">Hello, ${user}</div>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="5" style="padding-bottom: 10px;">
                <div style="width: 100%; height: 50%; padding: 24px;  border-radius: 10px;">
            <div style="font-size: 18px; color:black; text-align: start; font-weight: 600;">Please confirm your e-mail address</div>
            <p style="
            text-align: start;
            text-align: justify;
            line-height: 30px;
            color: black;
            font-weight: normal;font-size: 20px;font-family:Arial, Helvetica, sans-serif;
            ">Please click on the button below to confirm your account verification <br/> and completely activate your account.
                </p>
          <div style="margin-bottom: 20pt">
  <a 
    style="
      background-color:blue; 
      color: white; 
      font-weight: normal; 
      text-decoration: none; 
      text-align:center;
      margin-left: 2pt; 
      font-size: 30px; 
      padding: 16px 22px; 
      font-weight:bold;
      border-radius: 7px; 
      display: inline-block;
      width: 35%;
      height: 40px; 
    " 
    href="${config.BACKOFFICE_URL}/verify-account?email=${email}&token=${token}"
  >
    Confirm Email
  </a>
</div>
        </div>
            </td>
        </tr>
        <tr>
            <td colspan="5">
                <div style="width: 100%; background-color: blue; padding-top: 24px; padding-bottom: 24px; color: white; font-size: 15px; line-height: 25px; text-align: center;">
                <div style="margin-top: 20pt;">This email was sent automatically. <br>If you think you received it by mistake just ignore it</div>
            </div>
            </td>
        </tr>
        </tbody>
        </table>
</body>
</html>
    `;
};

export const PASSWORD_EMAIl = (token, user = "") => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UNIHIVE TEMPLATE</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
        }
            table,tr,td,th {
                border:none;
            }
    </style>
</head>
<body>
    <table style="width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; margin-top: 1cm; height: 12cm;background-color: #F3E4CE">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td colspan="5">
                <div style="width: 100%; padding: 24px; height: 30%;">
                <div style="color: #FF9500; font-weight:bold; font-size: 50px; text-align: start;">Hello, ${user}</div>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="5" style="padding-bottom: 10px;">
                <div style="width: 100%; height: 50%; padding: 24px;  border-radius: 10px;">
            <div style="font-size: 18px; color:black; text-align: start; font-weight: 600;">Password reset</div>
            <p style="
            text-align: start;
            text-align: justify;
            line-height: 30px;
            color: black;
            font-weight: normal;font-size: 35px;font-family:Arial, Helvetica, sans-serif;
            ">Please copy the code below <br />to reset your password.
                </p>
            <div style="margin-bottom: 20pt"><div style="color: #FF9500; font-weight: normal; text-decoration:none; margin-left: 2pt; font-size: 14px;">${token}</div></div>
        </div>
            </td>
        </tr>
        <tr>
            <td colspan="5">
                <div style="width: 100%; background-color: blue; padding-top: 24px; padding-bottom: 24px; color: white; font-size: 15px; line-height: 25px; text-align: center;">
                <div style="margin-top: 20pt;">This email was sent automatically. <br>If you think you received it by mistake just ignore it</div>
            </div>
            </td>
        </tr>
        </tbody>
        </table>
</body>
</html>
    `;
};
