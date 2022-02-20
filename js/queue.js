// Implementation of Queue:
let q = [];

// To 'enqueue', just do it normally as with any array:
q.push(1);
q.push(2);
console.log(q);

// To 'dequeue', use the shift method which removes from the front of the array:
q.shift();
console.log(q)

// Check if it's empty by looking at the length:
q.shift();
if (q.length === 0) console.log("Q is empty");

// Check the next element by indexing into the 0th index, but make sure that 
// it's not already empty or you'll get index out of bounds error.
q.push(1);
q.push(3);

if (q.length !== 0) {
    console.log(q[0]);
}