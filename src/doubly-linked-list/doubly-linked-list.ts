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
}

const list = new DoublyLinkedList()

list.push("hello")
list.push("world")
list.push("to")
list.push("behnam")
list.pop()
console.log(list.head?.next)
console.log(list.tail)

export {}