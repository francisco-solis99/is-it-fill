import Counter from "@/components/Counter"

export default function DataFill({ seconds, capacity, timeLeft }: { seconds: number, capacity: number, timeLeft: number }) {
  return (
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
        <Counter totalSeconds={timeLeft} />
      </div>
    </article>
  )
}
