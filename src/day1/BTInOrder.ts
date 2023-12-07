export default function in_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];

    const helper = (node: BinaryNode<number> | null) => {
        if (!node) {
            return;
        }

        helper(node.left);
        result.push(node.value);
        helper(node.right);
        console.log(result);
    };
    console.log(result);
    helper(head);
    return result;
}
