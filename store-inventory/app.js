// Hash Table implementation with buckets (arrays) for collision handling
class HashTable {
    constructor(size = 10) {
        if (!Number.isInteger(size) || size <= 0) {
            throw new Error("Size must be a positive integer.");
        }
        this.buckets = new Array(size).fill(null).map(() => []); // Each bucket is an array
        this.size = size;
    }

    // Simple hash function: sum of char codes modulo table size
    _hash(key) {
        if (typeof key !== "string") {
            throw new Error("Key must be a string.");
        }
        let hash = 0;
        for (let char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.size;
    }

    // Add or update a key-value pair
   set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if (bucket.length > 0) {
        console.log(`Collision detected at bucket ${index} for key "${key}"`);
    }

    // Check if key already exists
    for (let pair of bucket) {
        if (pair[0] === key) {
            pair[1] = value;
            return true; // <-- indicate update happened
        }
    }

    // Add new key-value pair
    bucket.push([key, value]);
    return true; // <-- indicate insertion happened
}



    // Retrieve a value by key
    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return null; // Not found
    }

    //Return true if the product ID exists. Otherwise, return false.
    has(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                return true;
            }
        }
        return false;
    }

    // delete a key-value pair
    delete(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    
}

const mouse = {name: "Wireless Mouse", price: 24.99, quantity: 15};
const keyboard = {name: "Mechanical Keyboard", price: 69.99, quantity: 8};
const table = {name: "Office Table", price: 129.99, quantity: 5};
const headset = {name: "Gaming Headset", price: 49.99, quantity: 12};
const chair = {name: "Office Chair", price: 89.99, quantity: 10};


