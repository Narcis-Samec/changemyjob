import supertest from "supertest";
import app from "../../../app"
import mockData from "../../../test/testMockData.json"

describe("USER TEST:", () => {

    //test all mock users
    mockData.users.forEach((user: typeof mockData.users[0]) => {

        //registration
        describe(`INTEGRATION: user registration - given:${Object.keys(user).map(key => " " + key + ":" + user[key])}`, () => {

            describe("POST /api/public/userRegister", () => {

                test("Should respond with 201 staus code ", async () => {
                    const res = await supertest(app).post("/api/public/userRegister")
                        .send(user)
                    expect(res.statusCode).toBe(201)
                })

                test("Should respond with 400 staus code - same user", async () => {
                    const res = await supertest(app).post("/api/public/userRegister")
                        .send(user)
                    expect(res.statusCode).toBe(400)
                })
            })
        })
    })
})