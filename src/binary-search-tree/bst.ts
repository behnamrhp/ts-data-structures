class Node {
  value: number;

  right: Node | null

  left: Node | null

  constructor(value: number) {
    this.value = value;
    this.right = null
    this.left = null
  }
}

export default class BST {
  root: Node | null

  constructor() {
    this.root = null
  }

  insert(value: number) {
    // Create new node
    const newNode = new Node(value)
    // If there is no root set it as our root
    if (!this.root) {
      this.root = newNode;
      return newNode
    }
    // Make loop  to get node
    const recursiveInsert = (node: Node): Node => {
      // Check if greater
      if (newNode.value >= node.value) {
        // if not exists put as its right and return
        if (!node.right) {
          node.right = newNode
          return newNode
        } else {
          // if exists recursive 
          return recursiveInsert(node.right)
        }
      } else if(newNode.value < node.value) {
        // Check if less
        if (!node.left) {
          // if not exists put as its right and return
          node.left = newNode
          // if exists recursive 
          return newNode
        } else {
          return recursiveInsert(node.left)
        }
          
      }
      return newNode
    }

    return recursiveInsert(this.root)
  }

  find(value: number): null | Node {
    if (!this.root) return null

    // Make loop to get node and check its value
    const recursiveFind = (node: Node): null | Node => {
      // if value equal to node value return
      if (node.value === value) return node
      // if greater and greater node exists recursive loop
      if (value > node.value && node.right) return recursiveFind(node.right)
      // if greater and greater node not exists return null
      if (value > node.value && !node.right) return null
      // if less and less node exists recursive loop
      if (value < node.value && node.left) return recursiveFind(node.left)
      // if less and less node not exists return null
      if (value < node.value && !node.left) return null

      return null
    }

    return recursiveFind(this.root)
  }

  /**
   * Breath first traversal
   */
  bfsTraversal() {
    if (!this.root) return []
    // Create queue
    // const queue = new Queue<Node>()
    const queue: Node[] = []
    // Create visited array
    const visited: number[] = []
    // Enqueue root on a node of queue
    queue.push(this.root)
    // Loop through the queque
    const recursiveTravers = () => {
      // Base case if queue size is zero break the loop
      if (!queue.length) return;
      // Dequeue from queue
      const node = queue.shift() as Node
      // Push dequeued to visited
      visited.push(node.value)
      // Check if there is left property of dequeued add to queue
      if (node?.left) {
        queue.push(node.left)
      }
      // Check if there is right property of dequeued add to queue
      if (node?.right) {
        queue.push(node.right)
      }
      recursiveTravers()
    }
    recursiveTravers()
    // return visited
    return visited
  }

}

const bst = new BST()

bst.root = new Node(10)
bst.root.left = new Node(5)
bst.root.right = new Node(15)
bst.root.left.left = new Node(4)
bst.root.left.right = new Node(6)
bst.insert(12)
console.log('found node', bst.find(15))
console.log('traversed', bst.bfsTraversal())