import { checkSchema } from "express-validator";

const validateUserDataUpdation = checkSchema({
  username: {
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: "Username must be string.",
    },
    isLength: {
      options: { min: 2, max: 34 },
      errorMessage: "Username must be 2-34 long.",
    },
  },
  personalAccessToken: {
    optional: { options: { nullable: true } },
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

export default validateUserDataUpdation;
