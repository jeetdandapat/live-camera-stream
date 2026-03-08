const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const socketConfig = require("./config/socket")
const streamRoutes = require("./routes/streamRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/stream", streamRoutes)

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET","POST"]
  },
  transports: ["websocket","polling"],
  pingTimeout: 60000,
  pingInterval: 25000
})

socketConfig(io)

const PORT = 5000

server.listen(PORT, () => {
  console.log(" Server running on port", PORT)
})