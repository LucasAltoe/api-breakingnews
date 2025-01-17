const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => { //Essa arrowFunction é uma função de callback, que é uma função que está sendo executada por trás de outra função (no caso a fução 'get', além disso é uma função anônima pois não tem nome)
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
})