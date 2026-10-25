const packages = [
    {
        trackingNumber: "PKG1001",
        customer: "Jordan Lee",
        address: "120 Pine Street",
        priority: 2
    },
    {
        trackingNumber: "PKG1002",
        customer: "Taylor Smith",
        address: "45 Oak Avenue",
        priority: 1
    },
    {
        trackingNumber: "PKG1003",
        customer: "Morgan Davis",
        address: "800 River Road",
        priority: 3
    },
    {
        trackingNumber: "PKG1004",
        customer: "Alex Johnson",
        address: "300 Maple Lane",
        priority: 2
    },
    {
        trackingNumber: "PKG1005",
        customer: "Sam Wilson",
        address: "500 Birch Boulevard",
        priority: 1
    },
    {
        trackingNumber: "PKG1006",
        customer: "Jamie Brown",
        address: "250 Cedar Street",
        priority: 2
    },
    {
        trackingNumber: "PKG1007",
        customer: "Chris Green",
        address: "600 Elm Street",
        priority: 3
    },
    {
        trackingNumber: "PKG1008",
        customer: "Pat Taylor",
        address: "700 Spruce Street",
        priority: 1
    }
];
// comparison goes through each package until the tracking number is found
//  or the end is reached. Which is why linear search ends at 8; only 8 packages
let linearComparisons = 0;
let binaryComparisons = 0;

// part 3

function linearSearch(packages, trackingNumber){
    let linearComparisonCount = 0;

    for(let i = 0; i < packages.length; i++){
        linearComparisonCount++;
        if(packages[i].trackingNumber === trackingNumber){
            linearComparisons = linearComparisonCount;
            console.log(`Linear search comparisons: ${linearComparisonCount}`);
            return packages[i];
        }
    }
    linearComparisons = linearComparisonCount;
    console.log(`Linear search comparisons: ${linearComparisonCount}`);
    return null;
};


// part 4
// sorting packages by tracking number for binary search
const sortedPackages = [...packages].sort((a, b) => a.trackingNumber.localeCompare(b.trackingNumber));
//console.log(sortedPackages);


