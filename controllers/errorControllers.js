const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}, Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token! Please login again.', 401);

const handleJWTExpiredError = (err) =>
  new AppError('Token Expired! Please login again.', 401);

const sendErrorDev = (err, res, req) => {
  if (req.originalUrl.startsWith('/api')) {
    // Api error
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    // Rendered website
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      message: err.message,
    });
  }
};

const sendErrorProd = (err, res, req) => {
  console.log('in prod');
  if (req.originalUrl.startsWith('/api')) {
    console.log('in prod in api');
    if (err.isOperational) {
      //operational / trusted error: send message to client
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or any unknown error: don't leak error details
    // console.error('Error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
  if (err.isOperational) {
    // console.log('Error:', err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      message: err.message,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    message: 'please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res, req);
  } else if (process.env.NODE_ENV === 'production') {
    let error = JSON.stringify(err);
    error = JSON.parse(error);
    error.message = err.message;
    // console.log(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);
    sendErrorProd(error, res, req);
  }
};
