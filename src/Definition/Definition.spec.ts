import { Definition, Transition } from '.'

describe('Definition', () => {
  it('should create a new Definition without error', () => {
    const places = ['place1', 'place2']
    const transitions = [new Transition('transition', 'place1', 'place2')]

    new Definition(places, transitions)
  })

  it('should throw an error when several places have the same name', () => {
    const places = ['placeName', 'placeName']

    expect(() => {
      new Definition(places, [])
    }).toThrow('More than one place has the same name "placeName"')
  })

  it('should throw an error when several transitions have the same name', () => {
    const places = ['place1', 'place2', 'place3']
    const transitions = [
      new Transition('name', 'place1', 'place2'),
      new Transition('name', 'place1', 'place3')
    ]

    expect(() => {
      new Definition(places, transitions)
    }).toThrow('More than one transition has the same name "name"')
  })

  it('should throw an error when a transition is on an undefined place', () => {
    expect(() => {
      const places = ['place1']
      const transitions = [new Transition('transition', 'undefinedPlace', 'place1')]
      new Definition(places, transitions)
    }).toThrow('The transition named "transition" should not be defined from an undefined place')

    expect(() => {
      const places = ['place1']
      const transitions = [new Transition('transition', 'place1', 'undefinedPlace')]
      new Definition(places, transitions)
    }).toThrow('The transition named "transition" should not be defined to an undefined place')
  })
})
