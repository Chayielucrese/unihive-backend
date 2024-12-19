import { OTP_EMAIl, PASSWORD_EMAIl } from "../templates/mail.template.js";

export const generateString = (length = 6) => {
  const characters = "0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
export const mailMessages = (type, token, user = null, email = null) => {
  let str = "";

  switch (type) {
    case "forgot-password":
      str += PASSWORD_EMAIl(token, user);
      break;
    case "create-account":
      str += OTP_EMAIl(token, user, email);
      break;
    default:
      str += "Welcome to Unihive";
      break;
  }

  return str;
};
