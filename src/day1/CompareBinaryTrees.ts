export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    const helper = (
        a: BinaryNode<number> | null,
        b: BinaryNode<number> | null,
    ): boolean => {
        if (!a && !b) return true;
        if (!a || !b) return false;
        if (a.value !== b.value) return false;

        return helper(a.left, b.left) && helper(a.right, b.right);
    };

    return helper(a, b);
}
