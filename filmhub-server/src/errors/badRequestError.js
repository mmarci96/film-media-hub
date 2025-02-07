class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    get statusCode() {
        throw new Error('statusCode getter must be implemented in derived classes');
    }

    get errors() {
        throw new Error('errors getter must be implemented in derived classes');
    }

    get logging() {
        throw new Error('logging getter must be implemented in derived classes');
    }
}

class BadRequestError extends CustomError {
    static _statusCode = 400;

    constructor(params = {}) {
        const { code, message, logging, context } = params;
        super(message || 'Bad request');

        this._code = code || BadRequestError._statusCode;
        this._logging = logging || false;
        this._context = context || {};

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get statusCode() {
        return this._code;
    }

    get logging() {
        return this._logging;
    }
}

const createBadRequestError = (code, subject) => {
    const messages = {
        400: `Bad request for ${subject}.`,
        401: `Unauthorized access to ${subject}.`,
        403: `Forbidden access to ${subject}.`,
        404: `No ${subject} found.`,
        405: `Method not allowed for ${subject}.`,
        408: `Request timeout for ${subject}.`,
        409: `Conflict with ${subject}.`,
        410: `${subject} is gone.`,
        422: `Unprocessable entity: ${subject}.`,
        429: `Too many requests for ${subject}.`,
        500: `Internal server error related to ${subject}.`,
        502: `Bad gateway when accessing ${subject}.`,
        503: `Service unavailable for ${subject}.`,
        504: `Gateway timeout for ${subject}.`
    };

    const message = messages[code] || `Unexpected error with ${subject}.`;
    console.log(`Error Logged: Code - ${code}, Message - ${message}`);
    return new BadRequestError({ code, message, logging: true });
}

export default createBadRequestError;
