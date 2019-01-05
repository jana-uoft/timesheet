import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { isAuthenticated } from '../helpers/auth'
import { User } from '../models'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      let [ , , context ] = args
      const { _id } = await isAuthenticated(context.req)
      context.authUser = await User.findById({ _id })
      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
