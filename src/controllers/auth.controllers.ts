import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await prisma.admin.findFirst({
      where: {
        username,
        password,
      },
    });
    if (!result)
      return res
        .status(401)
        .json({ success: false, error: 'Incorrect username or password' });

    const token = jwt.sign(username, process.env.KEY || 'KEY Here');
    
    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
