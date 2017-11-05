import {run} from '@cycle/most-run'
import {makeDOMDriver} from '@cycle/dom'
import {Component} from './interfaces'

import * as most from 'most'
import {App} from './app'

const main : Component = App

const drivers = {
  // props: () => most.of({
  //   label: 'Weight',
  //   unit: 'kg',
  //   min: 40,
  //   max: 140,
  //   value: 70
  // }),
  DOM: makeDOMDriver('#root')
}

run(main, drivers)
