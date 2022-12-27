//enumとは、
enum FileAccess {
  // 定数メンバー
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // 計算されたメンバー
  G = "123".length,
}

class Disposable {
  isDisposed: boolean;
  dispose() {
    this.isDisposed = true;
  }
}
// 活性化可能な(Activatable)Mixin
class Activatable {
  isActive: boolean;
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}
class SmartObject implements Disposable, Activatable {
  constructor() {
    setInterval(
      () => console.log(this.isActive + " : " + this.isDisposed),
      500
    );
  }
  interact() {
    this.activate();
  }
  // Disposable
  isDisposed: boolean = false;
  dispose: () => void;
  // Activatable
  isActive: boolean = false;
  activate: () => void;
  deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);
let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);
////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

// 名前付き関数
function add(x, y) {
    return x + y;
}
// 匿名関数
let myAdd = function (x, y) { return x + y; };
// アロー関数
let myAdd = (x, y) => x + y;

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
let greeter = new Greeter("world");

// Path: 1226/example.ts

function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

interface LabelledValue {
  label: string;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

//interfaceとは、
interface SquareConfig {
   color?: string;
   width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
}

   interface SquareConfig {
      color?: string;
      width?: number;
   }
   function createSquare(config: SquareConfig): { color: string; area: number } {
      let newSquare = { color: "white", area: 100 };
      if (config.color) {
         newSquare.color = config.color;
      }
      if (config.width) {
         newSquare.area = config.width * config.width;
      }
      return newSquare;
   }
   let mySquare = createSquare({ color: "black" });

   interface Point {
      readonly x: number;
      readonly y: number;
   }
   let p1: Point = { x: 10, y: 20 };
   p1.x = 5; // error!

}

interface SearchFunc {
   (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
   let result = source.search(subString);
   return result > -1;
}

a = ro as number[];
//asは、型アサーションと呼ばれるもの
//型アサーションは、コンパイラに対して、ある式の型を別の型として扱ってほしいと伝えるもの
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}
let mySquare = createSquare({ colour: "red", width: 100 });

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}

interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

interface ClockInterface {

   currentTime: Date;
}

class Clock implements ClockInterface {
   currentTime: Date;
   constructor(h: number, m: number) { }
}

interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}

interface ClockInterface {
    currentTime: Date;
}
class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

//<>は、型アサーションと呼ばれるもの
//型アサーションは、コンパイラに対して、ある式の型を別の型として扱ってほしいと伝えるもの
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
}
class Image extends Control {
}
class Location {
    select() { }
}

interface Named {
    name: string;
}
class Person {
    name: string;
}
let p: Named;
p = new Person(); 

let list = [4, 5, 6];
for (let i in list) {
   console.log(i); // "0", "1", "2",
}
for (let i of list) {
   console.log(i); // "4", "5", "6"
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";  //※　species = 種、mammals = 哺乳類
for (let pet in pets) {
   console.log(pet); // "species"
}
for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}

function color(value: string) { // これはデコレータファクトリーです
    return function (target) {  // これはデコレータです
        // do something with 'target' and 'value'...
    }
}

//@とは、デコレータと呼ばれるもの
//デコレータは、クラス、メソッド、アクセサ、プロパティ、パラメータに付与できる
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}
class C {
    @f()
    @g()
    method() {}
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
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

//アクセサデコレータは、プロパティディスクリプタを返す必要があります
//プロパティディスクリプタは、enumerable、configurable、writable、value、get、setのいずれかを持つオブジェクトです
function configurable(value: boolean) {
      return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
         descriptor.configurable = value;
      };
}
   
interface Process {
    exit(code?: number): void;
}
declare var process: Process;

interface Process {
    exitWithLogging(code?: number): void;
}
process.exitWithLogging = function() {
    console.log("exiting");
    process.exit.apply(process, arguments);
};

//モジュールは、外部モジュールと内部モジュールの2種類があります

// variable annotation
var sampleVariable: { bar: number }

// function parameter annotation
function foo(sampleParameter: { bar: number }) { }

interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';

