const express = require("express")
const { createServer } = require("http")
const { join } = require("path")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server)

// Servir el archivo index.html
//app.get("/", (req, res) => {
  //res.sendFile(join(__dirname, "index.html"))
//})
app.use(express.static(__dirname)) 

// Manejar conexión de WebSockets
io.on("connection", (socket) => {
  console.log("Un usuario se conectó")

  socket.on("chat message", (msg) => {
    // msg es un objeto: { user, message }
    io.emit("chat message", msg)
  })

  socket.on("disconnect", () => {
    console.log("Un usuario se desconectó")
  })
})

// Iniciar el servidor
server.listen(4000, '0.0.0.0', () => {
  console.log("Server running on port 4000")
})