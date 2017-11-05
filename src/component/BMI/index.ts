import intent from './intent'
import model from './model'
import view from './view'

import { Sources } from '../../interfaces'

export default function (sources: Sources) {
  const props$ = sources.props
  const actions = intent(sources)
  const state$ = model(props$, actions)
  const vtree$ = view(state$)
  
  return {
    DOM: vtree$,
    value$: state$.map(state => state.value)
  }
}