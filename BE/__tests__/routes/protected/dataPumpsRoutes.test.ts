import supertest from "supertest";
import app from "../../../app"
import mockData from "../../../test/testMockData.json"
import setCookie  from "set-cookie-parser"

/**
 * TEST:
 *      testing for data pumps
 * @author Alan Kovac
 */

describe("DATA PUMPS ROUTES TEST:", () => {

    /**
     * This function prevent us to repeatedly log input data
     * @param dataPump 
     * @author Alan Kovac
     */
    function logDataPumpData(dataPump: typeof mockData.dataPumps[0]) {
        return Object.keys(dataPump).map(key => " " + key + ":" + dataPump[key])
    }

    describe(`POST /api/protected/DataPumps/createMetadata - given:${logDataPumpData(mockData.dataPumps[0])}`, () => {

        //nobody is loged in
        it("Should respond with 302 since nobody is logged in ", async () => {
            const res = await supertest(app).post("/api/protected/DataPumps/createMetadata").send(mockData.dataPumps[0])
            expect(res.statusCode).toBe(401)
        })

        //wrong user
       it("Should respond with 403 since we provided user with role of `user`", async () => {

            //register normal user to get token
            const mainRes = await supertest(app).post("/api/public/userRegister").send(mockData.users[1])
            const cookies = setCookie.parse(mainRes.headers['set-cookie'], { decodeValues: true, map: true})

            const res = await supertest(app).post("/api/protected/DataPumps/createMetadata")
                .set('Cookie', [`jwt=${cookies.jwt.value}`])
                .send(mockData.dataPumps[0])
            expect(res.statusCode).toBe(403)
        })

        //correct user
        it("Should respond with 201 since we provided user with role of `admin`", async () => {

            //register admin user to get token
            const mainRes = await supertest(app).post("/api/public/userRegister").send(mockData.users[2])
            const cookies = setCookie.parse(mainRes.headers['set-cookie'], { decodeValues: true, map: true})

            const res = await supertest(app).post("/api/protected/DataPumps/createMetadata")
                .set('Cookie', [`jwt=${cookies.jwt.value}`])
                .send(mockData.dataPumps[0])
            expect(res.statusCode).toBe(201)
        })
     
    })

    describe(`POST /api/protected/DataPumps/createMetadata - given: wrong data`, () => {

        it("Should respond with 400 & list of validation errors since we provided user with role of `admin`", async () => {

            //register admin user to get token
            const mainRes = await supertest(app).post("/api/public/userRegister").send(mockData.users[3])
            const cookies = setCookie.parse(mainRes.headers['set-cookie'], { decodeValues: true, map: true})

            const res = await supertest(app).post("/api/protected/DataPumps/createMetadata")
                .set('Cookie', [`jwt=${cookies.jwt.value}`])
                .send({})

            Object.keys(mockData.dataPumps[0]).forEach( (key, index) => {
                expect(res.body.validation[index][key].name).toEqual("ValidatorError")
                expect(res.body.validation[index][key].kind).toEqual("required")
                expect(res.body.validation[index][key].message).toEqual(`${key.charAt(0).toUpperCase() + key.slice(1)} is invalid or empty`)
            });

            expect(res.statusCode).toBe(400)

        })
    })

})