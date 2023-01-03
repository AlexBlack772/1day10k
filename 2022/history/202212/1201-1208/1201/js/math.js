function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
   return a * b;
}
   
function divide(a, b) {
   return a / b;
}

console.log(add(1, 2));

const z = 10;
if (z % 2 == 0) {
   console.log("x is even");
} else if(z % 2 == 1) {
   console.log("x is odd");
}

try {
   a + b == 3;
} catch {
   console.log("a and b are not defined");
}

for (let i = 0; i < 10; i++) {
   console.log(i);
}
const xx = 2

switch (xx) {
   case 1:
      console.log("x is 1");
   case 2:
      console.log("x is 2");
   default:
      console.log("x is not 1 or 2");
}

map = new Map();
map.set("a", 1);

class MyClass {
   constructor() {
      this.a = 1;

   }
}

const myClass = new MyClass();
console.log(myClass.a);

const x = [1, 2, 3];
console.log(x[0]);

const y = 4;
switch (y) { 
   case y == 1:
      console.log("x is 1");
      break
   case y == 2:
      console.log("x is 2");
   default:
      console.log("");
}

try {
   a + b == 3;
} catch {
   console.log("a and b are not defined");
}


