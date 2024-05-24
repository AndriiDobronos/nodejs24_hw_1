const { Router } = require('express');
const { usersDataValidator,usersIdValidator } = require('../middlewares/validators');
const  { getAllUsers, getUserById, deleteUserById, addNewUser} = require('../services/user_service')

const usersRouter = Router();
function errorHandler(err,_req,resp,_next) {
    resp.status(404).json({ error:err.message})
}

usersRouter.get('/', (req, resp) => {
    const usersList = getAllUsers();
    resp.send(usersList);
    resp.status(200);
});

usersRouter.get('/:usersId',usersIdValidator,(req, resp,_next) => {
    resp.status(200);
    const {usersId} = req.params;
    const userData = getUserById(usersId);
    resp.json(userData);
}, errorHandler);

usersRouter.post('/', usersDataValidator, (req, resp) => {
    addNewUser(req.body);
    resp.status(201);
    resp.send('User created !');
});

usersRouter.delete('/:usersId',usersIdValidator,(req, resp,_next) => {
    const {usersId} = req.params;
    deleteUserById(usersId);
    resp.status(204);
    resp.send();
},errorHandler);

usersRouter.use((req,resp) => {
    resp.status(404);
    resp.send();
})

module.exports = {
    usersRouter
};