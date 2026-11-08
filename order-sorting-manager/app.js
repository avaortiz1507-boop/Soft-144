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

//Repeatedly compares adjacent elements and swaps when out of order.
// Continues passes until no swaps occur.
function bubbleSortByTotal(orders) {
    // .slice() is used to create a copy of the orders array
    const result = orders.slice();
    let comparisons = 0;
    let swaps = 0;

    // outer loop goes through each element except the last one 
    //because the last element will already be in place after previous passes
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
// starts from the beginning number and sets as minimum, 
// then finds the smallest in the rest of the array and swaps it into place
// 2,4,5,3,1 →
// 1,4,5,3,2 → swaps 2 with 1
// 1,2,5,3,4 → swaps 4 with 2
// 1,2,3,5,4 → swaps 5 with 3
// 1,2,3,4,5 → swaps 5 with 4
function selectionSortByTotal(orders) {
    // created a copy of the orders array
    const result = orders.slice();
    let comparisons = 0;
    let swaps = 0;
    // outer loop goes through each element except the last one 
    for (let i = 0; i < result.length - 1; i++) {
        // assume the current total is the minimum 
        let minIndex = i;
        // inner loop goes through the remaining elements to find the minimum total
        for (let j = i + 1; j < result.length; j++) {
            comparisons++;
            // if the current total is less than the current minimum, update minIndex
            // this places the minimum element on the left and the larger on the right
            // so it starts from the smallest to the largest
            if (result[j].total < result[minIndex].total) {
                minIndex = j;
            }
        }
        // if minIndex doesnt equal the current index, 
        // swap the elements to place the minimum at the current position
        if (minIndex !== i) {
            // perform the swap operation.
            // this produces ascending order (lowest → highest)
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
            swaps++;
        }
    }

    return { sortedOrders: result, comparisons, swaps };
}

// sets the first element as the least and keeps it as first. second element is compared and inserted in the correct position, and so on.
// 2,4,5,3,1 →
// 2,4,5,3,1 → 2 is already in place
// 2,4,5,3,1 → 4 is compared with 2 and stays
// 2,4,5,3,1 → 3 is compared with 5, 4, 2 and inserted before 4
// 2,3,4,5,1 → 1 is compared with 5, 4, 3, 2 and inserted at the beginning
// 1,2,3,4,5
// basically, takes one order at a time and places it into the correct position in the sorted section of the array.
function insertionSortByTotal(orders) {
    const result = orders.slice();
    let comparisons = 0;
    let moves = 0;
    // assumes the first element is already sorted
    for (let i = 1; i < result.length; i++) {
        // stores the current item being inserted into its correct position.
        let key = result[i];
        // temporarily remove the key from the array to find its correct position
        let j = i - 1;
        // this loop continues as long as it hasn't gone past the beginning of the array and the element is larger than the key.
        while (j >= 0 && result[j].total > key.total) {
            comparisons++;
            // increment comparisons for each comparison made in the while loop
            result[j + 1] = result[j];
            moves++;
            j--;
            // shift the element one position to the right to make space for the key
        }
        // place the key in its correct position
        result[j + 1] = key;
    }
    return { sortedOrders: result, comparisons, moves};
}

