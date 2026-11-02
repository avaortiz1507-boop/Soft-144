class Node {
    constructor(productID) {
        this.value = productID;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Inserts a new product ID into the binary search tree
    insert(productID) {
        const newNode = new Node(productID);
        // if root is null, set the new node as root
        if (this.root === null) {
            this.root = newNode;
        // otherwise, insert the new node in the appropriate position
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    // Recursively finds the correct position and inserts the new node
    _insertNode(node, newNode) {
        // if new node smaller than current node, go to the left subtree
        if (newNode.value < node.value) {
            // if there is no left child, insert the new node here
            if (node.left === null) {
                node.left = newNode;
                // if there is a left child, insert the node under the left subtree
            } else {
                this._insertNode(node.left, newNode);
            }
        // if larger or equal than current node, go to the right subtree
        } else {
            // if there is no right child, insert the new node here
            if (node.right === null) {
                node.right = newNode;
            // if there is a right child, insert the node under the right subtree
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // Checks if a product ID exists in the binary search tree. if not, returns false
    contains(productID) {
        // starts by searching from the root node
        return this._containsNode(this.root, productID);
    }
    // uses both the node and productID to recursively search for the product ID
    _containsNode(node, productID) {
        // if cant find node, return false
        if (node === null) {
            return false;
        }
        // if the current node matches the productID, return true
        if (productID === node.value) {
            return true;
        }
        // if the productID is smaller than the current node's value, search the left subtree
        if (productID < node.value) {
            return this._containsNode(node.left, productID);
        } else {
            // otherwise, search the right subtree
            return this._containsNode(node.right, productID);
        }
    }
}