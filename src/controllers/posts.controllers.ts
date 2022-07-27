import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const get_all_post: RequestHandler = async (req, res, next) => {
  try {
    const all_post = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    res.send(all_post);
  } catch (error) {
    next(error);
  }
};

export const creare_one_post: RequestHandler = async (req, res, next) => {
  try {
    const { title, body, userId } = req.body;
    if (!title || !body || !userId)
      return res.json({ success: false, error: 'Missing data' });

    const post = await prisma.post.create({
      data: {
        title,
        body,
        userId,
      },
    });

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const get_post_details: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const int_id = parseInt(id);
    const post = await prisma.post.findFirst({
      where: {
        id: int_id,
      },
      include: {
        Comments: {
          where: {
            postId: int_id,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
};
