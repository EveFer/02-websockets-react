const socket = io('http://localhost:3000')

// escuchar un evento
socket.on('connection', (data) => {
  console.log('El servidor emitio algo: ', data)
})

socket.on('current-bands', (data) => {
  console.log(data)
})
