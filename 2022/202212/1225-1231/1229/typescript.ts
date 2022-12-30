//enumとは、列挙型のことで、列挙型は、ある値の集合を表す型です。
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

//<>とは、ジェネリック型のことで、ジェネリック型は、型を引数として受け取ることができます。
function identity(arg: number): number {
    return arg;
}

//型推論とは、型を明示的に指定しなくても、型を推論してくれる機能です。
let myFavoriteNumber = 'seven';

//<T>とは、ジェネリック型のことで、ジェネリック型は、型を引数として受け取ることができます。
function identity<T>(arg: T): T {
    return arg;
}


function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // エラー: Tは.lengthを持ちません
  return arg;
}
//<U>とは、ジェネリック型のことで、ジェネリック型は、型を引数として受け取ることができます。
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: <U>(arg: U) => U = identity;

//interfaceとは、インターフェースのことで、インターフェースは、オブジェクトの型を定義することができます。
interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: GenericIdentityFn = identity;

//interfaceとは、インターフェースのことで、インターフェースは、オブジェクトの型を定義することができます。
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
alert(stringNumeric.add(stringNumeric.zeroValue, "test"));


interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // .lengthプロパティを持つことが保証されるため、エラーになりません
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

//型推論とは、型を明示的に指定しなくても、型を推論してくれる機能です。
let myAdd = function (x: number, y: number): number {
   return x + y;
}

//型推論とは、型を明示的に指定しなくても、型を推論してくれる機能です。
function add(x: number, y: number): number {
  return x + y;
}
let myAdd = function (x: number, y: number): number {
  return x + y;
};

//型推論とは、型を明示的に指定しなくても、型を推論してくれる機能です。

function identity(arg: number): number {
  return arg;
}

let myIdentity: (arg: number) => number = identity;

//<T>とは、ジェネリック型のことで、ジェネリック型は、型を引数として受け取ることができます。
function identity<Type>(arg: Type): Type {
   return arg;
}

//typeofとは、型を取得する演算子のことで、型を取得することができます。
type Point = { x: number; y: number };
type P = keyof Point;

//keyofとは、オブジェクトのキーを取得する演算子のことで、オブジェクトのキーを取得することができます。
type Point = { x: number; y: number };
type P = keyof Point;

//
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

//typeとは、型のエイリアスのことで、型のエイリアスを定義することができます。
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};


type FeatureFlags = {
   darkMode: () => void;
   newUserProfile: () => void;
};

//readonlyとは、読み取り専用のことで、読み取り専用を定義することができます。
// in keyofとは、オブジェクトのキーを取得する演算子のことで、オブジェクトのキーを取得することができます。
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

//literalとは、文字列のリテラルのことで、文字列のリテラルを定義することができます。
type World = "world";

type Greeting = `hello ${World}`;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

//export defaultとは、デフォルトエクスポートのことで、デフォルトエクスポートを定義することができます。
export default function helloWorld() {
  console.log("Hello, world!");
}

function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
let result1 = buildName("Bob"); // OK、"Bob Smith"を返すようになります
let result2 = buildName("Bob", undefined); // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
let result4 = buildName("Bob", "Adams"); 

//thisとは、thisのことで、thisを定義することができます。
class Handler {
   info: string;
   onClickBad(this: Handler, e: Event) {
      // this.info = e.message;
   }
}
   
let h = new Handler();

//declareとは、宣言のことで、宣言を定義することができます。
declare module JSX {
  interface IntrinsicElements {
    a: React.HTMLAttributes;
    abbr: React.HTMLAttributes;
    div: React.HTMLAttributes;
    span: React.HTMLAttributes;

    /// などなど
  }
}

type Props = {
  foo: string;
};
const MyComponent: React.FC<Props> = (props) => {
  return <span>{props.foo}</span>;
};

<MyComponent foo="bar" />;

//NumTypeとは、ジェネリック型のことで、ジェネリック型は、型を引数として受け取ることができます。
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

//extendsとは、継承のことで、継承を定義することができます。
class Animal {
   name: string;
}
class Dog extends
   Animal {
   breed: string;
}

function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

//anyとは、anyのことで、anyを定義することができます。
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

//noImplicitAnyとは、暗黙的なanyのエラーのことで、暗黙的なanyのエラーを定義することができます。
function f(x) {
   // ~~~~~ Parameter 'x' implicitly has an 'any' type.
   return x;
}
   
//noImplicitThisとは、暗黙的なthisのエラーのことで、暗黙的なthisのエラーを定義することができます。
function f(this: void) {
   // make sure `this` is unusable in this standalone function
}

//strictNullChecksとは、nullチェックのエラーのことで、nullチェックのエラーを定義することができます。
//throwとは、例外を投げるのことで、例外を投げることができます。
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}

function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

class Point {
  x = 0;
  y = 0;
}

const pt = new Point();
// Prints 0, 0
console.log(`${pt.x}, ${pt.y}`);

//aboutとは、型のことで、型を定義することができます。
import { pi, phi, absolute } from "./maths.js";

console.log(pi);
const absPhi = absolute(phi);

//asとは、型アサーションのことで、型アサーションを定義することができます。
function getLength(obj: string | string[]) {
   return obj.length;
}
   

class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}

const gg = new GoodGreeter();

//implementsとは、インターフェースの実装のことで、インターフェースの実装を定義することができます。

class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}

const gg = new GoodGreeter();

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

//inferとは、推論のことで、推論を定義することができます。
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;


type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;

type Str = string;

// Leaves the type alone.
type Num = Flatten<number>;