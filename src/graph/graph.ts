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
}

const graph = new Graph()

graph.addVertex('Tokyo')
graph.addVertex('Aspen')
graph.addEdge('Tokyo', 'Hongkong')
graph.addEdge('Tokyo', 'Dallas')
graph.addVertex('Senegal')
graph.addEdge('Tokyo', 'Senegal')
graph.addEdge('Aspen', 'Dallas')
// graph.removeEdge('Tokyo', 'Dallas')
graph.removeVertex('Tokyo')

console.log(graph.adjacencyList)