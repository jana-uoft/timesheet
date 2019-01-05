import { ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { authUser }, info) =>
  authUser ? skip : new ForbiddenError('Authentication required to access this route.')
