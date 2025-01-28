import {Router} from 'express';
const router = Router();

import { login } from '../controllers/auth.controller.js'; //Aqui o login é passado dessa forma ao invés de authController pois é só uma função

router.post("/", login); 

export default router;