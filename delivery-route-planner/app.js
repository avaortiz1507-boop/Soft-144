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


    removeRoad(locationA, locationB) {
    // Check that both locations exist
    if (
        !this.adjacencyList.has(locationA) ||
        !this.adjacencyList.has(locationB)
    ) {
        return false;
    }

    // Check that the road exists
    if (
        // if the road does not exist between the locations, return false
        !this.adjacencyList.get(locationA).includes(locationB) ||
        !this.adjacencyList.get(locationB).includes(locationA)
    ) {
        return false;
    }

    // Remove locationB from locationA's connections
    this.adjacencyList.set(
        locationA,
        this.adjacencyList
        // gets locationA's connections and filters out locationB
            .get(locationA)
            .filter(location => location !== locationB)
    );

    // Remove locationA from locationB's connections
    this.adjacencyList.set(
        locationB,
        this.adjacencyList
        // gets locationB's connections and filters out locationA
            .get(locationB)
            .filter(location => location !== locationA)
    );

    return true;
}

  removeLocation(location) {
    // Return false if the location does not exist
    if (!this.adjacencyList.has(location)) {
        return false;
    }

    // Remove this location from all connected locations
    for (const connectedLocation of this.adjacencyList.get(location)) {
        // gets the connections of the connected location and filters out the location being removed
        this.adjacencyList.set(connectedLocation,this.adjacencyList.get(connectedLocation)
        // only keep connections that are NOT the location being removed
                .filter(loc => loc !== location)
        );
    }

    // Remove the location from the adjacency list
    this.adjacencyList.delete(location);

    // Location was successfully removed
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

//remove road between Warehouse and Downtown
deliveryGraph.removeRoad("Warehouse", "Downtown");

// remove location "Airport"
deliveryGraph.removeLocation("Airport");

console.log(deliveryGraph);