import request from "supertest";
import app from "../src/main";

describe("Get /api/v1/stars", () => {
    it("should return success response code 200", async () => {
        const response = await request(app).get("/api/v1/stars");
        return expect(response.statusCode).toBe(200);
    });

    it("should return array in response data", async () => {
        const response = await request(app).get("/api/v1/stars");
        return expect(Array.isArray(response.body.starGazers)).toBeTruthy();
    });
});
