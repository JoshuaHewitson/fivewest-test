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
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const DRINKS_API_1 = __importDefault(require("./DRINKS_API"));
const startApolloServer = (typeDefs, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        dataSources: () => {
            return {
                DRINKS_API: new DRINKS_API_1.default()
            };
        }
    });
    yield server.start();
    server.applyMiddleware({
        app
    });
    const PORT = process.env.PORT || 8080;
    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
    });
});
exports.default = startApolloServer;
