import { DispatcherInterface, Listener, Event, EventName } from '.'

type StoreItem<T> = { eventName: string; listener: Listener<T> }[]

export default class Dispatcher<T> implements DispatcherInterface<T> {

  private listenerStore: StoreItem<T>

  constructor () {
    this.listenerStore = []
  }

  dispatch (event: Event<T>): void {
    const eventName = event.name
    this.listenerStore.forEach((item) => {
      if (eventName === item.eventName) {
        item.listener(event)
      }
    })
  }

  on (eventName: EventName, listener: Listener<T>): void {
    this.listenerStore.push({ eventName, listener })
  }

  count (eventName?: EventName): number {

    if ('undefined' === typeof eventName) {
      return this.listenerStore.length
    }

    return this.listenerStore.filter((item) => item.eventName === eventName).length
  }
}
