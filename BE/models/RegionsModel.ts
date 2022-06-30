import { Schema, model } from 'mongoose';

export interface IRegions {
    _id?: string;
    countryId: string;
    regionName: string;
    salaryHistory: {
        year: number
        salary: number
    }
}

export const RegionsSchema = new Schema<IRegions>({
    countryId: {
        type: String,
        required: true,
        maxlength: 2,
        minlength: 2,
        uppercase: true,
        trim: true,
        unique: true
    },
    regionName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    salaryHistory: [
        {
            year: {
                type: Number,
            },
            salary: {
                type: Number,
            }
        }
    ]
},
    {
        timestamps: true,
    }
);

const RegionsModel = model("regions", RegionsSchema)
export default RegionsModel