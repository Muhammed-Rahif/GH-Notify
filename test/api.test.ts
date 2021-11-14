import mongoose from "mongoose";
import request from "supertest";
import app from "../src/main";

describe("GET /api/v1", () => {
    it("should return success response", async () => {
        const response = await request(app).get("/api/v1");
        return expect(response.body.success).toBeTruthy();
    });

    afterAll(() => mongoose.disconnect());
});
