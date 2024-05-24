const yup = require('yup');

const MESSAGES = {
    missing: 'should be provided',
    wrongType: (type) => `should be ${type}`
}

const userIdSchema = yup.number()
    .typeError(MESSAGES.wrongType('a number'))
    .required(MESSAGES.missing)
    .integer(MESSAGES.wrongType('an integer'))
    .positive('should be more than 0')

const userEmployeeSchema = yup.number()
    .typeError(MESSAGES.wrongType('a number'))
    .required(MESSAGES.missing)
    .integer(MESSAGES.wrongType('an integer'))
    .positive('should be more than 0')

const usersMetadataSchema = yup.object({
    username: yup.string()
        .typeError(MESSAGES.wrongType('a string'))
        .required(MESSAGES.missing)
        .min(4, 'should be longer than 4 chars'),
    email: yup.string()
        .typeError(MESSAGES.wrongType('a string'))
        .required(MESSAGES.missing)
        .email(MESSAGES.missing),
    employee: yup.number()
        .required(MESSAGES.missing)
        .integer(MESSAGES.wrongType('an integer'))
        .positive('should be more than 0')
});

const usersDataValidator = async (req, resp, next) => {
    try {
        await usersMetadataSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.reduce((acc, curr) => {
            if (!acc[curr.path]) {
                acc[curr.path] = [];
            }

            acc[curr.path].push(curr.message);
            return acc;
        }, {});

        resp.status(400).send({ errors });
    }
};

const usersIdValidator = async (req, resp, next) => {
    try {
        const parsedId = await userIdSchema.validate(req.params.usersId);
        req.params.usersId = parsedId;
        next();
    } catch (err) {
        const errors = {
            usersId: err.message
        };
        resp.status(400).send({ errors });
    }
}

const usersEmployeeValidator = async (req, resp, next) => {
    try {
        const parsedId = await userEmployeeSchema.validate(req.params.usersId);
        req.params.usersId = parsedId;
        next();
    } catch (err) {
        const errors = {
            usersId: err.message
        };
        resp.status(400).send({ errors });
    }
}

module.exports = {
    usersDataValidator,
    usersIdValidator,
    usersEmployeeValidator
}