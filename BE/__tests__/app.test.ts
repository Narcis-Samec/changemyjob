import mongoose from "mongoose";
import supertest from "supertest"
import app from "../app"

//basic check if server is created & running
describe("APP TEST given nothing", ()=> {

        test("should respond with 200 staus code", async () => {
            const RES = await supertest(app).get("/")
            expect(RES.statusCode).toBe(200)
        })

        test("should respond with Application is running", async () => {
            const RES = await supertest(app).get("/")
            expect(RES.body).toBe("Application is running")
        })

        test("should respond with header content type", async () => {
            const RES = await supertest(app).get("/")
            expect(RES.header["content-type"]).toBe("application/json; charset=utf-8")
        })
})