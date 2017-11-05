// view is just a dumb component that takes a state and return
// a html representation of the state
export default function view($state : any) {
  return $state.map(({ label, value, unit, min, max }) => 
    <div className='labeled-slider'>
      <span className='label'>{label} {value} {unit}</span>
      <input className='slider' type='range' min={min} max={max} value={value}/>
    </div>
  )
}