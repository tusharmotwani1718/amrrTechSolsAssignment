// All the API Errors will be handled through this class. Although, we can do it manually after making each API call, but this is the more standard and optimizable way to write code.


class ApiError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error", errors = [], stack="") {
        super(message);
        this.statusCode = statusCode;
        this.data = null; // Data can be null for error responses.
        this.message = message;
        this.errors = errors;
        this.success = false; // All error responses will have success as false.
    }
}

export { ApiError };