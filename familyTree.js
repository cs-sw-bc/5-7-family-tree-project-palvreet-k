// TODO: Remove the 'throw new Error' statements and implement the functions according to the hints below.

// Family Tree (Simpsons example from README)
// This shows the tree structure similar to binary trees but with up to 3 children. You can
// add more children to the tree if you like that.
const simpsonFamily = {
    people: {
        name: "Homer Simpson",
        birthdate: "1956-05-12",
        first: {
            name: "Bart Simpson",
            birthdate: "1980-04-01",
            first: null,
            second: null,
            third: null
        },
        second: {
            name: "Lisa Simpson",
            birthdate: "1982-05-09",
            first: null,
            second: null,
            third: null
        },
        third: {
            name: "Maggie Simpson",
            birthdate: "1988-01-12",
            first: null,
            second: null,
            third: null
        }
    }
};

// Note: Each person has first, second, third properties (like left/right in binary trees)
// Students will implement functions to create and manipulate similar structures

function createFamilyTree() {
    // Step 1: Initialize an empty object to represent the family tree
    const tree = {};
    // Step 2: The tree should have a 'people' object to store people by name
    tree.people = {};
    // Step 3: Return the initialized tree structure
    return tree;
}

function createPerson(tree, name, birthdate = null, details = {}) {
    // Step 1: Validate that the name is provided and is a string
    if (!name || typeof name !== "string") {
        console.log("Invalid Name");
        return false;
    }
    // Step 2: Check if a person with this name already exists in the tree
    // Step 3: If exists, throw an error or return false
    if (tree.people[name]) {
        console.log("Person with this name already exists in family tree");
        return false;
    }
    // Step 4: Create a person object with name, birthdate, details, and first/second/third set to null
    const person = {
        name: name,
        birthdate: birthdate,
        details: details,
        first: null,
        second: null,
        third: null
    };
    // Step 5: Add the person to the tree's storage
    tree.people[name] = person;
    // Step 6: Return true on success
    return true;

}

function addChild(tree, parentName, childName, birthdate = null, details = {}) {
    // Step 1: Check if parent exists in the tree
    // Step 2: If parent doesn't exist, throw an error
    if (!tree.people[parentName]) {
        console.log("Parent with this name doesnot exist in Family tree");
        return false;
    }
    // Step 3: If child doesn't exist, call createPerson to create it with the provided birthdate and details
    if (!tree.people[childName]) {
        createPerson(tree, childName, birthdate, details);
    }
    // Step 4: Get the parent and child objects from the tree
    const parent = tree.people[parentName];
    const child = tree.people[childName];

    // Step 5: Find the first available slot (first, second, or third) on the parent and set it to the child
    if (!parent.first) {
        parent.first = child;
    } else if (!parent.second) {
        parent.second = child;
    } else if (!parent.third) {
        parent.third = child;
    } else {
        throw new Error("Parent already has three children");
    }
    // Step 6: Return true on success
    return true;
}

function updatePerson(tree, name, updates) {
    // Step 1: Check if the person exists in the tree
    if (!tree.people[name]) {
        console.log("Cannot update as Person with this name doesnot exists in the Family tree");
        return false;
    }
    // Step 2: If not, throw an error
    // Step 3: Get the person object
    const person_to_update = tree.people[name];
    // Step 4: Update the fields provided in the updates object (e.g., birthdate, details)
    Object.keys(updates).forEach(key => {
        if (key !== "first" && key !== "second" && key !== "third") {
            person_to_update[key] = updates[key];
        }
    });
    // Step 5: Ensure children array is not modified
    // Step 6: Return true on success
    return true;
}

function getDescendantsIterative(tree, name) {
    // Step 1: Check if the person exists in the tree
    // Step 2: If not, return an empty array
    if (!tree.people[name]) {
        return [];
    }
    // Step 3: Get the person object
    const person = tree.people[name];
    // Step 4: Initialize a results array to store descendants
    const results = [];
    // Step 5: Initialize a queue with the person's first, second, and third children (if they exist)
    const queue = [person.first, person.second, person.third].filter(child => child !== null);
    let front = 0;
    // Step 6: Write a while loop that continues while the queue has items
    while (front < queue.length) {

        // Inside the loop:
        //   - Take the first person from the queue (remove it from the queue)
        //   - Add its name to the results array
        //   - Add its first, second, and third children (if they exist) to the end of the queue
        const current = queue[front];
        results.push(current.name);
        const children = [current.first, current.second, current.third].filter(c => c !== null);
        for (let i = 0; i < children.length; i++) {
            queue[queue.length] = children[i];

        }
        front++;
    }
    // Step 7: Return the results array
    return results;
}

function getDescendantsRecursive(tree, name) {
    // Step 1: Check if the person exists in the tree
    if (!tree.people[name]) {
        return [];
    }
    // Step 2: If not, return an empty array
    // Step 3: Get the person object
    const person = tree.people[name];
    // Step 4: Initialize a results array
    const results = [];
    // Step 5: Define a helper function that takes a person object
    function iamhelp(p) {
        // Inside the helper:
        //   - If the person has a first child, add first's name to results, and recurse on first
        if (p.first) {
            results.push(p.first.name);
            iamhelp(p.first);
        }
        //   - If the person has a second child, add second's name to results, and recurse on second
        if (p.second) {
            results.push(p.second.name);
            iamhelp(p.second);
        }
        //   - If the person has a third child, add third's name to results, and recurse on third
        if (p.third) {
            results.push(p.third.name);
            iamhelp(p.third);
        }
    };
    // Step 6: Call the helper on the person's first, second, and third children
    iamhelp(person);
    // Step 7: Return the results array
    return results;
}

module.exports = {
    createFamilyTree,
    createPerson,
    addChild,
    updatePerson,
    getDescendantsIterative,
    getDescendantsRecursive,
    simpsonFamily
};