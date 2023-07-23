const express= require('express');
const routes=express.Router();

const userControlller=require('../controller/user')

routes.post('/signup',userControlller.postSignup);
routes.post('/login',userControlller.postLogin);





module.exports=routes;