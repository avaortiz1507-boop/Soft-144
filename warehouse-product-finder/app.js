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

    // Visit the current node before visiting its children.
    preOrderTraversal() {
        const result = [];
        this._preOrderTraversal(this.root, result);
        return result;
    }

    _preOrderTraversal(node, result) {
        // checks if node is not null before visiting it
        if (node !== null) {
            result.push(node.value);
            // visits the left subtree first, then the right subtree
            this._preOrderTraversal(node.left, result);
            this._preOrderTraversal(node.right, result);
        }
    }

    // Visit the children before visiting the current node.
    postOrderTraversal() {
        const result = [];
        this._postOrderTraversal(this.root, result);
        return result;
    }

    _postOrderTraversal(node, result) {
        // checks if node is not null before visiting its children
        // visits the left subtree first, then the right subtree, and finally the current node
        if (node !== null) {
            this._postOrderTraversal(node.left, result);
            this._postOrderTraversal(node.right, result);
            result.push(node.value);
        }
    }

    // Calculate the height of the tree.
    height() {
        return this._height(this.root);
    }

    _height(node) {
        // checks if node is null, which means the height is -1 (base case)
        if (node === null) {
            return -1;
        }
        // recursively calculates the height of the left and right subtrees
        const leftHeight = this._height(node.left);
        const rightHeight = this._height(node.right);
        // returns the maximum height between the left and right subtrees, plus 1 for the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

// create the tree and insert the product IDs
const tree = new BinarySearchTree();
const productIDs = [50, 30, 70, 20, 40, 60, 80];
// add an id to each insert to the tree
productIDs.forEach(id => tree.insert(id));
console.log(tree.inOrderTraversal());
console.log(tree.preOrderTraversal());

// console.asserts to verify
// A product ID stored near the root
console.assert(tree.contains(50));
//console.log(tree.contains(50));

// A product ID stored near the bottom of the tree
console.assert(tree.contains(20));
//console.log(tree.contains(20));

// A product ID that does not exist
console.assert(!tree.contains(100));
//console.log(tree.contains(100));


console.log('All contains() tests passed');

// removing a leaf node
tree.remove(20);
console.assert(!tree.contains(20));
console.log('Product ID 20 removed successfully');
// verify that the product ID 20 has been removed
console.log(tree.contains(20));
// verify the in-order traversal after removal
console.log(tree.inOrderTraversal());

// removing a node with one child
tree.remove(30);
console.assert(!tree.contains(30));
console.log('Product ID 30 removed successfully');
// verify that the product ID 30 has been removed
console.log(tree.contains(30));
// verify the in-order traversal after removal
console.log(tree.inOrderTraversal());

// removing a node with two children
tree.remove(70);
console.assert(!tree.contains(70));
console.log('Product ID 70 removed successfully');
// verify that the product ID 70 has been removed
console.log(tree.contains(70));
// verify the in-order traversal after removal
console.log(tree.inOrderTraversal());