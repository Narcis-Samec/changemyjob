import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"
import testData from "./testDefaultData.json"
import UserModel from "../models/UserModel"

let mongo: MongoMemoryServer;

// Hooks up the server & data
beforeAll( async () => {

    //server spooling
    mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()
    await mongoose.connect(uri)

    //data insertion
    await UserModel.insertMany([...testData.users])
})

//mongo & connection kill
afterAll( async () => {

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