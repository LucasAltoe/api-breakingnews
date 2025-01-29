import News from '../models/News.js';

const createService = (body) => News.create(body);

const findAllService = () => News.find();

export { //Com export default nos nao conseguimos mandar desconstruido
    createService,
    findAllService
}