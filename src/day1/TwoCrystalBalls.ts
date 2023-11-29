export default function two_crystal_balls(breaks: boolean[]): number {
    let left = 0;
    let right = breaks.length - 1;
    if (!breaks[right]) return -1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (breaks[mid]) right = mid;
        else if (!breaks[mid]) left = mid + 1;
    }

    return left;
}

const foo = [
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
];
console.log(two_crystal_balls(foo));

/*
    goal: find the first floor where the ball will break

    [false, false, false, false, true, true, true true];




*/
