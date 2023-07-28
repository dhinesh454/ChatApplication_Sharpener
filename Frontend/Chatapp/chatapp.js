



//domcontent

window.addEventListener('DOMContentLoaded',async()=>{
    dispalyGroupLeft();
    loadchats();
  
})






function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}







///createnewgroup
async function createNewGroup(){
  const groupname=prompt("Enter the name Of group:")
try {
  if(groupname){
    const token=localStorage.getItem('token');
    const res=await axios.post('http://localhost:3000/groups',{groupname},{headers:{"Authorization":token}})
    console.log(res.data.msg);
    showMessageDiv(res.data.msg);
    dispalyGroupLeft();
  }
  
  if(groupname==null){
    console.log('no groupcreated')
    showMessageDiv('no groupcreated')
  }
} catch (error) {
  console.log(error);
  showMessageDiv(error.response.data.msg) 
}
}





function showMessageDiv(msg){
    let parentNode=document.getElementById('messageDiv');
    parentNode.innerHTML=`<p>${msg}</p>`
   
    setTimeout(()=>{
        parentNode.innerHTML='';
    },3000)

}






async function getAllgroups(){
  try {
    const token =localStorage.getItem('token');
    const res=await axios.get('http://localhost:3000/groups',{headers:{"Authorization":token}})
    return res.data.groups;
  } catch (error) {
    document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                   <h3>${error}</h3>
                              </div>`
  }
}





async function dispalyGroupLeft(){
  try {
          const userId=parseJwt(localStorage.getItem('token')).userId;
          const groups=await getAllgroups();
          console.log(groups);
          let ul=document.createElement('ul')
          for(let i in groups){
                let li =document.createElement('li');
                li.setAttribute('groupId',groups[i].id);
                li.setAttribute('createdBy',groups[i].createdBy);
                if(groups[i].createdBy===userId) console.log(true);
                li.textContent=groups[i].groupname;
                if(groups[i].createdBy===userId){

                  let addButton=document.createElement('button');
                  addButton.className="btn-same";
                  addButton.textContent="Add";
                  addButton.addEventListener('click',addMembers);
            
                  let delButton=document.createElement('button');
                  delButton.textContent="Remove";
                  delButton.className="btn-same";
                  delButton.addEventListener('click',RemoveMember);
            
                  let adminButton=document.createElement('button');
                  adminButton.className="btn-same"
                  adminButton.textContent="ChangeAdmin";
                  adminButton.addEventListener('click',changeAdmin)
            
            
                  let delGroupButton=document.createElement('button');
                  delGroupButton.className="btn-same";
                  delGroupButton.textContent="Delete";
                  delGroupButton.addEventListener('click',removeGroup)

                  li.appendChild(addButton);
                  li.appendChild(delButton);
                  li.appendChild(adminButton);
                  li.appendChild(delGroupButton);
      
                }
                   
                  let openChatbutton=document.createElement('button');
                  openChatbutton.className='btn-same'
                  openChatbutton.textContent="Openchat";
                  openChatbutton.addEventListener('click',groupchatpage)
                  li.appendChild(openChatbutton);
                  ul.appendChild(li);

          


                
              }      
                document.getElementById('allgrouplist').innerHTML='';
                document.getElementById('allgrouplist').appendChild(ul);
    
  } catch (error) {
    document.body.innerHTML+=`<div style="color: red;text-align: center;">
                              <h3>${error}</h3>
                              </div>`
  }

}







async function addMembers(e){
  e.preventDefault();
  const memberEmail=prompt('Enter Member Email')
  try {
    let data={
      groupid:e.target.parentElement.getAttribute('groupId'),
      memberEmail
    }
    if(memberEmail){
      let token=localStorage.getItem('token');
      const res=await axios.post('http://localhost:3000/groups/addmembers',data,{headers:{"Authorization":token}})
      showMessageDiv(res.data.msg)
    }
    else{
      console.log("no memeber");
      showMessageDiv('Please Enter Email Try again !!')
    }
    
  } catch (error) {
    console.log(error);
    showMessageDiv(error.response.data.msg)
  }
}








async function RemoveMember(e){
  e.preventDefault();
  const memberEmail=prompt('Enter Member Email You want to remove')
  try {
    let data={
      groupid:e.target.parentElement.getAttribute('groupId'),
      memberEmail
    }
    if(memberEmail){
      let token=localStorage.getItem('token');
      const res=await axios.post('http://localhost:3000/groups/removemembers',data,{headers:{"Authorization":token}})
      showMessageDiv(res.data.msg)
    }
    else{
      console.log("no memeber");
      showMessageDiv('Please Enter Email Try again !!')
    }
    
  } catch (error) {
    console.log(error);
    showMessageDiv(error.response.data.msg)
  }

}







async function changeAdmin(e){
  e.preventDefault();
  const memberEmail=prompt('Enter Member Email You want to remove')
  try {
    let data={
      groupid:e.target.parentElement.getAttribute('groupId'),
      memberEmail
    }
    if(memberEmail){
      let token=localStorage.getItem('token');
      const res=await axios.patch('http://localhost:3000/groups/changeAdmin',data,{headers:{"Authorization":token}})
      showMessageDiv(res.data.msg)
      dispalyGroupLeft();
    }
    else{
      console.log("no memeber");
      showMessageDiv('Please Enter Email Try again !!')
    }
    
  } catch (error) {
    console.log(error);
    showMessageDiv(error.response.data.msg)
  }
}






async function removeGroup(e){
  e.preventDefault();
  try {

      const groupid=e.target.parentElement.getAttribute('groupId');
  
      let token=localStorage.getItem('token');
      const res=await axios.delete(`http://localhost:3000/groups/deletegroup/${groupid}`,{headers:{"Authorization":token}})
      showMessageDiv(res.data.msg)
      dispalyGroupLeft();
    
  } catch (error) {
    console.log(error);
    showMessageDiv(error.response.data.msg)
  }
}







