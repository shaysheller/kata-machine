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
