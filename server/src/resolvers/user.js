import Joi from 'joi'
import { ValidateUser } from '../validations'
import { User } from '../models'

export default {
  Query: {
    users: (parent, args, context, info) => {
      return User.find({})
    },

    user: (parent, { id }, context, info) => {
      return User.findById(id)
    }
  },

  Mutation: {
    register: async (parent, args, context, info) => {
      await Joi.validate(args, ValidateUser.register, { abortEarly: false })
      return User.create(args)
    }
  }
}
