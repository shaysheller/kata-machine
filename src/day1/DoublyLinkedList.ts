type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;
        let node = { value: item } as Node<T>;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        return;
    }
    insertAt(item: T, idx: number): void {}
    append(item: T): void {
        this.length++;
        let node = { value: item } as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
        return;
    }
    remove(item: T): T | undefined {
        if (this.length === 0 || !this.head) {
            return;
        }

        if (item === this.head.value) {
            if (this.length === 1) {
                this.head = this.tail = undefined;
            } else {
                this.head = this.head.next;
            }
            this.length--;
            return item;
        }

        let curr = this.head;
        console.log(this);
        while (
            curr !== undefined &&
            curr.next !== undefined &&
            curr.value !== item
        ) {
            // console.log(curr);
            if (curr.next !== undefined) {
                curr = curr.next;
            }
        }
        if (curr.value !== item) return;
        if (curr !== undefined) {
            this.length--;
            if (this.tail === curr) {
                this.tail = this.tail.prev;
                curr.prev = undefined;
                this.tail!.next = undefined;
                return item;
            }
            let prev = curr.prev;
            prev!.next = curr.next;
            curr.next = undefined;
            curr.prev = undefined;

            return curr.value;
        }
        return;
    }
    get(idx: number): T | undefined {
        if (idx >= this.length) return;
        let curr = this.head;
        while (idx > 0 && curr !== undefined) {
            idx--;
            curr = curr.next;
        }
        // console.log(curr);
        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return;
        } else if (!this.head) return;

        if (idx === 0) {
            let value = this.head;
            this.head = this.head.next;
            this.length--;
            if (this.length === 0) {
                this.tail = this.head;
            }
            return value.value;
        }
        this.length--;
        if (this.length === idx) {
            let value = this.tail;
            this.tail = this.tail?.prev;
            value!.prev = undefined;
            this.tail!.next = undefined;
            return value?.value;
        }

        let curr = this.head;
        while (curr !== undefined && idx > 0) {
            if (curr.next !== undefined) {
                curr = curr.next;
            }

            idx--;
        }

        if (
            curr !== undefined &&
            curr.prev !== undefined &&
            curr.next !== undefined
        ) {
            let prev = curr.prev;
            let next = curr.next;
            next.prev = prev;
            prev.next = curr.next;
            curr.next = undefined;
            curr.prev = undefined;
            return curr.value;
        }
        return;
    }
}

const a = new DoublyLinkedList<number>();
a.prepend(2);
a.prepend(3);
a.append(1);
a.append(0);

// console.log(a);
// console.log(a.length);
// console.log(a.remove(0));
// console.log(a.length);
// console.log(a.head.value);
// console.log(a.tail.value);
