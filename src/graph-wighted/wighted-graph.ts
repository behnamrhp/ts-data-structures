class PriorityQueue {
/* ------------------------------- Attributes ------------------------------- */
  values: {val: string, priority: number}[]

/* ------------------------------- Constructor ------------------------------ */
  constructor(){
    this.values = [];
  }

/* ----------------------------- Implementation ----------------------------- */
  enqueue(val: string, priority: number) {
    this.values.push({val, priority});
    this.sort();
  };

/* -------------------------------------------------------------------------- */
  dequeue() {
    return this.values.shift();
  };

/* -------------------------------------------------------------------------- */
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  };
/* -------------------------------------------------------------------------- */
}

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
  dijkstra(startVX: string, finishVX: string): string | undefined {
    if (!Object.keys(this.adjacencyList).length) return "";
    // Make distance object for each except of start should have infinity
    const distance: Record<string, number> = {};
    // Enqueue to priority queue with priority of infinity except starting 
    //  that should have zero
    const node = new PriorityQueue()
    // Make previous object that keys are verteces and values are null
    const previous: Record<string, null | string> = {}
    // Make path to return at the end
    const path: string[] = []
    // Smallest vertex or highest priority
    let smallest: string | undefined;
    // set init for vertext and node
    for (let vertex in this.adjacencyList) {
      if (vertex === startVX) {
        distance[vertex] = 0
        node.enqueue(vertex, 0)
      } else {
        distance[vertex] = Infinity
        node.enqueue(vertex, Infinity)
      }
      previous[vertex] = null;
    }
    // Start looping as long as there are values in priority queue
    while (node.values.length) {
      //  Dequeue from priority queue
      smallest = node.dequeue()?.val
      //  If this dequed is finish vx so we're done
      if (smallest === finishVX) {
        while(previous[smallest]){ 
          path.push(smallest)
          smallest = previous[smallest] as string
        }
        break;
      } else {
        // If smallest doesn't exist or distance of it was infinity continue
        if (!smallest || distance[smallest] === Infinity) continue;
        // Loop through neighbors of this vertex to check their distances
        for (let neighbor in this.adjacencyList[smallest]) {
          // find related node
          const nextNode = this.adjacencyList[smallest]![neighbor as unknown as number] as {node: string, weight: number};
          // calculate new distance to that neighbor through current vertex
          const distanceCandidate = (distance[smallest] as number) + nextNode.weight
          let neighborVertex = nextNode.node
          // if distance to neighbor through current vertex is less than 
          //  current distance of this neighbor in distances
          if (distanceCandidate < (distance[neighborVertex] as number)) {
            // update distance of neighbor to new calculate
            distance[neighborVertex] = distanceCandidate
            // update previous of neighbor to current smalles vertex
            previous[neighborVertex] = smallest
            // enqueue nighbor with new calculate to 
            node.enqueue(neighborVertex, distanceCandidate)
          }
        }          
      }
    }
    return path.concat(smallest as string).reverse().join(", ")
  }

/* -------------------------------------------------------------------------- */
}

var graph = new WeightedGraph()
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);
// console.log(graph.adjacencyList)

console.log(graph.dijkstra("A", "E"));
graph.addEdge("C","F", 4);