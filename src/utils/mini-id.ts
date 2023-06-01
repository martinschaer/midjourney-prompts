export const miniId = (len = 3) => {
  return Math.floor(Math.random() * (Math.pow(2, 4 * len) - 1))
    .toString(16)
    .padStart(len, '0')
}

// ----------------------------------------------------------------------------
// Tests
//
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest

  const samples = 10000
  let log: string[] = []
  let repeated = 0

  const create_test = (len: number) => {
    test(`mini id length ${len}`, () => {
      let result = ''
      log = []
      repeated = 0
      for (let i = 0; i < samples; i++) {
        result = miniId(len)
        if (log.includes(result)) repeated++
        log.push(result)
        expect(result.length).toBe(len)
      }
      console.log(log)
      console.log(`Repeated: ${repeated}`)
    })
  }

  create_test(3)
  create_test(6)
  create_test(9)
}
// ----------------------------------------------------------------------------
