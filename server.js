const express = require("express")
const { createServer } = require("http")
const { join } = require("path")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"))
})

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })
})

server.listen(4000, () => {
    console.log("Server running on http://localhost:4000")
})