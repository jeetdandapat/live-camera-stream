import { useEffect } from "react"

function VideoPlayer({ videoRef }) {

useEffect(()=>{

if(videoRef.current){

videoRef.current.muted = true
videoRef.current.play().catch(()=>{})

}

},[])

return(

<div className="flex justify-center">

<video
ref={videoRef}
autoPlay
playsInline
muted
className="w-full rounded-lg border border-gray-700"
/>

</div>

)

}

export default VideoPlayer