//ジェネリック型
function identity<T>(arg: T): T {
   return arg;
}
//boolean型
let output = identity<boolean>(true);
console.log(output);
//number型  
let count: number = 2
//string型
let name1: string = "Taro"
//配列型
let array: number[] = [1, 2, 3]
//parameter型
//parameter型は関数の引数に型を指定する
function add(x: number, y: number): number {
   return x + y;
}
add(1, 2);
//戻り値型
//戻り値型は関数の戻り値に型を指定する
function add2(x: number, y: number): number {
   return x + y;
}
add2(1, 2);
//undefined型
let un: undefined = undefined
//null型
let nu: null = null
//index型
//index型はオブジェクトのキーに型を指定する
let obj: { [key: string]: string } = {
   name: "Taro",
   age: "20"
}
//record型
//record型はオブジェクトのキーに型を指定する
let obj2: Record<string, string> = {
   name: "Taro",
   age: "20"
}
//mappedtype型
//mappedtype型はオブジェクトのキーに型を指定する
type MappedType = {
   [P in "name" | "age"]: string
}
let obj3: MappedType = {
   name: "Taro",
   age: "20"
}
//ジェネリックスオブジェクト型
//ジェネリックスオブジェクト型はオブジェクトのキーに型を指定する
type GenericObject<T> = {
   [key: string]: T
}
let obj4: GenericObject<string> = {
   name: "Taro",
   age: "20"
}
//union型
//union型は複数の型を指定する
let union: string | number = "Taro"
//intersection型
//intersection型は複数の型を指定する
type Intersection = {
   name: string
}
type Intersection2 = {
   age: number
}
let intersection: Intersection & Intersection2 = {
   name: "Taro",
   age: 20
}
//literal型
//literal型は文字列や数値を指定する
let literal: "Taro" = "Taro"
//enum型
//enum型は列挙型を指定する
enum Color {
   Red,
   Blue,
   Green
}
let color: Color = Color.Red
//any型
//any型は型を指定しない
let any: any = "Taro"
//ジェネリクスオブジェクト型定義
type GenericObject1<T> = {
   [key: string]: T
}
//ジェネリクス関数
function identity1<T>(arg: T): T {
   return arg;
}
//ジェネリクスオブジェクト型
let obj5: GenericObject1<string> = {   
   name: "Taro",
   age: "20"
}
//ジェネリクス関数
let output1 = identity1<string>("Taro");
console.log(output1);
//型ガードエラーハンドリング
//型ガードエラーハンドリングは型を判定する
function add3(x: string | number, y: string | number): string | number {
   if (typeof x === "string" || typeof y === "string") {
      return x.toString() + y.toString();
   }
   return x + y;
}
add3("a", "b");
//型アサーション
//型アサーションは型を変換する
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
//型ガードアサーション
//promise型
//promise型は非同期処理を指定する
let promise2: Promise<string> = new Promise((resolve, reject) => {
   resolve("Taro");
}
);
//async型
//async型は非同期処理を指定する
async function asyncFunc() {
   return "Taro";
}
//await型
//await型は非同期処理を指定する
async function asyncFunc2() {
   let result = await asyncFunc();
   console.log(result);
}
asyncFunc2();
//型エイリアス
//型エイリアスは型を別名で指定する
type Name = string;
let name2: Name = "Taro";

//array型
//array型は配列を指定する
let array1: Array<string> = ["Taro", "Jiro", "Saburo"];
//tuple型
//tuple型は配列の要素の型を指定する
let tuple: [string, number] = ["Taro", 20];
//readonly型
//readonly型は配列の要素を変更できないようにする
let readonly: ReadonlyArray<string> = ["Taro", "Jiro", "Saburo"];
//void型
//void型は戻り値を指定しない
function voidFunc(): void {
   console.log("Taro");
}
voidFunc()
//never型
//never型は戻り値を指定しない
function neverFunc(): never {
   throw new Error();
}
neverFunc
//unknown型
//unknown型は型を指定しない
let unknown: unknown = "Taro";

//declare型
//declare型は型を指定しない
//declare function require(name: string): any;

