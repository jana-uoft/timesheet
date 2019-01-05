import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'

const {
  JWT_SECRET
} = process.env

export const isAuthenticated = async (req) => {
  const token = req.headers['authorization']
  if (!token) throw new AuthenticationError('Authorization token required for this route.')
  try {
    return await jwt.verify(token, JWT_SECRET)
  } catch (e) {
    throw new AuthenticationError('Your token is either invalid or expired.')
  }
}

export const createToken = async (user, expiresIn) => {
  const { _id } = user
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn })
}

export const isTokenValid = async (token) => {
  try {
    return await jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return false
  }
}
