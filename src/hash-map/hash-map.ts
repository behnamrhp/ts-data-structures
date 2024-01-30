export default class HashMap {
  keymap: Array<(string[])[]>
  
  constructor(size?: number) {
    this.keymap = new Array(size || 53)
  }

  private hash(key: string): number {
    const ALetterCharCodeMinusOne = 96;
    const WEIRD_PRIME = 31
    let total = 0

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i] as string;
      const value = char.charCodeAt(0) - ALetterCharCodeMinusOne
      total = (total * WEIRD_PRIME + value) % this.keymap.length
    }
    return total
  }

  set(key: string, value: string) {
    // Get hashed key
    const index = this.hash(key)
    // Save value in an array
    if (!this.keymap[index]) {
      this.keymap[index] = []
    }
    // Put array in key index of hashMap
    this.keymap[index]?.push([key, value])
  }

  get(key: string) {
    // Get hashed index
    const index = this.hash(key)
    // Get key, value from keymap by index
    const keyValues = this.keymap[index]
    if (!keyValues) return;
    // find related key for our key
    const keyValue = keyValues.find((item) => item[0] === key) || []
    // get second value
    const value = keyValue[1]
    // return
    return value
  }
}

const hashMap = new HashMap()

hashMap.set('white', '#fff')
hashMap.set('black', '#000')


console.log(hashMap.keymap)
console.log('get method', hashMap.get('white'))