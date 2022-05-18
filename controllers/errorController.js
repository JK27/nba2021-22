/////////////////////////////////////////////////////////// DEVELOPMENT ERROR
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}
/////////////////////////////////////////////////////////// PRODUCTION ERROR
const sendErrorProd = (err, res) => {
  ////////////////////////////////////////// OPERATION ERROR
  // DOES => If the error is operational or trusted error, then sends message to the client.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    ////////////////////////////////////////// UNKNOWN ERROR
    // DOES => If it is a programming or unknown error, then does not send details to the client, only a generic error message.
    console.error('ERROR 💥', err)
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong 🤦‍♂️'
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
}