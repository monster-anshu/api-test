import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import morgan from 'morgan';
import { router as posts_router } from './routes/posts.routes';
import { router as comment_router } from './routes/comments.routes';

import error_handler from './handler/error_handler';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(morgan('common'));
app.use('/api/post', posts_router);
app.use('/api/comment', comment_router);
app.use(error_handler);

const server = app.listen(PORT, async () => {
  console.log('Server is running');
});
