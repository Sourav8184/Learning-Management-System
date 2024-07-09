class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    /* This method is primarily used in custom error classes to capture 
    the stack trace at the point where the error is instantiated. */
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
