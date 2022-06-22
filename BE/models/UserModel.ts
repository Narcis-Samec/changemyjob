import { Model, Schema, model } from 'mongoose';
import validator from "validator"
import bcryt from "bcryptjs"

interface IUserSchema {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    password: string
    __v?: number;
}

interface IUserModel extends Model<IUserSchema> {
    login(email: string, password: string): any;
}

const HumanUserSchema = new Schema<IUserSchema>({
    name: {
        type: String,
        required: [true, "Name is invalid or empty"],
        trim: true,
    },
    surname: {
        type: String,
        required: [true, "Surname is invalid or empty"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is invalid or empty"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is invalid or empty"],
        trim: true,
    },
},
    {
        timestamps: true,
    }
)

//password hashing
HumanUserSchema.pre("save", async function (next) {
    const SALT = await bcryt.genSalt();
    this.password = await bcryt.hash(this.password, SALT)
    next();
})

//login
HumanUserSchema.statics.login = async function (email: string, password: string) {
    const USER = await this.findOne({ email })
    if (USER) {
        const AUTH = await bcryt.compare(password, USER.password)
        if (AUTH) {
            return USER
        }
        throw Error("Incorect password")
    }
    throw Error("Incorect email")
}

const UserModel = model<IUserSchema, IUserModel>("user", HumanUserSchema)
export = UserModel