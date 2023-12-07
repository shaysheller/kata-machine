export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Set();
    const path: number[] = [];
    if (!graph.length) return null;

    const helper = (node: number) => {
        if (seen.has(node)) return false;
        if (node === needle) {
            path.push(node);
            return true;
        }
        seen.add(node);
        const arr = graph[node];
        path.push(node);
        for (const { to, weight } of arr) {
            if (helper(to)) return true;
        }
        path.pop();
        return false;
    };

    helper(source);

    return path;
}

const list2: WeightedAdjacencyList = [];

//     >(1)<--->(4) ---->(5)
//    /          |       /|
// (0)     ------|------- |
//    \   v      v        v
//     >(2) --> (3) <----(6)
list2[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 },
];
list2[1] = [{ to: 4, weight: 1 }];
list2[2] = [{ to: 3, weight: 7 }];
list2[3] = [];
list2[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 },
];
list2[5] = [
    { to: 2, weight: 18 },
    { to: 6, weight: 1 },
];
list2[6] = [{ to: 3, weight: 1 }];

console.log(dfs(list2, 0, 6));

/*
    I think we need to keep track of the index we're on - starting at 0. 
    enter into helper, get the array that we aer looking at then foreach the array
    if we ever run into something with elem.to === needle return true;
    if we ever run into a cycle return false
    if we make it ot the end return false

    we also want a path associated with what we did.

    this means probably add to path -> recurse -> Remove from path if not true

*/
