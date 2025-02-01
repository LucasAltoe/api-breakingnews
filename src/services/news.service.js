import News from '../models/News.js';
import cuid from 'cuid';

const createService = (body) => News.create(body);

const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"); //Exemplo do offset: pega 5 do limite na paginação, depois começa a partir do 5 na proxima trazendo 5 de novo

//Com o populate, através do id puxamos os dados do usuário

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const searchByTitleService = (title) => News.find({
    title: { $regex: `${title || ""}`, $options: "i" } //case insensitive
}).sort({ _id: -1 }).populate("user"); //Nessa regex o usuário pode mandar o titulo completo ou parte dele

const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user"); //No esquema de news, user é um id

const updateService = (id, title, text, banner) => News.findByIdAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true });

const eraserService = (id) => News.findByIdAndDelete({ _id: id });

const likeNewsService = async (idNews, userId) => {
    const news = await News.findById(idNews);

    // Verifica se o usuário já deu like
    const userAlreadyLiked = news.likes.some(like => like.userId.toString() === userId.toString());

    if (userAlreadyLiked) {
        return null; // Retorna null se o usuário já deu like
    }

    // Adiciona o like se o usuário ainda não deu like
    await News.findByIdAndUpdate(
        { _id: idNews },
        { $push: { likes: { userId, created: new Date() } } }
    );

    return true; // Retorna true se o like foi adicionado com sucesso
};
const DeleteLikeNewsService = (idNews, userId) => News.findByIdAndUpdate(
    { _id: idNews },
    { $pull: { likes: { userId } } }
);

const addCommentService = (idNews, comment, userId) => {
    const idComment = cuid(); //Gerando um id pro comentário
    return News.findOneAndUpdate({ _id: idNews }, { $push: { comments: { idComment, userId, comment, createdAt: new Date() } } });
};

const deleteCommentService = (idNews, idComment, userId) => {
    return News.findByIdAndUpdate(
        { _id: idNews },
        { $pull: { comments: { idComment, userId } } },
        { new: true } // Retorna o documento atualizado
    );
};

export { //Com export default nos nao conseguimos mandar desconstruido
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraserService,
    likeNewsService,
    DeleteLikeNewsService,
    addCommentService,
    deleteCommentService
}