import { useRef } from "react"
import socket from "../services/socketService"

export default function useWebRTC(roomId){

const peerRef = useRef(null)

const createPeer = () => {

peerRef.current = new RTCPeerConnection({

iceServers:[
{urls:"stun:stun.l.google.com:19302"},
{urls:"stun:stun1.l.google.com:19302"},
{urls:"stun:stun2.l.google.com:19302"},
{urls:"stun:stun3.l.google.com:19302"}
]

})

peerRef.current.onicecandidate = (event)=>{

if(event.candidate){

socket.emit("ice-candidate",{
roomId,
candidate:event.candidate
})

}

}

peerRef.current.onconnectionstatechange = ()=>{

console.log("Peer state:",peerRef.current.connectionState)

}

peerRef.current.ontrack = (event)=>{

console.log("Remote track received")

}

return peerRef.current

}

return {createPeer,peerRef}

}