const BandList = require('./band-list')

class Sockets {
  constructor (io) {
    this.io = io
    this.bandList = new BandList()
    this.socketEvents()
  }

  socketEvents () {
    //   on Connection
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado', socket.id)

      // emitir al cliente conectado todas la s bandas actuales
      socket.emit('current-bands', this.bandList.getBands())

      // votar por la banda
      socket.on('vote-band', ({ id }) => {
        this.bandList.increaseVotes(id)
        // mandar todos los cambios a todos los sockets
        this.io.emit('current-bands', this.bandList.getBands())
      })

      socket.on('remove-band', ({ id }) => {
        this.bandList.removeBand(id)
        this.io.emit('current-bands', this.bandList.getBands())
      })

      socket.on('change-name', ({ id, name }) => {
        this.bandList.changeBandName(id, name)
        this.io.emit('current-bands', this.bandList.getBands())
      })

      socket.on('create-band', ({ name }) => {
        this.bandList.add(name)
        this.io.emit('current-bands', this.bandList.getBands())
      })
    })
  }
}

module.exports = Sockets
