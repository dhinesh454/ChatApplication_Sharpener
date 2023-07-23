const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors')


require('dotenv').config()



const sequelize=require('./utils/database');
const userRoutes=require('./routes/user');







app.use(cors());
app.use(bodyParser.json());


app.use('/user',userRoutes)


sequelize.sync()
.then((res)=>{
    app.listen(3000,()=>console.log('Server starts....'))
})
.catch(err=>console.log(err));
