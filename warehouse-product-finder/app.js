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

    remove(productID) {
        //calls for removeNode at the root of the tree
        this.root = this._removeNode(this.root, productID);
    }
    
    // removes node with productID
    _removeNode(node, productID) {
        // if there is no node, return null
        if (node === null) {
            return null;
        }
        // if the productID is smaller than the current node's value, go to the left parent
        if (productID < node.value) {
            node.left = this._removeNode(node.left, productID);
            return node;
        } else if (productID > node.value) {
            // if the productID is larger than the current node's value, go to the right parent
            node.right = this._removeNode(node.right, productID);
            return node;
        } else {
            // if they are equal, the node is found and can be removed
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            // finds the smallest value in the right parent
            let minNode = this._findMinNode(node.right);
            // replaces the value of the current node with the smallest value from the right parent
            node.value = minNode.value;
            // removes the node with the smallest value from the right parent
            node.right = this._removeNode(node.right, minNode.value);
            return node;
        }
    }

    // finds the node with the minimum value starting from the given node
    _findMinNode(node) {
        // keep going left until reaching the leftmost node
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // returns the product IDs from smallest to largest.
    inOrderTraversal() {
        // adds an empty array to store the traversal result
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }
    // node: the current node being visited
    // result: an array to store the in-order traversal sequence
    _inOrderTraversal(node, result) {
        // checks if node is not null
        if (node !== null) {
            // keeps checking the left subtree first, then the current node, and finally the right subtree
            this._inOrderTraversal(node.left, result);
            result.push(node.value);
            this._inOrderTraversal(node.right, result);
        }
    }
}

// create the tree and insert the product IDs
const tree = new BinarySearchTree();
const productIDs = [50, 30, 70, 20, 40, 60, 80];
// add an id to each insert to the tree
productIDs.forEach(id => tree.insert(id));
console.log(tree.inOrderTraversal());