/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
const CAPACITIES = [5, 10, 15, 20] as const;

export function Form({
  statusApp,
  onSubmitCb,
}: {
  statusApp: string,
  onSubmitCb: ({ seconds, capacity }: { seconds: number, capacity: number, initialPorcentaje: number }) => void,
}) {
  const [seconds, setSeconds] = useState<number>(0)
  const [capacity, setCapacity] = useState(0)
  const [porcentajeMeasure, setPorcentajeMeasure] = useState<number>(0)


  const handleSubmitFill = (e: React.FormEvent) => {
    e.preventDefault()
    e.currentTarget.reset()
    onSubmitCb({ seconds, capacity, initialPorcentaje: porcentajeMeasure })
  }

  return (
    <form onSubmit={handleSubmitFill} className="fill__form">
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
      <div className="capacities__wrapper">
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
                    onChange={() => setCapacity(capacity)}
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
  )
}


export const FormMemo = React.memo(Form);
