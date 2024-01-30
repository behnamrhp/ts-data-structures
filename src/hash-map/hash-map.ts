export default class HashMap {
  private keymap: Array<(string[])[]>
  
  constructor(size: number) {
    this.keymap = new Array(size)
  }

  private hash(key: string) {
    const ALetterCharCodeMinusOne = 96;
    let total = 0
    let WEIRD_PRIME = 31

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i] as string;
      const value = char.charCodeAt(0) - ALetterCharCodeMinusOne
      total = (total * WEIRD_PRIME + value) % this.keymap.length
    }
    return total
  }

  private set(key: string, value: string) {
    // Get hashed key
    const index = this.hash(key)
    // Save value in an array
    if (!this.keymap[index]) {
      this.keymap[index] = []
    }
    // Put array in key index of hashMap
    this.keymap[index]?.push([key, value])
  }
}