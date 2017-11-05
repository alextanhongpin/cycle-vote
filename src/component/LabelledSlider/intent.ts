import { Sources } from '../../interfaces'

export default function intent (sources : Sources) {
  const actions = {
    changeSlider$: sources.DOM.select('.slider')
      .events('input')
      .map(ev => ev.target.value)
  }

  return actions
}