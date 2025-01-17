const express = require('express');
const app = express();

const userRoute = require('./src/routes/user.route');

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
}) 