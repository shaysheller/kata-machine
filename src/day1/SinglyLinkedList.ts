type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        const head = this.head;
        this.head = node;
        this.head.next = head;
        return;
    }
    insertAt(item: T, idx: number): void {}
    append(item: T): void {
        if (!this.tail) {
            this.prepend(item);
            return;
        }
        const node = { value: item } as Node<T>;
        length++;
        this.tail.next = node;
        this.tail = node;
    }

    // removing at head -> reassign head (could be new node or could be null)
    // removing at tail -> reassign tail to previous node
    // removing in middle -> don't think there is anything
    // must adjust length after every removal
    remove(item: T): T | undefined {
        if (!this.head) return;

        let curr = this.head;
        if (curr === this.head && curr === this.tail) {
            let node = this.head;
            this.head = this.tail = undefined;
            return node.value;
        } else if (curr === this.head) {
            let node = this.head;
            this.head = this.head.next;
            node.next = undefined;
            return node.value;
        } else if (curr === this.tail) {
        }

        while (curr !== undefined && curr.next !== undefined) {
            if (curr.next.value === item) {
                this.length--;
            }
        }
    }
    get(idx: number): T | undefined {
        if (idx >= this.length) return;
        let curr = this.head;

        while (curr !== null && curr !== undefined && idx > 0) {
            curr = curr.next;
            idx--;
        }

        return curr?.value;
    }
    removeAt(idx: number): T | undefined {}
}
