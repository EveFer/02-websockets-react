// servidor express
const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')
const io = require('socket.io')
const Sockets = require('./sockets')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    // http Server
    this.server = http.createServer(this.app)
    // configuracion de socket

    // configuración del socker server
    // configura latencia, timeout
    this.io = io(this.server, {
      cors: true,
      origins: ['*']
    })
  }

  middlewares () {
    this.app.use(express.static(path.resolve(__dirname, '../../public')))
    this.app.use(cors())
  }

  configSocket () {
    new Sockets(this.io)
  }

  execute () {
    //   inicializar middlewares
    this.middlewares()

    // config socket
    this.configSocket()

    // inicializar server
    this.server.listen(this.port, () => {
      console.log(`Server corriendo en: http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
