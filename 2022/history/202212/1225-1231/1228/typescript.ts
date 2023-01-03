let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

//type
function identity(arg: any): any {
  return arg;
}

//<T> とは、型変数と呼ばれるもので、型引数と呼ばれるものを受け取ることができる
function identity<T>(arg: T): T {
  return arg;
}

function identity<T>(arg: T): T {
  return arg;
}

function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // エラー: Tは.lengthを持ちません
  return arg;
}


//<T> とは、型変数と呼ばれるもので、型引数と呼ばれるものを受け取ることができる
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // 配列は.lengthを持つため、エラーにはなりません
  return arg;
}

//Array<T>という書き方もできる
function loggingIdentity<T>(arg: Array<T>): Array<T> {
   console.log(arg.length); // 配列は.lengthを持つため、エラーにはなりません
   return arg;
}

//
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: <T>(arg: T) => T = identity;

function identity<T>(arg: T): T {
  return arg;
}

interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: GenericIdentityFn = identity;

interface GenericIdentityFn<T> {
   (arg: T): T;
}
function identity<T>(arg: T): T {
   return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;

//クラスのジェネリック
class GenericNumber<T> {
   zeroValue: T;
   add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

//ジェネリックの制約
interface Lengthwise {
   length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
   console.log(arg.length);  // 現在、TはLengthwiseとして知られています
   return arg;
}

//型パラメータの制約
function getProperty<T, K extends keyof T>(obj: T, key: K) {
   return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // 正常
getProperty(x, "m"); // エラー: 'm' は型 'X' に存在しません

//型パラメータの制約
function create<T>(c: { new(): T; }): T {
   return new c();
}

interface GenericIdentityFn<T> {
  (arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;

//型推論
function identity<T>(arg: T): T {
   return arg;
}
let myIdentity: <U>(arg: U) => U = identity;

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

//型推論
function identity<T>(arg: T): T {
   return arg;
}
let myIdentity: <T>(arg: T) => T = identity;

function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // エラー: Tは.lengthを持ちません
  return arg;
}

//型推論
function identity<T>(arg: T): T {
   return arg;
}

let myIdentity: <U>(arg: U) => U = identity;

//型推論
function identity<T>(arg: T): T {
   return arg;
}

function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = source[id];
  }
  return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 }); // OK
copyFields(x, { Q: 90 }); 

//型推論
function identity<T>(arg: T): T {
   return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

enum Color {
    Red,
    Green,
    Blue
}
var col = Color.Red;
col = 0; //

class Queue {
  private data = [];
  push(item) {
    this.data.push(item);
  }
  pop() {
    return this.data.shift();
  }
}

class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}

const queue = new Queue();
queue.push(0);
queue.push("1"); // Oops a mistake

// a developer walks into a bar
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR

class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}

const queue = new Queue();
queue.push(0);
queue.push("1"); // Oops a mistake

// a developer walks into a bar
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR

//
class QueueNumber extends Queue {
  push(item: number) { super.push(item); }
  pop(): number { return this.data.shift(); }
}

const queue = new QueueNumber();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

// ^ if that error is fixed the rest would be fine too
//Queue<T> とは、 T型の要素を格納することができるキューです。
class Queue<T> {
  private data = [];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T | undefined {
    return this.data.shift();
  }
}

/** Again sample usage */
const queue = new Queue<number>();
queue.push(0);
queue.push("1");

//Queue<number> とは、 number型の要素を格納することができるキューです。
class Queue<T> {
   private data = [];
   push(item: T) {
      this.data.push(item);
   }
   pop(): T | undefined {
      return this.data.shift();
   }
}
   
const queue = new Queue<number>();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

//Queue<string> とは、 string型の要素を格納することができるキューです。
class Queue<T> {
   private data = [];
   push(item: T) {
      this.data.push(item);
   }
   pop(): T | undefined {
      return this.data.shift();
   }
}
   
