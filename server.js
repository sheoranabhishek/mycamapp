const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
var http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);


const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server , {
    debug:true
})
app.use('/peerjs' , peerServer);
app.set('view engine' , 'ejs');
app.use(express.static('public'));


app.get('/' , (req , res)=>{
    res.redirect(`/${uuidv4()}`);
})  

app.get('/:room' , (req , res)=>{
    res.render('room' , {roomID: req.params.room});
})

io.on('connection' , socket => {
    //now the user will join the room 
    socket.on('join-room' , (roomId , userId)=> {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected' , userId);
        console.log("Hey we have joined the room ");
    })

    //now getting the room id..
})




server.listen(3000 , ()=>{
    console.log("Server started at 3000");
});
