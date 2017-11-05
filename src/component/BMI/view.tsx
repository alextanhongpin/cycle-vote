type BMIView = {
  height: number
  weight: number
  bmi: number
  label: string
}

export default function view (state$: any) {
  return state$.map(({ height, weight, bmi, label }: BMIView) => 
    <div>
      <div><input type="text" className="height" value={height}/>Height</div>
      <div><input type="text" className="weight" value={weight}/>Weight</div>
      <div>
        <h1>BMI: {bmi}</h1>
        <div>{label}</div>
      </div>
    </div>
  )
}
