import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
}

/**
 * Send a 200 OK response
 */
export const sendOk = <T = any>(res: Response, data: T): Response => {
  return res.status(200).json({ success: true, data });
};

/**
 * Send a 201 Created response
 */
export const sendCreated = <T = any>(res: Response, data: T): Response => {
  return res.status(201).json({ success: true, data });
};

export default { sendOk, sendCreated };
