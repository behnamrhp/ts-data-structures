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
    const indexOfVer2inVer1 = this.adjacencyList[vertex1]!.indexOf(vertex2)
    this.adjacencyList[vertex1]!.splice(indexOfVer2inVer1, 1)
    const indexOfVer1inVer2 = this.adjacencyList[vertex2]!.indexOf(vertex1)
    this.adjacencyList[vertex2]!.splice(indexOfVer1inVer2, 1)
  }

  /* -------------------------------------------------------------------------- */
}

const graph = new Graph()

graph.addVertex('Tokyo')
graph.addVertex('Aspen')
graph.addEdge('Tokyo', 'Dallas')
graph.addEdge('Aspen', 'Dallas')
graph.removeEdge('Tokyo', 'Dallas')


console.log(graph.adjacencyList)