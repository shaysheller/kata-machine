type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }
    deque(): T | undefined {
        if (!this.head) return;
        if (this.head === this.tail) {
            let tmp = this.tail;
            this.head = this.tail = undefined;
            this.length--;
            return tmp.value;
        }
        this.length--;
        let tmp = this.head;
        this.head = this.head.next;
        tmp.next = undefined;
        return tmp.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}

// const q = new Queue<number>();
// q.enqueue(5);
// q.enqueue(7);
// q.enqueue(9);
// console.log(q);

// console.log(q.deque());
// console.log(q.length);
// console.log(q.peek());
// q.deque();
// q.deque();
// q.deque();
// q.enqueue(69);
// console.log(q.peek());
