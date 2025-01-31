import { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService } from '../services/news.service.js';

const create = async (req, res) => {
    try {

        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: 'Submit all fields for registration' });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        });

        res.status(201).send({ message: 'News created successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(offset, limit);
        const total = await countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no registered news" });
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar

            }))
        });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            res.status(400).send({ message: 'There is no registration post' });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar
            }
        })

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const searchTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no news with this title" });
        }

        res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar

            }))
        });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const byUser = async (req, res) => {
    try {
        const id = req.userId //Essa é uma variável já existente no middleware, e na rota nós passamos que ela tem que passar por esse middleware, por isso conseguimos ter acesso a ela

        const news = await byUserService(id);

        res.send({ //Como news são várias notícias ele nos retorna elas num array, por isso, usamos um map para obtermos um novo array retornado com nossas especificações
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar

            }))
        });

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const update = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const { id } = req.params;

        // Verifica se pelo menos um campo foi enviado
        if (!title && !banner && !text) {
            return res.status(400).send({ message: "Submit at least one field to update the post" });
        }

        // Busca a notícia pelo ID
        const news = await findByIdService(id);

        // Verifica se a notícia existe
        if (!news) {
            return res.status(404).send({ message: "Post not found" });
        }

        // Verifica se o usuário tem permissão para atualizar a postagem
        if (news.user._id.toString() !== req.userId.toString()) {
            return res.status(403).send({ message: "You are not authorized to update this post" });
        }

        // Chama o serviço de atualização
        await updateService(id, title, text, banner);

        // Retorna sucesso
        return res.send({ message: "Post successfully updated!" });

    } catch (err) {
        // Trata erros inesperados
        res.status(500).send({ message: err.message });
    }
};

export { create, findAll, topNews, findById, searchTitle, byUser, update };
