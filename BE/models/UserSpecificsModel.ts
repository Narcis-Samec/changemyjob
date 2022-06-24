import { Model, Schema, model } from 'mongoose';
import { Types } from 'mongoose';

interface IUserSpecificsSchema {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    salary: number;
    companyId: Types.ObjectId;
    country?: string;
    __v?: number;
}

const UserSpecificsSchema = new Schema<IUserSpecificsSchema>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "ID of user not be null"]
    },
    salary: {
        type: Number,
        min: 0
    },
    companyId: {
        type: Schema.Types.ObjectId,
    },
    country: {
        type: String,
    },
},
    {
        timestamps: true,
    }
)
const UserSpecificsModel = model("userSpecifics", UserSpecificsSchema)
export = UserSpecificsModel