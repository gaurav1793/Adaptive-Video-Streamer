import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import { FFMPEGPATH } from '../config/Server.config';
import { createMovie, updateMovieStatus } from '../repositories/movie.repository';
ffmpeg.setFfmpegPath(FFMPEGPATH!);

interface Resolution{
    width:number,
    height:number,
    bitRate:number
}

const resolutions:Resolution[]=[
    {width:1920 , height:1080 , bitRate:2000}, //1080
    {width:1280 , height:720 , bitRate:1000}, //720

    {width:640 , height:360 , bitRate:400}, //360

    {width:256 , height:144 , bitRate:200}, //144
]

interface videoProcessInterface{
    (
    inputPath:string,
    outputPath:string,
    callback:(error:Error|null , masterPlayList?:string)=>void
    ):void
}

export const processVideoForHLS:videoProcessInterface =(inputPath,outputPath,callback)=>{

    createMovie(outputPath);
    let calledCallback = false;

    fs.mkdirSync(outputPath,{recursive:true}); //create the output directory
    const masterPlayList = `${outputPath}/master.m3u8`  //path to master playlist file
    fs.writeFileSync(masterPlayList, '#EXTM3U\n');
    // const masterContent:string[]=[];
    // let countProcessing:number=0;

    resolutions.forEach((resolution)=>{
        const variantOutput = `${outputPath}/${resolution.height}p`;
        const variantPlaylist = `${variantOutput}/playlist.m3u8`;
        fs.mkdirSync(variantOutput,{recursive:true}); //create variant directory

        ffmpeg(inputPath).outputOption([
            `-vf scale=w=${resolution.width}:h=${resolution.height}`,
            `-b:v ${resolution.bitRate}k`,
            '-codec:v libx264',
            '-codec:a aac',
            '-hls_time 45',
            '-hls_playlist_type vod',
            `-hls_segment_filename ${variantOutput}/segment%03d.ts`
        ])
        .output(variantPlaylist)
        .on('end',()=>{
            let content:string=`#EXT-X-STREAM-INF:BANDWIDTH=${resolution.bitRate*1000},RESOLUTION=${resolution.width}x${resolution.height}\n${resolution.height}p/playlist.m3u8`
            console.log('processing complete');
            console.log(content)
            fs.appendFileSync(masterPlayList,content);
            if (resolution.height === 144 && !calledCallback) {
                calledCallback = true;
                updateMovieStatus(outputPath,'COMPLETED')
                callback(null, masterPlayList);
            }
            if (resolution.height === 1080 ) {
                fs.unlink(outputPath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    } else {
                        console.log("File deleted successfully");
                    }
                })
            }
            // countProcessing+=1;
            // if(countProcessing === resolutions.length){
            //     console.log('processing complete');
            //     console.log(masterContent)
            //     fs.writeFileSync(masterPlayList,`#EXTM3U\n${masterContent.join('\n')}`);

            //     updateMovieStatus(outputPath,'COMPLETED')
            //     callback(null,masterPlayList)
            // }
        })
        .on('error',(error)=>{
            console.log('an error occured',error.message);
            callback(error);
        })
        .run();
    })
}