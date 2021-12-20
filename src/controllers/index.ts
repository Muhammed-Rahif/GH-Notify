import { NextFunction, Response } from "express";
import { checkIfStargazer, getUserData, updateUserData } from "../helpers";
import { RegistrationForm, UpdateUserForm } from "../types/forms";
import { ValidationResultRequest } from "../types/requests";
import ErrorResponse from "../utils/ErrorResponse";
import UserModel from "../models/user";
import JWT, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { UserModelType } from "../types/user";
import { sendMsgForUser } from "./teleBot";
import { telegramBot } from "../main";
import Templates from "../utils/tele-bot/Templates";

async function registerUser(
  req: ValidationResultRequest,
  res: Response,
  next: NextFunction
) {
  const regForm = req.validData as RegistrationForm;
  let userId: number;

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
        new ErrorResponse(401, "Invalid token or Your token or url is broken.")
      );
    return next(err);
  }

  // Checking if user starred our repo
  try {
    const isStargazer = await checkIfStargazer(regForm.username);
    if (!isStargazer)
      return next(
        new ErrorResponse(403, "You need to star our repository to register.")
      );
  } catch (err) {
    return next(err);
  }

  // Checking if user already exists
  try {
    const userData = await getUserData({ username: regForm.username });
    if (userData && userData.username)
      return next(
        new ErrorResponse(
          403,
          "User already exist! Can't create with this username."
        )
      );
  } catch (err) {
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
    // Confirm msg
    sendMsgForUser(
      telegramBot,
      userId,
      Templates.registrationCompleted(regForm.username)
    );
  } catch (err) {
    return next(err);
  }
}

async function updateUser(
  req: ValidationResultRequest,
  res: Response,
  next: NextFunction
) {
  const updateUserForm = req.validData as UpdateUserForm;
  let userId: number;
  let prevUsername: string;
  let existingUserData: UserModelType;

  // Getting user's telegram user id from token
  try {
    const { userId: _userId, username } = JWT.verify(
      updateUserForm.token,
      process.env.JWT_SCECRET_KEY as string
    ) as { userId: number; username: string };
    userId = _userId;
    prevUsername = username;
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
        new ErrorResponse(401, "Invalid token or Your token or url is broken.")
      );
    return next(err);
  }

  // Checking if tele user id is existing
  try {
    existingUserData = await getUserData({ userId });
    if (!existingUserData)
      return next(
        new ErrorResponse(404, "No user found at this telegram user id.")
      );
  } catch (err) {
    return next(err);
  }

  // Check if prevUsername is valid
  try {
    if (!(existingUserData.username === prevUsername))
      return next(
        new ErrorResponse(403, "The previous username not matching.")
      );
  } catch (err) {
    return next(err);
  }

  // Checking if user starred our repo
  try {
    const isStargazer = await checkIfStargazer(
      updateUserForm.username || prevUsername
    );
    if (!isStargazer)
      return next(
        new ErrorResponse(403, "You need to star our repository to register.")
      );
  } catch (err) {
    return next(err);
  }

  // Updating user data
  try {
    const updatedUserData = await updateUserData(prevUsername, updateUserForm);
    res.status(200).json({
      success: true,
      message: "User data updation successful!",
    });
    // Confirm msg
    sendMsgForUser(
      telegramBot,
      userId,
      Templates.tokenUpdationCompleted(
        updateUserForm?.username ? updateUserForm.username : prevUsername
      )
    );
  } catch (err) {
    return next(err);
  }
}

export { registerUser, updateUser };
