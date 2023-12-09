type Node<T> = {
    value: T;
    next: Node<T> | undefined;
    prev: Node<T> | undefined;
};

function createNode<V>(value: V) {
    return { value: value } as Node<V>;
}

export default class LRU<K, V> {
    private length: number;
    // private list: Node<V>;
    private head?: Node<V>;
    private tail?: Node<V>;
    private mainCache: Map<K, Node<V>>;
    private refCache: Map<Node<V>, K>;
    private maxSize: number;

    constructor(size: number) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.maxSize = size;
        this.mainCache = new Map<K, Node<V>>();
        this.refCache = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        if (!this.mainCache.get(key)) {
            /// create a new node and prepend it to the list
            let currNode = this.mainCache.get(key) as Node<V>;
            let node = createNode(value);
            this.mainCache.set(key, node);
            this.refCache.delete(currNode);
            this.refCache.set(node, key);
            this.prepend(node);

            // must also check if we need to ditch somethign from teh back
        } else {
            let node = this.mainCache.get(key) as Node<V>;
            let ref = this.refCache.get(node);
            let newNode = createNode(value);
            this.mainCache.set(key, newNode);
            this.refCache.set(newNode, key);
            this.refCache.delete(node);
            this.detatch(node);
            this.prepend(node);
        }

        this.length++;

        if (this.length > this.maxSize) {
            this.delete();
        }

        // other wise we must update a node and prepend it
        // must also check if we need to ditch somethign from teh back
    }
    get(key: K): V | undefined {
        if (!this.mainCache.has(key)) return;
        let node = this.mainCache.get(key);
        let out = node?.value;
        this.detatch(node as Node<V>);
        this.prepend(node as Node<V>);
        return out;
    }

    private detatch(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        if (node === this.head) {
            this.head = this.head.next;
        }

        node.prev = undefined;
        node.next = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head || !this.tail) {
            this.head = this.tail = node;
            return;
        }
        let head = this.head;
        node.next = head;
        node.prev = undefined;
        this.head.prev = node;
        this.head = node;
    }

    private delete(): void {
        if (this.length < this.maxSize || this.length === 0) return;
        let tail = this.tail as Node<V>;
        if (this.length === 1) {
            this.head = this.tail = undefined;
        }

        if (tail && tail.prev) {
            this.tail = tail.prev;
            tail.prev = undefined;
        }
        let key = this.refCache.get(tail);
        if (key) {
            this.mainCache.delete(key);
        }

        this.refCache.delete(tail);

        this.length--;
    }
}

const lru = new LRU<string, number>(3);

lru.update("foo", 69);

console.log(lru);
console.log(lru.get("foo"));
lru.update("bar", 420);
console.log(lru.get("bar"));
console.log(lru);
lru.update("baz", 1337);
console.log(lru.get("baz"));
lru.update("ball", 69420);
console.log(lru.get("ball"));
