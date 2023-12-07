export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    // delete the first node take the bottom node and heapify down
    delete(): number {
        if (this.length === 0) return -1;
        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];

            return out;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        console.log(this.data[0]);
        return out;
    }

    private getParent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);
        if (idx >= this.length || lIdx >= this.length) return;

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        if (lV < rV && v > lV) {
            this.data[lIdx] = v;
            this.data[idx] = lV;
            this.heapifyDown(lIdx);
        } else if (rV < lV && v > rV) {
            this.data[rIdx] = v;
            this.data[idx] = rV;
            this.heapifyDown(rIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx <= 0) {
            return;
        }

        let upIdx = this.getParent(idx);
        let upValue = this.data[upIdx];

        if (upValue > this.data[idx]) {
            this.data[upIdx] = this.data[idx];
            this.data[idx] = upValue;

            this.heapifyUp(upIdx);
        }
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
// const heap = new MinHeap();
// heap.insert(5);
// heap.insert(3);
// heap.insert(69);
// heap.insert(420);
// heap.insert(4);
// heap.insert(1);
// heap.insert(8);
// heap.insert(7);
// console.log(heap);
// console.log(heap.delete());
// console.log(heap);
// console.log(heap.delete());
