import { checkSchema } from "express-validator";

const validateRegistrationForm = checkSchema({
    username: {
        isString: {
            errorMessage: "Username must be string.",
        },
        isLength: {
            options: { min: 2, max: 34 },
            errorMessage: "Username must be 2-34 long.",
        },
    },
    personalAccessToken: {
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
            errorMessage:
                "Make sure your registration url or registration url token isn't broken.",
        },
    },
});

export default validateRegistrationForm;
