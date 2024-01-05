class Node {
  next: Node | null

  val: unknown

  constructor(val: unknown) {
    this.val = val 
    this.next = null
  }
}

class Stack {
  first: Node | null

  last: Node | null

  length: number

  constructor() {
    this.first = null
    this.last = null
    this.length = 0
  }

  push(val: unknown) {
    // make node
    const newNode = new Node(val)
    // check if length equal zero
    if (this.length === 0) {
      // set first and last to zero
      this.first = newNode
      this.last = newNode
      // increment length
      this.length++
      return;
    }
    // save first to a variable
    const defaultFirstNode = this.first as Node
    // set first to new node
    this.first = newNode
    // set next of new node to save default first node
    newNode.next = defaultFirstNode
    // increment
    this.length++
    return;
  }

  pop(): null | Node {
    // if length is zero return null
    if (this.length === 0) return null
    // save first node to a variable
    const nodeToRemove = this.first as Node
    // if length is one 
    if (this.length === 1) {
      // set first and last as null 
      this.first = null
      this.last = null
      // decrement length
      this.length--
      // return node
      return nodeToRemove;
    }
    // set first property as next node
    this.first = nodeToRemove.next
    // set the next of save node to null
    nodeToRemove.next = null
    // decrement length
    this.length--
    // return node
    return nodeToRemove
  }
}

const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
console.log(stack)
stack.pop()
console.log(stack)
export {}