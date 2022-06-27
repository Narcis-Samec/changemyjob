import { Error } from "mongoose"

/** Most controllers will extend this class. It has features that each controller should use in this application, such as error handeling.
 * @author Alan Kovac
*/
export default abstract class BaseController {

    /** Bundles all validation errors to array of validation errors 
     * @readonly
    */
    private static validationBundler(validationErrors: Error.ValidatorError): Error.ValidatorError[] {
        const errMap = []
        Object.keys(validationErrors).map((key) => {
            errMap.push({ [key]: validationErrors[key] })
        })
        return errMap
    }

    /**
     * Bundles all errors to object with properties of special arry & validation array
     * @param { } err - Any error from http res
     * @returns { special : object[]; validation: Error.ValidatorError[] } 
     */
    public static handleErrors(err: { name: string; code: number; message: string | string[]; errors: Error.ValidatorError }): { special: object[]; validation: Error.ValidatorError[] } {
        let errors: { special: object[], validation: Error.ValidatorError[] } = { 
            special: [], 
            validation: [] 
        };

        // Not Founds
        if (err.name === 'DBNotFoundError') {
            errors.special.push( { notFound: { err }})
        }

        // duplicates
        if (err.code === 11000) {
            errors.special.push( { duplicate: { err }})
        }

        //bundeling
        if (err.message.includes('validation failed')) {
            errors.validation =  BaseController.validationBundler(err.errors)
        }

        return errors;
    }
}