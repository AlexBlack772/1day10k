// 名前付き関数
function add(x, y) {
    return x + y;
}
// 匿名関数
let myAdd = function(x, y) { return x+y; };

let z = 100;
function addToZ(x, y) {
    return x + y + z;
}

//@とは、デコレータを表す
function sealed(target) {
  // do something with 'target' ...
}

function color(value: string) {
  // これはデコレータファクトリーです
  return function (target) {
    // これはデコレータです
    // do something with 'target' and 'value'...
  };
}

function f() {
  console.log("f(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("f(): called");
  };
}

function g() {
  console.log("g(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("g(): called");
  };
}

//@enumerable(false)は、デコレータファクトリーです
class C {
  @f()
  @g()
  method() {}
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  @configurable(false)
  get x() {
    return this._x;
  }
  @configurable(false)
  get y() {
    return this._y;
  }
}

//@configurable(false)は、デコレータファクトリーです

class Greeter {
  @format("Hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}

//
import "reflect-metadata";
const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

import "reflect-metadata";
class Point {
  x: number;
  y: number;
}
class Line {
  private _p0: Point;
  private _p1: Point;
  @validate
  set p0(value: Point) {
    this._p0 = value;
  }
  get p0() {
    return this._p0;
  }
  @validate
  set p1(value: Point) {
    this._p1 = value;
  }
  get p1() {
    return this._p1;
  }
}
function validate<T>(
   target: any,
   propertyKey: string,
   descriptor: TypedPropertyDescriptor<T>
) {
   let set = descriptor.set;
   descriptor.set = function (value: T) {
      let type = Reflect.getMetadata("design:type", target, propertyKey);
      if (!(value instanceof type)) {
         throw new TypeError("Invalid type.");
      }
      set(value);
   };
}

// LabelledValue とは、オブジェクトの型を表す
interface LabelledValue {
  label: string;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

//enumとは、 列挙型を表す
enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

// Sample usage
var card = CardSuit.Clubs;

// Safety
card = "not a member of card suit"; // Error : string is not assignable to type `CardSuit`

//declareとは、宣言を表す
interface Process {
    exit(code?: number): void;
}
declare var process: Process;

// Sample A
declare var myPoint: { x: number; y: number; };

// Sample B
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

//interfaceとは、インターフェースを表す
interface Point {
  x: number;
  y: number;
  z: number; // New member
}

class MyPoint implements Point {
  // ERROR : missing member `z`
  x: number;
  y: number;
}

//freshとは、新しいオブジェクトを表す
function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
logName(random); // Error: property `name` is missing

//intersectionとは、交差型を表す
interface ErrorHandling {
   success: boolean;
   error?: { message: string };
}
interface ArtworksData {
   artworks: { title: string }[];
}

function logName(something: { name: string }) {
    console.log(something.name);
}

logName({ name: 'matt' }); // okay
logName({ name: 'matt', job: 'being awesome' }); // Error: object literals must only specify known properties. `job` is excessive here.

//typeofとは、型を表す
//subtrとは、文字列を切り取る
function doSomething(x: number | string) {
  if (typeof x === "string") {
    // Within the block TypeScript knows that `x` must be a string
    console.log(x.subtr(1)); // Error, 'subtr' does not exist on `string`
    console.log(x.substr(1)); // OK
  }
  x.substr(1); // Error: There is no guarantee that `x` is a `string`
}

class Foo {
  foo = 123;
}

class Bar {
  bar = 123;
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // OK
    console.log(arg.bar); // Error!
  } else {
    // MUST BE Bar!
    console.log(arg.foo); // Error!
    console.log(arg.bar); // OK
  }
}

doStuff(new Foo());
doStuff(new Bar());

//inとは、プロパティの存在を表す
interface A {
  x: number;
}
interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ("x" in q) {
    // q: A
  } else {
    // q: B
  }
}

//typeとは、型を表す
type TriState = "yes" | "no" | "unknown";

function logOutState(state: TriState) {
  if (state == "yes") {
    console.log("User selected yes");
  } else if (state == "no") {
    console.log("User selected no");
  } else {
    console.log("User has not made a selection yet");
  }
}

//typeとは、型を表す
type CardinalDirection =
    | "North"
    | "East"
    | "South"
    | "West";

function move(distance: number, direction: CardinalDirection) {
    // ...
}

move(1,"North"); // Okay
move(1,"Nurth"); // Error!


let foo:any = {};
foo['Hello'] = 'World';
console.log(foo['Hello']); // World

class Foo {
  constructor(public message: string){};
  log(){
    console.log(this.message)
  }
}

let foo:any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World
