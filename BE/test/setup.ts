import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

/**
 * This serves as setup for all tests, we need to create DB server which will live in memory for testing purposes, othervise we would CRUD in production DB ❗❗❗
 * @author Alan Kovac
 */

let mongo: MongoMemoryServer;

// Spool up the server
beforeAll(async () => {
    mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoose.connect(uri)
})

//mongo & connection kill
afterAll(async () => {

    /**
     * DB clean up - after all test we will clean DB so we can have clean DB which was not mutated
     */
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({})
    }

    //kill switch
    await mongo.stop()
    await mongoose.connection.close()
})

export default mongo