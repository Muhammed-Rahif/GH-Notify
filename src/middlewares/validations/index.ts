import { NextFunction, Request, Response } from "express";
import {
    matchedData,
    Result,
    ValidationError,
    validationResult,
} from "express-validator";
import { ValidationResultRequest } from "../../types/requests";
import ErrorResponse from "../../utils/ErrorResponse";

function validationResults(
    req: ValidationResultRequest,
    res: Response,
    next: NextFunction
) {
    const error: Result<ValidationError> = validationResult(req);
    if (!error.isEmpty()) next(new ErrorResponse(400, error.array()[0].msg));
    let data: Record<string, any> = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
    });
    req.validData = data;
    next();
}

export { validationResults };
