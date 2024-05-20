const { Router } = require('express');
const { usersDataValidator,usersIdValidator } = require('../middlewares/validators');

const usersRouter = Router();
usersRouter.get('/', (req, resp) => {
    resp.send([]);
    resp.status(200);
});

usersRouter.get('/:usersId',usersIdValidator,(req, resp) => {
});

usersRouter.post('/', usersDataValidator, (req, resp) => {
    resp.send('User created !');
});

usersRouter.delete('/:usersId',usersIdValidator,(req, resp) => {
});

module.exports = {
    usersRouter
};