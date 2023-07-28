const express= require('express');
const routes=express.Router();

const userAuthenticate=require('../middleware/authentication')
const Userchat=require('../controller/chatapp')


routes.post('/sendmessage',userAuthenticate.authenticate,Userchat.postMesage);
routes.get('/:groupId',userAuthenticate.authenticate,Userchat.getMessages);
routes.get('/getmessages/:groupId',userAuthenticate.authenticate,Userchat.setIntervalgetmessages)






module.exports=routes;