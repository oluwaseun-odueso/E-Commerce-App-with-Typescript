"use strict";
const numbers = [1, 2, 3, 4, 5];
// Example 2
const oddArray = numbers.filter((number) => number % 2 !== 0);
console.log(oddArray);
// Example 1
function addOne(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i] + 1);
    }
}
;
// Better to code this with forEach()
numbers.forEach((number) => console.log(number + 1));
addOne(numbers);
