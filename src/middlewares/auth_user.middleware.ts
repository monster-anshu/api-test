import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const auth_user: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header('token');

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const token_data = jwt.verify(token, process.env.KEY || 'KEY Here');

    if (!token_data) return res.status(401).json({ error: 'Unauthorized' });

    const user = await prisma.admin.findFirst({
      where: {
        username: token_data as string,
      },
    });

    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default auth_user;
