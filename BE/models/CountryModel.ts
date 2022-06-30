import { Schema, Types, model } from 'mongoose';
import { RegionsSchema } from './RegionsModel';

export interface ICountry {
    _id?: Types.ObjectId;
    countryId: string;
    countryCodeCurrency: string;
    regions: Array<typeof RegionsSchema>;
    locales: {
        cs: {
            countryName: string;
            currency: string;
        },
        en: {
            countryName: string;
            currency: string;
        }
    }
}

export const CountrySchema = new Schema<ICountry>({
    countryId: {
        type: String,
        required: true,
        maxlength: 2,
        minlength: 2,
        uppercase: true,
        trim: true,
        unique: true
    },
    countryCodeCurrency: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        maxlength: 3,
        minlength: 3,
    },
    regions: [{ type: Schema.Types.ObjectId, ref: 'regions' }],
    locales: {
        cs: {
            countryName: {
                type: String,
                required: true,
                trim: true,
            },
            currency: {
                type: String,
                required: true,
                trim: true,
            }
        },
        en: {
            countryName: {
                type: String,
                required: true,
                trim: true,
            },
            currency: {
                type: String,
                required: true,
                trim: true,
            }
        }
    }
},
    {
        timestamps: true
    }
);


const CountryModel = model("countries", CountrySchema)
export default CountryModel