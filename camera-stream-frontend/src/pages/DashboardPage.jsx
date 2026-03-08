import { useEffect, useRef, useState } from "react"
import { Monitor, Copy } from "lucide-react"
import socket from "../services/socketService"
import useWebRTC from "../hooks/useWebRTC"
import QRCode from "react-qr-code"

function DashboardPage(){

const roomId = "camera-room"

const videoRef = useRef(null)

const { createPeer, peerRef } = useWebRTC(roomId)

const [connected,setConnected] = useState(false)
const [cameraUrl,setCameraUrl] = useState("")
const [copied,setCopied] = useState(false)

useEffect(()=>{

const url = `${window.location.origin}/camera`
setCameraUrl(url)

},[])

useEffect(()=>{

socket.emit("join-room",roomId)

const peer = createPeer()

/* RECEIVE STREAM */

peer.ontrack = (event)=>{

console.log("🎥 Remote stream received")

const stream = event.streams[0]

if(videoRef.current){

videoRef.current.srcObject = stream

videoRef.current.onloadedmetadata = ()=>{

videoRef.current.play().catch(()=>{})

}

}

setConnected(true)

}

/* RECEIVE OFFER */

const handleOffer = async (offer)=>{

console.log("Offer received")

try{

await peer.setRemoteDescription(new RTCSessionDescription(offer))

const answer = await peer.createAnswer()

await peer.setLocalDescription(answer)

socket.emit("answer",{roomId,answer})

}catch(err){

console.log("Offer error:",err)

}

}

/* RECEIVE ICE */

const handleCandidate = async (candidate)=>{

try{

if(peerRef.current){

await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate))

}

}catch(err){

console.log("ICE error:",err)

}

}

socket.on("offer",handleOffer)
socket.on("ice-candidate",handleCandidate)

return ()=>{

socket.off("offer",handleOffer)
socket.off("ice-candidate",handleCandidate)

}

},[])

const copyLink = ()=>{

navigator.clipboard.writeText(cameraUrl)

setCopied(true)

setTimeout(()=>setCopied(false),2000)

}

return(

<div className="flex min-h-screen flex-col bg-background text-white">

<header className="flex items-center justify-between border-b border-muted px-6 py-4">

<div className="flex items-center gap-3">

<Monitor className="h-6 w-6 text-primary"/>

<h1 className="font-mono text-lg font-bold">
STREAM DASHBOARD
</h1>

</div>

<div className="text-yellow-400 text-sm">

{connected ? "LIVE 🔴" : "Waiting for camera..."}

</div>

</header>

<div className="flex flex-1">

<div className="flex flex-1 items-center justify-center p-6">

<div className="relative w-full max-w-4xl rounded-xl border border-muted bg-card stream-glow">

<video
ref={videoRef}
autoPlay
playsInline
muted
className="aspect-video w-full object-cover"
/>

</div>

</div>

<div className="w-80 border-l border-muted p-6 space-y-6">

<div className="bg-card p-4 rounded-lg border border-muted">

<h2 className="text-xs text-gray-400 mb-3 uppercase">
Camera Link
</h2>

<p className="text-xs break-all mb-3">
{cameraUrl}
</p>

<button
onClick={copyLink}
className="w-full bg-green-500 text-black py-2 rounded flex items-center justify-center gap-2"
>

<Copy size={16}/>

{copied ? "Copied!" : "Copy Link"}

</button>

</div>

<div className="bg-card p-4 rounded-lg border border-muted text-center">

<h2 className="text-xs text-gray-400 mb-3 uppercase">
Scan QR
</h2>

<div className="bg-white p-3 rounded inline-block">
<QRCode value={cameraUrl} size={140}/>
</div>

</div>

<div className="bg-card p-4 rounded-lg border border-muted">

<h2 className="text-xs text-gray-400 mb-3 uppercase">
How To Use
</h2>

<ol className="text-sm space-y-2 text-gray-300">

<li>1️⃣ Copy the camera link</li>

<li>2️⃣ Or scan the QR code</li>

<li>3️⃣ Open the link on your phone browser</li>

<li>4️⃣ Allow camera access</li>

<li>5️⃣ Live video will appear here</li>

</ol>

</div>

</div>

</div>

</div>

)

}

export default DashboardPage