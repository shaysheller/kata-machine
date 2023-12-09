const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

const walk = (
    maze: string[],
    curr: Point,
    wall: string,
    end: Point,
    seen: boolean[][],
    path: Point[],
) => {
    if (
        curr.x < 0 ||
        curr.y < 0 ||
        curr.x >= maze[0].length ||
        curr.y >= maze.length
    ) {
        return false;
    } else if (maze[curr.y][curr.x] === wall) {
        return false;
    } else if (seen[curr.y][curr.x]) {
        return false;
    } else if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }
    console.log("hi");
    path.push(curr);
    seen[curr.y][curr.x] = true;
    console.log(path);

    for (let i = 0; i < dirs.length; i++) {
        const [x, y] = dirs[i];
        if (
            walk(maze, { x: curr.x + x, y: curr.y + y }, wall, end, seen, path)
        ) {
            return true;
        }
    }

    path.pop();
    return false;
};

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, start, wall, end, seen, path);
    console.log(path);
    return path;
}

// want an array that stores coordinates we visit.
// return [point, ...recurse()];

const maze = [
    "xxxxxxxxxx x",
    "x        x x",
    "x        x x",
    "x xxxxxxxx x",
    "x          x",
    "x xxxxxxxxxx",
];
// console.log(solve(maze, "x", { x: 10, y: 0 }, { x: 1, y: 5 }));
const lowestUnseen = (seen: boolean[], dist: number[]): number => {
    let idx = -1;

    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        let curr = dist[i];

        if (lowestDistance > curr && !seen[i]) {
            lowestDistance = curr;
            idx = i;
        }
    }
    return idx;
};

const hasUnvisited = (seen: boolean[], dist: number[]): boolean => {
    return seen.some((s, i) => !s && dist[i] < Infinity);
};

const dijkstra = (
    start: number,
    end: number,
    arr: WeightedAdjacencyList,
): number[] => {
    const seen = new Array(arr.length).fill(false);
    const dist = new Array(arr.length).fill(Infinity);
    const prev = new Array(arr.length).fill(-1);
    dist[start] = 0;

    while (hasUnvisited(seen, dist)) {
        const curr = lowestUnseen(seen, dist);
        seen[curr] = true;

        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }

            let newDist = dist[i] + edge.weight;
            if (newDist < dist[edge.to]) {
                dist[edge.to] = newDist;
                prev[edge.to] = curr;
            }
        }
    }
    const out: number[] = [];
    let curr = end;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(curr);

    return out.reverse();
};

const list1: WeightedAdjacencyList = [];

//      (1) --- (4) ---- (5)
//    /  |       |       /|
// (0)   | ------|------- |
//    \  |/      |        |
//      (2) --- (3) ---- (6)
list1[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 },
];
list1[1] = [
    { to: 0, weight: 3 },
    { to: 2, weight: 4 },
    { to: 4, weight: 1 },
];
list1[2] = [
    { to: 1, weight: 4 },
    { to: 3, weight: 7 },
    { to: 0, weight: 1 },
];
list1[3] = [
    { to: 2, weight: 7 },
    { to: 4, weight: 5 },
    { to: 6, weight: 1 },
];
list1[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 },
];
list1[5] = [
    { to: 6, weight: 1 },
    { to: 4, weight: 2 },
    { to: 2, weight: 18 },
];
list1[6] = [
    { to: 3, weight: 1 },
    { to: 5, weight: 1 },
];

console.log(dijkstra(0, 6, list1));
