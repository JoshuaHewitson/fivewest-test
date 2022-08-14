import { Patron } from './models/Patron'

const maxAlcoholLevel = 100
const getAlcoholLevel = (patron: any) => {
  const timeNow = new Date().getTime()
  let level = 0
  for (var i = 0; i < patron?.drinks.length; i++) {
    const timeDiffHours = (timeNow - Number(patron.drinks[i].time)) / 3.6e6
    const ml = patron.drinks[i].millilitersAlcohol
    const mlNow = Math.max(ml - (ml / 3) * timeDiffHours, 0)
    level += mlNow
  }
  level = (level / Number(patron?.weight)) * 50
  console.log({ level })
  return Math.min(level, maxAlcoholLevel)
}

const resolvers = {
  Query: {
    drinks: async (
      _: any,
      variables: any,
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.DRINKS_API.getDrinksList()
    },
    drink: async (
      _: any,
      { drinkId }: { drinkId: string },
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.DRINKS_API.getDrinkDetails(drinkId)
    },
    patrons: async (
      _: any,
      variables: any,
      { dataSources }: { dataSources: any }
    ) => {
      const patrons = await Patron.find()
      return patrons.map((patron) => ({
        id: patron.id,
        name: patron.name,
        weight: patron.weight,
        drinks: patron.drinks,
        alcoholLevel: getAlcoholLevel(patron)
      }))
    }
  },
  Mutation: {
    createPatron: async (
      _: any,
      { name, weight }: { name: string; weight: number },
      { dataSources }: { dataSources: any }
    ) => {
      const patron = new Patron({ name, weight })
      return await patron.save()
    },
    removePatron: async (
      _: any,
      { patronId }: { patronId: string },
      { dataSources }: { dataSources: any }
    ) => {
      return await Patron.findOne({ _id: patronId }).remove().exec()
    },
    addDrink: async (
      _: any,
      { patronId, drinkId }: { patronId: string; drinkId: string },
      { dataSources }: { dataSources: any }
    ) => {
      const patron = await Patron.findOne({ _id: patronId }).exec()
      const drinkDetails = await dataSources.DRINKS_API.getDrinkDetails(drinkId)
      if (patron && drinkDetails) {
        patron.drinks.push({
          drinkId,
          time: new Date().getTime().toString(),
          millilitersAlcohol: drinkDetails.millilitersAlcohol
        })
        return await patron.save()
      }
    }
  }
}

export default resolvers
