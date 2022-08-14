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
Object.defineProperty(exports, "__esModule", { value: true });
const Patron_1 = require("./models/Patron");
const maxAlcoholLevel = 100;
const getAlcoholLevel = (patron) => {
    const timeNow = new Date().getTime();
    let level = 0;
    for (var i = 0; i < (patron === null || patron === void 0 ? void 0 : patron.drinks.length); i++) {
        const timeDiffHours = (timeNow - Number(patron.drinks[i].time)) / 3.6e6;
        const ml = patron.drinks[i].millilitersAlcohol;
        const mlNow = Math.max(ml - (ml / 3) * timeDiffHours, 0);
        level += mlNow;
    }
    level = (level / Number(patron === null || patron === void 0 ? void 0 : patron.weight)) * 50;
    console.log({ level });
    return Math.min(level, maxAlcoholLevel);
};
const resolvers = {
    Query: {
        drinks: (_, variables, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dataSources.DRINKS_API.getDrinksList();
        }),
        drink: (_, { drinkId }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dataSources.DRINKS_API.getDrinkDetails(drinkId);
        }),
        patrons: (_, variables, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const patrons = yield Patron_1.Patron.find();
            return patrons.map((patron) => ({
                id: patron.id,
                name: patron.name,
                weight: patron.weight,
                drinks: patron.drinks,
                alcoholLevel: getAlcoholLevel(patron)
            }));
        })
    },
    Mutation: {
        createPatron: (_, { name, weight }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const patron = new Patron_1.Patron({ name, weight });
            return yield patron.save();
        }),
        removePatron: (_, { patronId }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Patron_1.Patron.findOne({ _id: patronId }).remove().exec();
        }),
        addDrink: (_, { patronId, drinkId }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const patron = yield Patron_1.Patron.findOne({ _id: patronId }).exec();
            const drinkDetails = yield dataSources.DRINKS_API.getDrinkDetails(drinkId);
            if (patron && drinkDetails) {
                patron.drinks.push({
                    drinkId,
                    time: new Date().getTime().toString(),
                    millilitersAlcohol: drinkDetails.millilitersAlcohol
                });
                return yield patron.save();
            }
        })
    }
};
exports.default = resolvers;
