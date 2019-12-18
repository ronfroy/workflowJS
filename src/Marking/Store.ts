export default interface Store<T> {
  get (object: T): string
  set (object: T, state: string): void
}
