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
const types_1 = __importDefault(require("./types"));
const apolloServer_1 = __importDefault(require("./apolloServer"));
const resolvers_1 = __importDefault(require("./resolvers"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const URL = process.env.DB_URL || 'mongodb://localhost:27017/test';
    yield mongoose_1.default.connect(URL);
    (0, apolloServer_1.default)(types_1.default, resolvers_1.default);
});
startServer();
