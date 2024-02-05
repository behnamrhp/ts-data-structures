export default class Graph {
  /* ------------------------------- Attributes ------------------------------- */
  adjacencyList: Record<string, string[]>

  /* ------------------------------- Constructor ------------------------------ */
  constructor() {
    this.adjacencyList = {}
  }

  /* ----------------------------- Implementation ----------------------------- */
  addVertex(vertexName: string) {
    if (this.adjacencyList[vertexName]) return;
    this.adjacencyList[vertexName] = []
  }

  /* -------------------------------------------------------------------------- */
  addEdge(vertex1: string, vertex2: string) {
    if (!this.adjacencyList[vertex1]) this.addVertex(vertex1)
    if (!this.adjacencyList[vertex2]) this.addVertex(vertex2)
    this.adjacencyList[vertex1]?.push(vertex2)
    this.adjacencyList[vertex2]?.push(vertex1)
  }

  /* -------------------------------------------------------------------------- */
  removeEdge(vertex1: string, vertex2: string) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return;
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1]!.filter((vertex) => vertex !== vertex2)
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2]!.filter((vertex) => vertex !== vertex1)
  }

  /* -------------------------------------------------------------------------- */
  removeVertex(vertexName: string) {
    if (!this.adjacencyList[vertexName]) return;
    // Loop through all array of vertex and call remove edge
    while(this.adjacencyList[vertexName]!.length) {
      const connectedVertex = this.adjacencyList[vertexName]!.pop() as string
      this.removeEdge(vertexName, connectedVertex)
    }
    delete this.adjacencyList[vertexName]
  }

  /* -------------------------------------------------------------------------- */
  /**
   * Depth First Traversal
   */
  dfTraversal(start: string) {
    // Create result list to return at last
    const resultList: string[] = []
    // Creat Object of visited
    const visited: Record<string, true> = {};

    const adjacencyList = this.adjacencyList;
    // Loop through vertecies with getting vertex
    (function recursiveDfs(vertex?: string) {
      // if empty array return 
      if (!vertex) return null
      // add vertex name to visited
      visited[vertex] = true
      resultList.push(vertex)
      // loop over edges
      adjacencyList[vertex]?.forEach((neighbor) => {
        // if visited continue
        if (visited[neighbor]) return
        // call recursive
        recursiveDfs(neighbor)
      })
    })(start)

    return resultList
  }

  /* -------------------------------------------------------------------------- */
  /**
   * Depth first Iterative Traversal
   */
  dfIterativeTraversal(start: string) {
    // Make base stack
    const stack: string[] = []
    // Make visited
    const visited: Record<string, true> = {}
    // Result list
    const resultList: string[] = []
    // Add start to base stack
    stack.push(start)
    const adjacencyList = this.adjacencyList;
    // While stack has length
    while(stack.length) {
      // Pop Node from start
      const vertex = stack.pop() as string
      // Check if vertex visited continue
      if (visited[vertex]) continue;
      // Mark as visited
      visited[vertex] = true
      // Add to visited
      resultList.push(vertex)
      // Push all neighbours to the stack
      adjacencyList[vertex]?.forEach((neighbor) => {
        // if visited continue
        if (visited[neighbor]) return
        // add to stack
        stack.push(neighbor)
      })
    }
    // return result
    return resultList
  }

  /* -------------------------------------------------------------------------- */
  /**
   * Breadth First Search
   */
  bfsTraversal(start: string) {
    // Create queue
    const queue: string[] = []
    // Create visited object
    const visited: Record<string, true> = {}
    // Create result
    const result: string[] = []
    // Push it to queue
    queue.push(start)
    // Make loop as long as there is something in queue
    while(queue.length) {
      // get node from queue
      const vertex = queue.shift() as string
      // if visited continue
      if (visited[vertex]) continue;
      // mark as visited
      visited[vertex] = true
      // add to result
      result.push(vertex)
      // loop through children
      this.adjacencyList[vertex]?.forEach((neighbor) => {
        // if visited continue
        if (visited[neighbor]) return;
        // enqueue
        queue.push(neighbor)
      })
    }
    // return result
    return result;
  }

  /* -------------------------------------------------------------------------- */
}

const graph = new Graph()

graph.addVertex('Tokyo')
graph.addVertex('Aspen')
graph.addEdge('Tokyo', 'Hongkong')
graph.addEdge('Tokyo', 'Dallas')
graph.addVertex('Senegal')
graph.addEdge('Tokyo', 'Senegal')
graph.addEdge('Aspen', 'Dallas')
console.log(graph.adjacencyList)
graph.removeEdge('Aspen', 'Dallas')
graph.removeVertex('Tokyo')
graph.removeVertex('Aspen')
graph.removeVertex('Senegal')
graph.removeVertex('Hongkong')
graph.removeVertex('Dallas')
/* ------------------- Check with Alphabetic and traverses ------------------ */
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('B', 'D')
graph.addEdge('C', 'E')
graph.addEdge('D', 'E')
graph.addEdge('D', 'F')
graph.addEdge('E', 'F')

console.log(graph.adjacencyList)
console.log(graph.dfTraversal('A'))
console.log(graph.dfIterativeTraversal('A'))
console.log(graph.bfsTraversal('A'))