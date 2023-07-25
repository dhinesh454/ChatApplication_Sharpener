const User=require('../models/user');
const Message=require('../models/chatapp');
const {Op}=require('sequelize')

const postMesage=async (req,res,next)=>{
    const {message}=req.body;
    try {
        const data=await Message.create({message,name:req.user.name,userId:req.user.id});
        res.status(200).json({newMessage:data,name:req.user.name,success:true});
        
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({error})
    }
}

const getMessages=async(req,res,next)=>{
        const msgId=req.query.lastmessageid;
        console.log('>>>>msgid',msgId);
   try {
         const data=await Message.findAll({
            where:{
                id:{
            [Op.gt]:msgId
        }
    }
});
         console.log(data);
         res.status(202).json({allMessages:data,success:true})
   } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({error})
   }

}

module.exports={postMesage,getMessages}