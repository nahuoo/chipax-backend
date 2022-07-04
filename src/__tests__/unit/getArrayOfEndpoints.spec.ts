import { getArrayOfEndpoints } from '../../src/utils/getArrayOfEndpoints'

describe('getArrayOfEndpoints', () => {
  it('should return an array with 3 endpoints', () => {
    const arrayOfEndpoints = getArrayOfEndpoints()

    expect(arrayOfEndpoints).toEqual([Number, Number, Number])
  })
})
