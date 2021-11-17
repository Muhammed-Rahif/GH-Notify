import { NextFunction, Response } from "express";
import { checkIfStargazer } from "../helpers";
import { RegistrationForm } from "../types/forms";
import { ValidationResultRequest } from "../types/requests";
import ErrorResponse from "../utils/ErrorResponse";
import UserModel from "../models/user";
import JWT, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

async function register(
    req: ValidationResultRequest,
    res: Response,
    next: NextFunction
) {
    const regForm = req.validData as RegistrationForm;
    let userId: number;

    // Checking if user starred our repo
    try {
        const isStargazer = await checkIfStargazer(regForm.username);
        if (!isStargazer)
            return next(
                new ErrorResponse(
                    403,
                    "You need to star our repository to register."
                )
            );
    } catch (err) {
        return next(err);
    }

    // Getting user's telegram user id from token
    try {
        const { userId: _userId } = JWT.verify(
            regForm.token,
            process.env.JWT_SCECRET_KEY as string
        ) as { userId: number };
        userId = _userId;
    } catch (err) {
        if (err instanceof TokenExpiredError)
            return next(
                new ErrorResponse(
                    410,
                    "Link expired! Get a new login url from the bot."
                )
            );
        if (err instanceof JsonWebTokenError)
            return next(
                new ErrorResponse(
                    401,
                    "Invalid token or Your token or url is broken."
                )
            );
        return next(err);
    }

    // Registering user ( Saving on DB )
    try {
        const newUser = await UserModel.create({
            ...regForm,
            userId,
            lastReceivedOn: Date.now(),
        });
        res.status(201).json({
            success: true,
            message: "Registration successful!",
        });
    } catch (err) {
        return next(err);
    }
}

export { register };
