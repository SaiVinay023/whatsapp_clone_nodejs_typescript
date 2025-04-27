import { Request, Response, NextFunction } from 'express';
import { signupService, loginService, updateOnlineStatusService, getOnlineStatusService } from '../services/userService';

export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password } = req.body;
    const user = await signupService(name, email, password);
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
}

export async function updateOnlineStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    await updateOnlineStatusService(userId, status);
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    next(error);
  }
}

export async function getOnlineStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;
    const status = await getOnlineStatusService(userId);
    res.status(200).json({ success: true, data: status });
  } catch (error) {
    next(error);
  }
}

export function healthCheck(req: Request, res: Response): void {
  res.status(200).json({ success: true, message: "Service is running" });
}

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const file = req.file; // file will be available here if uploaded

    console.log('Received message:', message);
    if (file) {
      console.log('Received file:', file.originalname);
      // TODO: Save file to database or cloud
    }

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};