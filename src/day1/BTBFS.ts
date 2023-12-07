export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    if (!head) return false;

    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        let elem = q.shift() as BinaryNode<number> | undefined | null;

        if (!elem) continue;

        if (elem.value === needle) return true;

        q.push(elem.left);
        q.push(elem.right);
    }
    return false;
}
