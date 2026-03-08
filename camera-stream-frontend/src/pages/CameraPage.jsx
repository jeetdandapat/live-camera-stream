import { useEffect, useRef, useState } from "react"
import { Camera, CameraOff } from "lucide-react"
import socket from "../services/socketService"
import useWebRTC from "../hooks/useWebRTC"

function CameraPage(){

const roomId = "camera-room"

const videoRef = useRef(null)

const { createPeer, peerRef } = useWebRTC(roomId)

const [started,setStarted] = useState(false)
const [error,setError] = useState(null)

const startCamera = async ()=>{

try{

if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){

setError("Camera not supported")
return

}

const stream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:false
})

/* LOCAL PREVIEW */

if(videoRef.current){

videoRef.current.srcObject = stream

videoRef.current.onloadedmetadata = ()=>{
videoRef.current.play().catch(()=>{})
}

}

/* JOIN ROOM */

socket.emit("join-room",roomId)

const peer = createPeer()

/* SEND VIDEO TRACK */

stream.getTracks().forEach(track=>{
peer.addTrack(track,stream)
})

/* ICE */

peer.onicecandidate = (event)=>{

if(event.candidate){

socket.emit("ice-candidate",{
roomId,
candidate:event.candidate
})

}

}

/* OFFER */

const offer = await peer.createOffer()

await peer.setLocalDescription(offer)

socket.emit("offer",{
roomId,
offer
})

setStarted(true)

}catch(err){

console.log(err)

setError(err.message)

}

}

/* RECEIVE ANSWER */

useEffect(()=>{

const handleAnswer = async(answer)=>{

if(peerRef.current){

await peerRef.current.setRemoteDescription(
new RTCSessionDescription(answer)
)

}

}

const handleCandidate = async(candidate)=>{

if(peerRef.current){

await peerRef.current.addIceCandidate(
new RTCIceCandidate(candidate)
)

}

}

socket.on("answer",handleAnswer)
socket.on("ice-candidate",handleCandidate)

return ()=>{

socket.off("answer",handleAnswer)
socket.off("ice-candidate",handleCandidate)

}

},[])

return(

<div className="flex min-h-screen flex-col bg-background text-white">

<header className="flex items-center justify-between border-b border-muted px-6 py-4">

<div className="flex items-center gap-2">

<Camera className="h-6 w-6 text-primary"/>

<h1 className="font-mono text-lg font-bold">
CAMERA STREAM
</h1>

</div>

<div className="flex items-center gap-2">

<div className={`h-2 w-2 rounded-full ${started ? "bg-green-500":"bg-yellow-400"}`}></div>

<span className="text-sm">
{started ? "Streaming..." : "Ready"}
</span>

</div>

</header>

<div className="flex flex-1 items-center justify-center p-6">

<div className="relative w-full max-w-3xl rounded-xl border border-muted bg-card p-4">

<video
ref={videoRef}
autoPlay
playsInline
muted
className="w-full rounded-lg"
/>

{!started && (

<button
onClick={startCamera}
className="mt-4 bg-green-500 px-6 py-2 rounded text-black w-full"
>

Start Camera

</button>

)}

{error && (

<div className="text-red-400 mt-3">

{error}

</div>

)}

</div>

</div>

</div>

)

}

export default CameraPage