const socket =io('http://localhost:8000');


const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');

const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

})
const name=prompt("Enter your name to join");
if(name!=null){
    socket.emit('new-user-joined',name);
}

    socket.on('leave',name=>{
        if(name!=null){
        append(`${name} left the chat`,'left');
        }
    })  


// socket.on('leave',name=>{
//     append(`${name} left the chat`,'left');
// })

socket.on('user-joined',name=>{
    append(`${name} joined chat room`,'right');
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
// socket.on('leave',name=>{
//     append(`${name} left the chat`,'left');
// })



