module.exports = (io) => {

io.on("connection", (socket) => {

console.log(" User connected:", socket.id)

// join room
socket.on("join-room", (roomId) => {

socket.join(roomId)

console.log(`User ${socket.id} joined ${roomId}`)

})


// OFFER → forward to other peer
socket.on("offer", ({ roomId, offer }) => {

console.log(" Offer received")

socket.to(roomId).emit("offer", offer)

})


// ANSWER → forward to offer sender
socket.on("answer", ({ roomId, answer }) => {

console.log(" Answer received")

socket.to(roomId).emit("answer", answer)

})


// ICE candidate exchange
socket.on("ice-candidate", ({ roomId, candidate }) => {

if(candidate){

socket.to(roomId).emit("ice-candidate", candidate)

}

})


// disconnect
socket.on("disconnect", () => {

console.log("User disconnected:", socket.id)

})

})

}