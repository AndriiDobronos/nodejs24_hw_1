const yup = require('yup');

const usersMetadataSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required().email()
});

const usersDataValidator = async (req, resp, next) => {
    try {
        await usersMetadataSchema.validate(req.body);
        resp.status(201);
    } catch (err) {
        resp.status(400).send({ error: err.message });
        return;
    }
    next();
};

const userIdSchema = yup.number().required().integer().positive();

const usersIdValidator =  async (req, resp, next) => {
    try {
        await userIdSchema.validate(req.url.slice(1,req.url.length));
        resp.status(req.method === 'DELETE' ? 204 : 200);
        resp.send(req.params);
    } catch (err) {
        resp.status(400).send({ error: err.message });
        return;
    }
    next();
}

module.exports = {
    usersDataValidator,
    usersIdValidator
}