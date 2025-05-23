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
exports.getStatusController = exports.uploadVideoController = void 0;
const video_services_1 = require("../services/video.services");
const movie_repository_1 = require("../repositories/movie.repository");
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
    });
    res.status(200).json({
        success: true,
        message: 'video processed succesfully',
        data: outputPath,
    });
});
exports.uploadVideoController = uploadVideoController;
const getStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const response = yield (0, movie_repository_1.findStatus)(`output/${id}`);
        console.log(response);
        res.status(200).json({
            data: response,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: `something went wrong${error}`,
        });
        return;
    }
});
exports.getStatusController = getStatusController;
