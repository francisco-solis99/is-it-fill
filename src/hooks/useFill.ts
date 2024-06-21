import { useState, useEffect, useRef, useCallback, useMemo } from "react"
export default function useFill({ initialPorcentaje, capacity, seconds}: {initialPorcentaje: number, capacity: number, seconds: number,}) {
  const [porcentajeMeasure, setPorcentajeMeasure] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const intervalId = useRef<number | null | undefined>(null)

  // Memo values
  const secsToFill = useMemo(() => {
    return capacity * seconds;
  }, [capacity, seconds])
  const valToAdd = useMemo(() => {
    return Number((100 / secsToFill).toFixed(2))
  }, [secsToFill]);

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

  useEffect(() => {
    setPorcentajeMeasure(initialPorcentaje)
    const timeLeftInSec =
    initialPorcentaje === 0
        ? secsToFill
        : secsToFill - Number((secsToFill * initialPorcentaje) / 100)

    setTimeLeft(() => timeLeftInSec)

  }, [secsToFill, initialPorcentaje])

  const stopFill = useCallback(() => {
    setPorcentajeMeasure(0)
    setTimeLeft(0)
    clearInterval(intervalId.current)
  }, [])

  const toggleFill = useCallback(() => {
    clearInterval(intervalId.current)
  }, [])


  const startFill = useCallback(() => {
    intervalId.current = setInterval(() => {
      setPorcentajeMeasure(prevVal => {
        const nextValue = prevVal + valToAdd
        if (nextValue > 100 && intervalId.current !== null) {
          clearInterval(intervalId.current)
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
  }, [valToAdd])


  return {
    porcentajeMeasure,
    timeLeft,
    toggleFill,
    stopFill,
    startFill
  }
}
