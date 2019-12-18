import { Event } from '.'

export default interface Interface<T> {
  dispatch (event: Event<T>): void
}
