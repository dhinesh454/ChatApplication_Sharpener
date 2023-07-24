const express= require('express');
const routes=express.Router();


const userControlller=require('../controller/user');
const userAuthenticate=require('../middleware/authentication')
const Userchat=require('../controller/chatapp')

routes.post('/signup',userControlller.postSignup);
routes.post('/login',userControlller.postLogin);
routes.post('/sendmessage',userAuthenticate.authenticate,Userchat.postMesage)




module.exports=routes;