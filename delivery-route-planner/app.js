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

    // Check if a location exists in the graph
    hasLocation(location) {
        // !location means not a valid location (null, undefined, or empty string)
        if (!location) {
        return false;
        }

        return this.adjacencyList.has(location);
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

   // Return true if a direct road connects the two locations. Otherwise, return false.
   hasRoad(locationA, locationB) {
    // if location a or location b does not exist, return false
    if (!this.adjacencyList.has(locationA) || !this.adjacencyList.has(locationB)) {
        return false;
        }
    // checks if locationA has a direct road to locationB
    const connectionsA = this.adjacencyList.get(locationA);
    return connectionsA.includes(locationB);
    }

    //Return the locations directly connected to the requested location.
    getConnections(location) {
        // Return an empty array if the location does not exist
        if (!this.adjacencyList.has(location)) {
            return [];
        }
            
        return this.adjacencyList.get(location);
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