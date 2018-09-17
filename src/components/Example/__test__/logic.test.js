import { builder } from '../stringBuilder'

describe('example component test suite for', function () {
  it('builder build a correct object value', () => {
    const pre = "Hello", name = "C"
    const expectedObj = {
      fullText: "Hello C"
    }
    expect(builder(pre, name)).toEqual(expectedObj)
  })

  it('builder must have "fullText" attribute', () => {
    const pre = "Hello", name = "C"
    expect(builder(pre, name).fullText).toBeDefined()
  })

  it('builder must only return an object', () => {
    const pre = "Hello", name = "C"
    expect(typeof (builder(pre, name)) === 'object').toBeTruthy()
  })

  it('fullText should be a string', () => {
    const pre = "Hello", name = 222
    expect(typeof (builder(pre, name).fullText) === 'string').toBeTruthy()
  })
})
