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
exports.uploadVideoController = void 0;
const video_services_1 = require("../services/video.services");
const fs_1 = __importDefault(require("fs"));
const uploadVideoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside controler", req.file);
    if (!req.file) {
        res.status(400).json({
            message: 'no file is uploaded'
        });
        return;
    }
    const videoPath = req.file.path;
    const outputPath = `output/${Date.now()}`;
    (0, video_services_1.processVideoForHLS)(videoPath, outputPath, (err, _masterPlayList) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "An error occured while processing the video",
            });
            return;
        }
        console.log("hi from controller", videoPath);
        fs_1.default.unlink(videoPath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
            else {
                console.log("File deleted successfully");
            }
        });
    });
    res.status(200).json({
        success: true,
        message: 'video processed succesfully',
    });
});
exports.uploadVideoController = uploadVideoController;
