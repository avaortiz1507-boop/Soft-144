// Hash Table implementation with buckets (arrays) for collision handling
class HashTable {
    constructor(size = 10, logging = true) {
        if (!Number.isInteger(size) || size <= 0) {
            throw new Error("Size must be a positive integer.");
        }
        this.logging = logging;
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

    if (this.logging && bucket.length > 0) {
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
    this.count++;

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
        if (this.logging) {
            console.log("Resized hash table to double:", this.size);
        }
    }
}

const mouse = {name: "Wireless Mouse", price: 24.99, quantity: 15};
const keyboard = {name: "Mechanical Keyboard", price: 69.99, quantity: 8};
const table = {name: "Office Table", price: 129.99, quantity: 5};
const headset = {name: "Gaming Headset", price: 49.99, quantity: 12};
const chair = {name: "Office Chair", price: 89.99, quantity: 10};

const inventory = new HashTable(10, false);
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
const hashTable = new HashTable(10, false);

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

// how long a function takes
function measureTime(fn) {
    const start = performance.now();
    fn();
    const end = performance.now();
    return end - start; // milliseconds
}

// how much memory is being used in the whole program
function getMemoryUsageMB() {
    const mem = process.memoryUsage();
    return {
        rss: (mem.rss / 1024 / 1024).toFixed(2),       // Resident Set Size
        heapTotal: (mem.heapTotal / 1024 / 1024).toFixed(2),
        heapUsed: (mem.heapUsed / 1024 / 1024).toFixed(2),
        external: (mem.external / 1024 / 1024).toFixed(2)
    };
}

// Main test
(function runTest() {
    const hashTable = new HashTable(10, false);
    const array = [];
    const numOps = 10_000; // linear array search is too slow at 1 million

    // Measure SET time
    const setTime = measureTime(() => {
        for (let i = 0; i < numOps; i++) {
            hashTable.set(`key${i}`, i);
        }
    });
    const arraySetTime = measureTime(() => {
        for (let i = 0; i < numOps; i++) {
            array.push({key: `key${i}`, value: i});
        }
    });

    // Measure GET time
    const getTime = measureTime(() => {
        for (let i = 0; i < numOps; i++) {
            hashTable.get(`key${i}`);
        }
    });
    const arrayGetTime = measureTime(() => {
        for (let i = 0; i < numOps; i++) {
            array.find(item => item.key === `key${i}`);
        }
    });

    // Calculate operations per second
    const setOpsPerSec = (numOps / (setTime / 1000)).toFixed(2);
    const getOpsPerSec = (numOps / (getTime / 1000)).toFixed(2);

    // Memory usage (Node.js only)
    const memoryUsage = getMemoryUsageMB();

    // Output results
    console.log("=== Hash Table Performance ===");
    console.log(`SET time: ${setTime.toFixed(2)} ms`);
    console.log(`GET time: ${getTime.toFixed(2)} ms`);
    console.log(`SET ops/sec: ${setOpsPerSec}`);
    console.log(`GET ops/sec: ${getOpsPerSec}`);
    console.log(`Array SET time: ${arraySetTime.toFixed(2)} ms`);
    console.log(`Array GET time: ${arrayGetTime.toFixed(2)} ms`);
    console.log("Memory Usage (MB):", memoryUsage);
})();

console.log(`
Hash Table Summary

1. How the store used the hash table to find products:
   The store holds the products in the hash table, using unique keys for each one. To find a product, 
   you'd use the get() method to find the assigned key to each product.

2. What a hash function does:
    The hash function coverts the string/key into numbers. Using these numbers, it assigns them
    to a bucket. This is done by this code: return hash % this.size; which returns the remainder
    of the number and then used to determine the bucket index.


3. What a bucket is:
   A bucket is an array inside the hash table that can store one or more key-value pairs.
   

4. What happens when a collision occurs:
    A collision occurs when two different keys are put inside the same bucket index. To fix this;
    the hash table uses separate chaining to handle collisions, which is when you add "addresses"
    or links to the existing products in the bucket.

5. Why the hash table resizes:
    The hash table has to resize because when theres too many products(>75%), it can make
    the hash table slow, take up too much memory, or force the products to be in
    the same buckets.

6. Which implementation was faster in the benchmark:
    The fastest implementation in the benchmark was the hash table.
    Edit: After doing the implementation for myself, the hash table was much faster than the
    plain array.

7. Why hash tables use extra memory to provide faster lookups:
    From my understanding/research, hash tables use extra memory because the more empty buckets,
    the better/faster the lookups are. It also reduces collisions because that means each 
    bucket will (hopefully) have only one or two products.

 End of Summary 
`);
