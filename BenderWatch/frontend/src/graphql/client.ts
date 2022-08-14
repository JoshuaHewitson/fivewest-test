import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: `http://localhost:8080/graphql`,
  cache
})

export { client, cache }
