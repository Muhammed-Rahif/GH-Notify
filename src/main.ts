import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import basicMiddlwares from "./middlewares";
import errorHandler from "./middlewares/errorHandler";
import path from "path";
import apiRouter from "./routers/api";
import { getStarGazers } from "./helpers";

dotenv.config({ path: "src/config/.env" });
const app = express();
const PORT = process.env.PUBLIC_URL || 3001;

app.use(basicMiddlwares);

app.use("/api/v1", apiRouter);

app.use(express.static(path.join(__dirname, "view")));
app.get("/*", function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
});
