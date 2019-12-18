import { Event } from '.'

export type Listener<T> = (event: Event<T>) => void
