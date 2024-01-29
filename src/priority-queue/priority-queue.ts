import { switchTwoElementsOfArray } from "../helpers/global-helpers"

class Node {
  value: unknown

  priority: number

  constructor(value: unknown, priority: number) {
    this.value = value
    this.priority = priority
  }
}

export default class PriorityQueue {
  list: Node[]
  
  constructor() {
    this.list = []
  }

  /**
   * Add new value as last node then checks if it is bigger than parent to 
   *  swap its place with parent recursively
   */
  insert(value: unknown, priority: number) {
    // make Node 
    const node = new Node(value, priority)
    // Push to list
    this.list.push(node)
    if (this.list.length === 1) return;
    // Loop to get parent and check and swap
    const bubbleUp = (valueIndex: number) => {
      // Get parent index
      const parentIndex = this.getParentIndex(valueIndex)
      if (parentIndex === -1) return;
      // Get parent priority value
      const parentPriority = (this.list[parentIndex] as Node).priority
      // If parent priority more then value  
      if (parentPriority > priority) {
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
  extractMax(): unknown | undefined {
    if (!this.list.length) return;
    if (this.list.length === 1) return this.list.pop()?.value
    // Swap least and root
    switchTwoElementsOfArray(this.list, 0, this.list.length - 1)
    // Save and pop last method
    const poppedRoot = this.list.pop()
    // Make loop through list to check and swap current node with two next ones
    const recursiveSwapAndCheck = (nodeIndex: number) => { 
      // save node's index as biggest
      let HighestPriorityIndex = nodeIndex
      const nodePriority = (this.list[nodeIndex] as Node).priority
      // Get next left node
      const leftNodeIndex = nodeIndex + 1
      const leftPriority = (this.list[leftNodeIndex] as Node).priority
      // Get next right node
      const rightNodeIndex = nodeIndex + 2
      const rightPriority = (this.list[rightNodeIndex] as Node).priority
      // Check if node priority less than left priority update highest priority node's index with left
      if (leftPriority < nodePriority) {
        HighestPriorityIndex = leftNodeIndex
      }
      // Check if node less than right udpate biggest node's index with right
      if (rightPriority < nodePriority && rightPriority < (this.list[HighestPriorityIndex] as Node).priority) {
        HighestPriorityIndex = rightNodeIndex
      }
      // If biggest node's index is not equal as node's index replace them with together
      if (nodeIndex !== HighestPriorityIndex) {
        // swap
        switchTwoElementsOfArray(this.list, nodeIndex, HighestPriorityIndex)
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

const mbh = new PriorityQueue()

mbh.insert('Fever', 3)
mbh.insert('Concussion', 2)
mbh.insert('Head explosion', 1)
mbh.insert('Drunk', 4) 
mbh.insert('Got cold', 3) 
mbh.insert('Flue', 3) 
//               Head explosion
//            Fever           Concussion
//   Got cold     Drunk     Flue
console.log(mbh.list)
mbh.extractMax()

console.log('after remove max', mbh.list)