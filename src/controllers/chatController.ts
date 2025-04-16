import { chatService } from "../models/chatModels.js";

interface ResponseData {
  status: number;
  message: string;
  data: string;
}

const handleResponse = (
  res: { status: (code: number) => { json: (body: ResponseData) => void } },
  statusCode: number,
  message: string,
  data: string
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

export const aiChat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, message } = req.body;
    const chatResponse = await chatService(userId, message);
    if (!chatResponse) {
      handleResponse(res, 400, "Chat message sending failed", "");
      return;
    }
    handleResponse(res, 200, "Ai Response Success", chatResponse);
  } catch (error) {
    next(error);
  }
};
