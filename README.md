# cycle.js

## Installation

```
$ yarn global add create-cycle-app

$ create-cycle-app my-awesome-app --flavor cycle-scripts-one-fits-all
> use typescript
> use most.js
```


## Basic

```js
import * as most from 'most'
import {Sources, Sinks} from './interfaces'

export function App(sources : Sources) : Sinks {
  const vtree$ = most.of(
    <div>My Awesome Cycle.js app</div>
  )

  return {
    DOM: vtree$
  }
}
```

## BMI Calculator

```js
import * as most from 'most'
import {Sources, Sinks} from './interfaces'

export function App(sources : Sources) : Sinks {
  const changeWeight$ = sources.DOM.select('.weight').events('input')
  .map(evt => evt.target.value)

  const changeHeight$ = sources.DOM.select('.height').events('input')
  .map(evt => evt.target.value)

  const state$ = most.combine(
    (weight, height) => {
      console.log(`weight=${weight}, height=${height}`)
      const heightMeters = height * 0.01
      const bmi = Math.round(weight / (heightMeters * heightMeters))
   
      return { bmi, weight, height }
    },
    changeWeight$.startWith(70),
    changeHeight$.startWith(100)
  )

  const vtree$ = state$.map(({ height, weight, bmi }) => 
    <div>
      <div><input type="text" className="height" value={height}/>Height</div>
      <div><input type="text" className="weight" value={weight}/>Weight</div>
      <div>
        <h1>BMI: {bmi}</h1>
      </div>
    </div>
  )

  return {
    DOM: vtree$
  }
}
```

## Model-View-Intent

The same example as above, but refactored as MVI.

```js
import * as most from 'most'

import {Sources, Sinks} from './interfaces'

// import Task from './component'


function intent (sources: Sources) {
  return {
    changeWeight$: sources.DOM.select('.weight')
      .events('input')
      .map(evt => evt.target.value),
    changeHeight$: sources.DOM.select('.height')
      .events('input')
      .map(evt => evt.target.value)
  }
}


function model (actions) {
  const weight$ = actions.changeWeight$.startWith(70)
  const height$ =  actions.changeHeight$.startWith(100)

  return most.combine(
    (weight: number, height: number) => {
      console.log(`weight=${weight}, height=${height}`)
      const heightMeters = height * 0.01
      const bmi = Math.round(weight / (heightMeters * heightMeters))
      return { bmi, weight, height }
    },
    weight$,
    height$
  )
}

function view (state$) {
  return state$.map(({ height, weight, bmi }) => 
    <div>
      <div><input type="text" className="height" value={height}/>Height</div>
      <div><input type="text" className="weight" value={weight}/>Weight</div>
      <div>
        <h1>BMI: {bmi}</h1>
      </div>
    </div>
  )
}


export function App(sources : Sources) : Sinks {

  const actions = intent(sources)
  const state$ = model(actions)
  const vtree$ = view(state$)

  return {
    DOM: vtree$
  }
}

```

## Naming convention

```js
// The $ sign indicates that the variable is a stream
const state$ = ...
```