import { NextFunction, Request, Response } from "express";

interface Error {
  stack?: string;
  message: string;
  status?: number;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.stack) {
    console.error(err.stack);
  } else {
    console.error(err.message);
  }

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: statusCode.toString(),
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred."
        : err.message,
  });
};

export default errorHandler;
