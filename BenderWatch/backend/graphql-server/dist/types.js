"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
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
`;
exports.default = typeDefs;
