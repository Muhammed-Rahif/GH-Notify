import { NextFunction, Response } from "express";
import { checkIfStargazer } from "../helpers";
import { RegistrationForm } from "../types/forms";
import { ValidationResultRequest } from "../types/requests";
import ErrorResponse from "../utils/ErrorResponse";
import UserModel from "../models/user";

async function register(
    req: ValidationResultRequest,
    res: Response,
    next: NextFunction
) {
    const regForm = req.validData as RegistrationForm;

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

    // Registering user ( Saving on DB )
    try {
        const newUser = await UserModel.create({
            ...regForm,
            lastReceivedOn: Date.now(),
        });
        res.json({ success: true, message: "Registration successful!" });
    } catch (err) {
        return next(err);
    }
}

export { register };
