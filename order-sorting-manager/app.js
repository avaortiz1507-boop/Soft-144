const orders = [
    {
        orderNumber: 1005,
        customer: "Jordan Lee",
        total: 84.99,
        priority: 2
    },
    {
        orderNumber: 1006,
        customer: "Alex Kim",
        total: 45.50,
        priority: 1
    },
    {
        orderNumber: 1007,
        customer: "Taylor Smith",
        total: 120.00,
        priority: 3
    },
    {
        orderNumber: 1008,
        customer: "Morgan Brown",
        total: 60.75,
        priority: 2
    },
    {
        orderNumber: 1009,
        customer: "Casey White",
        total: 95.00,
        priority: 1
    },
    {
        orderNumber: 1010,
        customer: "Jamie Green",
        total: 110.25,
        priority: 2
    },
    {
        orderNumber: 1011,
        customer: "Riley Black",
        total: 75.50,
        priority: 3
    },
    {
        orderNumber: 1012,
        customer: "Sam Blue",
        total: 88.00,
        priority: 1
    },
];

function bubbleSortByTotal(orders) {
    // .slice() is used to create a copy of the orders array
    const result = orders.slice();
    let comparisons = 0;
    let swaps = 0;

    // index starts from 0 and goes up to result.length - 1 for the outer loop
    for (let i = 0; i < result.length - 1; i++) {
        // set to false to change to true if a swap occurs
        let swapped = false;

        // Each pass places the largest remaining value at the end of the array for inner loop
        // - i is used to skip the already sorted elements at the end of the array
        for (let j = 0; j < result.length - 1 - i; j++) {
            comparisons++;
            // if the current element is greater than the next element, swap them
            if (result[j].total > result[j + 1].total) {
                // this is the swap operation
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                // increment the swap counter and mark that a swap occurred
                swaps++;
                swapped = true;
            }
        }
        // if no swaps occurred in the inner loop, the array is already sorted
        if (!swapped) {
            break;
        }
    }

    return { sortedOrders: result, comparisons, swaps };
}
