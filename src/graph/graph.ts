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
}

const graph = new Graph()

graph.addVertex('Tokyo')
graph.addEdge('Tokyo', 'Newyork')

console.log(graph.adjacencyList)