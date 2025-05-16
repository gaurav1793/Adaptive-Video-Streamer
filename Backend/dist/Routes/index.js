"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const V1_1 = __importDefault(require("./V1"));
const apirouter = express_1.default.Router();
apirouter.use('/v1', V1_1.default);
exports.default = apirouter;
