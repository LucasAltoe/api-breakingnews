import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const loginService = (email) => User.findOne({ email: email }).select("+password"); //Dessa forma ele traz também o hash da senha

const generateToken = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 }) //Token expira em 24 horas

export { loginService, generateToken };