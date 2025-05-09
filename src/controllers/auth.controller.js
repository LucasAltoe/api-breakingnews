import bcrypt from 'bcrypt';
import { loginService, generateToken } from '../services/auth.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body //formulário a ser preenchido sempre é recebido por body

    try {
        const user = await loginService(email);

        if(!user){
            res.status(404).send({ message: 'User or Password Not Found!' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            res.status(404).send({ message: 'User or Password Not Found!' });
        }

        const token = generateToken(user.id);

        res.send({token});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}