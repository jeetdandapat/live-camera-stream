import { io } from "socket.io-client"

const socket = io("http://10.216.41.151:5000")

export default socket