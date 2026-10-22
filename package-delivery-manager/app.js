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
function linearSearch(packages, trackingNumber){
    for(let i = 0; i < packages.length; i++){
        if(packages[i].trackingNumber === trackingNumber){
            return packages[i];
        }
    }
    return null;
};
function binarySearch(packages, trackingNumber){
    let left = 0;
    let right = packages.length - 1;
    
    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        if(packages[mid].trackingNumber === trackingNumber){
            return packages[mid];
        } else if(packages[mid].trackingNumber < trackingNumber){
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
}
console.log(linearSearch(packages, "PKG1007"))
console.log(linearSearch(packages, "PKG99999"))
console.log(linearSearch(packages, "PKG1009"))