"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processVideoForHLS = void 0;
const fs_1 = __importDefault(require("fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const Server_config_1 = require("../config/Server.config");
fluent_ffmpeg_1.default.setFfmpegPath(Server_config_1.FFMPEGPATH);
const resolutions = [
    { width: 1920, height: 1080, bitRate: 2000 }, //1080
    { width: 1280, height: 720, bitRate: 1000 }, //720
    { width: 854, height: 480, bitRate: 500 }, //480
    { width: 640, height: 360, bitRate: 400 }, //360
    { width: 426, height: 240, bitRate: 300 }, //240
    { width: 256, height: 144, bitRate: 200 }, //144
];
const processVideoForHLS = (inputPath, outputPath, callback) => {
    fs_1.default.mkdirSync(outputPath, { recursive: true }); //create the output directory
    const masterPlayList = `${outputPath}/master.m3u8`; //path to master playlist file
    const masterContent = [];
    let countProcessing = 0;
    resolutions.forEach((resolution) => {
        const variantOutput = `${outputPath}/${resolution.height}p`;
        const variantPlaylist = `${variantOutput}/playlist.m3u8`;
        fs_1.default.mkdirSync(variantOutput, { recursive: true }); //create variant directory
        (0, fluent_ffmpeg_1.default)(inputPath).outputOption([
            `-vf scale=w=${resolution.width}:h=${resolution.height}`,
            `-b:v ${resolution.bitRate}k`,
            '-codec:v libx264',
            '-codec:a aac',
            '-hls_time 10',
            '-hls_playlist_type vod',
            `-hls_segment_filename ${variantOutput}/segment%03d.ts`
        ])
            .output(variantPlaylist)
            .on('end', () => {
            masterContent.push(`#EXT-X-STREAM-INF:BANDWIDTH=${resolution.bitRate * 1000},
                RESOLUTION=${resolution.width}x${resolution.height}
                \n${resolution.height}p/playlist.m3u8`);
            countProcessing += 1;
            if (countProcessing === resolutions.length) {
                console.log('processing complete');
                console.log(masterContent);
                fs_1.default.writeFileSync(masterPlayList, `#EXTM3U\n${masterContent.join('\n')}`);
                callback(null, masterPlayList);
            }
        })
            .on('error', (error) => {
            console.log('an error occured', error.message);
            callback(error);
        })
            .run();
    });
};
exports.processVideoForHLS = processVideoForHLS;
