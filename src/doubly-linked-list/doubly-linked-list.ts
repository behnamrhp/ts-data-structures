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

  pop(): undefined | Node {
    // check if there is no head return undefined
    if (!this.head) return undefined
    // save tail in a variable
    const tailToRmove = this.tail
    // check if length is one set head and tail to null
    if (this.length === 1) {
      this.head = null
      this.tail = null
      this.length--
      return undefined
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
    return tailToRmove || undefined
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

  insert(index: number, val: unknown): boolean {
    // if index is less than zero or higher than length return null
    if (index < 0 || index > this.length) return false
    // if index is zero unshift and return true
    if (index === 0) {
      this.unshift(val)
      return true
    }
    // if index is equal lenght will be push and return true
    if (index === this.length) {
      this.push(val)
      return true
    }
    // make new node
    const newNode = new Node(val)
    // get prev node by index - 1
    const prevNode = this.get(index - 1) as Node
    // get next node 
    const nextNode = prevNode.next as Node
    // set prev of next node to new node 
    nextNode.prev = newNode
    // set next of prev node to new node
    prevNode.next = newNode
    // set prev of new node to prev node
    newNode.prev = prevNode
    // set next of new node to next node
    newNode.next = nextNode
    // increase length
    this.length++
    // return true
    return true
  }

  remove(index: number): undefined | Node {
    // if index is less than zero or higher than length return null
    if (index < 0 || index > this.length) return undefined
    // if zero -> shift
    if (index === 0) return this.shift()
    // if equal length - 1 -> pop
    if (index === this.length - 1) return this.pop()
    // get node
    const node = this.get(index) as Node
    // get prev
    const prev = node.prev as Node
    // get next
    const next = node.next as Node
    // set next of prev as got next
    prev.next = next
    // set prev of next as got prev
    next.prev = prev
    // set prev and next of found node to null
    node.next = null
    node.prev = null
    // decrease length
    this.length--
    // return node
    return node
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
// console.log(list.get(3))
list.insert(1, 'from')
list.remove(1)

console.log(list.head)
// console.log(list.tail)

export {}