// Hash Table implementation with buckets (arrays) for collision handling
class HashTable {
    constructor(size = 10) {
        if (!Number.isInteger(size) || size <= 0) {
            throw new Error("Size must be a positive integer.");
        }
        this.buckets = new Array(size).fill(null).map(() => []); // Each bucket is an array
        this.size = size;
        this.count = 0;

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

    this.count++;

    // Add new key-value pair
    bucket.push([key, value]);

    if (this.loadFactor > 0.75) {
        this._resize();
    }
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
                this.count--;
                return true;
            }
        }
        return false;
    }
    get loadFactor() {
        return this.count / this.size;
    }

    // Double the bucket count and reinsert every pair
    _resize() {
        const oldBuckets = this.buckets;
        this.size *= 2;
        this.buckets = new Array(this.size).fill(null).map(() => []);
        this.count = 0;

        for (let bucket of oldBuckets) {
            for (let [key, value] of bucket) {
                this.buckets[this._hash(key)].push([key, value]);
                this.count++;
            }
        }
        console.log("Resized hash table to double:", this.size);
    }
}

const mouse = {name: "Wireless Mouse", price: 24.99, quantity: 15};
const keyboard = {name: "Mechanical Keyboard", price: 69.99, quantity: 8};
const table = {name: "Office Table", price: 129.99, quantity: 5};
const headset = {name: "Gaming Headset", price: 49.99, quantity: 12};
const chair = {name: "Office Chair", price: 89.99, quantity: 10};

const inventory = new HashTable();
inventory.set("keyboard", keyboard);
inventory.set("headset", headset);

console.assert(inventory.set("mouse", mouse), "Mouse should be added to the hash table");
console.assert(inventory.get("mouse") === mouse, "Mouse should be retrievable from the hash table");
const updatedMouse = {name: "Wireless Mouse", price: 19.99, quantity: 20};
console.assert(inventory.set("mouse", updatedMouse) && inventory.get("mouse") === updatedMouse, "Mouse should be updated");
console.assert(inventory.has("keyboard"), "Keyboard should exist in the hash table");
console.assert(!inventory.has("microwave"), "Microwave should not exist in the hash table");
console.assert(inventory.delete("headset") && inventory.get("headset") === null, "Headset should be deleted from the hash table");
console.assert(inventory.get("microwave") === null, "Microwave should not exist in the hash table");

// verify that two products can be in the same bucket
const hashTable = new HashTable(10);

const key1 = "ab";
const key2 = "ba";

hashTable.set(key1, mouse);
hashTable.set(key2, keyboard);

const index1 = hashTable._hash(key1);
const index2 = hashTable._hash(key2);

console.assert(index1 === index2, "Keys should hash to the same bucket");
console.assert(
    hashTable.buckets[index1].length === 2,
    "Two products should be stored in the same bucket"
);
