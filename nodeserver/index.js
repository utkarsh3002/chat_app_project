// const io=require('socket.io')(8000);
const express = require("express")
var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});


const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        // console.log("new user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })
    
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })

})