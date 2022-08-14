import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const PORT = process.env.PORT || 8080

const client = new ApolloClient({
  uri: `http://localhost:${PORT}/graphql`,
  cache
})

export { client, cache }
