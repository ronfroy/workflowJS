import { PropertyStore } from '.'

describe('PropertyStore', () => {
  it('should get the current place', () => {
    const object = { property: 'value'}
    const store = new PropertyStore('property')
    expect(store.get(object)).toBe('value')
  })

  it('should set the current place', () => {
    const object = { property: 'value'}
    const store = new PropertyStore('property')

    store.set(object, 'value2')
    expect(object.property).toBe('value2')
  })

  it('should throw an error on frozen object', () => {
    const object = Object.freeze({ property: 'value'})
    const store = new PropertyStore('property')

    expect(() => {
      store.set(object, 'value2')
    }).toThrow('unable to store place for a frozen object')
  })
})
