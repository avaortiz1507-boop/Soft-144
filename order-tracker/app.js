class OrderHistoryStack {
    constructor() {
        this.items = [];
    }
    // add an order to the stack
    push(order) {
        this.items.push(order);
    }
    // remove and return the most recent order from the stack
    pop() {
        return this.items.pop();
    }
    // return the most recent order without removing it from the stack
    peek() {
        const index = this.items.length - 1;
        console.log('index', index)
        return this.items[index];
        // return this.items[this.items.length - 1];
    }

    size() {
        return this.items.length;
    }
    // check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }
}


class OrderQueue{
    constructor(capacity) {
        // precondition: capacity must be a positive integer
        if (capacity <= 0 || !Number.isInteger(capacity)) {
            throw new Error('Capacity must be a positive integer');
        }
        // postcondition: capacity is set and items array is initialized
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }

    add(order) {
        // precondition: the queue must not be full
        if (this.isFull()) {
            throw new Error('Queue is full');
        }
        // postcondition: order is added to the tail of the queue and count is incremented
        this.items[this.tail] = order;
        // update the tail and count
        const nextTail = (this.tail + 1) % this.capacity;
        console.log('nextTail', nextTail);
        this.tail = nextTail;
        this.count++;
    }
    remove() {
        // precondition: the queue must not be empty
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        // postcondition: order is removed from the head of the queue and count is decremented
        const order = this.items[this.head];
        this.items[this.head] = undefined; // clear the reference to the removed order
        const nextHead = (this.head + 1) % this.capacity;
        console.log('nextHead', nextHead);
        this.head = nextHead;
        this.count--;
        return order;
    }
    
    enqueue(order) {
        this.add(order);
    }

    dequeue() {
        return this.remove();
    }

    front() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[this.head];
    } 

    size() {
        return this.count;
    }

    

     isEmpty() {
        return this.count === 0;
    }

    isFull() {
        return this.count === this.capacity;
    }

}

const orderHistory = new OrderHistoryStack();
console.log('orderHistory', orderHistory);
console.log('orderHistory size', orderHistory.size());
console.log('orderHistory is empty', orderHistory.isEmpty());
console.log('orderHistory peek', orderHistory.peek());


const orderQueue = new OrderQueue();
console.log('orderQueue', orderQueue);
console.log('orderQueue size', orderQueue.size());
console.log('orderQueue is empty', orderQueue.isEmpty());
console.log('orderQueue is full', orderQueue.isFull());

// order objects stack and queue

const order1 = { orderNumber: 1001, customer: "Jordan", item: "Keyboard" };
const order2 = { orderNumber: 1002, customer: "Alex", item: "Chair" };
const order3 = { orderNumber: 1003, customer: "Sam", item: "Desk" };
const order4 = { orderNumber: 1004, customer: "Taylor", item: "Laptop" };
const order5 = { orderNumber: 1005, customer: "Morgan", item: "Tablet" };

// Add to stack
orderHistory.push(order1);
console.log("Top of stack:", orderHistory.peek());

orderHistory.push(order2);
console.log("Top of stack:", orderHistory.peek());

orderHistory.push(order3);
console.log("Top of stack:", orderHistory.peek());

orderHistory.push(order4);
console.log("Top of stack:", orderHistory.peek());

orderHistory.push(order5);
console.log("Top of stack:", orderHistory.peek());

// Add to queue
orderQueue.enqueue(order1);
console.log("Front of queue:", orderQueue.front());

orderQueue.enqueue(order2);
console.log("Front of queue:", orderQueue.front());

orderQueue.enqueue(order3);
console.log("Front of queue:", orderQueue.front());

orderQueue.enqueue(order4);
console.log("Front of queue:", orderQueue.front());

orderQueue.enqueue(order5);
console.log("Front of queue:", orderQueue.front());