interface Foo {
    bar: number;
    bas: string;
}
var foo = <Foo>{
    // the compiler will provide autocomplete for properties of Foo
    // But it is easy for the developer to forget adding all the properties
    // Also this code is likely to break if Foo gets refactored (e.g. a new property added)
};

//readonly修飾子は、プロパティを読み取り専用にします
function foo(config: {
    readonly bar: number,
    readonly bas: number
}) {
    // ..
}

let config = { bar: 123, bas: 123 };
foo(config);

class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}

let foo:any = {};
foo['Hello'] = 'World';
console.log(foo['Hello']);

class Foo {
  constructor(public message: string){};
  log(){
    console.log(this.message)
  }
}

let foo:any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World

//
namespace importing {
    export class Foo { }
}

import Bar = importing.Foo;
var bar: Bar; 

//namespaceとは、名前空間を表すもの
//名前空間は、グローバルスコープを汚染しないようにするために使用される
namespace MyMath {
      export function calculateRectangle(width: number, length: number) {
         return width * length;
      }
}
console.log(MyMath.calculateRectangle(10, 20)); // 200

type Callback<T> = (result: T) => void;
 
// 非同期でAPIにリクエストを投げて値を取得する処理
function request1(callback: Callback<number>) {
  setTimeout(() => {
    callback(1);
  }, 1000);
}
 
// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number, callback: Callback<number>) {
  setTimeout(() => {
    callback(result1 + 1);
  }, 1000);
}
 
// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number, callback: Callback<number>) {
  setTimeout(() => {
    callback(result2 + 2);
  }, 1000);
}
 
// コールバック地獄
// 一つ前のAPIの結果を待って次のAPIをリクエストするために
// コールバック関数が入れ子になってしまう
request1((result1) => {
  request2(result1, (result2) => {
    request3(result2, (result3) => {
      console.log(result3);
      // @log: 4
    });
  });
});

const resolvers = {
  Query: {
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    },
  },
};

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

interface MyContext {
  // we'd define the properties a user should have
  // in a separate user interface (e.g., email, id, url, etc.)
  user: UserInterface;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  
  // Note: This example uses the `req` argument to access headers,
  // but the arguments received by `context` vary by integration.
  // This means they vary for Express, Fastify, Lambda, etc.

  // For `startStandaloneServer`, the `req` and `res` objects are
  // `http.IncomingMessage` and `http.ServerResponse` types.
  context: async ({ req, res }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || '';

    // Try to retrieve a user with the token
    const user = await getUser(token);

    // Add the user to the context
    return { user };
  },
  
});

console.log(`🚀 Server listening at: ${url}`);

//Tuple型は、配列のようなオブジェクトですが、配列のように要素の型を指定することができます
let tuple: [string, number];
tuple = ['hello', 123];

let color: string = "blue";
color = 'red';

let sym = Symbol();
let obj = {
    [sym]: "value"
};

//Symbol()は、オブジェクトのプロパティ名を表すために使用される

const getClassNameSymbol = Symbol();
class C {
    [getClassNameSymbol](){
       return "C";
    }
}
let c = new C();
let className = c[getClassNameSymbol](); 

interface Named {
    name: string;
}
class Person {
    name: string;
}
let p: Named;
p = new Person()

interface Named {
    name: string;
}
let x: Named;
// yの型は{ name: string; location: string; }であると推論されます。
let y = { name: "Alice", location: "Seattle" };
x = y;

// Should be OK!
items.forEach(item => console.log(item));

enum EventType { Mouse, Keyboard }
interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}


// 脆弱ですが、便利で一般的です
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));
// 堅牢ですが、好まれません
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));
// 許可されません(明確なエラー)
// 型の指定で、全体的に互換性の無い型の適用が強制されています
listenEvent(EventType.Mouse, (e: number) => console.log(e));

enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };
let status = Status.Ready;
status = Color.Green;  //error

class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}
class Size {
    feet: number;
    constructor(numFeet: number) { }
}
let a: Animal;
let s: Size;
a = s;  //OK
s = a;  //OK

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

