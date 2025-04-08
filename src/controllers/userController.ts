import { userRegistrationService } from "../models/userModel.js";

interface ResponseData {
  status: number;
  message: string;
  data: any | null;
}

const handleResponse = (
  res: { status: (code: number) => { json: (body: ResponseData) => void } },
  statusCode: number,
  message: string,
  data: any = null
): void => {
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: data,
  });
};

interface Request {
  body: any;
}

interface Response {
  status: (code: number) => { json: (body: ResponseData) => void };
}

interface NextFunction {
  (error?: any): void;
}

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.body;
    const newUser = await userRegistrationService(user);
    handleResponse(res, 201, "User registration successful", newUser);
  } catch (error) {
    next(error);
  }
};
