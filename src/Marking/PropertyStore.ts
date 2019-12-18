import Store from './Store'

export default class PropertyStore<T> implements Store<T> {
  readonly property: string

  constructor (property: string) {
    this.property = property
  }

  get (object: T): string {
    // @ts-ignore
    return object[this.property]
  }

  set (object: T, state: string): void {

    if (Object.isFrozen(object)) {
      throw new Error('unable to store place for a frozen object')
    }

    // @ts-ignore
    object[this.property] = state
  }
}
