export interface AppErrorOptions {
  statusCode: number;
  message: string;
}

export class AppError extends Error implements AppErrorOptions {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(msg: string): AppError {
    return new AppError(400, msg);
  }

  static unauthorized(msg: string = 'Unauthorized'): AppError {
    return new AppError(401, msg);
  }

  static forbidden(msg: string = 'Forbidden'): AppError {
    return new AppError(403, msg);
  }

  static notFound(msg: string = 'Not found'): AppError {
    return new AppError(404, msg);
  }

  static conflict(msg: string): AppError {
    return new AppError(409, msg);
  }

  static gone(msg: string): AppError {
    return new AppError(410, msg);
  }
}

export default AppError;
