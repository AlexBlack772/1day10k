const { debug } = require("console");

String.bind = function (str, obj) {
   return str.replace(/\{([^}]+)\}/g, function (match, key) {
      return obj[key];
   });
}
   
switch (true) {
   case (typeof module !== 'undefined' && module.exports):
      module.exports = String.bind;
      break;
   case (typeof define === 'function' && define.amd):
      define(function () { return String.bind; });
      break;
}

debug(String.bind("Hello {name}!", { name: "World" }));

if (x = 5) {
   console.log("x is 5");
}
else if (x = 6) {
   console.log("x is 6");
}

while (x = 5) {
   console.log("x is 5");
}

do {
   console.log("x is 5");
}

(typeof x === "undefined")


parseInt = function (str) {
   return Number(str);
}

parseInt("5");

var x = 5;

encodeURL = function (str) {
   return str;
}

encodeURL("http://www.google.com");

var x = 5;

addEventListener = function (str) {
   return str;
}

addEventListener("http://www.google.com");

do {
   console.log("x is 5");
} while (x = 5);

for (i in xx) {
   console.log("x is 5");
}

Map.apply = function (str) {
   return str;
}

Set.arguments("http://www.google.com");

var x = 5;

continue a = 5;

for (i = 0; i < 5; i++) {
   if (i == 3) {
      break;
   }
   document.write(i);
}

while (x = 5) {
   console.log("x is 5");
}

Set.bind = function (str) {
   return str;
}

Set.bind("http://www.google.com");