//freshness
const obj6 = {
   name: "Taro",
   age: 20
}
//instanceof型
//instanceof型はインスタンスを指定する
if (obj6 instanceof Object) {
   console.log("Taro");
}
//typeof型
//typeof型は型を指定する
if (typeof obj6 === "object") {
   console.log("Taro");
}
//in
//inはオブジェクトのキーを指定する
if ("name" in obj6) {
   console.log("Taro");
}
//keyof型
//keyof型はオブジェクトのキーを指定する
type Key = keyof typeof obj6;
//readonly型
const obj7 = {
   name: "Taro",
   age: 20
}
//readonly型はオブジェクトのキーを変更できないようにする
//obj7.name = "Jiro";
//parameters型
//parameters型は関数の引数を指定する
type Parameters1<T extends (...args: any) => any> = T extends (
   ...args: infer P
) => any ? P : never;
//returntype型
//returntype型は関数の戻り値を指定する
type ReturnType1<T extends (...args: any) => any> = T extends (
   ...args: any
) => infer R ? R : any;
//デコレータ
//デコレータは関数を指定する
function decorator(target: any) {
   console.log(target);
}
decorator("Taro");
/*@decorator
class Decorator {
   name = "Taro";
}
//デコレータファクトリ
//デコレータファクトリは関数を指定する
function decoratorFactory(name: string) {
   return function (target: any) {
      console.log(name);
   }
}
//classデコレータ
//classデコレータは関数を指定する
/*function classDecorator(target: any) {
   console.log(target);
}
@classDecorator
class ClassDecorator {
   name = "Taro";
}
//propertyデコレータ
//propertyデコレータは関数を指定する
function propertyDecorator(target: any, key: string) {
   console.log(key);
}
class PropertyDecorator {
   @propertyDecorator
   name = "Taro";
}
//methodデコレータ
//methodデコレータは関数を指定する
function methodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
   console.log(key);
}
class MethodDecorator {
   @methodDecorator
   method() {
   }
}*/
//MappedTypes
//MappedTypesはオブジェクトのキーを指定する
type MappedTypes = {
   -readonly [P in keyof typeof obj6]: typeof obj6[P];
}
//caonditionalTypes
//caonditionalTypesは条件を指定する
type ConditionalTypes = typeof obj6 extends { name: string } ? true : false;
//infer型
//infer型は型を指定する
type Infer = { name: string } extends { name: infer R } ? R : never;
//オブジェクト型
//オブジェクト型はオブジェクトを指定する
let obj8: {
   name: string;
   age: number;
} = {
   name: "Taro",
   age: 20
}
//オブジェクト型の省略記法
//オブジェクト型の省略記法はオブジェクトを指定する
let obj9 = {
   name: "Taro",
   age: 20
}

//型の互換性
//型の互換性は型を指定する
let obj10: {
   name: string;
   age: number;
} = {
   name: "Taro",
   age: 20
}
//promise型
//promise型は型を指定する
let promise: Promise<string> = new Promise((resolve) => {
   resolve("Taro");
})
//型の互換性
//型の互換性は型を指定する
let obj11: {
   name: string;
   age: number;
} = {
   name: "Taro",
   age: 20
}
//Partial型
//Partial型はオブジェクトのキーを指定する
type Partial1<T> = {
   [P in keyof T]?: T[P];
}
//Required型
//Required型はオブジェクトのキーを指定する
type Required1<T> = {
   [P in keyof T]-?: T[P];
}
//Readonly型
//Readonly型はオブジェクトのキーを指定する
type Readonly1<T> = {
   readonly [P in keyof T]: T[P];
}
//Pick型
//Pick型はオブジェクトのキーを指定する
type Pick1<T, K extends keyof T> = {

   [P in K]: T[P];
}
//Record型
//Record型はオブジェクトのキーを指定する
type Record1<K extends keyof any, T> = {
   [P in K]: T;
}
//Exclude型
//Exclude型は型を指定する
type Exclude1<T, U> = T extends U ? never : T;
//Extract型
//Extract型は型を指定する
type Extract1<T, U> = T extends U ? T : never;
//NonNullable型
//NonNullable型は型を指定する
type NonNullable1<T> = T extends null | undefined ? never : T;
//Parameters型
//Parameters型は関数の引数を指定する
type Parameters2<T extends (...args: any) => any> = T extends (
   ...args: infer P
) => any ? P : never;
//ReturnType型
//ReturnType型は関数の戻り値を指定する
type ReturnType2<T extends (...args: any) => any> = T extends (
   ...args: any
) => infer R ? R : any;
//InstanceType型
//InstanceType型はクラスのインスタンスを指定する
type InstanceType1<T extends new (...args: any) => any> = T extends new (
   ...args: any
) => infer R ? R : any;
//ThisType型
//ThisType型は型を指定する
type ThisType1<T> = {
   this: T;
}
//Omit型
//Omit型はオブジェクトのキーを指定する
type Omit1<T, K extends keyof any> = Pick1<T, Exclude1<keyof T, K>>;
//Exclude型
//Exclude型は型を指定する
type Exclude2<T, U> = T extends U ? never : T;
//Extract型
//Extract型は型を指定する
type Extract2<T, U> = T extends U ? T : never;
//NonNullable型
//NonNullable型は型を指定する
type NonNullable2<T> = T extends null | undefined ? never : T;
//Parameters型
//Parameters型は関数の引数を指定する
type Parameters3<T extends (...args: any) => any> = T extends (
   ...args: infer P
) => any ? P : never;
//Extract型
//Extract型は関数の戻り値を指定する
type ReturnType3<T extends (...args: any) => any> = T extends (
   ...args: any
) => infer R ? R : any;
//mixin型
//mixin型は型を指定する
type Mixin = {
   name: string;
   age: number;
}
//as const
//as constは型を指定する
let obj12 = {
   name: "Taro",
   age: 20
} as const;
//as const
//型アサーション
//型アサーションは型を指定する
//型アサーション
//index型
//index型は型を指定する
type Index = {
   [key: string]: string;
}

