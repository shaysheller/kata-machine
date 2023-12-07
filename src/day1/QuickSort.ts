const partition = (low: number, high: number, arr: number[]) => {
    let idx = low - 1;
    let pivot = arr[high];

    for (let i = low; i < high; i++) {
        if (arr[i] < pivot) {
            idx++;
            let tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    arr[high] = arr[idx + 1];
    arr[idx + 1] = pivot;

    return idx + 1;
};

const qs = (low: number, high: number, arr: number[]) => {
    if (low >= high) return;
    let pivot = partition(low, high, arr);

    qs(low, pivot - 1, arr);
    qs(pivot + 1, high, arr);
};

export default function quick_sort(arr: number[]): void {
    qs(0, arr.length - 1, arr);
}

const a = [3, 4, 7, 9, 42, 69, 420];
const b = [420, 69, 42, 9, 7, 4, 3];
quick_sort(a);
quick_sort(b);
console.log(a);
console.log(b);

/*
    overall plan , pick a number (to keep simple we will pick the number at the high index)

    use 2 pointers to move numbers smaller than pivot to the left, and numbers higher than the pivot to
    the right, I Think you only actually move if the number is smaller

    once you are done for the entire section of the array you're looking at you move the pivot
    to the middle of the values (everything to left of pivvot < pivot and to right of pivot > pivot)

    then I think you return the pivot idx;


    if arr.length <= 1 return the array

    otherwise call partition on it and then qs both sides




*/
