import { Response } from "express";

export interface DefaultResponse extends Response {
  success: boolean;
  message?: string;
  data: any;
}
