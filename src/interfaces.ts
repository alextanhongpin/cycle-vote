import * as most from 'most'
import {Stream} from 'most'
import {DOMSource, VNode} from '@cycle/dom'

export type Sources = {
  DOM : DOMSource;
  // props: any;
}

export type Sinks = {
  DOM : Stream<VNode>;
  value: any;
}

export type Component = (s : Sources) => Sinks;
