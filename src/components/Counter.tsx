export default function Counter({ totalSeconds }: { totalSeconds: number }) {

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60
  const seconds = totalSeconds % 60;


  return (
    <div className="fill__counter">
      {/* Hours */}
      <span>{hours.toString().padStart(2, '0')}:</span>
      {/* Minutes */}
      <span>{minutes.toString().padStart(2, '0')}:</span>
      {/* Seconds */}
      <span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  )
}