async function groupchatpage(e){
  e.preventDefault();
  let groupId=e.target.parentElement.getAttribute('groupId');
  document.getElementById('chat-messages').style.visibility="visible";
  document.getElementById('user-input').style.visibility='visible';
  localStorage.setItem('currentGroupId',groupId);
  loadchats();

}






async function loadchats(){
  const token = localStorage.getItem('token');
  const groupId=localStorage.getItem('currentGroupId');
try {
    const res=await axios.get(`http://localhost:3000/chat/${groupId}`,{headers:{"Authorization":token}}); 
    console.log(res.data.allGroupMessages);
    displayChats(res.data.allGroupMessages);

} catch (error) {
    console.log(error);
    showMessageDiv(error.response.data.msg)
  
}

}






async function displayChats(allgroupchats){
  try {
    const token = localStorage.getItem('token');
    const currentUser = parseJwt(token);
    const chats = document.getElementById('chat-messages');
    chats.innerHTML = '';
    
    console.log(allgroupchats);
    
    for (const chat of allgroupchats) {
      const newPara = document.createElement('li');
      if (chat.userId === currentUser.userId) {
        newPara.innerText = `You: ${chat.message}`;
      } else {
        newPara.innerText = `${chat.name}: ${chat.message}`;
      }
      chats.appendChild(newPara);
    }
    
    
  } catch (error) {
    console.log(error);
    showMessageDiv(error.response.data.msg)
  }
}





async function userMessagestore(event){
  event.preventDefault();
  try {
    const msg=document.getElementById('message-input').value;
    document.getElementById('message-input').value='';
    const token = localStorage.getItem('token');
    const groupId=localStorage.getItem('currentGroupId');
    const data={message:msg,groupId}
    const res=await axios.post(`http://localhost:3000/chat/sendmessage`,data,{headers:{"Authorization":token}}); 
     console.log(res.data.newMessage);
    showpostmsg(res.data.newMessage);
 
    
  } catch (error) {
    console.log(error);

  }
}





function showpostmsg(newMsg){
  console.log(newMsg);
  const token = localStorage.getItem('token');
  const  currentUser=parseJwt(token);
  const chats=document.getElementById('chat-messages');
  const newPara = document.createElement('li');
  if (newMsg.userId === currentUser.userId) {
    newPara.innerText = `You: ${newMsg.message}`;
  } else {
    newPara.innerText = `${newMsg.name}: ${newMsg.message}`;
  }
  chats.appendChild(newPara);
}
 





async function setintervalgroupmsg(){
    let concatedArray;
    const token=localStorage.getItem('token');
    const groupId=localStorage.getItem('currentGroupId');
    let message=JSON.parse(localStorage.getItem(`AllGroupMessages-${groupId}`));
    console.log(message);
    if(message==null||message.length==0||message==undefined) lastmessageid=0;
    else lastmessageid=message[message.length-1].id

  try {
    const res=await axios.get(`http://localhost:3000/chat/getmessages/${groupId}?lastmessageid=${lastmessageid}`,{headers:{"Authorization":token}});
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
      localStorage.setItem(`AllGroupMessages-${groupId}`,localstorageMessage);

      displayChats(concatedArray);
     
    }

    
  } catch (error) {
    document.body.innerHTML+=`<div style="color: red;text-align: center;">
                                    <h3>${error}</h3>
                              </div>`
  }
}


setInterval(setintervalgroupmsg,1000);



