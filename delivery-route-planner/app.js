class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    addLocation(location) {
        if (this.adjacencyList.has(location)) {
            return false;
        }
        this.adjacencyList.set(location, []);
        return true;
    }
    
    addRoad(locationA, locationB) {
    // Check if both locations exist
    if (!this.adjacencyList.has(locationA) || !this.adjacencyList.has(locationB)) {
        return false;
    }

    // Get each location's connection list
    const connectionsA = this.adjacencyList.get(locationA);
    const connectionsB = this.adjacencyList.get(locationB);

    // Avoid adding the same road twice
    if (!connectionsA.includes(locationB)) {
        connectionsA.push(locationB);
    }

    if (!connectionsB.includes(locationA)) {
        connectionsB.push(locationA);
    }

    return true;
}
}


const deliveryGraph = new Graph();
deliveryGraph.addLocation("Warehouse");
deliveryGraph.addLocation("Downtown");
deliveryGraph.addLocation("Airport");
deliveryGraph.addLocation("North Station");
deliveryGraph.addLocation("Shopping Center");
deliveryGraph.addLocation("University");
deliveryGraph.addLocation("Hospital");

deliveryGraph.addRoad("Warehouse", "Downtown");
deliveryGraph.addRoad("Warehouse", "Airport");
deliveryGraph.addRoad("Downtown", "Shopping Center");
deliveryGraph.addRoad("Downtown", "University");
deliveryGraph.addRoad("Airport", "North Station");
deliveryGraph.addRoad("North Station", "Hospital");
deliveryGraph.addRoad("Shopping Center", "Hospital");
deliveryGraph.addRoad("University", "Hospital");

console.log(deliveryGraph);