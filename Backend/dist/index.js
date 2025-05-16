"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/ping", (_req, res) => {
    res.status(200).json({
        message: "pong bhai hai kya"
    });
});
app.listen(3000, () => {
    console.log("server started at 3000");
});
