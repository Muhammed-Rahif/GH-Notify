import { Request } from "express";
import { RegistrationForm } from "./forms";

export interface ValidationResultRequest extends Request {
  validData?: object | RegistrationForm;
}
