import supertest from "supertest";
import app from "../../../app"
import mockData from "../../../test/testMockData.json"

describe("USER TEST:", () => {

    //helper functions
    function logUserData(user: typeof mockData.users[0]) {
        return Object.keys(user).map(key => " " + key + ":" + user[key])
    }

    //REGISTARTION test for mock & non existant user
        describe(`INTEGRATION: user registration - given:${logUserData(mockData.users[0])}`, () => {

            describe("POST /api/public/userRegister", () => {

                it("Should respond with 201 staus code ", async () => {
                    const res = await supertest(app).post("/api/public/userRegister")
                        .send(mockData.users[0])
                    expect(res.statusCode).toBe(201)
                })

                it("Should respond with 400 staus code - same user", async () => {
                    const res = await supertest(app).post("/api/public/userRegister")
                        .send(mockData.users[0])
                    expect(res.statusCode).toBe(400)
                })

            })
        })


    //LOGIN test for mock & non existant user
        describe(`UNIT: user login - given: ${mockData.users[0].email} | ${mockData.users[0].password}`, () => {
            
            describe("POST /api/public/userLogin", () => {
                it("Should respond with 200 staus code @ jwt token ", async () => {
                    const res = await supertest(app).post("/api/public/userLogin")
                        .send({email: mockData.users[0].email, password: mockData.users[0].password})
                    expect(res.statusCode).toBe(200)
                    expect(res.header["set-cookie"][0]).not.toEqual(null);
                })
                
            })

        })

        describe(`UNIT: user login - given: non existant user`, () => {
            
            describe("POST /api/public/userLogin", () => {
                it("Should respond with 403 staus code & with no jwt token", async () => {
                    const res = await supertest(app).post("/api/public/userLogin")
                        .send({email: "XXX@XXX", password: "XXX123"})
                    expect(res.statusCode).toBe(403)
                    expect(res.header["set-cookie"]).toBe(undefined);
                })
                
            })

        })

        describe(`UNIT: user login - given: wrong password`, () => {
            
            describe("POST /api/public/userLogin", () => {
                it("Should respond with 403 staus code & with no jwt token", async () => {
                    const res = await supertest(app).post("/api/public/userLogin")
                        .send({email: mockData.users[0], password: "XXX123"})
                    expect(res.statusCode).toBe(403)
                    expect(res.header["set-cookie"]).toBe(undefined);
                })
            })
        })

    //LOGOUT test for mock
        describe(`UNIT: user login - given: ${mockData.users[0].email} | ${mockData.users[0].password} - last loged user`, () => {
            
            describe("POST /api/public/userLogout", () => {
                it("Should respond ", async () => {
                    const res = await supertest(app).get("/api/public/userLogout")
                        .send()
                    expect(res.statusCode).toBe(302)
                })
            })
        })     
})