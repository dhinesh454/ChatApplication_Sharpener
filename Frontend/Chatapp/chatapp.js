async function userMessage(event){
    event.preventDefault();
 try {
       const token=localStorage.getItem('token')
       const message={
           message:document.getElementById('message-input').value
       }
       const res=await axios.post('http://localhost:3000/user/sendmessage',message,{headers:{"Authorization":token}})
       console.log(res);

       if(res.status===200){
        console.log(res.data.newMessage);
        showMessageonscreen(res.data.newMessage,res.data.name);

       }

 } catch (error) {
   document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                    <h3>${error}</h3>
                              </div>` 

 }


};


function showMessageonscreen(msg,name){
    console.log(msg,name);
    const parentNode=document.getElementById('chat-messages');
    const chilNode=`<li>${name}:${msg.message}</li>`
    parentNode.innerHTML+=chilNode;
};



//domcontent

window.addEventListener('DOMContentLoaded',async()=>{
  const token=localStorage.getItem('token');
  try {
    const res=await axios.get('http://localhost:3000/user/getmessages',{headers:{"Authorization":token}});
    console.log(res.data.allMessages);
    const messages=res.data.allMessages
    if(res.status===202){
    for(let i in messages){
        showMessageonscreen(messages[i],res.data.name)
    }
    }

    
  } catch (error) {
    document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                    <h3>${error}</h3>
                              </div>`
  }
})