// part 5
function binarySearch(sortedPackages, trackingNumber){
    let left = 0;
    let right = sortedPackages.length - 1;
    let binaryComparisonCount = 0;
    // low = left, high = right

    
    while(left <= right){
        // calculates mid index
        let mid = Math.floor((left + right) / 2);
        // compares mid tracking number with target tracking number
        binaryComparisonCount++;
        if(sortedPackages[mid].trackingNumber === trackingNumber){
            binaryComparisons = binaryComparisonCount;
            console.log(`Binary search comparisons: ${binaryComparisonCount}`);
            return sortedPackages[mid];
        } else if(sortedPackages[mid].trackingNumber < trackingNumber){
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    binaryComparisons = binaryComparisonCount;
    console.log(`Binary search comparisons: ${binaryComparisonCount}`);
    return null;
}




// part 7
// sorting packages by delivery priority
function sortByPriority(packages){
    // copy of packages
    return [...packages]
    // sort by priority in ascending order
    .sort((
        // compare priorities of two packages
    a, b) => a.priority - b.priority);

}
const prioritySortedPackages = sortByPriority(packages);
console.log(prioritySortedPackages);


console.log("--------------------------------------------------");
console.log("Comparing search algorithms:");


// PART 8

// comparing algorithm performance for linear and binary search
linearSearch(packages, "PKG1005");
binarySearch(sortedPackages, "PKG1005");
console.log("Comparing algorithm performance for linear and binary search");
console.log(`Tracking number searched: PKG1005`);

console.log(`Linear search comparisons: ${linearComparisons}`);
console.log(`Binary search comparisons: ${binaryComparisons}`);

    if (linearComparisons < binaryComparisons) {
        console.log("Linear search used fewer comparisons.");
    } else if (binaryComparisons < linearComparisons) {
        console.log("Binary search used fewer comparisons.");
    } else {
        console.log("Both algorithms used the same number of comparisons.");
    }


console.log("--------------------------------------------------"
    
); 
console.log("Testing search functions:");  



// part 6
// testing search functions

//Linear search finds a package near the beginning of the array.
const beginningPackage = linearSearch(packages, "PKG1002");

// Assert that the index is within the first 4 positions (0–3)
console.assert(beginningPackage !== null && beginningPackage.trackingNumber === "PKG1002",
     `Target found: ${beginningPackage ? beginningPackage.trackingNumber : 'null'}.`);

// linear search finds a package near the end of the array.
const endPackage = linearSearch(packages, "PKG1008");
// Assert that the index is within the last 4 positions (4–7)
console.assert(endPackage !== null && endPackage.trackingNumber === "PKG1008",
     `Target found: ${endPackage ? endPackage.trackingNumber : 'null'}.`);

// check to see if linear returns null for a non-existent package
// goes through the entire array to conclude the package is missing
const missingPackage = linearSearch(packages, "PKG1009");
console.assert(missingPackage === null,"A missing package should return null");



console.log("--------------------------------------------------")

// binary search finds an existing package in the sorted array.
const existingPackage = binarySearch(sortedPackages, "PKG1003");
// Use console.assert to verify correctness
console.assert(existingPackage !== null && existingPackage.trackingNumber === "PKG1003",
    `Binary search failed: package PKG1003 not found`
);
// check to see if binary search returns null for a non-existent package
// cuts in half 4 times to conclude the package is missing
const missingBinaryPackage = binarySearch(sortedPackages, "PKG1009");
console.assert(missingBinaryPackage === null, "Binary search should return null for a missing package");

console.log("--------------------------------------------------");

// part 10
console.log("Expected time complexity:");
console.log("- Linear search: O(n), because it may check every package.");
console.log("- Binary search: O(log n), because it halves the search range each comparison; the array must be sorted first.");
console.log("- Sorting packages: O(n log n) expected; sorting for binary search is done before searching.");
console.log("- Sorting by priority: O(n log n) expected, including the copied array.");

console.log("--------------------------------------------------"); 


// console logs for linear and binary search
//console.log(linearSearch(packages, "PKG1007"))
//console.log(linearSearch(packages, "PKG1006"))
//const linearResult = linearSearch(packages, "PKG1002");
//console.log(linearResult);

//console.log(binarySearch(sortedPackages, "PKG1001"));
//console.log(binarySearch(sortedPackages, "PKG1008"));
//const binaryResult = binarySearch(sortedPackages, "PKG1002");
//console.log(binaryResult);
console.time("Linear Search Time");
linearSearch(packages, "PKG1007");
console.timeEnd("Linear Search Time");

console.time("Binary Search Time");
binarySearch(sortedPackages, "PKG1007");
console.timeEnd("Binary Search Time");

console.log("--------------------------------------------------");

console.log(`
    Summary:
    1. How did the delivery company use searching and sorting?
    The delivery company used searching to find the packages and sorting to organize them,
    like through priority.

    2. What is the difference between linear search and binary search?
    The difference between linear search and binary search is that linear search goes through
    eachpackage in a line, one by one, while binary search cuts the sorted array in half,
    checks left or right, then cuts in half again until it finds the correct package or shows its missing.

    3. Why does binary search requires sorted data?
    It requires sorted data because if the array isnt sorted, the search will be inaccurate
    and wont find the correct package.

    4. Which search used fewer comparisons?
    Binary search used fewer comparisons because it halves the comparison each time, 
    instead of checking each package one by one.

    5. The measured search times from your computer: 
    Using the package "PKG1007" as an example:
    Linear Search Time: 0.119ms
    Binary Search Time: 0.152ms
    Conclusion: Binary search is faster for finding packages in a sorted array.


    6. What is one situation where linear search may still be useful?
    Linear search can be useful when the data is small,up to 10 items, 
    as it does not require sorting and can quickly find the item.


    7. What is one situation where binary search may be a better choice?
    Binary search is better when the data is already sorted and the dataset is larger, 
    like 100 items, as its more efficient than linear searches.
    `)