//<>とは、型引数を指定するための記号
function identity<Type>(arg: Type): Type {
  return arg;
}

// Sample A
declare var myPoint: { x: number; y: number; };

// Sample B
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

//declareは、宣言を行うためのキーワード
// Sample A
declare var myPoint: { x: number; y: number; };

// Sample B
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

//<type>とは、型キャストを行うための記号
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}


function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

//<T>とは、型引数を指定するための記号
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;

//interfaceとは、オブジェクトの型を定義するためのキーワード
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

//class <>とは、ジェネリッククラスを定義するための記号
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

//new <>とは、ジェネリッククラスのインスタンスを生成するための記号
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));


class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}

//implementsとは、インターフェースを実装するためのキーワード
interface Checkable {
  check(name: string): boolean;
}
 
class NameChecker implements Checkable {
  check(s) {
Parameter 's' implicitly has an 'any' type.
    // Notice no error here
    return s.toLowercse() === "ok";
                 
any
  }
}

//extendsとは、クラスを継承するためのキーワード
class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
 
const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
//interaceとは、オブジェクトの型を定義するためのキーワード
interface StringValidator {
    isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;
class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}


//implementsとは、インターフェースを実装するためのキーワード
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

let sym = Symbol();
let obj = {
    [sym]: "value"
};

function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
logName(random); // Error: property `name` is missing

class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  // Make this parameter required
  greet(name: string) {

    console.log(`Hello, ${name.toUpperCase()}`);
  }
}

//superとは、親クラスのメソッドを呼び出すためのキーワード
interface Animal {
  dateOfBirth: any;
}
 
interface Dog extends Animal {
  breed: any;
}
 
class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}
 
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}

//extensとは、クラスを継承するためのキーワード
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
 
class Derived extends Base {
  name = "derived";
}
 
// Prints "base", not "derived"
const d = new Derived();

let foo: never = 123; // Error: Type number is not assignable to never

// Okay as the function's return type is `never`
let bar: never = (() => { throw new Error(`Throw my hands in the air like I just don't care`) })();

let foo:any = {};
foo['Hello'] = 'World';
console.log(foo['Hello']); // World

//typeofとは、変数の型を取得するためのキーワード
class Foo {
  constructor(public message: string){};
  log(){
    console.log(this.message)
  }
}

let foo:any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World

function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}


enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function toArray<X>(xs: Iterable<X>): X[] {
  return [...xs]
}

//Iterableとは、反復可能なオブジェクトを表すためのインターフェース

//for () とは、反復処理を行うためのキーワード
let someArray = [1, "string", false];
for (let entry of someArray) {
  console.log(entry); // 1, "string", false
}

//locationとは、ブラウザのURLを表すためのプロパティ
const user = {
  name: "Daniel",
  age: 26,
};
user.location; 

//toLocalLowerCaseとは、文字列を小文字に変換するためのメソッド
const announcement = "Hello World!";
 
// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
 
// We probably meant to write this...
announcement.toLocaleLowerCase();

function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
Object is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

//Symbol.hasInstanceとは、オブジェクトが特定のクラスのインスタンスかどうかを判定するためのメソッド

class Foo { }
var Bar = Foo;
var bar: Bar;


//
function identity<Type>(arg: Type): Type {
  return arg;
}

//Typeとは、型を表すためのキーワード
function identity<Type>(arg: Type): Type {
  return arg;
}

//<>とは、ジェネリック型を表すためのキーワード
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

//interfaceとは、型を表すためのキーワード
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn = identity;

//noImplicitAnyとは、暗黙的なany型を許可しないための設定
function identity<Type>(arg: Type): Type {
   return arg;
}
   
//classとは、クラスを表すためのキーワード
interface Point {
    x: number,
    y: number
}

class Point2D {
    constructor(public x:number, public y:number){}
}

let p: Point;
// OK, because of structural typing
p = new Point2D(1, 2);

interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* do something */ }

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
iTakePoint2D({ x: 0 }); // Error: missing information `y`


//inatefaceとは、型を表すためのキーワード
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;

//typeとは、型を表すためのキーワード
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
 
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
 
type User = Concrete<MaybeUser>;

type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}
//asとは、型を変換するためのキーワード

type MappedTypeWithNewProperties<Type> = {
   [Properties in keyof Type as NewKeyType]: Type[Properties]
}

// Remove the 'kind' property
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
 
interface Circle {
    kind: "circle";
    radius: number;
}
 
type KindlessCircle = RemoveKindField<Circle>;

type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
 
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
 
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;

type NonFunctionPropertyNames<Type> = {
   [Property in keyof Type]: Type[Property] extends Function ? never : Property;
}[keyof Type];

//parse.onとは、イベントを登録するためのメソッド
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
 
// makeWatchedObject has added `on` to the anonymous Object
 
person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

//
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};
 
/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;


type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};
 
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
 
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});
 
person.on("firstNameChanged", newName => {
                                
(parameter) newName: string
    console.log(`new name is ${newName.toUpperCase()}`);
});
 
person.on("ageChanged", newAge => {
                          
(parameter) newAge: number
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})

//typeとは、型を表すためのキーワード
