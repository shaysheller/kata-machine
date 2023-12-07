export default function pre_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];

    const helper = (node: BinaryNode<number> | null) => {
        if (!node) {
            return;
        }

        result.push(node.value);
        helper(node.left);
        helper(node.right);
        console.log(result);
    };
    console.log(result);
    helper(head);
    return result;
}

const tree: BinaryNode<number> = {
    value: 20,
    right: {
        value: 50,
        right: {
            value: 100,
            right: null,
            left: null,
        },
        left: {
            value: 30,
            right: {
                value: 45,
                right: null,
                left: null,
            },
            left: {
                value: 29,
                right: null,
                left: null,
            },
        },
    },
    left: {
        value: 10,
        right: {
            value: 15,
            right: null,
            left: null,
        },
        left: {
            value: 5,
            right: {
                value: 7,
                right: null,
                left: null,
            },
            left: null,
        },
    },
};
console.log(pre_order_search(tree));
