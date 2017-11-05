import * as most from 'most'

import {Sources, Sinks} from './interfaces'
import isolate from '@cycle/isolate'

// import BMI from './component/BMI'

export function App(sources : Sources) : Sinks {

  // const props$ = sources.props
  // const { DOM: bmiTree$, value$ } = BMI(sources)

  // const sinks = {
  //   DOM: bmiTree$,
  //   value: value$
  // }


  // return sinks
  const weightProps$ = most.of({
    label: 'Weight', unit: 'kg', min: 10, value: 30, max: 100
  })
  const heightProps$ = most.of({
    label: 'Height', unit: 'cm', min: 10, value: 30, max: 100
  })

  const weightSources = { DOM: sources.DOM, props: weightProps$ }
  const heightSources = { DOM: sources.DOM, props: heightProps$ }

  // const WeightLabelledSlider = isolate(LabelledSlider)
  // const HeightLabelledSlider = isolate(LabelledSlider)

  const { DOM: weightVDom$, value: weightValue$ } = LabelledSliderFactory(weightSources)
  const { DOM: heightVDom$, value: heightValue$ } = LabelledSliderFactory(heightSources)

  const vdom$ = most.combine((height, heightVDom, weight, weightVDom) => {
    return <div>
      hello 
      {weightVDom} {weight} 
      {heightVDom} {height}
      <div style={{
        width: String(2 * weight) + 'px', 
        height: String(2 * height) + 'px', 
        backgroundColor: 'red',
        borderRadius: '50%'
      }}></div>
    </div>
  }, heightValue$, heightVDom$, weightValue$, weightVDom$)

  return {
    DOM: vdom$
  }
}

function LabelledSliderFactory(sources: Sources) {
  return isolate(LabelledSlider)(sources)
}
function LabelledSlider (sources : Sources) {

  const domSource = sources.DOM
  const props$ = sources.props

  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map(ev => ev.target.value)
  
  const state$ = props$
  .map(props => newValue$
    .map(val => ({
      ...props,
      value: val
    }))
    .startWith(props)
  ).join()

  const vdom$ = state$
    .map(state => 
      <div className='labeled-slider'>
        <span className='label'>{state.label} {state.value} {state.unit}</span>
        <input className='slider' type='range' min={state.min} max={state.max} value={state.value}/>
      </div>
    )

  const sinks = {
    DOM: vdom$,
    value: state$.map(state => state.value)
  }

  return sinks
}