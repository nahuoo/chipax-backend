import { charCounter } from '../../utils/charCounter'

test('should return a number', () => {
    const names = ['aasdfghjklqAHDEKDHAhekhdaeudho', 'aAJSDjklqweradhekhdaeudho', 'asdfghjklqweradAUDHEJndk']	

    const test = charCounter(names, 'a')

  expect(test).toBeGreaterThanOrEqual(0)
})
