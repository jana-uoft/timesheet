import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const {
  PORT = 3001,
  NODE_ENV = 'development'
} = process.env

const app = express()

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: NODE_ENV === 'development'
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => console.log(`Listening on PORT ${PORT}`))
