const usersService = require('../services/user_service');

function getAllUsers(req, resp) {
    const userList = usersService.getAllUsers();
    resp.send(userList);
}

function getUserById(req, resp) {
    const { usersId } = req.params;

    const userData = usersService.getUserById(usersId);
    resp.json(userData);
}

function addNewUser(req, resp) {
    usersService.addNewUser(req.body);
    resp.status(201).json(req.body);
}

function deleteUserById(req, resp) {
    const { usersId } = req.params;

    usersService.deleteUserById(usersId);
    resp.status(204).send();
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
};