import express, { Request, Response } from "express";
import RateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { Context, Telegraf } from "telegraf";
import basicMiddlwares from "./middlewares";
import errorHandler from "./middlewares/errorHandler";
import path from "path";
import apiRouter from "./routers/api";
import { connectDatabase } from "./config/db";
import { setUpBot } from "./controllers/teleBot";
import { Update } from "typegram";
import cors, { CorsOptions } from "cors";

dotenv.config({ path: "src/config/.env" });
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDatabase();

// Lauch telegram bot
const telegramBot: Telegraf<Context<Update>> = new Telegraf(
  process.env.BOT_TOKEN as string
);
setUpBot(telegramBot);
telegramBot.launch();

// set up rate limiter: maximum of 150 requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 85,
});
app.use(limiter);

// Cors config
var corsOptions: CorsOptions = {
  origin: "http://beomax1.herokuapp.com",
};

// Basic Middlwares
app.use(cors(corsOptions));
app.use(basicMiddlwares);

// API router
app.use("/api/v1", apiRouter);

app.use(express.static(path.join(__dirname, "views")));
app.get("/*", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use(express.static(path.join(__dirname, "views")));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});

export default app;
export { telegramBot };
