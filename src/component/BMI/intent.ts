import { Sources } from '../../interfaces'

export default function intent (sources: Sources) {
  return {
    changeWeight$: sources.DOM.select('.weight')
      .events('input')
      .map(evt => evt.target.value),
    changeHeight$: sources.DOM.select('.height')
      .events('input')
      .map(evt => evt.target.value)
  }
}