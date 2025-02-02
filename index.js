import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/database/db.js';

import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import newsRoute from './src/routes/news.route.js';
import swaggerRoute from './src/routes/swagger.route.cjs';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDatabase();

app.use(express.json());

app.use('/user', userRoute);

app.use('/auth', authRoute);

app.use('/news', newsRoute);

app.use('/doc', swaggerRoute);

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
}) 

// Acessar o mongodb atlas para o banco de dados
//https://api-breakingnews-3l4d.onrender.com