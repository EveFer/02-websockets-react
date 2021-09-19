import { useMemo, useEffect, useState } from 'react'
import io from 'socket.io-client'

export const useSocket = (serverPath) => {
  // useMemo se utiliza para verificar si el serverPath cambia
  // si no cambia no se conectará nuevamente al socket solamente hasta que cambie
  const socket = useMemo(() => io.connect(serverPath, { transports: ['websocket'] }), [serverPath])
  const [online, setOnline] = useState(false)

  // useEffect(() => {
  //   setOnline(socket.connected)
  // }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })

    // return socket.disconnect()
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  // useEffect(() => {
  //   socket.on('disconnect', () => {
  //     setOnline(false)
  //   })
  // }, [socket])

  return {
    socket,
    online
  }
}
