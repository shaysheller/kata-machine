export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    if (!head) return false;
    if (head.value === needle) return true;

    if (head.value < needle) {
        return dfs(head.right as BinaryNode<number>, needle);
    } else if (head.value > needle) {
        return dfs(head.left as BinaryNode<number>, needle);
    }
    return false;
}
