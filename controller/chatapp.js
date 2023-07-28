const User=require('../models/user');
const Message=require('../models/chat');
const Group=require('../models/group')
const {Op}=require('sequelize')

const postMesage=async (req,res,next)=>{
    const {message,groupId}=req.body;
    console.log(message,groupId);
    try {
       await Message.create({
        message,name:req.user.name,userId:req.user.id,groupId,text:'text'
    });
     const newMessage={message,name:req.user.name,userId:req.user.id}
    res.status(200).json({newMessage,msg:'successfull sent',success:true})
        
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({error})
    }
}

const getMessages=async(req,res,next)=>{
        const groupId=req.params.groupId;
        console.log('>>>>groupid',groupId);
   try {
         const data=await Message.findAll({where:{groupId}});
         const group=await Group.findOne({where : {id:groupId}})
         console.log(data);
         res.status(202).json({allGroupMessages:data,success:true})
   } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({msg:'Something wrong Unable to get the Chat',error})
   }

}


const setIntervalgetmessages=async (req,res,next)=>{
    const msgId = req.query.lastmessageid;
    const groupId=req.params.groupId;
    console.log(msgId,groupId);
    try {
        const data=await Message.findAll({
            where:{groupId,
                id:{
                    [Op.gt]:msgId
                }
            }
        });
        res.status(202).json({allMessages:data,success:true})
        
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({error})
    }
}

module.exports={postMesage,getMessages,setIntervalgetmessages}