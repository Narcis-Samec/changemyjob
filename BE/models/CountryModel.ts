import { Schema, model } from 'mongoose';

interface ICountry {
    _id?: string;
    countryID: string;
    countryName: string;
    countryCodeCurrency: string;
    currency: string;
    countryCodeNumber: number;
}

const CountrySchema = new Schema<ICountry>({
    _id: {
        type: String,
        required: false
    },
    countryID: { 
        type: String, 
        required: true,
        maxlength: 2,
        minlength: 2,
        uppercase: true,
        trim: true,
    },
    countryName: { 
        type: String, 
        required: true,
        uppercase: true,
        trim: true, 
    },
    countryCodeCurrency: { 
        type: String, 
        required: true,
        uppercase: true,
        trim: true,
        maxlength: 3,
        minlength: 3,
    },
    currency: { 
        type: String, 
        required: true,
        uppercase: true,
        trim: true, 
    },
    countryCodeNumber: { 
        type: Number, 
        required: true,
        trim: true,
        min: 0,
        max: 999,
    },
});

const CountryModel = model("countries", CountrySchema)
export = CountryModel