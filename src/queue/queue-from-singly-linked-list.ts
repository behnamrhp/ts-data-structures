class Node<T extends unknown> {
  next: Node<T> | null

  value: unknown

  constructor(value: T) {
    this.value = value;
    this.next = null
  }
}

export default class Queue<T extends unknown> {
  first: Node<T> | null

  last: Node<T> | null

  size = 0;

  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(value: T) {
    const newQueue = new Node(value)
    // if size is zero pass last and first and increase size
    if (this.size === 0) {
      this.first = newQueue;
      this.last = newQueue;
      return this.size++;
    } 
    // pass next of last to new Queue
    (this.last as Node<T>).next = newQueue
    // set last as new queue
    this.last = newQueue
    // increase size
    this.size++
    return this.size++;
  }

  dequeue(): undefined | T {
    // if there is no first return null
    if (!this.first) return;
    // save first in a variable
    const temp = this.first
    if (this.first === this.last) {
      this.last = null
    } 
    // set next of first as first
    this.first = this.first.next
    // decrease size
    this.size--
    // return saved first
    return temp.value as T
  }
}

const queue = new Queue()
queue.enqueue("First")
queue.enqueue("second")
queue.enqueue("thirt")
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
