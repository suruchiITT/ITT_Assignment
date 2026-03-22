export interface AppErrorType {
  statusCode: number;
  message: string;
}

const createAppError = (statusCode: number, message: string): AppErrorType => ({
  statusCode,
  message,
});

export const badRequest = (msg: string): AppErrorType =>
  createAppError(400, msg);
export const unauthorized = (msg: string = "Unauthorized"): AppErrorType =>
  createAppError(401, msg);
export const forbidden = (msg: string = "Forbidden"): AppErrorType =>
  createAppError(403, msg);
export const notFound = (msg: string = "Not found"): AppErrorType =>
  createAppError(404, msg);
export const conflict = (msg: string): AppErrorType => createAppError(409, msg);
export const gone = (msg: string): AppErrorType => createAppError(410, msg);

const AppError = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  gone,
};

export default AppError;
