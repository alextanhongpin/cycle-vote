import { Sources } from '../../interfaces'

// intents are the user's actions that mutates the state
// it accepts the sources (mostly DOM) and returns a list
// of actions to subscribe to
export default function intent (sources : Sources) {
  const actions = {
    changeSlider$: sources.DOM.select('.slider')
      .events('input')
      .map(ev => ev.target.value)
  }

  return actions
}