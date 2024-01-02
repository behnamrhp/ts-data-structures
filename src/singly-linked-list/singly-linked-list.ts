class Node {
  next: Node | null;

  val: unknown | null

  constructor(val: unknown) {
      this.next = null;
      this.val = val
  }
}

class SinglyLinkedList {
  head: null | Node

  tail: null | Node

  length: number

  constructor(){
      this.head = null;
      this.tail = null;
      this.length = 0;
  }
  
  push(val: unknown) {
      // make related node
      const newNode = new Node(val)
      // check if there is no head assign
      if (!this.head) {
          this.head = newNode
          this.tail = newNode
      }
      // check if there is tail add to its next
      if (this.tail) {
          this.tail.next = newNode
          this.tail = newNode
      }
      // plus lenght
      this.length++

      return this;
  }

  traverse() {
      let current = this.head;
      while(current) {
          console.log(current.val)
          current = current.next
      }
  }


  pop() {
      if (!this.head) return undefined;
      let current = this.head;
      while(current?.next?.next) {
          current = current.next
      }
      this.tail = current
      this.tail.next = null;
      this.length--
      if (this.length === 0) {
          this.head = null;
          this.tail = null
      }
      return current
  }

  shift() {
    if (!this.head) return undefined
    // get next after head
    const newHead = this.head.next
    // set new header as next
    this.head = newHead
    // decrease length
    this.length--
    return this.head
  }

  unShift(val: unknown) {
    // make new node for new head
    const newHead = new Node(val)
    // check if head not exists add newly created next to the head
    newHead.next = this.head
    if (!this.head) {
        this.tail = newHead
    }
    // set head to new node
    this.head = newHead
    // increase length
    this.length++
    // return new head
    return newHead
  }

  get(index: number): Node | null {
    // check index with length to see if equal or greated than it return null
    if (index < 0 || index >= this.length) return null
    // make loop from zero to index to get val
    let i = 0;
    let nodeToGet = this.head
    while(i !== index) {
        nodeToGet = nodeToGet?.next || null
        i++
    }
    // return data
    return nodeToGet;
  }

  set(index: number, val: unknown): boolean {
    // get related node
    const node = this.get(index)
    // check node exists
    if (!node) return false
    // update value of node
    node.val = val
    // return true
    return true
  }

  insert(index: number, val: unknown): boolean {
    if (index < 0 || index > this.length) return false
    // check if zero will be unshift
    if (index === 0) {
        this.unShift(val)
        return true
    }
    // chekc if at end will be push
    if (index === this.length) {
        this.push(val)
        return true
    }
    // get prev node
    const prevNode = this.get(index - 1) as Node
    // save default next
    const defaultNext = prevNode.next
    // make new node
    const newNode = new Node(val)
    // set default next to new node
    newNode.next = defaultNext
    // set next for new node in next of prev node
    prevNode.next = newNode
    // increase length
    this.length++
    // return true
    return true
  }

  remove(index: number): boolean {
    if (index < 0 || index > this.length ) return false
    // check if zero so will be shift
    if (index === 0) {
        this.shift()
        return true
    }
    // check if equal length will be pop
    if (index === this.length) {
        this.pop()
        return true
    }
    // get prev node to remove
    const prevNode = this.get(index - 1) as Node
    // save next of next prev node to a temp
    const tempNode = prevNode.next?.next || null
    // set temp next to prev node
    prevNode.next = tempNode
    // decrease length
    this.length--
    // return true
    return true
  }

  reverse() {
    if (!this.head || !this.tail) return;
    // make variable to save current node that should be next for next node
    let currentNodeToBeNext = this.head
    // make var to save prev node to check
    let prevNode: null | Node = null
    // switch between head and tail
    this.head = this.tail as Node
    this.tail = currentNodeToBeNext
    // make loop untile we have no next
    for(let i = 0; i < this.length; i++) {
        // save next node to a temp
       const tempNext: Node = currentNodeToBeNext.next as Node
       // save next node as prev
        currentNodeToBeNext.next = prevNode
        // save current node to prev
        prevNode = currentNodeToBeNext
       // save temp next node as currentNodeTobeNext
       currentNodeToBeNext = tempNext
    }
  }
  
}

const singlyLinkedList = new SinglyLinkedList()


singlyLinkedList.push("hello")
singlyLinkedList.push("all")
singlyLinkedList.push("world")
console.log('get', singlyLinkedList.get(1))
singlyLinkedList.insert(1, "from")
singlyLinkedList.insert(3, "to")
console.log('head', singlyLinkedList.head)
console.log('tail', singlyLinkedList.tail)
console.log('--traverse--')
singlyLinkedList.traverse()
console.log('--reverse--')
singlyLinkedList.reverse()
console.log('---traverse---')
singlyLinkedList.traverse()
export {}