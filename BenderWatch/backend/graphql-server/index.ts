import typeDefs from './types'
import startApolloServer from './apolloServer'
import resolvers from './resolvers'
import mongoose from 'mongoose'
require('dotenv').config()

const startServer = async () => {
  await mongoose.connect('mongodb://localhost:27017/test')
  startApolloServer(typeDefs, resolvers)
}

startServer()
