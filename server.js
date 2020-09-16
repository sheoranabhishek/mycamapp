const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

const { v4: uuidV4 } = require('uuid')

app.use('/peerjs' , peerServer);
app.set('view engine' , 'ejs');
app.use(express.static('public'));


app.get('/' , (req , res)=>{
    res.redirect(`/${uuidV4()}`);
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



server.listen(process.env.PORT||3000 , ()=> {
    console.log("Connected to 3000");
})
