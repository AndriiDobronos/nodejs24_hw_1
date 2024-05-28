const dataSource = [
    { id: 1, username: 'John Smith', email: 'JohnSmith@mail.com', employee: 1 },
    { id: 2, username: 'John Doe', email: 'JohnDoe@mail.com', employee: 2 },
    { id: 3, username: 'Jorge Morgan', email: 'JorgeMorgan@mail.com', employee: 3 },
];

// initial max index available to use
dataSource._maxIndex = Math.max(...dataSource.map((item) => item.id));

function getAllUsers() {
    return [...dataSource];
}

function getUserById(userId) {
    const userData = dataSource.find(({ id }) => id === userId);
    if (!userData) {
        throw new Error('UserData does not exist');
    }
    return userData;
}

function addNewUser(metadata) {
    dataSource._maxIndex += 1;

    const newUserData = {
        ...metadata,
        id: dataSource._maxIndex
    }
    dataSource.push(newUserData);
    //return newUserData;
    //return dataSource;
}

function deleteUserById(userId) {
    const elemIndex = dataSource.findIndex((item) => item.id === userId);
    if (elemIndex < 0) {
        throw new Error('UserData does not exist');
    }
    dataSource.splice(elemIndex, 1);
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
};