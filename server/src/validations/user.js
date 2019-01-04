import Joi from 'joi'

export default {
  register: Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(30).required().strip(),
    name: Joi.string().max(254).required(),
    password: Joi.string().min(4).max(30).required()
  })
}
