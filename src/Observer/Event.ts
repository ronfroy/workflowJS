import { EventName } from '.'

export default class Event<T> {
  readonly name: EventName
  readonly transition: string
  readonly subject: T

  constructor (name: EventName, transition: string, subject: T) {
    this.name = name
    this.transition = transition
    this.subject = subject
  }
}
