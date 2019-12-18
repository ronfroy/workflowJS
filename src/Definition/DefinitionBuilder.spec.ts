import { DefinitionBuilder, Transition } from '.'

describe('DefinitionBuilder', () => {

  describe('addPlace', () => {
    it('should add a single place', () => {
      const definition = new DefinitionBuilder()
        .addPlace('place')
        .build()

      expect(definition.places.length).toBe(1)
      expect(definition.places).toContain('place')
    })

    it('should add multiple places', () => {
      const definition = new DefinitionBuilder()
        .addPlace('place1')
        .addPlace('place2')
        .addPlace('place3')
        .build()

      expect(definition.places.length).toBe(3)
      expect(definition.places).toContain('place1')
      expect(definition.places).toContain('place2')
      expect(definition.places).toContain('place3')
    })
  })

  describe('setPlaces', () => {
    it('should set multiple places', () => {
      const definition = new DefinitionBuilder()
        .setPlaces(['place1', 'place2'])
        .build()

      expect(definition.places.length).toBe(2)
      expect(definition.places).toContain('place1')
      expect(definition.places).toContain('place2')
    })

    it('should replace all places with new ones', () => {
      const definition = new DefinitionBuilder()
        .addPlace('place1')
        .addPlace('place2')
        .setPlaces(['place3', 'place4'])
        .build()

      expect(definition.places.length).toBe(2)
      expect(definition.places).not.toContain('place1')
      expect(definition.places).not.toContain('place2')
      expect(definition.places).toContain('place3')
      expect(definition.places).toContain('place4')
    })
  })

  describe('setTransition', () => {
    it('should add a single transition', () => {
      const transition = new Transition('1_to_2', 'place1', 'place2');
      const definition = new DefinitionBuilder()
        .setPlaces(['place1', 'place2'])
        .addTransition(transition)
        .build()

      expect(definition.transitions.size).toBe(1)
      expect(definition.transitions.get('1_to_2')).toEqual(transition)
    })

    it('should add multiple transitions', () => {
      const transition1 = new Transition('1_to_2', 'place1', 'place2');
      const transition2 = new Transition('1_to_3', 'place1', 'place3');
      const transition3 = new Transition('3_to_1', 'place3', 'place1');
      const definition = new DefinitionBuilder()
        .setPlaces(['place1', 'place2', 'place3'])
        .addTransition(transition1)
        .addTransition(transition2)
        .addTransition(transition3)
        .build()

      expect(definition.transitions.size).toBe(3)
      expect(definition.transitions.get('1_to_2')).toEqual(transition1)
      expect(definition.transitions.get('1_to_3')).toEqual(transition2)
      expect(definition.transitions.get('3_to_1')).toEqual(transition3)
    })
  })
})
