import { Model, Schema, model } from 'mongoose';
import validator from "validator"
import bcryt from "bcryptjs"
import { Types } from 'mongoose';
import ErrorInternals from '../utils/ErrorInternals';

export type Role = "creator" | "administrator" | "leadAnalyst" | "analyst" | "user";

interface IUserSchema {
    _id?: Types.ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string
    role: Role;
    language: string,
    registrationDate: Date,
    __v?: number;
}

interface IUserModel extends Model<IUserSchema> {
    login(email: string, password: string): any;
}

const UserSchema = new Schema<IUserSchema>({
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
    role: {
        type: String, enum: ['creator', 'administrator', 'leadAnalyst', 'analyst', 'user'],
        required: [true, "Role is invalid or empty"],
    },
    language: {
        type: String, enum: ['cs', 'en'],
        required: [true, "Language is invalid or empty"],
    },
    registrationDate: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true,
    }
)

//password hashing - for one user
UserSchema.pre("save", async function (next) {
    const SALT = await bcryt.genSalt();
    this.password = await bcryt.hash(this.password, SALT)
    next();
})

//login
UserSchema.statics.login = async function (email: string, password: string) {
    const USER = await this.findOne({ email })
    if (USER) {
        const AUTH = await bcryt.compare(password, USER.password)
        if (AUTH) {
            return USER
        }
    }
    throw new ErrorInternals.DBNotFoundError("Incorect email or password", "email")
}

const UserModel = model<IUserSchema, IUserModel>("user", UserSchema)
export default UserModel 