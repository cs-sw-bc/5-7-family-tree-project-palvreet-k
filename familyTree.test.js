// familyTree.test.js - Simple function calls for Family Tree functions

const {
    createFamilyTree,
    createPerson,
    addChild,
    updatePerson,
    getDescendantsIterative,
    getDescendantsRecursive,
    simpsonFamily
} = require('./familyTree_new');

const tree = simpsonFamily;
console.log('Initial Simpson family tree:');
console.log(tree);
// addChild(tree, 'Homer Simpson', 'New Child', '2000-01-01');
console.log('Tree after attempting to add child to Homer:');
console.log(tree);
addChild(tree, 'Bart Simpson', 'Grandchild', '2020-01-01');
console.log('Tree after adding grandchild to Bart Simpson:');
console.log(tree);
updatePerson(tree, 'Homer Simpson', { birthdate: '1956-05-12' });
console.log('Tree after updating Homer Simpson birthdate:');
console.log(tree);
console.log('Descendants of Homer Simpson (iterative):');
console.log(getDescendantsIterative(tree, 'Homer Simpson'));
console.log('Descendants of Homer Simpson (recursive):');
console.log(getDescendantsRecursive(tree, 'Homer Simpson'));
console.log('Descendants of Bart Simpson (iterative):');
console.log(getDescendantsIterative(tree, 'Bart Simpson'));
console.log('Descendants of Bart Simpson (recursive):');
console.log(getDescendantsRecursive(tree, 'Bart Simpson'));