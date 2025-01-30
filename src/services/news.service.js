import News from '../models/News.js';

const createService = (body) => News.create(body);

const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"); //Exemplo do offset: pega 5 do limite na paginação, depois começa a partir do 5 na proxima trazendo 5 de novo

//Com o populate, através do id puxamos os dados do usuário

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

export { //Com export default nos nao conseguimos mandar desconstruido
    createService,
    findAllService,
    countNews,
    topNewsService
}