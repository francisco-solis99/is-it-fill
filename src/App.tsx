import React, { useEffect, useRef, useState } from 'react'
import './App.css'

const CAPACITIES = [5, 10, 15, 20] as const;

// status app => init / fill / wait / end
function App() {
  const [statusApp, setStatusApp] = useState('init')
  const [porcentajeMeasure, setPorcentajeMeasure] = useState<number>(0)
  const [seconds, setSeconds] = useState(0)
  const [capacity, setCapicity] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const intervalId = useRef<number | null | undefined>(null)

  useEffect(() => {
    return () => {
      if (intervalId.current === null) return
      console.log('cleaning')
      clearInterval(intervalId.current);
    }
  }, [])

  useEffect(() => {
    document.body.style.setProperty('--porcentaje', `${porcentajeMeasure}%`)
  }, [porcentajeMeasure])

  const handleSubmitFill = (e: React.FormEvent) => {
    e.preventDefault()
    e.currentTarget.reset()
    setStatusApp('fill')
    startFill()
  }

  const handleClickStop = () => {
    setStatusApp('init')
    setPorcentajeMeasure(0)
    setTimeLeft(0)
    clearInterval(intervalId.current)
  }

  const handleClickPausePlay = () => {
    // Pause
    if (statusApp === 'fill') {
      setStatusApp('wait')
      clearInterval(intervalId.current)
      return
    }
    // Play
    setStatusApp('fill')
    startFill()
  }


  function startFill() {

    const secsToFill = capacity * seconds;
    const valToAdd = Number((100 / secsToFill).toFixed(2));

    if (timeLeft === 0) {
      const timeLeftInSec =
        porcentajeMeasure === 0
          ? secsToFill
          : secsToFill - Number((secsToFill * porcentajeMeasure) / 100)

      setTimeLeft(() => timeLeftInSec)
    }

    intervalId.current = setInterval(() => {
      setPorcentajeMeasure(prevVal => {
        const nextValue = prevVal + valToAdd
        // console.log({ nextValue });
        if (nextValue > 100 && intervalId.current !== null) {
          clearInterval(intervalId.current)
          setStatusApp('end')
          return 100;
        }
        return nextValue
      })
      setTimeLeft(prev => {
        const nextTime = prev - 1;
        if (nextTime < 0) return 0
        return nextTime
      })
    }, 1000)
  }




  return (
    <div>
      <div className='app__wrapper'>
        <header className='app__header'>
          <h1 className='app__title'>
            <span>Is It Fill?</span>
            <span>Is It Fill?</span>
          </h1>
        </header>
        <main className='app__main'>
          <section className='app__data'>
            <form onSubmit={handleSubmitFill}>
              <label htmlFor="seconds">
                <span>Seconds by Liter (sec/lts)</span>
                <input
                  type="number"
                  id="seconds"
                  name="seconds"
                  placeholder="10"
                  min={1}
                  disabled={statusApp !== 'init'}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  required />
              </label>
              <label htmlFor="porcentajeFilled">
                <span>Porcentaje Filled (%)</span>
                <input
                  type="number"
                  id="porcentajeFilled"
                  name="porcentajeFilled"
                  placeholder="0"
                  disabled={statusApp !== 'init'}
                  onChange={(e) => setPorcentajeMeasure(Number(e.target.value))}
                  min={0}
                  max={100}
                  required />
              </label>
              <div>
                <span>Select the capacity to fill</span>
                <div className="capacity__options">
                  {
                    CAPACITIES.map((capacity: number, index: number) => {
                      return (
                        <label key={`option${index}`} className="radio-button">
                          <input
                            id={`option${index}`}
                            name="capacity"
                            type="radio"
                            onChange={() => setCapicity(capacity)}
                            required
                          />
                          <span className="radio-checkmark"></span>
                          <span className="radio-label">{capacity}L</span>
                        </label>
                      )
                    })
                  }
                </div>
              </div>
              <button
                type="submit"
                disabled={statusApp !== 'init'}
                style={{ pointerEvents: statusApp === 'fill' ? 'none' : 'auto' }}>
                Start simulation
              </button>
            </form>
          </section>
          <section className="fill__feat">
            {
              statusApp !== 'init' && (
                <article className='fill__data'>
                  <div className='data__item'>
                    <span>Seconds by Liter</span>
                    <span>{seconds}s</span>
                  </div>
                  <div className='data__item'>
                    <span>Capacity to fill</span>
                    <span>{capacity}L</span>
                  </div>
                  <div className='data__item'>
                    <span>Time to Finish</span>
                    <span>{timeLeft}s</span>
                  </div>
                </article>
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
                    <button onClick={handleClickStop}>
                      {
                        statusApp === 'end' ? 'Restart' : 'Stop'
                      }
                    </button>
                    {
                      statusApp !== 'end' && (
                        <button onClick={handleClickPausePlay}>
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
          </section>
        </main>
        <footer></footer>
      </div>
    </div>
  )
}

export default App
