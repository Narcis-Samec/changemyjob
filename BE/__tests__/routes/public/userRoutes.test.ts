import supertest from "supertest";
import app from "../../../app"

describe("TEST of user routes", () => {
    test("POST USER", async () => {
        const res = await supertest(app).post("/api/public/userRegister")
            .send({ name: "Alan", surname: "Kovac", email: "a@b.com", password: "aloha123", role: "user", language: "cs"})
        expect(res.statusCode).toBe(201)
    })
})