const queue = new Queue<string>();
queue.push(0); // ERROR : cannot push a number. Only strings allowed
queue.push("1");

function reverse<T>(items: T[]): T[] {
  var toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Safety!
reversed[0] = "1"; // Error!
reversed = ["1", "2"]; // Error!

reversed[0] = 1; // Okay
reversed = [1, 2]; 

//型推論
function identity<T>(arg: T): T {
   return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

function reverse<T>(items: T[]): T[] {
   var toreturn = [];
   for (let i = items.length - 1; i >= 0; i--) {
      toreturn.push(items[i]);
   }
   return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);

class Utility {
     reverse<T>(items: T[]): T[] {
       var toreturn = [];
       for (let i = items.length - 1; i >= 0; i--) {
         toreturn.push(items[i]);
       }
       return toreturn;
     }
}

const getJSON = <T>(config: {
  url: string;
  headers?: { [key: string]: string };
}): Promise<T> => {
  const fetchConfig = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(config.headers || {}),
  };
  return fetch(config.url, fetchConfig).then<T>((response) => response.json());
};

type LoadUsersResponse = {
  users: {
    name: string;
    email: string;
  }[]; // array of user objects
};
function loadUsers() {
  return getJSON<LoadUsersResponse>({ url: "https://example.com/users" });
}

//<type> は、型アサーションと呼ばれるものです。
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;

//型推論
function identity<Type>(arg: Type): Type {
   return arg;
}

function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
   return obj[key];
}
   
let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay

getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

//型推論
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;

function identity<Type>(arg: Type): Type {
  return arg;
}
//<Input> は、ジェネリック型の引数と呼ばれるものです。
let myIdentity: <Input>(arg: Input) => Input = identity;

function identity<Type>(arg: Type): Type {
   return arg;
}
//<Type> は、ジェネリック型の引数と呼ばれるものです。
let myIdentity: { <Type>(arg: Type): Type } = identity;

type Point = { x: number; y: number };
type P = keyof Point;

//typeとは、型のエイリアスです。
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];


type I1 = Person["age" | "name"];

type I1 = string | number;

type I2 = Person[keyof Person];

type I2 = string | number | boolean;

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];

type Age = typeof MyArray[number]["age"];

// Or
type Age2 = Person["age"];

interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

type Example1 = number;

type Example2 = RegExp extends Animal ? number : string;

function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}

function padLeft(padding: string, input: string): string {
   throw new Error("Not implemented yet!");
}
   
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

function printAll(strs: string | string[] | null) {
   if (strs == null) {
      return;
   }
   if (typeof strs === "object") {
      for (const s of strs) {
         console.log(s);
      }
   } else {
      console.log(strs);
   }
}

type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
   darkMode: () => void;
   newUserProfile: () => void;
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

type User = {
   id: string;
   name: string;
   age: number;
};

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

type World = "world";

type Greeting = `hello ${World}`;

const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};

const { firstName, lastName, age } = passedObject;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// makeWatchedObject has added `on` to the anonymous Object

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

class Point {
  x: number;
  y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;

class Point {
   x = 0;
   y = 0;
}
   
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
 
export class RandomNumberGenerator {}
 
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

// @filename: index.ts
import { pi, squareTwo, phi } from "./maths";

import { createCatName, type Cat, type Dog } from "./animal.js";

export type Animals = Cat | Dog;
const name = createCatName();

function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}

function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
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

//@configurableとは、デコレーターを使って、オブジェクトのプロパティの設定を変更することができる。

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

interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}


class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
  }
}


import { StringValidator } from "./StringValidator";
export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

// Declares there is a global variable called 'window'
declare var window: Window & typeof globalThis;
// Which is declared as (simplified):
interface Window extends GlobalEventHandlers {
  // ...
}
// Which defines a lot of known handler events
interface GlobalEventHandlers {
  onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  // ...
}




