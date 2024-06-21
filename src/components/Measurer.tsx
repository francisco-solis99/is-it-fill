import useFill from "@/hooks/useFill"
import { useEffect } from "react"
import DataFill from "@/components/DataFill"

export default function Measurer({
  initialPorcentajeMeasure,
  seconds,
  capacity,
  statusApp,
  onStopEnd,
  onPausePlay
}: {
  initialPorcentajeMeasure: number,
  seconds: number,
  capacity: number,
  statusApp: string,
  onStopEnd: () => void,
  onPausePlay: () => void,
}) {

  const { porcentajeMeasure, timeLeft, startFill, stopFill, toggleFill } = useFill({
    initialPorcentaje: initialPorcentajeMeasure,
    capacity,
    seconds
  })


  useEffect(() => {
    console.log({ statusApp });

    if (statusApp === 'fill') {
      console.log('start to fill')
      startFill()
    }
    if (statusApp === 'init') {
      console.log('start to stop')
      stopFill()
    }
    if (statusApp === 'wait') {
      console.log('start to wait')
      toggleFill()
    }
  }, [statusApp, initialPorcentajeMeasure, startFill, stopFill, toggleFill])


  return (
    <>
      {
        statusApp !== 'init' && (
          <DataFill seconds={seconds} capacity={capacity} timeLeft={timeLeft} />
        )
      }

      <div className="water__wave">
        <div className="wave1"></div>
        <div className="wave2"></div>
        <span className='wave__value'>
          {Math.round(porcentajeMeasure)}%
        </span>
      </div>
      {

        statusApp !== 'init' && (
          <>
            <div className='buttons__actions'>
              <button onClick={onStopEnd}>
                {
                  porcentajeMeasure === 100 ? 'Restart' : 'Stop'
                }
              </button>
              {
                porcentajeMeasure !== 100 && (
                  <button onClick={onPausePlay}>
                    {
                      statusApp === 'fill' ? 'Pause' : 'Play'
                    }
                  </button>
                )
              }
            </div>
          </>
        )
      }

    </>
  )
}
