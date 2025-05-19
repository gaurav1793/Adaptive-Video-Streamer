import { Request, Response } from "express";
import { processVideoForHLS } from "../services/video.services";
import fs from 'fs'
import { findStatus } from "../repositories/movie.repository";



export const uploadVideoController = async(req:Request,res :Response)=>{
    console.log("inside controler",req.file)
    if(!req.file){
        res.status(400).json({
            message:'no file is uploaded'
        })
        return;
    }
    const videoPath = req.file.path;
    const outputPath =`output/${Date.now()}`;

    processVideoForHLS(videoPath,outputPath,(err,_masterPlayList)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:"An error occured while processing the video",
            })
            return;
        }

        console.log("hi from controller",videoPath);
    })
    res.status(200).json({
        success:true,
        message:'video processed succesfully',
        data:outputPath,
    })
}



export const getStatusController = async(req:Request,res :Response): Promise<void>=>{
    const id = req.params.id;
    try {
        const response = await findStatus(`output/${id}`);
        console.log(response);
         res.status(200).json({
            data:response,
        })
        return;
    } catch (error) {
        console.log(error);
         res.status(400).json({
            message:`something went wrong${error}`,
        })
        return;
    }
    
}