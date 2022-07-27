import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const create_comment: RequestHandler = async (req, res, next) => {
  try {
    const { email, body, name } = req.body;
    const { id } = req.params;
    const postId = parseInt(id);
    // return res.json('ok');

    if (!email || !body || !name || !postId)
      return res.json({ success: false, error: 'Missing data' });

    const comment = await prisma.comments.create({
      data: {
        email,
        body,
        name,
        postId,
      },
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
};
