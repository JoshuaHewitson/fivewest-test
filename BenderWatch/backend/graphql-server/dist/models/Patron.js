"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patron = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const patronSchema = new mongoose_1.default.Schema({
    name: String,
    weight: Number,
    drinkIds: [String]
});
exports.Patron = mongoose_1.default.model('Patron', patronSchema);
