import Button from "../ui/Button"
import { Camera } from "lucide-react"

function CameraControls({ startCamera, started }) {

return(

<div className="flex justify-center mt-6">

<Button
onClick={startCamera}
className="flex items-center gap-2 px-6 py-3"
disabled={started}
>

<Camera size={18} />

{started ? "Camera Running" : "Start Camera"}

</Button>

</div>

)

}

export default CameraControls