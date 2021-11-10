import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "src/config/.env" });
const app = express();
const PORT = process.env.PUBLIC_URL || 3001;

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
});
