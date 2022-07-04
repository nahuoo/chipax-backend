import { getArrayOfEndpoints } from '../../utils/getArrayOfEndpoints'

test('should return an array with 3 endpoints', async () => {
  const arrayOfEndpoints = await getArrayOfEndpoints()

  expect(arrayOfEndpoints.length).toBe(3)
  expect(arrayOfEndpoints[0].length).toBe(126)
  expect(arrayOfEndpoints[1].length).toBe(51)
  expect(arrayOfEndpoints[2].length).toBe(826)
})
