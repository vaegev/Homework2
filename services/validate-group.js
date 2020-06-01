import Joi from '@hapi/joi';

const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required()
});

export default groupSchema;
