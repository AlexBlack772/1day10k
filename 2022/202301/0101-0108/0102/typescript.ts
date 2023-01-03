//enumとは、列挙型のことで、列挙型は、列挙された値を持つことができる。
enum Color {
    Red,
    Green,
    Blue
}
var col = Color.Red;
col = 0; // Effectively same as Color.Red

//@typeとは、型のことで、型は、値の種類を表す。


function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
logName(random); // Error: property `name` is missing

//<type>とは、型のことで、型は、値の種類を表す。
function identity<Type>(arg: Type): Type {
  return arg;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}


var Tristate;
(function (Tristate) {
  Tristate[(Tristate["False"] = 0)] = "False";
  Tristate[(Tristate["True"] = 1)] = "True";
  Tristate[(Tristate["Unknown"] = 2)] = "Unknown";
})(Tristate || (Tristate = {}));

