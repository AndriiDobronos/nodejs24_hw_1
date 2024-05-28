const express = require('express');
const pagesRouter = express.Router();

const usersService = require('../services/user_service');
const { usersDataValidator, usersIdValidator} = require('../middlewares/otherValidators');
const usersController = require("../controllers/users_controllers");

const formDataParser = express.urlencoded({ extended: false });

function notFoundErrorHandler(err, _req, resp, _next) {
    resp.status(404).json({ error: err.message });
}

pagesRouter.get('/', (_req, resp) => {
    const usersList = usersService.getAllUsers();
    resp.render('index', { usersList });
});

pagesRouter.route('/add-user')
    .get((req, resp) => {
        resp.render('add_user');
    })
    .post(formDataParser, usersDataValidator, (req, resp) => {
        usersService.addNewUser(req.body);
        resp.redirect('/pug');
    });
pagesRouter.route('/delete-user')
    .get((req, resp) => {
        resp.render('delete_user');
    });

pagesRouter.delete('/:usersId',usersIdValidator, usersController.deleteUserById, notFoundErrorHandler);

module.exports = {
    pagesRouter
}