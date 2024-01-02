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
}

export {}