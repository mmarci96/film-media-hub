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
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        405: `Method Not Allowed`,
        408: `Request Timeout`,
        409: `Conflict`,
        410: `Gone`,
        422: `Unprocessable Entity`,
        429: `Too Many Requests`,
        500: `Internal Server Error`,
        502: `Bad Gateway`,
        503: `Service Unavailable`,
        504: `Gateway Timeout`
    };

    const baseMessage = messages[code] || `Unexpected Error`;
    const fullMessage = `${baseMessage}: ${subject}`;

    console.log(`Error Logged: Code - ${code}, Message - ${fullMessage}`);
    return new BadRequestError({
        code,
        message: fullMessage,
        logging: true
    });
}

export default createBadRequestError;
