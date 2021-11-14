import mongoose from "mongoose";
import request from "supertest";
import app from "../src/main";

describe("GET /", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/").expect(200);
        return expect(response.type).toBe("text/html");
    });

    afterAll(() => mongoose.disconnect());
});
