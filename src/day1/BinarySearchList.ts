export default function bs_list(haystack: number[], needle: number): boolean {
    let left = 0;
    let right = haystack.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (haystack[mid] < needle) {
            left = mid + 1;
        } else if (haystack[mid] > needle) {
            right = mid - 1;
        } else {
            return true;
        }
    }

    return false;
}

// const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
// console.log(bs_list(foo, 69));
// console.log(bs_list(foo, 1336));
// console.log(bs_list(foo, 69420));
// console.log(bs_list(foo, 69421));
// console.log(bs_list(foo, 1));
// console.log(bs_list(foo, 0));

// const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
// expect(binary_fn(foo, 69)).toEqual(true);
// expect(binary_fn(foo, 1336)).toEqual(false);
// expect(binary_fn(foo, 69420)).toEqual(true);
// expect(binary_fn(foo, 69421)).toEqual(false);
// expect(binary_fn(foo, 1)).toEqual(true);
// expect(binary_fn(foo, 0)).toEqual(false);
