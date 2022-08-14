import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { createServer } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import DRINKS_API from './DRINKS_API'

const startApolloServer = async (typeDefs: any, resolvers: any) => {
  const app = express()
  const httpServer = createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        DRINKS_API: new DRINKS_API()
      }
    }
  })

  await server.start()
  server.applyMiddleware({
    app
  })

  const PORT = process.env.PORT || 8080
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`
    )
  })
}

export default startApolloServer
