import Transition from './Transition'
import Definition from './Definition'

export default class DefinitionBuilder {
  private places: string[]
  readonly transitions: Transition[]

  constructor () {
    this.places = []
    this.transitions = []
  }

  setPlaces (place: string[]): this {
    this.places = place

    return this
  }

  addPlace (place: string): this {
    this.places.push(place)

    return this
  }

  addTransition (transition: Transition): this {
    this.transitions.push(transition)

    return this
  }

  build (): Definition {
    return new Definition(this.places, this.transitions)
  }
}
