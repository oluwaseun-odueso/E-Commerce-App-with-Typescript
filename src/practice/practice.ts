const numbers: number[] = [1, 2, 3, 4, 5];

// Example 3
const newArray = numbers.map((number) => number + 1)
console.log(newArray)

// Example 2
function isOdd(array: number[], oddArr: number[] = []) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 !== 0) {
            oddArr.push(array[i])
        }
    }

    return oddArr;
}

// Example 2
const oddArray = numbers.filter((number) => number % 2 !== 0);
console.log(oddArray);

// Example 1
function addOne(array: number[]) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i] + 1)
    }
};

// Better to code this with forEach()
numbers.forEach((number) => console.log(number + 1))

addOne(numbers)