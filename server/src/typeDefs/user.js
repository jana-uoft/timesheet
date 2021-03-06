import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]! @auth
    user(id: ID!): User
  }

  extend type Mutation {
    register(username: String, name: String!, password: String!): User,
    login(username: String, password: String): User
  }

  type User {
    id: ID!,
    username: String!
    name: String,
    token: String
  },
`
