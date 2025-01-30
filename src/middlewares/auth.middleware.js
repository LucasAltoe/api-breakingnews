import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';


dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.send(401);
        }

        const parts = authorization.split(" "); //Separar o BEARER TOKEN em um array com os nomes separados

        if (parts.length !== 2) {
            return res.send(401);
        }

        const [schema, token] = parts; //Aqui nós desestruturamos o array e em vez de comparar as posições, damos um "nome" a cada uma desses elementos

        if (schema !== "Bearer") {
            return res.send(401);
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Invalid Token!" });
            }

            const user = await userService.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid Token!" })
            }

            req.userId = user._id;

            return next();
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}