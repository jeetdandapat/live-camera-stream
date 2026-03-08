import {BrowserRouter,Routes,Route} from "react-router-dom"

import CameraPage from "./pages/CameraPage"
import DashboardPage from "./pages/DashboardPage"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<DashboardPage/>}/>
<Route path="/camera" element={<CameraPage/>}/>

</Routes>

</BrowserRouter>

)

}

export default App