import { Router, Request, Response } from 'express';

export const router = Router();

router.all('*all', (_req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});
