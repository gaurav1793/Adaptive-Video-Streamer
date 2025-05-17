"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFMPEGPATH = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.FFMPEGPATH = process.env.FFMPEGPATH;
if (!exports.FFMPEGPATH) {
    throw new Error('FFMPEGPATH is not set in environment variables');
}
