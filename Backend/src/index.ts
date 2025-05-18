import express,{Express} from 'express'
import { PORT } from './config/Server.config';
import apirouter from './Routes';
import cors from 'cors';
import path from 'path'

const app:Express = express();

app.use(cors());
app.use('/api',apirouter);
console.log(path.join(__dirname,'../output'));
app.use('/output',express.static(path.join(__dirname,'../output')))

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})


