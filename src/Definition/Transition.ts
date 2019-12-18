export default class Transition {
  readonly name: string
  readonly form: string
  readonly to: string

  /**
   * @param {string} [name] the transition name
   * @param {string} [form] the origin place
   * @param {string} [to] the destination place
   */
  constructor (name: string, form: string, to: string) {

    if (form === to) {
      throw new Error('places of origin and destination could not be identical')
    }

    this.name = name
    this.form = form
    this.to = to
  }
}
