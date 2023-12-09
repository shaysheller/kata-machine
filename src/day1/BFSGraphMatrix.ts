export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    const q = [source];

    do {
        const curr = q.shift() as number;

        let adjList = graph[curr];

        for (let i = 0; i < adjList.length; i++) {
            if (seen[i]) continue;
            if (adjList[i] === 0) continue;
            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }
    } while (q.length);

    const path = [];

    let curr = needle;

    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }

    if (!path.length) return null;
    path.push(source);

    return path.reverse();
}

const matrix2: WeightedAdjacencyMatrix = [
    [0, 3, 1, 0, 0, 0, 0], // 0
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1],
];

console.log(bfs(matrix2, 0, 6));

/*
    keep track with where we're going with a seen array - length of graph.length, this way we can use the ind of the graph
    to determine if we have been to a node or not

    when we land on a node, we will add it's parent to that index. 

    say we need to get to ind 5 entering the graph from point 2

    [-1,-1,-1,4,2,3]


    in this example, if there is no parent we will default the value to -1. if there is a node with parent it will remain -1

    if we can get to the point we want to (in this case 5) we will see it has a parent other than -1. 

    5's parent is 3 3's parent is 4 4's parent is 2 2's parent is nothing (-1) and that makes sense because 
    that's where we were supposed to enter the graph. 

    once we finish we need to loop through the path array starting at arr[goal] and end when we run into -1 but push each node that isn't
    -1 along the way

    once we finish looping we will need to reverse the array and then push the entry node into the array if the path has any length
    if no length just return


*/
