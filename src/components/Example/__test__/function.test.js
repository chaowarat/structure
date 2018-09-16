import { builder } from '../core';

describe('example component test suite for', function () {
  it('builder build a correct object value', () => {
    const pre = "Hello", name = "C";
    const expectedObj = {
      fullText: "Hello C"
    };
    expect(builder(pre, name)).toEqual(expectedObj);
  });

  it('builder must have "fullText" attribute', () => {
    const pre = "Hello", name = "C";
    expect(builder(pre, name).fullText).toBeDefined();
  });
});
