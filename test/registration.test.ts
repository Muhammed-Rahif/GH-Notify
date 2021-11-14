import request from "supertest";
import app from "../src/main";

describe("POST /api/v1/register", () => {
    const DUMMY_USERNAME: string = "usernameThatNotExistInStargazers";
    const DUMMY_TOKEN: string = "samplePersonalAccessToken";

    it("should return failure response code 400", async () => {
        const response = await request(app).post("/api/v1/register");
        return expect(response.statusCode).toBe(400);
    });

    it("should return failure response code 403", async () => {
        const response = await request(app).post("/api/v1/register").send({
            username: DUMMY_USERNAME,
            personalAccessToken: DUMMY_TOKEN,
        });
        return expect(response.statusCode).toBe(403);
    });
});
