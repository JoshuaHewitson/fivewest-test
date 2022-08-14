const resolvers = {
  Query: {
    drinks: async (
      _: any,
      variables: any,
      { dataSources }: { dataSources: any }
    ) => {
      const response = await dataSources.DRINKS_API.getDrinksList()
      return response
    },
    drink: async (
      _: any,
      { drinkId }: { drinkId: string },
      { dataSources }: { dataSources: any }
    ) => {
      const response = await dataSources.DRINKS_API.getDrinkDetails(drinkId)
      return response
    }
  },
  Mutation: {
    // runArbBot2: async (
    //   _,
    //   { market1, market2, dollarsAllocated },
    //   { dataSources }
    // ) => {
    //   initiateArbBot2({
    //     market1,
    //     market2,
    //     dollarsAllocated,
    //     dataSources
    //   })
    //   // return response.result
    //   return true
    // },
  }
}

export default resolvers
