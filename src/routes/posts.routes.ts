import { Router } from 'express';

export const router = Router();
import {
  get_all_post,
  creare_one_post,
  get_post_details,
} from '../controllers/posts.controllers';

router.post('/', creare_one_post);
router.get('/all', get_all_post);
router.get('/id/:id', get_post_details);
