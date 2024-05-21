const { Router } = require('express');
const { usersDataValidator,usersIdValidator } = require('../middlewares/validators');

const usersRouter = Router();
usersRouter.get('/', (req, resp) => {
    resp.status(200);
    resp.send([]);
});

usersRouter.get('/:usersId',usersIdValidator,(req, resp) => {
    resp.status(200);
    //resp.send(req.params); //працює так само як рядок нижче
    resp.json({usersId:req.params.usersId});
});

usersRouter.post('/', usersDataValidator, (req, resp) => {
    resp.status(201);
    resp.send('User created !');
});

usersRouter.delete('/:usersId',usersIdValidator,(req, resp) => {
    resp.status(204);
    resp.send();
});

module.exports = {
    usersRouter
};