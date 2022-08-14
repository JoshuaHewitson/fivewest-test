import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type PatronDrink {
    drinkId: String
    time: String
    millilitersAlcohol: Float
  }
  type Patron {
    id: ID
    name: String
    weight: Float
    drinks: [PatronDrink]
    alcoholLevel: Float
  }
  type Ingredient {
    name: String
    milliliters: Float
  }
  type Drink {
    idDrink: String
    strDrink: String
    strDrinkThumb: String
  }
  type Query {
    drinks: [Drink]
    drink(drinkId: String): Drink
    patrons: [Patron]
  }
  type Mutation {
    createPatron(name: String, weight: Float): Patron
    addDrink(patronId: String, drinkId: String): Patron
    removePatron(patronId: String): Patron
  }
`

export default typeDefs
