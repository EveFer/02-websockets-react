import { useEffect, useContext, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { SocketContext } from '../context/SocketContext'

let myChart

export default function BandChart () {
  const { socket } = useContext(SocketContext)
  //   const [bands, setBands] = useState([])

  useEffect(() => {
    Chart.register(...registerables)
    socket.on('current-bands', (bands) => {
      console.log(bands)
      createChart(bands)
    })

    return () => socket.off('current-bands')
  }, [socket])

  const createChart = (bands) => {
    const ctx = document.getElementById('myChart').getContext('2d')
    if (myChart) {
      myChart.destroy()
    }
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bands.map((band) => band.name),
        datasets: [{
          label: '# of Votes',
          data: bands.map((band) => band.votes),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        animations: false,
        scales: {
          xAxes: {
            stacked: true
          }
        },
        indexAxis: 'y'
      }
    })
  }

  return (
    <canvas id='myChart' />
  )
}
