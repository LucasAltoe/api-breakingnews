import User from '../models/User.js';

const loginService = (email) => User.findOne({ email: email }).select("+password"); //Dessa forma ele traz também o hash da senha

export { loginService };