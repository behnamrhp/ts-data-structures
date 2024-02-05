export default class WeightedGraph {
/* ------------------------------- Attributes ------------------------------- */
  adjacencyList: Record<string, {node: string, weight: number}[]>;

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
  addEdge(vertex1: string, vertex2: string, weight: number) {
    if (!this.adjacencyList[vertex1]) this.addVertex(vertex1)
    if (!this.adjacencyList[vertex2]) this.addVertex(vertex2)
    this.adjacencyList[vertex1]?.push({node: vertex2, weight})
    this.adjacencyList[vertex2]?.push({node: vertex1, weight})
  }

/* -------------------------------------------------------------------------- */
}