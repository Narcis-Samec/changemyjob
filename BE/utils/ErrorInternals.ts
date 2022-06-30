/**
 * ErrorInternals is a namespace for custom errors classes: {@link DBNotFoundError} that may happend in 
 * custom validation from: {@link validator}, {@link Error}.
 * ErrorInternals is ignored during whole testing of the application due to the reason, that tests will be handeling return errors anyway. 
 * @author Alan Kovac
 */
namespace ErrorInternals {
    /* istanbul ignore next */
    /**
     * Abstract class that is between all custom errors classes and {@link Error}
     * @extends { BaseError<Error> } : {@link Error}
     * @author Alan Kovac
     */
    abstract class BaseError extends Error {

        constructor(name: string, description: string, toLog?: any) {
            super(description)

            Object.setPrototypeOf(this, new.target.prototype)
            Error.captureStackTrace(this)

            enum LogPrefix {
                DBNotFoundError = "[DB]:"
            }

            if (process.env.NODE_ENV !== 'test') {
                console.error(`\x1b[31m${LogPrefix[name]}${this.stack}\n\x1b[35m${toLog}`)
            }

            this.name = name
        }

    }

    /* istanbul ignore next */
    /**
     * Class that checks if DB has document, if not it will log error and & log optional parameter field that for it was searching
     * @extends { DBNotFoundError<BaseError> } : {@link BaseError}
     * @constructor
     * @param { string } description
     * @param { string | object= } field
     * @author Alan Kovac
     */
    export class DBNotFoundError extends BaseError {
        field: string | object
        description: string

        constructor(
            description: string,
            field?: string | object,
        ) {
            super(DBNotFoundError.name, description, field)

            this.field = field
            this.description = description
        }

    }
}

export default ErrorInternals