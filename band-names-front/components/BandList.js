import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

export default function BandList () {
  const { socket } = useContext(SocketContext)
  const [bands, setBands] = useState([])

  const handleChangeName = (event, id) => {
    const newName = event.target.value
    setBands(bands => bands.map(band => {
      if (band.id === id) {
        band.name = newName
      }
      return band
    }))
  }

  const handleBlur = (id, name) => {
    // console.log(id, name)

    // TODO Disparar evento de sockets
    socket.emit('change-name', { id, name })
  }

  const vote = (id) => {
    socket.emit('vote-band', { id })
  }

  const removeBand = (id) => {
    socket.emit('remove-band', { id })
  }

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands)
    })

    return () => socket.off('current-bands')
  }, [socket])
  const createRows = () => {
    return (
      bands.map(band => (
        <tr key={band.id}>
          <td>
            <button className='btn btn-primary' onClick={() => vote(band.id)}>+1</button>
          </td>
          <td>
            <input
              className='form-control' type='text' value={band.name} onChange={(event) => handleChangeName(event, band.id)}
              onBlur={(event) => handleBlur(band.id, band.name)}
            />
          </td>
          <td>
            <h3>{band.votes}</h3>
          </td>
          <td>
            <button className='btn btn-danger' onClick={() => removeBand(band.id)}>borrar</button>
          </td>
        </tr>
      ))

    )
  }

  return (

    <>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th />
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>

        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>
    </>
  )
}
