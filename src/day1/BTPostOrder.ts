export default function post_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];

    const helper = (node: BinaryNode<number> | null) => {
        if (!node) {
            return;
        }

        helper(node.left);
        helper(node.right);
        result.push(node.value);
    };
    console.log(result);
    helper(head);
    return result;
}
