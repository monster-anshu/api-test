import { Router } from 'express';
import { create_comment } from '../controllers/comments.controller';

export const router = Router();

router.post('/:id', create_comment);
