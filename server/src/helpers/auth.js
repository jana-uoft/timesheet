import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import { User } from '../models'

export const getAuthUser = async (req, secret) => {
  const token = req.headers['authorization']
  if (token) {
    try {
      const { _id } = await jwt.verify(token, secret)
      return User.findById({ _id })
    } catch (e) {
      throw new AuthenticationError('Your token is either invalid or expired. Sign in again.')
    }
  }
}

export const createToken = async (user, secret, expiresIn) => {
  const { _id } = user
  return jwt.sign({ _id }, secret, { expiresIn })
}

export const isTokenValid = async (token, secret) => {
  try {
    return await jwt.verify(token, secret)
  } catch (e) {
    return false
  }
}
