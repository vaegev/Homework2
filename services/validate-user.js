import Joi from '@hapi/joi';

const userSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    login: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,30}$/),
    age: Joi.number()
        .min(4)
        .max(130)
        .required()
});

export { userSchema };
