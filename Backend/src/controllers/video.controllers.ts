import { Request, Response } from "express";
import { processVideoForHLS } from "../services/video.services";
import fs from 'fs'



export const uploadVideoController = async(req:Request,res :Response)=>{
    if(!req.file){
        res.status(400).json({
            message:'no file is uploaded'
        })
        return;
    }
    const videoPath = req.file.path;
    const outputPath =`output/${Date.now()}`;

    processVideoForHLS(videoPath,outputPath,(err,masterPlayList)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:"An error occured while processing the video",
            })
            return;
        }


        fs.unlink(videoPath,(err)=>{
            console.log("An error occured while deleting video",err)
        })
        res.status(200).json({
        success:true,
        message:'video processed succesfully',
        data: `/${masterPlayList}`
    })
    })
}