//showing the video on the client side !
const socket = io('/');

const videoGrid = document.getElementById("video-grid");

const peer = new Peer( undefined , {
    path: '/peerjs' , 
    host: '/',
    port: '3000'
}); 

let myVideoStream;
const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo , stream );
    
    peer.on('call' , call => {
        console.log("Here2!" )
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream' , userVideoStream =>{
            console.log("here!")
            addVideoStream(video , userVideoStream);
        })
    } )

    socket.on('user-connected' , (userId)=>
    {
        connectToNewUser(userId , stream);
    })

 } )


 peer.on( 'open' , id => {
     console.log(id);
     socket.emit('join-room' , ROOM_ID , id);
 } )



const connectToNewUser = (userId , stream) => {
    //calling the other user 
    console.log("User id : " , userId , " Joined !");
    const call = peer.call(userId , stream);
    const video = document.createElement('video');
    call.on ('stream' , userVideoStream => {
        addVideoStream(video , userVideoStream)
    })
}

const addVideoStream = (video , stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata' , ()=>{
        video.play();
    })
    videoGrid.append(video);
}

