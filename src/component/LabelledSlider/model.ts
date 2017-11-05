import * as most from 'most'

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