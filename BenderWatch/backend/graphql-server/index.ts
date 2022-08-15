import typeDefs from './types'
import startApolloServer from './apolloServer'
import resolvers from './resolvers'
import mongoose from 'mongoose'
require('dotenv').config()

const startServer = async () => {
  const URL = process.env.DB_URL || 'mongodb://localhost:27017/test'
  await mongoose.connect(URL)
  startApolloServer(typeDefs, resolvers)
}

startServer()
