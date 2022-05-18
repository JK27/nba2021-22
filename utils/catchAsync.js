/////////////////////////////////////////////////////////// CATCH ASYNC
// DOES => In order to get rid of try/catch blocks, all async functions are wrapped inside this catchAsync function, which will return a new anonymous function (as below). It is this anonymous function which will call the required functijon and execute all teh code within it. As it is an async function, it will return a Promise, that if rejected, the error will be caught by the .catch(), passing the error to the next function, that is the golbalErrorHandler middleware.
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  }
}