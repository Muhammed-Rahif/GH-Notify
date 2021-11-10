import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";

export default [cors(), logger("dev"), express.json(), cookieParser()];
