import { RESTDataSource } from 'apollo-datasource-rest'
import fc from 'fraction-calculator'
var convert = require('convert-units')

/**
 * here we convert some of the common units to ml
 * or default to 20ml
 * this doesn't work for many ingredients, but it's usually fine for the alcoholic ones */
const getMilliliters = (units: string, value: number) => {
  if (units.includes('fl-oz')) {
    return convert(value).from('fl-oz').to('ml')
  }
  if (units.includes('oz')) {
    return convert(value).from('oz').to('g')
  }
  if (units.includes('cl')) {
    return value * 10
  }
  if (units.includes('tsp')) {
    return convert(value).from('tsp').to('ml')
  }
  if (units.includes('tblsp')) {
    return convert(value).from('Tbs').to('ml')
  }
  return 20
}

const getIngredients = (data: any) => {
  const keys = Object.keys(data)
  const ingredients: any = []
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = data[key]
    const keyIndex: number = key
      ? Number(key.replace(/[a-zA-Z]+/g, '')) - 1
      : -1
    if (key.includes('Ingredient')) {
      ingredients[keyIndex] = {
        ...ingredients[keyIndex],
        name: value
      }
    }
    if (key.includes('Measure')) {
      const units = value && value.replace(/[^a-zA-Z]+/g, '')
      // fc allows us to interpret measures like 1 1/4
      const fraction = value && fc(value.replace(/[a-zA-Z]+/g, ''))
      const milliliters = units
        ? getMilliliters(units, fraction && fraction.toNumber())
        : 20
      ingredients[keyIndex] = {
        ...ingredients[keyIndex],
        measure: value,
        milliliters
      }
    }
  }
  return ingredients
}

const getMillilitersAlcohol = (ingredients: any, ingredientsDetails: any) => {
  let millilitersAlcohol = 0
  for (var i = 0; i < ingredients.length; i++) {
    const details =
      ingredientsDetails[i] &&
      ingredientsDetails[i]?.ingredients &&
      ingredientsDetails[i].ingredients[0]
    const strAlcohol = details?.strAlcohol
    if (strAlcohol === 'Yes') {
      const ABV = details?.strABV ? details.strABV / 100 : 0.2
      millilitersAlcohol += ingredients[i].milliliters * ABV
      console.log(
        details?.strIngredient,
        ABV,
        ingredients[i].milliliters,
        millilitersAlcohol
      )
    }
  }
  return millilitersAlcohol
}

class DRINKS_API extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/'
  }

  async getDrinksList() {
    const data = await this.get(`search.php`, {
      f: 'a'
    })
    return data.drinks
  }
  async getDrink(drinkId: string) {
    const data = await this.get(`lookup.php`, {
      i: drinkId
    })
    return data.drinks[0]
  }
  async getDrinkDetails(drinkId: string) {
    const data = await this.get(`lookup.php`, {
      i: drinkId
    })
    const ingredients = getIngredients(data.drinks[0])
    const ingredientsDetails = await Promise.all(
      ingredients.map((ingredient: { name: string; measure: number }) => {
        return this.get(`search.php`, { i: ingredient.name })
      })
    )
    const millilitersAlcohol = getMillilitersAlcohol(
      ingredients,
      ingredientsDetails
    )
    const drink = {
      ...data.drinks[0],
      ingredients: getIngredients(data.drinks[0]),
      millilitersAlcohol
    }
    return drink
  }
}

export default DRINKS_API
