import express,{Request,Response} from 'express'
import upload from '../../middlewares/multer.middleware';
import { getStatusController, uploadVideoController } from '../../controllers/video.controllers';

const videoRouter = express.Router();

videoRouter.post('/upload',upload.single('video'),uploadVideoController)
videoRouter.get('/check:id',upload.none(),getStatusController);

export default videoRouter;