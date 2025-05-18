"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_middleware_1 = __importDefault(require("../../middlewares/multer.middleware"));
const video_controllers_1 = require("../../controllers/video.controllers");
const videoRouter = express_1.default.Router();
videoRouter.post('/upload', multer_middleware_1.default.single('video'), video_controllers_1.uploadVideoController);
videoRouter.get('/check:id', multer_middleware_1.default.none(), video_controllers_1.getStatusController);
exports.default = videoRouter;
