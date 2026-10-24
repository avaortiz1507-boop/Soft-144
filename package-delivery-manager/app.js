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
function linearSearch(packages, trackingNumber){
    let comparisonCount = 0;
    for(let i = 0; i < packages.length; i++){
        comparisonCount++;
        if(packages[i].trackingNumber === trackingNumber){
            console.log(`Linear search comparisons: ${comparisonCount}`);
            return packages[i];
        }
    }
    console.log(`Linear search comparisons: ${comparisonCount}`);
    return null;
};

// sorting packages by tracking number for binary search
const sortedPackages = [...packages].sort((a, b) => a.trackingNumber.localeCompare(b.trackingNumber));
//console.log(sortedPackages);

function binarySearch(sortedPackages, trackingNumber){
    let left = 0;
    let right = sortedPackages.length - 1;
    let comparisonCount = 0;
    // low = left, high = right

    
    while(left <= right){
        // calculates mid index
        let mid = Math.floor((left + right) / 2);
        // compares mid tracking number with target tracking number
        comparisonCount++;
        if(sortedPackages[mid].trackingNumber === trackingNumber){
            console.log(`Binary search comparisons: ${comparisonCount}`);
            return sortedPackages[mid];
        } else if(sortedPackages[mid].trackingNumber < trackingNumber){
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    console.log(`Binary search comparisons: ${comparisonCount}`);
    return null;
}

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




// console logs for linear and binary search
//console.log(linearSearch(packages, "PKG1007"))
//console.log(linearSearch(packages, "PKG1006"))
//const linearResult = linearSearch(packages, "PKG1002");
//console.log(linearResult);

//console.log(binarySearch(sortedPackages, "PKG1001"));
//console.log(binarySearch(sortedPackages, "PKG1008"));
//const binaryResult = binarySearch(sortedPackages, "PKG1002");
//console.log(binaryResult);