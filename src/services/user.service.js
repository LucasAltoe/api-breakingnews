import User from '../models/User.js';

const createService = (body) => User.create(body); //Se usar as chaves precisamos do return

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => User.findOneAndUpdate(
    { _id: id }, 
    { name, username, email, password, avatar, background })

export default {
    createService,
    findAllService,
    findByIdService,
    updateService
};