import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import basicMiddlwares from "./middlewares";
import ErrorResponse from "./utils/ErrorResponse";
import errorHandler from "./middlewares/errorHandler";

dotenv.config({ path: "src/config/.env" });
const app = express();
const PORT = process.env.PUBLIC_URL || 3001;

app.use(basicMiddlwares);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ErrorResponse(404, "Not found"));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
});
