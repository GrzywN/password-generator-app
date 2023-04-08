import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest'
import { PubSub } from './pubsub'

describe('PubSub', () => {
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()
  })

  afterEach(() => {
    pubsub.unsubscribeAll()
  })

  it('should add a new subscriber to the list', () => {
    const subscriber = vi.fn()

    pubsub.subscribe(subscriber)

    expect(pubsub['subscribers']).toContain(subscriber)
  })

  it('should remove a subscriber from the list', () => {
    const subscriber1 = vi.fn()
    const subscriber2 = vi.fn()

    pubsub.subscribe(subscriber1)
    pubsub.subscribe(subscriber2)
    pubsub.unsubscribe(subscriber1)

    expect(pubsub['subscribers']).not.toContain(subscriber1)
    expect(pubsub['subscribers']).toContain(subscriber2)
  })

  it('removes all subscribers from the list', () => {
    const pubsub = new PubSub()
    const subscriber1 = vi.fn()
    const subscriber2 = vi.fn()
    pubsub.subscribe(subscriber1)
    pubsub.subscribe(subscriber2)
    pubsub.unsubscribeAll()
    expect(pubsub['subscribers']).toHaveLength(0)
  })

  it('calls all subscribers with the published data', () => {
    const subscriber1 = vi.fn()
    const subscriber2 = vi.fn()

    pubsub.subscribe(subscriber1)
    pubsub.subscribe(subscriber2)
    const testData = { foo: 'bar' }
    pubsub.publish(testData)

    expect(subscriber1).toHaveBeenCalledWith(testData)
    expect(subscriber2).toHaveBeenCalledWith(testData)
  })
})
