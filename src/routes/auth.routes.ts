import { Router } from 'express';
import { login } from '../controllers/auth.controllers';
export const router = Router();

router.post('/login', login);
