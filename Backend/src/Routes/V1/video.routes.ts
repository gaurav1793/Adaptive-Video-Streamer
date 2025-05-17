import express,{Request,Response} from 'express'
import upload from '../../middlewares/multer.middleware';
import { uploadVideoController } from '../../controllers/video.controllers';

const videoRouter = express.Router();

videoRouter.post('/upload',upload.single('video'),uploadVideoController)


export default videoRouter;