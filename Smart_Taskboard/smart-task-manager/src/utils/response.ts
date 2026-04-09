import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
}

export const sendOk = <T = any>(res: Response, data: T): Response => {
  return res.status(200).json({ success: true, data });
};

export const sendCreated = <T = any>(res: Response, data: T): Response => {
  return res.status(201).json({ success: true, data });
};

export default { sendOk, sendCreated };
