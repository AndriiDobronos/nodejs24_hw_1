const yup = require('yup');

const usersMetadataSchema = yup.object({
    id:yup.number().required(),
    username: yup.string().required(),
    email: yup.string().required().email(),
    employee: yup.number().required()
});

const usersDataValidator = async (req, resp, next) => {
    try {
        await usersMetadataSchema.validate(req.body);
    } catch (err) {
        resp.status(400).send({ error: err.message });
        return;
    }
    next();
};

const userIdSchema = yup.number().required().integer().positive();
const userEmployeeSchema = yup.number().required().integer().positive();

const usersIdValidator =  async (req, resp, next) => {
    try {
        const parseId = await userIdSchema.validate(req.params.usersId);
        req.params.usersId = parseId;
    } catch (err) {
        resp.status(400).send({ error: err.message });
        return;
    }
    next();
}

const usersEmployeeValidator =  async (req, resp, next) => {
    try {
        const parseEmployee = await userEmployeeSchema.validate(req.params.employee);
        req.params.employee  = parseEmployee;
    } catch (err) {
        resp.status(400).send({ error: err.message });
        return;
    }
    next();
}

module.exports = {
    usersDataValidator,
    usersIdValidator,
    usersEmployeeValidator
}