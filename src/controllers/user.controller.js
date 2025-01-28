const userService = require('../services/user.service');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: 'Submit all fields for registration' })
    }

    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({ message: 'Error creating User' })
    }

    res.status(201).send({
        message: "User created successfully",
        user: {
            id: user._id,
            name: name,
            username: username,
            email: email,
            avatar: avatar,
            background: background
        }
    });
};

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (users.length === 0) {
        return res.status(400).send({ message: "There are no registered users" });
    }

    res.send(users);

}

const findById = async (req, res) => {

    const user = req.user; //Aqui a gente passa o id vindo da requisição para a nossa função

    res.send(user);
}

const update = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
        res.status(400).send({ message: 'Submit at least one field for update' })
    }

    const {id, user} = req;

    await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    );

    res.send({ message: 'User successfully updated!' })

}

module.exports = { create, findAll, findById, update };

