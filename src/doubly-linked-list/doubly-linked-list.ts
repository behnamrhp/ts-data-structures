class Node {
  val: unknown;
  
  next: Node | null;
  
  prev: Node | null;

  constructor(val: unknown) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  head: Node | null;

  tail: Node | null;

  length: number
  
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: unknown) {
    // make new node for val
    const newTail = new Node(val)
    // check there is no head so put head and tail to new node
    if (!this.head || !this.tail) {
      this.head = newTail
      this.tail = newTail
      this.length++
      return this
    }
    // if there is head get default tail
    const defaultTail = this.tail
    // set next for default tail to this new node
    defaultTail.next = newTail
    // set new node as new tail
    this.tail = newTail 
    // set prev of new node as default tail
    newTail.prev = defaultTail
    // increase length 
    this.length++
    // return class
    return this
  }

  pop() {
    // check if there is no head return undefined
    if (!this.head) return undefined
    // save tail in a variable
    const tailToRmove = this.tail
    // check if length is one set head and tail to null
    if (this.length === 1) {
      this.head = null
      this.tail = null
      this.length--
      return null
    }
    const prevTail = (this.tail as Node).prev as Node
    // update tail to be previous node
    this.tail = prevTail
    // update tail next to be null
    prevTail.next = null;
    (tailToRmove as Node).prev = null;
    // decrement the length 
    this.length--
    // return removed node
    return tailToRmove
  }

  shift() {
    // if length is zero return undefined
    if (this.length === 0) return undefined
    // save old head
    const oldHead = this.head as Node
    // if lenght is 1 
    if (this.length === 1){
      // set head to null
      this.head = null
      // set tail to null
      this.tail = null
      // decrease 
      this.length--
      // return old head
      return oldHead
    }
    // save next of old head as new head
    this.head = oldHead?.next as Node
    // set prev of head as null
    this.head.prev = null
    // set next of old head as null
    oldHead.next = null
    // return old head
    return oldHead
  }

  unshift(val: unknown) {
    // make new node
    const newNode = new Node(val)
    // check if lenght is 0 
    if (this.length === 0) {
      // set head to new node
      this.head = newNode
      // set tail to new node
      this.tail = newNode
      // increment
      this.length++
      // return list
      return this
    }
    // set prev of head to new node
    (this.head as Node).prev = newNode 
    // set next of new node to head
    newNode.next = this.head
    // set head to new node
    this.head = newNode
    // increment
    this.length++
    // return list
    return this
  }

  get(index: number): null | Node {
    // if index is less than zero or equal or higher than length return null
    if (index < 0 || index >= this.length) return null

    const isIndexLessThanMiddle = index <= this.length / 2
    console.log('iss', isIndexLessThanMiddle)
    // check if index is equal of less then middle of the length
    if (isIndexLessThanMiddle) {
      // make variable to return at last as head
      let currentNode = this.head as Node | null
      let i = 0
      // make loop from zero to less than index 
      while (i !== index) {
        // make i incremented
        i++
        // set variable as next of currnt
        currentNode = currentNode?.next || null
      }
      // return variable
      return currentNode
    }
    // make variable to return at last as tail
    let currentNode = this.tail as Node | null
    let i = this.length - 1
    // make loop from length - 1 to (whole minus index) decremental
    const reversedIndexFromEnd = this.length - index
    while (i !== reversedIndexFromEnd) {
      // make i decremented
      i--
      // set variable as prev of current
      currentNode = currentNode?.prev || null
    }
    // return variable
    return currentNode
  }

  set(index: number, val: unknown): boolean {
    // get node by index
    const node = this.get(index)
    // if it not exists return false
    if (!node) return false
    // otherwise set val of node to new node
    node.val = val
    // return true 
    return true
  }
}

const list = new DoublyLinkedList()

list.push("hello")
list.push("world")
list.push("to")
list.push("behnam")
list.pop()
list.shift()
list.unshift("hello again")
console.log(list.get(3))
// console.log(list.head)
// console.log(list.tail)

export {}