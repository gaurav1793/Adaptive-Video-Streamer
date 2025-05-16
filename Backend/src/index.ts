import express,{Express,Request,Response} from 'express'

const app:Express = express();

app.get("/ping",(_req:Request,res:Response)=>{
    res.status(200).json({
        message:"pong bhai hai kya"
    })
})

app.listen(3000,()=>{
    console.log("server started at 3000");
})