import model from './model'
import view from './view'
import intent from './intent'

import isolate from '@cycle/isolate'
import { Sources } from '../../interfaces'

function LabelledSlider (sources : Sources) {
  const props$ = sources.props
  const actions = intent(sources)
  const state$ = model(props$, actions)
  const vtree$ = view(state$)

  return {
    DOM: vtree$,
    value: state$.map(state => state.value)
  }
}

export default (sources : Sources) => isolate(LabelledSlider)(sources)