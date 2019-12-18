import { Transition } from '.'

describe('Transition', () => {
  it('should create a new Transition without error', () => {
    const transition = new Transition('name', 'place1', 'place2')

    expect(transition.name).toBe('name')
    expect(transition.form).toBe('place1')
    expect(transition.to).toBe('place2')
  })

  it('should throw an error when "from" and "to" places are identical', () => {
    expect(() => {
      new Transition('name', 'place1', 'place1')
    }).toThrow('places of origin and destination could not be identical')
  })
})
