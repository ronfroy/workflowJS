import Transition from './Transition'

export default class Definition {
  readonly places: string[]
  readonly transitions: ReadonlyMap<string, Transition>

  constructor (places: string[], transitions: Transition[]) {

    handleDuplicatePlace(places)
    handleDuplicateTransition(transitions)
    handleUndefinedPlace(places, transitions)

    this.places = places
    this.transitions = buildTransitionMap(transitions)
  }

  hasPlace (place: string): boolean {
    return this.places.includes(place)
  }

  hasTransition (transitionName: string): boolean {
    return this.transitions.has(transitionName)
  }
}

function buildTransitionMap (transitions: Transition[]): ReadonlyMap<string, Transition> {
  const transitionsMap = new Map<string, Transition>()
  transitions.forEach(transition => transitionsMap.set(transition.name, transition))
  return transitionsMap
}

function handleDuplicatePlace (places: string[]) {
  places.forEach((name, index, names) => {
    if (names.indexOf(name) !== index) {
      throw new Error(`More than one place has the same name "${name}"`)
    }
  })
}

function handleDuplicateTransition (transitions: Transition[]) {
  transitions.map((transition) => transition.name).forEach((name, index, names) => {
    if (names.indexOf(name) !== index) {
      throw new Error(`More than one transition has the same name "${name}"`)
    }
  })
}

function handleUndefinedPlace (places: string[], transitions: Transition[]) {
  transitions.forEach((transition) => {
    const fromNotIncluded = !places.includes(transition.form)
    const toNotIncluded = !places.includes(transition.to)

    if (fromNotIncluded || toNotIncluded) {
      const name = transition.name
      const where = fromNotIncluded ? 'from' : 'to'
      throw new Error(`The transition named "${name}" should not be defined ${where} an undefined place`)
    }
  })
}
