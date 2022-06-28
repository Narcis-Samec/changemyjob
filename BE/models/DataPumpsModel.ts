import { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

interface IDataPumpsSchema {
    _id?: Types.ObjectId;
    name: string;
    status: "NEW" | "WAiTINIG" | "RUNNING" | "ERROR";
    type: "UNKNOWN" | "API" | "SCRAPER";
    producer: string;
    baseUri: string;
    lastRunned?: Date;
    lastFinished?: Date;
    __v?: number;
}

const DataPumpsSchema = new Schema<IDataPumpsSchema>({
    name: {
        type: String,
        required: [true, "Name is invalid or empty"]
    },
    status: {
        type: String, enum: ["NEW", "WAiTINIG", "RUNNING", "ERROR"],
        required: [true, "Status is invalid or empty"],
    },
    type: {
        type: String, enum: ["UNKNOWN", "API", "SCRAPER"],
        required: [true, "Status is invalid or empty"],
    },
    producer: {
        type: String,
        required: [true, "Producer is invalid or empty"]
    },
    baseUri: {
        type: String,
        required: [true, "BaseUri is invalid or empty"]
    },
    lastRunned: {
        type: Date,
    },
    lastFinished: {
        type: Date,
    },
},
    {
        timestamps: true,
    }
)
const DataPumpsModel= model("dataPumps", DataPumpsSchema)
export = DataPumpsModel