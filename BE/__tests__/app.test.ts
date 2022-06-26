import supertest from "supertest"
import app from "../app"

//basic check if server application is created & running
describe("APP TEST:INTEGRATION: given nothing", ()=> {

        test("should respond with 200 staus code", async () => {
            const res = await supertest(app).get("/")
            expect(res.statusCode).toBe(200)
        })

        test("should respond with Application is running", async () => {
            const res = await supertest(app).get("/")
            expect(res.body).toBe("Application is running")
        })

        test("should respond with header content type", async () => {
            const res = await supertest(app).get("/")
            expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        })
})