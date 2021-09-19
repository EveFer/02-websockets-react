import { useState, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

export default function BandAdd () {
  const { socket } = useContext(SocketContext)
  const [name, setName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (name.trim().length > 0) {
      // TODO llamar la funcion para emitir el evento
      socket.emit('create-band', { name })

      setName('')
    }
  }
  return (
    <>
      <h3>Agregar Banda</h3>
      <form action='' onSubmit={onSubmit}>
        <input type='text' className='form-control' placeholder='Nuevo nombre de banda' value={name} onChange={(e) => setName(e.target.value)} />
      </form>
    </>
  )
}
