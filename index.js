import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/database/db.js';

import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDatabase();

app.use(express.json());

app.use('/user', userRoute);

app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
}) 