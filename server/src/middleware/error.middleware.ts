import { ErrorRequestHandler } from 'express';
import { MongooseError } from 'mongoose';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code === 'ERR_INVALID_URL') {
    res.status(400).send({ message: `supplied url "${err.input}" is not a valid url` });
  }

  if (err instanceof MongooseError) {
    return res.status(503).send({ message: err.message });
  }

  next(err);
};

export default errorHandler;
