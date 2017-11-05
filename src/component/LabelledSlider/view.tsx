export default function ($state : any) {
  return $state.map(({ label, value, unit, min, max }) => 
    <div className='labeled-slider'>
      <span className='label'>{label} {value} {unit}</span>
      <input className='slider' type='range' min={min} max={max} value={value}/>
    </div>
  )
}