import { Definition, Store, Transition, DispatcherInterface, Dispatcher, Event, EventName } from './'

export default class Workflow<T> {
  readonly definition: Definition
  readonly markingStore: Store<T>
  readonly dispatcher: DispatcherInterface<T>

  constructor (definition: Definition, markingStore: Store<T>, dispatcher?: DispatcherInterface<T>) {
    this.definition = definition
    this.markingStore = markingStore
    this.dispatcher = dispatcher || new Dispatcher<T>()
  }

  placeOf (object: T): string {
    const place = this.markingStore.get(object)

    if (!this.definition.hasPlace(place)) {
      throw new Error(`the place named "${place}" is unknown to the definition`)
    }

    return place
  }

  can (object: T, transitionName: string): boolean {
    const transition = getTransition(this.definition, transitionName)

    return transition.form === this.placeOf(object)
  }

  apply (object: T, transitionName: string): void {
    if (!this.can(object, transitionName)) {
      throw new Error(`the transition named "${transitionName}" is not authorized from this place`)
    }

    this.dispatcher.dispatch(new Event(EventName.BEFORE_TRANSITION, transitionName, object))

    const transition = getTransition(this.definition, transitionName)

    this.dispatcher.dispatch(new Event(EventName.AFTER_TRANSITION, transitionName, object))

    this.markingStore.set(object, transition.to)
  }
}

function getTransition (definition: Definition, transitionName: string): Transition {
  if (!definition.transitions.has(transitionName)) {
    throw new Error(`the transition named "${transitionName}" is not defined`)
  }

  return definition.transitions.get(transitionName) as Transition
}
