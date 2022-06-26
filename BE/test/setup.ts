import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

let mongo: MongoMemoryServer;

// Spool up the server
beforeAll(async () => {
    mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoose.connect(uri)
})

//mongo & connection kill
afterAll(async () => {

    //db clean up
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({})
    }

    //kill switch
    await mongo.stop()
    await mongoose.connection.close()
})

export default mongo