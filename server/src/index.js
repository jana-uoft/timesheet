import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import schemaDirectives from './directives';

(async () => {
  try {
    const {
      PORT = 3001,
      NODE_ENV = 'development',
      MONGODB_SERVER,
      MONGODB_PORT,
      MONGODB_DATABASE,
      MONGODB_USER,
      MONGODB_PASS
    } = process.env

    await mongoose.connect(
      `mongodb://${MONGODB_SERVER}:${MONGODB_PORT}/${MONGODB_DATABASE}`,
      { user: MONGODB_USER, pass: MONGODB_PASS, useNewUrlParser: true }
    )
    mongoose.set('debug', NODE_ENV === 'development')

    const app = express()

    if (NODE_ENV === 'development') app.use(morgan('dev'))

    app.disable('x-powered-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: NODE_ENV === 'development',
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app })

    app.listen({ port: PORT }, () => console.log(`Listening on PORT ${PORT}`))
  } catch (e) {
    console.error(e)
  }
})()
