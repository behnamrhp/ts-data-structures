import { switchTwoElementsOfArray } from "../helpers/global-helpers"

class MaxBinaryHeap {
  list: number[]
  
  constructor() {
    this.list = []
  }

  insert(value: number) {
    // Push to list
    this.list.push(value)
    if (this.list.length === 1) return;
    // Loop to get parent and check and swap
    const bubbleUp = (valueIndex: number) => {
      // Get parent index
      const parentIndex = this.getParentIndex(valueIndex)
      // Get parent value
      const parentValue = this.list[parentIndex] as number
      // If parent value more then value  
      if (parentValue < value) {
        // Switch value with parent
        switchTwoElementsOfArray(this.list, parentIndex, valueIndex)
        // recursive call with parent index
        bubbleUp(parentIndex)
      }
      return;
    }
    bubbleUp(this.list.length - 1)
    // return list
    return this.list
  }

  
  /**
   * @param i index of value to get parent of it
   * @returns value of parent node
   */
  private getParentIndex(index: number): number {
    return Math.floor((index-1)/2)
  }
}

const mbh = new MaxBinaryHeap()

mbh.insert(100)
mbh.insert(33)
mbh.insert(39)
mbh.insert(35) 
mbh.insert(60) 
mbh.insert(70) 
//         100
//    60       70
//  33  35   39
// [100, 60, 70, 33, 35, 39]
console.log(mbh.list)