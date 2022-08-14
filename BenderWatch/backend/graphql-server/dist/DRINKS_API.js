"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const fraction_calculator_1 = __importDefault(require("fraction-calculator"));
var convert = require('convert-units');
/**
 * here we convert some of the common units to ml
 * or default to 20ml
 * this doesn't work for many ingredients, but it's usually fine for the alcoholic ones */
const getMilliliters = (units, value) => {
    if (units.includes('fl-oz')) {
        return convert(value).from('fl-oz').to('ml');
    }
    if (units.includes('oz')) {
        return convert(value).from('oz').to('g');
    }
    if (units.includes('cl')) {
        return value * 10;
    }
    if (units.includes('tsp')) {
        return convert(value).from('tsp').to('ml');
    }
    if (units.includes('tblsp')) {
        return convert(value).from('Tbs').to('ml');
    }
    return 20;
};
const getIngredients = (data) => {
    const keys = Object.keys(data);
    const ingredients = [];
    for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = data[key];
        const keyIndex = key
            ? Number(key.replace(/[a-zA-Z]+/g, '')) - 1
            : -1;
        if (key.includes('Ingredient')) {
            ingredients[keyIndex] = Object.assign(Object.assign({}, ingredients[keyIndex]), { name: value });
        }
        if (key.includes('Measure')) {
            const units = value && value.replace(/[^a-zA-Z]+/g, '');
            // fc allows us to interpret measures like 1 1/4
            const fraction = value && (0, fraction_calculator_1.default)(value.replace(/[a-zA-Z]+/g, ''));
            const milliliters = units
                ? getMilliliters(units, fraction && fraction.toNumber())
                : 20;
            ingredients[keyIndex] = Object.assign(Object.assign({}, ingredients[keyIndex]), { measure: value, milliliters });
        }
    }
    return ingredients;
};
const getMillilitersAlcohol = (ingredients, ingredientsDetails) => {
    var _a;
    let millilitersAlcohol = 0;
    for (var i = 0; i < ingredients.length; i++) {
        const details = ingredientsDetails[i] &&
            ((_a = ingredientsDetails[i]) === null || _a === void 0 ? void 0 : _a.ingredients) &&
            ingredientsDetails[i].ingredients[0];
        const strAlcohol = details === null || details === void 0 ? void 0 : details.strAlcohol;
        if (strAlcohol === 'Yes') {
            const ABV = (details === null || details === void 0 ? void 0 : details.strABV) ? details.strABV / 100 : 0.2;
            millilitersAlcohol += ingredients[i].milliliters * ABV;
            console.log(details === null || details === void 0 ? void 0 : details.strIngredient, ABV, ingredients[i].milliliters, millilitersAlcohol);
        }
    }
    return millilitersAlcohol;
};
class DRINKS_API extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
    }
    getDrinksList() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.get(`search.php`, {
                f: 'a'
            });
            return data.drinks;
        });
    }
    getDrinkDetails(drinkId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.get(`lookup.php`, {
                i: drinkId
            });
            const ingredients = getIngredients(data.drinks[0]);
            const ingredientsDetails = yield Promise.all(ingredients.map((ingredient) => {
                return this.get(`search.php`, { i: ingredient.name });
            }));
            const millilitersAlcohol = getMillilitersAlcohol(ingredients, ingredientsDetails);
            const drink = Object.assign(Object.assign({}, data.drinks[0]), { ingredients: getIngredients(data.drinks[0]), millilitersAlcohol });
            return drink;
        });
    }
}
exports.default = DRINKS_API;
