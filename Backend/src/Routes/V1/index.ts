import express, { Request ,Response } from 'express'
import videoRouter from './video.routes';

const v1router =express.Router();


v1router.use('/videos',videoRouter);

v1router.get('/ping',(_req:Request,res:Response)=>{
    res.status(200).json({
        message:"kya baat ho gyi bhai"
    })
})


export default v1router;