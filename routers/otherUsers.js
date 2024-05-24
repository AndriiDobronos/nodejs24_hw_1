const usersRouter = require('express').Router();
const usersController = require('../controllers/users_controllers');
const { usersDataValidator, usersIdValidator } = require('../middlewares/otherValidators');

function notFoundErrorHandler(err, _req, resp, _next) {
    resp.status(404).json({ error: err.message });
}

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/:usersId', usersIdValidator, usersController.getUserById, notFoundErrorHandler);

usersRouter.post('/', usersDataValidator, usersController.addNewUser);

usersRouter.delete('/:usersId', usersIdValidator, usersController.deleteUserById, notFoundErrorHandler);

usersRouter.use((req, resp) => {
    resp.status(404).send();
});

module.exports = {
    usersRouter
};