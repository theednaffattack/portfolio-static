import { isRequired, isMinLength, isEmail } from "./basic-input-validation";

const minLength = 13;

export const rules = {
  name: [isRequired("Name is required")],
  email: [isRequired("Email is required"), isEmail()],
  message: [
    isRequired("Message is required"),
    isMinLength(
      minLength,
      `Your message must be at least ${minLength} characters long.`
    ),
  ],
};
