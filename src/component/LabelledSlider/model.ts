import * as most from 'most'

// model takes the action's values and mutates the props
// to return a new state
export default function model(props$: any, actions : any) {
  const state$ = props$
  .map(props => actions.changeSlider$
    .map(val => ({
      ...props,
      value: val
    }))
    .startWith(props)
  ).join()

  return state$
}