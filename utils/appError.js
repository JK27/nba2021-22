// DOES => All operational errors in the application will use this AppError class.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    // DOES => Grabs the statusCode directly from the Error. If the statusCode starts with 4 (i.e. 404), the status is 'fail', otherwise (i.e. 500), the status is 'error'.
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError;