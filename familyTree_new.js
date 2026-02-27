// TODO: Remove the 'throw new Error' statements and implement the functions according to the hints below.

// Family Tree (Simpsons example from README)
// This shows the tree structure similar to binary trees but with up to 3 children. You can
// add more children to the tree if you like that.
const simpsonFamily = {
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
};

// Note: Each person has first, second, third properties (like left/right in binary trees)
// Students will implement functions to create and manipulate similar structures

// helper to search a tree for a person by name
function findPerson(node, name) {
    if (!node || typeof node !== 'object') return null;
    if (node.name === name) return node;
    // search children using an arrow function and Array.some
    let found = null;
    ['first', 'second', 'third'].some(slot => {
        found = findPerson(node[slot], name);
        return found !== null; // stop when a match is found
    });
    return found; // may be null if nothing matched
}

function createFamilyTree() {
    // simple container; some code paths expect a people map but the sample
    // structure doesn't have one. we include it for compatibility but functions
    // will primarily traverse the object tree.
    return { people: {} };
}

function createPerson(tree, name, birthdate = null, details = {}) {
    // Step 1: Validate that the name is provided and is a string
    if (!name || typeof name !== 'string') {
        console.log('Invalid Name');
        return false;
    }
    // Step 2 & 3: Check if a person with this name already exists in the tree
    if (tree && tree.people && tree.people[name]) {
        console.log('Person with this name already exists in family tree');
        return false;
    }
    if (!tree || ![tree].some(n => findPerson(n, name))) {
        // ok
    } else {
        console.log('Person with this name already exists in family tree');
        return false;
    }

    // Step 4: Create a person object with name, birthdate, details
    const person = {
        name,
        birthdate,
        details,
        first: null,
        second: null,
        third: null
    };
    // Step 5: Add the person to the tree's storage if it has a people map
    if (tree && tree.people) {
        tree.people[name] = person;
    }
    // Step 6: Return true on success (caller must attach to parent)
    return person;
}

function addChild(tree, parentName, childName, birthdate = null, details = {}) {
    // Step 1: Check if parent exists in the tree
    const parent = tree && tree.people ? tree.people[parentName] : findPerson(tree, parentName);
    if (!parent) {
        throw new Error('Parent with this name doesnot exist in Family tree');
    }
    // Step 3: If child doesn't exist, create it
    let child = tree && tree.people ? tree.people[childName] : findPerson(tree, childName);
    if (!child) {
        child = createPerson(tree, childName, birthdate, details);
    }
    // Step 5: attach to first available slot
    if (!parent.first) {
        parent.first = child;
    } else if (!parent.second) {
        parent.second = child;
    } else if (!parent.third) {
        parent.third = child;
    } else {
        throw new Error('Parent already has three children');
    }
    // if map exists record child
    if (tree && tree.people && child && child.name) {
        tree.people[child.name] = child;
    }
    return true;
}

function updatePerson(tree, name, updates) {
    // look up the person by name in the map if available; otherwise fall back
    // to a recursive search through the object tree
    const person = tree && tree.people ? tree.people[name] : findPerson(tree, name);
    if (!person) {
        // nothing to update if the person doesn't exist
        throw new Error('Cannot update as Person with this name doesnot exists in the Family tree');
    }
    // apply each provided update except for the child pointers, which should
    // not be modified here (use addChild/removeChild instead)
    Object.keys(updates).forEach(key => {
        if (key !== 'first' && key !== 'second' && key !== 'third') {
            person[key] = updates[key];
        }
    });
    return true;
}

function getDescendantsIterative(tree, name) {
    // locate starting person in either the map or the tree structure
    const start = tree && tree.people ? tree.people[name] : findPerson(tree, name);
    if (!start) return [];

    const results = [];
    // we'll use a plain array as a queue; `i` will walk it
    const queue = [];
    if (start.first) queue.push(start.first);
    if (start.second) queue.push(start.second);
    if (start.third) queue.push(start.third);

    for (let i = 0; i < queue.length; i++) {
        const cur = queue[i];
        results.push(cur.name);
        if (cur.first) queue.push(cur.first);
        if (cur.second) queue.push(cur.second);
        if (cur.third) queue.push(cur.third);
    }

    return results;
}

function getDescendantsRecursive(tree, name) {
    // get the starting person object (either from map or tree search)
    const startingPerson = tree && tree.people ? tree.people[name] : findPerson(tree, name);
    if (!startingPerson) return [];

    const descendants = [];
    // helper recurses through a person node and collects names of all
    // descendants in depth‑first order
    function walk(node) {
        if (!node) return;
        ['first', 'second', 'third'].forEach(slot => {
            const child = node[slot];
            if (child) {
                descendants.push(child.name);
                walk(child);
            }
        });
    }

    walk(startingPerson);
    return descendants;
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