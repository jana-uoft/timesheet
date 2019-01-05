import Joi from 'joi'
import { validateUser } from '../validations'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { createToken, isTokenValid } from '../helpers/auth'

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
      await Joi.validate(args, validateUser.register, { abortEarly: false })
      const { username, name, password } = args
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        throw new UserInputError(`User already exists with username: ${username}`)
      }
      let newUser = new User()
      newUser.username = username
      newUser.name = name
      newUser.password = password
      newUser.token = await createToken(newUser)
      return newUser.save()
    },
    login: async (parent, args, context, info) => {
      await Joi.validate(args, validateUser.login, { abortEarly: false })
      const { username, password } = args
      const user = await User.findOne({ username })
      if (!user) {
        throw new UserInputError('Invalid username/password. Please try again.')
      }
      if (!await user.isValidPassword(password)) {
        throw new UserInputError('Invalid username/password. Please try again.')
      }
      const isCurrentTokenValid = await isTokenValid(user.token)
      if (isCurrentTokenValid) {
        return user
      } else {
        user.token = await createToken(user)
        await user.updateOne({ token: user.token })
        return user
      }
    }
  }
}
