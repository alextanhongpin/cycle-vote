import * as most from 'most'

export default function model (props$: any, actions: any) {
  return props$.map(props => {
      const weight$ = actions.changeWeight$.startWith(props.value)
      const height$ = actions.changeHeight$.startWith(170)

      const state$ = most.combine(
        (weight: number, height: number) => {
          console.log(`weight=${weight}, height=${height}`)
          const heightMeters = height * 0.01
          const bmi = Math.round(weight / (heightMeters * heightMeters))
          return { bmi, weight, height, label: props.label }
        },
        weight$,
        height$
      )
      return state$
  }).join()
}
