import { createService, findAllService } from '../services/news.service.js';

const create = async (req, res) => {
    try {
        const { authorization } = req.headers;

        if(!authorization) {
            return res.send(401);
        }

        const parts = authorization.split(" "); //Separar o BEARER TOKEN em um array com os nomes separados

        const [schema, token] = parts; //Aqui nós desestruturamos o array e em vez de comparar as posições, damos um "nome" a cada uma desses elementos

        if(parts.length !== 2) {
            return res.send(401);
        }

        if (schema !== "Bearer") {
            return res.send(401);
        }

        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({ message: 'Submit all fields for registration' });
        }

        await createService({
            title,
            text,
            banner,
            user: { _id: "6798f822b25b15e8ba74abf9" }
        });

        res.status(201).send({ message: 'News created successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    const news = await findAllService();
    if (news.length === 0) {
        return res.status(400).send({ message: "There are no registered news" });
    }
    res.send(news);
}

export { create, findAll };
