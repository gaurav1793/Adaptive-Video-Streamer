import express,{Express} from 'express'
import { PORT } from './config/Server.config';
import apirouter from './Routes';
import cors from 'cors'

const app:Express = express();

app.use(cors());
app.use('/api',apirouter);


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})