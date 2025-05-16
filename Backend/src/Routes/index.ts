import express from 'express'
import v1router from './V1';

const apirouter =express.Router();

apirouter.use('/v1',v1router);




export default apirouter;



