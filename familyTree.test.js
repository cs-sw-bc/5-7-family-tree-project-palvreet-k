// familyTree.test.js - Simple function calls for Family Tree functions

const {
    createFamilyTree,
    createPerson,
    addChild,
    updatePerson,
    getDescendantsIterative,
    getDescendantsRecursive,
    simpsonFamily
} = require('./familyTree');

const tree = simpsonFamily;
console.log(tree);
addChild(tree, 'Homer Simpson', 'New Child', '2000-01-01');
console.log(tree);
// addChild(tree, 'Bart Simpson', 'Grandchild', '2020-01-01');
// console.log(tree);
// updatePerson(tree, 'Homer Simpson', { birthdate: '1956-05-12' });
// console.log(tree);
// getDescendantsIterative(tree, 'Homer Simpson');
// getDescendantsRecursive(tree, 'Homer Simpson');
// getDescendantsIterative(tree, 'Bart Simpson');
// getDescendantsRecursive(tree, 'Bart Simpson');