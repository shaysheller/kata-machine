type Node<T> = {
    value?: T;
    next?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;
    // private tail?: Node<T>;

    constructor() {
        this.length = 0;
        // this.head = this.tail = undefined;
        this.head = undefined;
    }

    push(item: T): void {
        let node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            // this.head = this.tail = node;
            this.head = node;
            return;
        }
        node.next = this.head;
        this.head = node;

        return;
    }
    pop(): T | undefined {
        if (!this.head) {
            return;
        }
        this.length--;
        let head = this.head;
        this.head = this.head.next;
        head.next = undefined;
        return head.value;
    }
    peek(): T | undefined {
        if (!this.head) return;
        return this.head.value;
    }
}
