"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Ingredient {
    name: String
    milliliters: Float
  }
  type Drink {
    idDrink: String
    strDrink: String
    strDrinkThumb: String
    ingredients: [Ingredient]
    millilitersAlcohol: Float
  }
  type DrinkListItem {
    idDrink: String
    strDrink: String
    strDrinkThumb: String
  }
  type Query {
    drinks: [DrinkListItem]
    drink(drinkId: String): Drink
  }
  type Mutation {
    pairTrade(
      side: String
      market_1: String
      market_2: String
      size: Float
    ): Boolean
  }
`;
exports.default = typeDefs;
