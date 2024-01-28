import { switchTwoElementsOfArray } from "../helpers/global-helpers"

class MaxBinaryHeap {
  list: number[]
  
  constructor() {
    this.list = []
  }

  /**
   * Add new value as last node then checks if it is bigger than parent to 
   *  swap its place with parent recursively
   */
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
   * Remove root from tree
   * It swap last node with root and recursiively checks it is bigger or less then children to
   *  swap to find its place and make heap tree again
   */
  extractMax(): number | undefined {
    if (!this.list.length) return;
    if (this.list.length === 1) return this.list.pop()
    // Swap least and root
    switchTwoElementsOfArray(this.list, 0, this.list.length - 1)
    // Save and pop last method
    const poppedRoot = this.list.pop()
    // Make loop through list to check and swap current node with two next ones
    const recursiveSwapAndCheck = (nodeIndex: number) => { 
      // save node's index as biggest
      let biggestNodeIndex = nodeIndex
      const nodeValue = this.list[nodeIndex] as number
      // Get next left node
      const leftNodeIndex = nodeIndex + 1
      const leftValue = this.list[leftNodeIndex] as number
      // Get next right node
      const rightNodeIndex = nodeIndex + 2
      const rightValue = this.list[rightNodeIndex] as number
      // Check if node less than left update biggest node's index with left
      if (leftValue > nodeValue) {
        biggestNodeIndex = leftNodeIndex
      }
      // Check if node less than right udpate biggest node's index with right
      if (rightValue > nodeValue && rightValue > (this.list[biggestNodeIndex] as number)) {
        biggestNodeIndex = rightNodeIndex
      }
      // If biggest node's index is not equal as node's index replace them with together
      if (nodeIndex !== biggestNodeIndex) {
        // swap
        switchTwoElementsOfArray(this.list, nodeIndex, biggestNodeIndex)
        // recursive call
        recursiveSwapAndCheck(nodeIndex)
      }
    }

    recursiveSwapAndCheck(0)

    // Return popped root 
    return poppedRoot
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

mbh.extractMax()
//         70
//    60      39
//  33  35   
// [100, 60, 70, 33, 35, 39]
console.log(mbh.list)