const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors')


require('dotenv').config()



const sequelize=require('./utils/database');
const userRoutes=require('./routes/user');
const chatRoutes=require('./routes/chat');
const groupRoutes=require('./routes/group')
const User=require('./models/user');
const Message=require('./models/chat');
const Group=require('./models/group');
const UserGroup=require('./models/usergroup');








app.use(cors());
app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/chat',chatRoutes);
app.use(groupRoutes);








// //relationship
User.hasMany(Message);
Message.belongsTo(User);



Group.belongsToMany(User,{through:UserGroup});
User.belongsToMany(Group,{through:UserGroup})

Group.hasMany(Message);
Message.belongsTo(Group);


sequelize.sync()
.then((res)=>{
    app.listen(process.env.PORT,()=>console.log('Server starts....'))
})
.catch(err=>console.log(err));












