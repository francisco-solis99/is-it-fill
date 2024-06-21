import { useState, useRef } from 'react';
import { FormMemo } from '@/components/Form';
import Measurer from '@/components/Measurer';


// status app => init / fill / wait
export default function IsItFill() {
  const [statusApp, setStatusApp] = useState('init')

  console.log('render the main');
  console.log(statusApp)

  const secondsByLiter = useRef<number>(0)
  const capacityToFill = useRef<number>(0)
  const initialPorcentajeFilled = useRef<number>(0)

  const onSubmitSimulation = ({ seconds, capacity, initialPorcentaje }: { seconds: number, capacity: number, initialPorcentaje: number }) => {
    setStatusApp('fill')
    secondsByLiter.current = seconds
    capacityToFill.current = capacity
    initialPorcentajeFilled.current = initialPorcentaje
  }

  const handleClickStop = () => {
    setStatusApp('init')
  }

  const handleClickPausePlay = () => {
    const isFilling = statusApp === 'fill';
    isFilling ? setStatusApp('wait') : setStatusApp('fill');
  }



  return (
    <>
      <section className='app__data'>
        <FormMemo
          statusApp={statusApp}
          onSubmitCb={onSubmitSimulation} />
      </section>
      <section className="fill__feat">
        <Measurer
          statusApp={statusApp}
          initialPorcentajeMeasure={initialPorcentajeFilled.current}
          seconds={secondsByLiter.current}
          capacity={capacityToFill.current}
          onStopEnd={handleClickStop}
          onPausePlay={handleClickPausePlay} />
      </section>
    </>
  )
}
