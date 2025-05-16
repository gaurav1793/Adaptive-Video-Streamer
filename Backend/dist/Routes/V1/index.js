"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1router = express_1.default.Router();
v1router.get('/ping', (_req, res) => {
    res.status(200).json({
        message: "kya baat ho gyi bhai"
    });
});
exports.default = v1router;
