import { Workflow, DefinitionBuilder, PropertyStore, Transition, EventName } from '.'

type ObjectType = { state: string }

const definitionBuilder = new DefinitionBuilder()
  .setPlaces(['draft', 'reviewed', 'rejected', 'published'])
  .addTransition(new Transition('to_review', 'draft', 'reviewed'))
  .addTransition(new Transition('publish', 'reviewed', 'published'))
  .addTransition(new Transition('reject', 'reviewed', 'rejected'))

const store = new PropertyStore<ObjectType>('state')
const workflow = new Workflow<ObjectType>(definitionBuilder.build(), store)

describe('Worflow', () => {
  it('should check the possibility of transition', () => {

    const object = {
      state: 'draft'
    }

    expect(workflow.can(object, 'to_review')).toBe(true)
    expect(workflow.can(object, 'publish')).toBe(false)
    expect(workflow.can(object, 'reject')).toBe(false)
  })

  it('should get the place of the object', () => {

    const object1 = {
      state: 'draft'
    }

    expect(workflow.placeOf(object1)).toBe('draft')

    const object2 = {
      state: 'published'
    }

    expect(workflow.placeOf(object2)).toBe('published')

    const object3 = {
      state: 'unknownName'
    }

    expect(() => {
      workflow.placeOf(object3)
    }).toThrow('the place named "unknownName" is unknown to the definition')
  })

  it('should apply a transition', () => {

    const object = {
      state: 'draft'
    }

    expect(workflow.placeOf(object)).toBe('draft')
    workflow.apply(object, 'to_review')
    expect(workflow.placeOf(object)).toBe('reviewed')
  })
})
