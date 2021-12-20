import { checkSchema } from "express-validator";

const validateRegistrationForm = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "Username can't be empty.",
    },
    isString: {
      errorMessage: "Username must be string.",
    },
    isLength: {
      options: { min: 2, max: 34 },
      errorMessage: "Username must be 2-34 long.",
    },
  },
  personalAccessToken: {
    notEmpty: {
      errorMessage: "Github personal access token can't be empty.",
    },
    isString: {
      errorMessage: "Github personal access token must be string.",
    },
    isLength: {
      options: { min: 8, max: 68 },
      errorMessage: "Github personal access token must be 8-68 long.",
    },
  },
  token: {
    isJWT: {
      errorMessage: "Your registration url token is broken.",
    },
  },
});

export default validateRegistrationForm;
