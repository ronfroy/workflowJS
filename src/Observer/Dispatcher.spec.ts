import {Dispatcher, Event, EventName} from '.'

type ObjectType = { property: string }

describe('Dispatcher', () => {
  it('should add a new handler', () => {
    const dispatcher = new Dispatcher<ObjectType>()
    dispatcher.on(EventName.AFTER_TRANSITION, (event) => {})
    dispatcher.on(EventName.BEFORE_TRANSITION, (event) => {})
  })

  it('should dispatch a new event', () => {
    const dispatcher = new Dispatcher<ObjectType>()
    const object = { property: 'value' }
    const event = new Event<ObjectType>(EventName.BEFORE_TRANSITION, 'transition', object)

    const handler1 = jest.fn((e) => {})
    const handler2 = jest.fn((e) => {})

    dispatcher.on(EventName.BEFORE_TRANSITION, handler1)
    dispatcher.on(EventName.AFTER_TRANSITION, handler2)
    dispatcher.dispatch(event)

    expect(handler1.mock.calls.length).toBe(1)
    expect(handler1.mock.calls[0][0]).toBe(event)
    expect(handler2.mock.calls.length).toBe(0)
  })

  it('should count listener', () => {
    const dispatcher = new Dispatcher<ObjectType>()

    dispatcher.on(EventName.BEFORE_TRANSITION, (e) => {})
    dispatcher.on(EventName.BEFORE_TRANSITION, (e) => {})
    dispatcher.on(EventName.AFTER_TRANSITION, (e) => {})

    expect(dispatcher.count()).toBe(3)
    expect(dispatcher.count(EventName.BEFORE_TRANSITION)).toBe(2)
    expect(dispatcher.count(EventName.AFTER_TRANSITION)).toBe(1)
  })
})
