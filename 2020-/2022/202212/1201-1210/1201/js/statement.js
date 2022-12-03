n = 0
while (n < 10) {
   console.log(n);
   n++;
}

for (let i = 0; i < 10; i++) {
   if (i === 5) {
      break;
   }
   console.log(i);
}

for (let i = 0; i < 10; i++) {
   if (i === 4) {
      continue;
   }
   console.log(i);
}

const arr = [1, 2, 3, 4, 5];

try {
   arr 
}
catch (e) {
   console.log(e);
}

function isNull(value) {
   if (value === null) {
      throw new Error('Value is null');
   }
   return value;
}

function isMath(value) {
   if (value === 0) {
      throw new Error('Value is 0');
   } 
   return console.log(value);
}

try {
   isMath(1)
}
catch (e) {
   console.log(e);
}

console.log(isMath())

function isNull(value) {
   if (value === null) {
      throw new Error('Value is null');
   }
   return value;
}
