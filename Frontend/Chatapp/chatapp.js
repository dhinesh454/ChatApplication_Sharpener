async function userMessagestore(event){
    console.log('');
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
        showMessageonscreen(res.data.newMessage);

       }

 } catch (error) {
   document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                    <h3>${error}</h3>
                              </div>` 

 }


};



async function userMessage(allMessages){
    const parentNode=document.getElementById('chat-messages');
    parentNode.innerHTML='';
    console.log(allMessages);
    for(i in allMessages){
        showMessageonscreen(allMessages[i])
    }

}


function showMessageonscreen(user){

    const parentNode=document.getElementById('chat-messages');
    const chilNode=`<li>${user.name}:${user.message}</li>`
    parentNode.innerHTML+=chilNode;
};



//domcontent

window.addEventListener('DOMContentLoaded',async()=>{
  
    let concatedArray;
    const token=localStorage.getItem('token');
    let message=JSON.parse(localStorage.getItem('Allmessages'));
    console.log(message);
    if(message==null||message.length==0||message==undefined) lastmessageid=0;
    else lastmessageid=message[message.length-1].id

  try {
    const res=await axios.get(`http://localhost:3000/user/getmessages?lastmessageid=${lastmessageid}`,{headers:{"Authorization":token}});
    console.log(res.data.allMessages);
   
    if(res.status===202){
       const backendArray=res.data.allMessages;
      if(message==null||message==undefined||message.length==0){
        concatedArray=[...backendArray]
        console.log(concatedArray);
      }
      else{
        concatedArray=message.concat(backendArray)
        console.log(concatedArray);
      }

      if(concatedArray.length>10){
        concatedArray=concatedArray.slice(concatedArray.length-10)
      }
      console.log(concatedArray);

      const localstorageMessage=JSON.stringify(concatedArray);
      localStorage.setItem('Allmessages',localstorageMessage);

      userMessage(concatedArray);
     
    }

    
  } catch (error) {
    document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                    <h3>${error}</h3>
                              </div>`
  }
})

// async function callApi(){
//     const token=localStorage.getItem('token');
//     try {
//       const res=await axios.get('http://localhost:3000/user/getmessages',{headers:{"Authorization":token}});
//       console.log(res.data.allMessages);
//       if(res.status===202){
//           userMessage(res.data.allMessages)
//       }
  
      
//     } catch (error) {
//       document.body.innerHTML+=`<div style="color: red;text-align: center;">
//                                       <h3>${error}</h3>
//                                 </div>`
//     }

// }

// setInterval(callApi,1000);
