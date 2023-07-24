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
        showMessageonscreen(res.data);

       }

 } catch (error) {
    document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                    <h3>${error}</h3>
                              </div>`

 }


};


function showMessageonscreen(user){
    console.log(user.newMessage.message,user.name);
    const parentNode=document.getElementById('chat-messages');
    const chilNode=`<li>${user.name}:${user.newMessage.message}</li>`
    parentNode.innerHTML+=chilNode;
}
