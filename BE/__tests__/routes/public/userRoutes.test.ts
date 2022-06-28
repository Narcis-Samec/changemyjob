import supertest from "supertest";
import app from "../../../app"
import mockData from "../../../test/testMockData.json"

/**
 * TEST:
 *      testing for user registration
 *      testing for user login
 *      testing for user logout
 * @author Alan Kovac
 */

describe("USER ROUTES TEST:", () => {

    /**
     * This function prevent us to repeatedly log input data
     * @param user 
     * @author Alan Kovac
     */
    function logUserData({ user }: { user: (typeof mockData.users)[0]; }): string[] {
        return Object.keys(user).map(key => " " + key + ":" + user[key])
    }

    //REGISTARTION for mock user & wrongly inputed data
    describe(`USER REGISTRATION:`, () => {

        //new & same user
        describe(`POST /api/public/userRegister - given:${logUserData({ user: mockData.users[0] })}`, () => {

            it("Should respond with 201 staus code ", async () => {
                const res = await supertest(app).post("/api/public/userRegister").send(mockData.users[0])
                expect(res.statusCode).toBe(201)
            })

            it("Should respond with 400 staus code - same user", async () => {
                const res = await supertest(app).post("/api/public/userRegister").send(mockData.users[0])
                expect(res.statusCode).toBe(400)
            })

            it("Should respond with error of type duplicate - same user", async () => {
                const res = await supertest(app).post("/api/public/userRegister").send(mockData.users[0])
                expect(res.body.special[0].duplicate.err).not.toEqual(null);
            })

            it("Should respond with duplicate error with description - same user", async () => {
                const res = await supertest(app).post("/api/public/userRegister").send(mockData.users[0])
                expect(res.body.special[0].duplicate.err).toEqual({ "code": 11000, "index": 0, "keyPattern": { "email": 1 }, "keyValue": { "email": "max.hetero@email.com" } });
            })

        })


        //bad data users
        const wrongUsers = {
            noData: { name: "", surname: "", email: "", password: "", role: "", language: "" },
            wrongEmail: { name: "name", surname: "surname", email: "AA.com", password: "Ab123*", role: "user", language: "cs" },
            wrongRole: { name: "name", surname: "surname", email: "email@email.com", password: "Ab123*", role: "XXX", language: "cs" },
            wrongLanguage: { name: "name", surname: "surname", email: "email@email.com", password: "Ab123*", role: "user", language: "XXX" },
        }

        describe(`POST /api/public/userRegister - given: ${logUserData({ user: wrongUsers.noData })}`, () => {

            it("Should respond with 400 staus code ", async () => {
                const res = await supertest(app).post("/api/public/userRegister").send()
                expect(res.statusCode).toBe(400)
            })

            it("Should respond with with all fields listed as: validation errors & required & with message", async () => {
                const res = await supertest(app).post("/api/public/userRegister").send()
                Object.keys(wrongUsers.noData).forEach( (key, index) => {
                    expect(res.body.validation[index][key].name).toEqual("ValidatorError")
                    expect(res.body.validation[index][key].kind).toEqual("required")
                    expect(res.body.validation[index][key].message).toEqual(`${key.charAt(0).toUpperCase() + key.slice(1)} is invalid or empty`)
                });
            })
        })

        describe(`POST /api/public/userRegister - given: ${logUserData({ user: wrongUsers.wrongEmail })}`, () => {

            it(`Should respond with with invalid email with message: "Enter valid email"`, async () => {
                const res = await supertest(app).post("/api/public/userRegister").send(wrongUsers.wrongEmail)
                expect(res.body.validation[0].email.message).toEqual("Enter valid email")
            })
        })

        describe(`POST /api/public/userRegister - given: ${logUserData({ user: wrongUsers.wrongRole })}`, () => {

            it(`Should respond with with invalid role with message: "XXX" is not a valid enum value for path "role"`, async () => {
                const res = await supertest(app).post("/api/public/userRegister").send(wrongUsers.wrongRole)
                expect(res.body.validation[0].role.message).toEqual("`XXX` is not a valid enum value for path `role`.")
            })
        })

        describe(`POST /api/public/userRegister - given: ${logUserData({ user: wrongUsers.wrongLanguage })}`, () => {

            it(`Should respond with with invalid email with message: "XXX" is not a valid enum value for path "language"."`, async () => {
                const res = await supertest(app).post("/api/public/userRegister").send(wrongUsers.wrongLanguage)
                expect(res.body.validation[0].language.message).toEqual("`XXX` is not a valid enum value for path `language`.")
            })
        })
    })


    //LOGIN test for mock & non existant user
    describe(`USER LOGIN:`, () => {

        describe(`POST /api/public/userLogin - given: ${mockData.users[0].email} | ${mockData.users[0].password}`, () => {
            it("Should respond with 200 staus code @ jwt token ", async () => {
                const res = await supertest(app).post("/api/public/userLogin")
                    .send({ email: mockData.users[0].email, password: mockData.users[0].password })
                expect(res.statusCode).toBe(200)
                expect(res.header["set-cookie"][0]).not.toEqual(null);
            })

        })

        describe(`POST /api/public/userLogin - given: email: "XXX@XXX", password: "XXX123" - non existant user`, () => {
            it("Should respond with 403 staus code", async () => {
                const res = await supertest(app).post("/api/public/userLogin")
                    .send({ email: "XXX@XXX", password: "XXX123" })
                expect(res.statusCode).toBe(403)
            })

            it("Should respond with with no jwt token", async () => {
                const res = await supertest(app).post("/api/public/userLogin")
                    .send({ email: "XXX@XXX", password: "XXX123" })
                expect(res.header["set-cookie"]).toBe(undefined);
            })

        })

    })

    //LOGOUT test for mock
    describe(`USER LOGIN - given: ${mockData.users[0].email} | ${mockData.users[0].password} - last loged user`, () => {

        describe("POST /api/public/userLogout", () => {
            it("Should respond with 302 status code", async () => {
                const res = await supertest(app).get("/api/public/userLogout")
                    .send()
                expect(res.statusCode).toBe(302)
            })
        })
    })
})