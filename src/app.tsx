import * as most from 'most'

import {Sources, Sinks} from './interfaces'
import isolate from '@cycle/isolate'

// import BMI from './component/BMI'

import Slider from './component/LabelledSlider'
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

  const { DOM: weightVDom$, value: weightValue$ } = Slider(weightSources)
  const { DOM: heightVDom$, value: heightValue$ } = Slider(heightSources)

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
