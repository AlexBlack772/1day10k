//多次元配列の関数を作成
function multiArray(x, y, z) {
}
//関数を実行
multiArray(1, 2, 3);
//fizzbuzzの条件分岐を作成
const x = 3;
if (x % 3 === 0) {
   console.log("fizz");
} else if (x % 5 === 0) {
   console.log("buzz");
} 
  console.log("fizzbuzz");
//関数を実行
multiArray(1, 2, 3);
//関数を実行
multiArray(1, 2, 3);
//関数を実行
//認証の関数を書く
function auth1() {
   
}
//console.logで認証の関数を実行
console.log(auth());
//認証の関数を書く
function auth() {
   return "認証しました";
}
//console.logで認証の関数を実行
//フィボナッチ数列の関数を作成
function fib(n) {
   if (n === 0) {
      return 0;
   } else if (n === 1) {
      return 1;
   }
   return fib(n - 1) + fib(n - 2);
}
//
//todoアプリを作成する
//todoアプリの関数を作成
function todo() {
   return "todoアプリを作成する";
}
//console.logでtodoアプリの関数を実行
console.log(todo());
//todoアプリの関数を作成
//crudの関数を作成
function crud() {
   return "crud";
}
//createの関数を作成
function create() {
   return "create";
}
//readの関数を作成
function read() {
   return "read";
}
// 数列の反転の関数を作成
function reverseArray(array) {
   return array.reverse();
}
//数列の最大値を求める関数を作成
function max(array) {
   return Math.max.apply(null, array);
}
//数列の最小値を求める関数を作成
function min(array) {
   return Math.min.apply(null, array);
}
//数列の合計を求める関数を作成
function sum(array) {
   return array.reduce((a, b) => a + b, 0);

}
//配列をソートする関数を作成
function sort(array) {
   return array.sort();
}
//配列をシャッフルする関数を作成
function shuffle(array) {
   return array.sort(() => Math.random() - 0.5);
}
//配列の重複を削除する関数を作成
function uniq(array) {
   return array.filter((x, i, self) => self.indexOf(x) === i);
}
//全ての文字列の置換
function replaceAll(str, before, after) {
   return str.split(before).join(after);
}
//文字列の配列化
function split(str) {
   return str.split("");
}
//文字列の結合
function join(array) {
   return array.join("");
}
//文字列の抽出
function slice(str, start, end) {
   return str.slice(start, end);
}
//文字列の変数を変更
function replace(str, before, after) {
   return str.replace(before, after);
}
//文字列の検索
function search(str, word) {
   return str.search(word);
}
const y = 1;
//引数を２倍にする関数
function double(y) {
   return y * 2;
}
//引数を+1する関数
function plusOne(x) {
   return x + 1;
}

//引数を-1する関数
function minusOne(x) {
   return x - 1;
}

//引数の文字数が偶数か奇数かを判定する関数
function isEven(x) {
   return x % 2 === 0;
}

//引数の文字数が10未満か10以上かを判定する関数
function isUnderTen(x) {
   return x < 10;
}

//引数文字列の文字数を返す関数
function length(x) {
   return x.length;
}

//2つの引数を合計する関数
function add(x, y) {
   return x + y;
}

//引数の最初の文字を大文字にする関数
function capitalize(x) {
   return x.charAt(0).toUpperCase() + x.slice(1);
}
//引数の最後の文字を消す関数
function removeLastChar(x) {
   return x.slice(0, -1);
}
//true,falseを逆にする関数
function reverseBool(x) {
   return !x;
}

//空のオブジェクトを定義する
const obj = {};
//空の配列を定義する
const arr = [];
//空の文字列を定義する
const str = "";
//空の数値を定義する
const num = 0;
//空の真偽値を定義する
const bool = false;
//空の関数を定義する
const func = function () { };
//空のundefinedを定義する
const undef = undefined;
//空のnullを定義する
const nul = null;
//空のシンボルを定義する
const sym = Symbol();
//空の日付を定義する
const date = new Date();
//空の正規表現を定義する
const reg = new RegExp();
//空のエラーを定義する
const err = new Error();
//空のマップを定義する
const map = new Map();
//空のセットを定義する
const set = new Set();
//空のプロミスを定義する
//const promise = new Promise();
//空の配列バッファを定義する
const arrayBuffer = new ArrayBuffer();
//空のデータビューを定義する
//const dataView = new DataView();
//空のタイプ配列を定義する
const int8Array = new Int8Array();
//オブジェクトのプロパティを取得する
const objj = { a: 1, b: 2, c: 3 };
const { aa, bb, cc } = obj;
//配列の要素を取得する
const arrr = [1, 2, 3];
const [a, b, c] = arr;

//オブジェクトのプロパティを変更する
const obja = { a: 1, b: 2, c: 3 };
obja.a = 4;

//オブジェクトのageプロパティを関数を使って、+1増やしてみる
const objb = { a: 1, b: 2, c: 3 };
objb.age = plusOne(objb.age);

//オブジェクトのageプロパティを関数を使って、-1減らしてみる
const objc = { a: 1, b: 2, c: 3 };
objc.age = minusOne(objc.age);

//オブジェクトのageプロパティを関数を使って、偶数か奇数かを判定してみる
const objd = { a: 1, b: 2, c: 3 };  
objd.age = isEven(objd.age);

//オブジェクトのnameプロパティを削除する
const obje = { a: 1, b: 2, c: 3 };
delete obje.name;

//配列の２番目の要素をログに出力する
const arra = [1, 2, 3];
console.log(arra[1]);

//配列の最後の要素を削除する
const arrb = [1, 2, 3];
arrb.pop();
//配列からミカンのindexを取得する
const arrc = ["りんご", "みかん", "バナナ"];
const index = arrc.indexOf("みかん");
//配列にミカンを追加する
const arrd = ["りんご", "みかん", "バナナ"];
arrd.push("みかん");
//配列にリンゴが含まれているかを判定する
const arre = ["りんご", "みかん", "バナナ"];
const hasApple = arre.includes("りんご");
//配列の最初の要素を削除する
const arrf = ["りんご", "みかん", "バナナ"];
arrf.shift();
//配列の最初にリンゴを追加する
const arrg = ["りんご", "みかん", "バナナ"];
arrg.unshift("りんご");
//配列の３番目の要素を削除する
const arrh = ["りんご", "みかん", "バナナ"];
arrh.splice(2, 1);

//配列のそれぞれの要素をログ出力する
const arrj = ["りんご", "みかん", "バナナ"];
arrj.forEach((item) => {
   console.log(item);
}, this);
//配列のそれぞれの要素を２倍にして、新しい配列を作る
const arrk = [1, 2, 3];
const newArr = arrk.map((item) => {
   return item * 2;
})
//配列のそれぞれの要素を２倍にして、加工した配列を取得する
const arrl = [1, 2, 3];
const newArr1 = arrl.map((item) => {
   return item * 2;
})
//文字コード順に並べ替える
const arrm = ["りんご", "みかん", "バナナ"];
arrm.sort();
//配列の要素を逆順にする
const arrn = ["りんご", "みかん", "バナナ"];
arrn.reverse();
//昇順ソートする
const arro = [1, 2, 3];
arro.sort((a, b) => {
   return a - b;
})
//降順ソートする
const arrp = [1, 2, 3];
arrp.sort((a, b) => {
   return b - a;
})
//配列の要素を合計する
const arrq = [1, 2, 3];
const summ = arrq.reduce((a, b) => {
   return a + b;
})
//配列の全要素を引数の文字列で連結させる
const arrrr = ["りんご", "みかん", "バナナ"];
const strr = arrr.join("と");
//配列の要素を２つずつに分割する
const arrs = ["りんご", "みかん", "バナナ", "ぶどう"];
const newArr2 = arrs.slice(0, 2);
console.log(newArr2);
//配列の要素を２つずつに分割する
const arrt = ["りんご", "みかん", "バナナ", "ぶどう"];
const newArr3 = arrt.slice(2, 4);
console.log(newArr3);
//スプレッド構文を使って配列をコピーする
const arru = ["りんご", "みかん", "バナナ"];
const newArr4 = [...arru];
//スプレッド構文を使って配列を結合する
const arrv = ["りんご", "みかん", "バナナ"];
const arrw = ["ぶどう", "もも", "さくらんぼ"];
const newArr5 = [...arrv, ...arrw];
//スプレッド構文を使って配列の要素を展開する
const arrx = ["りんご", "みかん", "バナナ"];
const newArr6 = ["ぶどう", ...arrx, "さくらんぼ"];
//配列おぶじェクトをコピーする
const arry = [{ a: 1 }, { b: 2 }, { c: 3 }];
const newArr7 = [...arry];
//配列オブジェクトを結合する
const arrz = [{ a: 1 }, { b: 2 }, { c: 3 }];
const arraa = [{ d: 4 }, { e: 5 }, { f: 6 }];
const newArr8 = [...arrz, ...arraa];
//useStateを使って配列を更新する
/*import React, { useState } from 'react';
const App = () => {
   const [arr, setArr] = useState(["りんご", "みかん", "バナナ"]);
   const addFruit = () => {
      setArr([...arr, "ぶどう"]);
   }
   return (
      <>
         <button onClick={addFruit}>フルーツを追加</button>
         <ul>
            {arr.map((item, index) => {
               return <li key={index}>{item}</li>
            })}
         </ul>
      </>
   )
}
export default App;
*/

//useEffectを使う
useEffect(() => {
   console.log("useEffect");
}, [arrbb]);
//useContextを使う
const [arrcc, setArrcc] = useContext(FruitContext);
const addFruits = () => {
   setArrcc([...arrcc, "ぶどう"]);
}
//useReducerを使う
const [arrdd, dispatch] = useReducer(reducer, ["りんご", "みかん", "バナナ"]);
const addFruitss = () => {
   dispatch({ type: "add", name: "ぶどう" });
}
//useMemoを使う
const [arree, setArree] = useState(["りんご", "みかん", "バナナ"]);
const addFruitsss = () => {
   setArree([...arree, "ぶどう"]);
}
const count = useMemo(() => {
   return arree.length;
}
   , [arree]);
//useCallbackを使う
const [arrff, setArrff] = useState(["りんご", "みかん", "バナナ"]);
const addFruitssss = useCallback(() => {
   setArrff([...arrff, "ぶどう"]);
}
   , [arrff]);
//useRefを使う
const [arrgg, setArrgg] = useState(["りんご", "みかん", "バナナ"]);
const inputRef = useRef(null);
const addFruitsssss = () => {
   setArrgg([...arrgg, inputRef.current.value]);
   inputRef.current.value = "";
}
//useImperativeHandleを使う
const [arrhh, setArrhh] = useState(["りんご", "みかん", "バナナ"]);
const inputReff = useRef(null);
const addFruitssssss = () => {
   setArrhh([...arrhh, inputReff.current.value]);
   inputReff.current.value = "";
}
//useLayoutEffectを使う
const [arrii, setArrii] = useState(["りんご", "みかん", "バナナ"]);
const inputRefff = useRef(null);
const addFruitsssssss = () => {
}
useLayoutEffect(() => {
   console.log(inputRefff.current.getBoundingClientRect());
}
   , [arrii]);
//useDebugValueを使う
const [arrjj, setArrjj] = useState(["りんご", "みかん", "バナナ"]);
const inputReffff = useRef(null);
const addFruitssssssss = () => {
   setArrjj([...arrjj, inputReffff.current.value]);
   inputReffff.current.value = "";
}
//domを取得する
const [arrkk, setArrkk] = useState(["りんご", "みかん", "バナナ"]);
const inputRefffff = useRef(null);
const addFruitsssssssss = () => {
   setArrkk([...arrkk, inputRefffff.current.value]);
   inputRefffff.current.value = "";
}
//配列オブジェクトの絞り込み取得
const arrll = [
   { id: 1, name: "りんご" },
   { id: 2, name: "みかん" },
   { id: 3, name: "バナナ" },
   { id: 4, name: "ぶどう" },
   { id: 5, name: "もも" },
   { id: 6, name: "さくらんぼ" },
];
const newArr9 = arrll.filter((item) => {
   return item.id % 2 === 0;
})
//配列オブジェクトのマッピング
const arrmm = [
   { id: 1, name: "りんご" },
   { id: 2, name: "みかん" },
   { id: 3, name: "バナナ" },

];
const newArr10 = arrmm.map((item) => {
   return item.name;
})
//配列オブジェクトのソート
const arrnn = [
   { id: 1, name: "りんご" },
   { id: 2, name: "みかん" },
   { id: 3, name: "バナナ" },
];
const newArr11 = arrnn.sort((a, b) => {
   return a.id - b.id;
})
//配列オブジェクトの検索
const arroo = [
   { id: 1, name: "りんご" },
   { id: 2, name: "みかん" },
   { id: 3, name: "バナナ" },
];
const newArr12 = arroo.find((item) => {
   return item.id === 2;
})
//配列オブジェクトの総和
const arrpp = [1, 2, 3, 4, 5];
const newArr13 = arrpp.reduce((sum, current) => {
   return sum + current;
})
//非同期処理
try {
   const response = await fetch("https://jsonplaceholder.typicode.com/users");
   const data = await response.json();
   console.log(data);
} catch (e) {
   console.log(e);
}
//非同期処理のエラーハンドリング
try {
   const response = await fetch("https://jsonplaceholder.typicode.com/users");
   const data = await response.json();
   console.log(data);
}
catch (e) {
   console.log(e);
}
//非破壊的な配列操作
const arrqq = [1, 2, 3, 4, 5];
const newArr14 = arrqq.map((item) => {
   return item * 2;
})
//非破壊的なpush
const arrrrr = [1, 2, 3, 4, 5];
const newArr15 = [...arr, 6];
//非破壊的なpop
const arrrrrr = [1, 2, 3, 4, 5];
const newArr16 = arrrrrr.slice(0, -1);
//非破壊的なshift
const arrrrrrr = [1, 2, 3, 4, 5];
const newArr17 = arrrrrrr.slice(1);
//非破壊的なunshift
const arrrrrrrr = [1, 2, 3, 4, 5];
const newArr18 = [0, ...arrrrrrrr];
//非破壊的なsplice
const arrrrrrrrr = [1, 2, 3, 4, 5];
const newArr19 = [...arrrrrrrrr.slice(0, 2), 6, ...arr.slice(2)];
//非破壊的なconcat
const arrrrrrrrrr = [1, 2, 3, 4, 5];
//非破壊的なsort
const arrrrrrrrrrr = [1, 2, 3, 4, 5];
const newArr20 = [...arrrrrrrrrrr].sort((a, b) => {
   return a - b;
})
//非破壊的なreverse
const arrrrrrrrrrrr = [1, 2, 3, 4, 5];
const newArr21 = [...arrrrrrrrrrrr].reverse();
//配列の最小値
const arrrrrrrrrrrrr = [1, 2, 3, 4, 5];
const min1 = Math.min(...arrrrrrrrrrrrr);
//配列の最大値
const arrrrrrrrrrrrrr = [1, 2, 3, 4, 5];
const max1 = Math.max(...arrrrrrrrrrrrrr);
//配列の合計
const arrrrrrrrrrrrrrr = [1, 2, 3, 4, 5];
const sum1 = arrrrrrrrrrrrrrr.reduce((sum, current) => {
   return sum + current;
})
//配列の２番目に大きい値
const arrrrrrrrrrrrrrrr = [1, 2, 3, 4, 5];
const newArr22 = [...arrrrrrrrrrrrrrr].sort((a, b) => {
   return b - a;
})
//react.domrender()を使う

//setStateとスプレッド構文を使う
//cssmoduleを使う
//styled-componentsを使う
//import styled from "styled-components";
const Button = styled.button
//reduxを使う
//import { createStore } from "redux";
const store1 = createStore(reducer);
//react-reduxを使う
//import { Provider } from "react-redux";
//import { createStore } from "redux";
//import Recoil from "recoil";
//recoilを使う
//setTimeOutを使う
//setTimeOutとは、指定した時間が経過した後に、指定した処理を実行する関数
setTimeout(() => {
   console.log("Hello");
})
//setIntervalを使う
//setIntervalとは、一定の間隔で処理を繰り返すことができる
setInterval(() => {
   console.log("Hello");
})
//clearIntervalを使う
//clearIntervalとは、setIntervalを止めるための関数です。
const interval = setInterval(() => {
   console.log("Hello");
})
clearInterval(interval);
//async-awaitを使う
//async-awaitとは、非同期処理を同期処理のように記述することができる
const getData = async () => {
   const response = await fetch("https://jsonplaceholder.typicode.com/users");
   const data = await response.json();
   console.log(data);
}
//async-awaitのエラーハンドリング
const getData1 = async () => {
   try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      console.log(data);
   } catch (e) {
      console.log(e);
   } finally {
      console.log("finally");
   }
}
//object.keys()を使う
//object.keys()とは、オブジェクトのキーを配列で取得することができる
const objj1 = {
   name: "John",
   age: 25,

}
console.log(Object.keys(obj));
//object.values()を使う
//object.values()とは、オブジェクトの値を配列で取得することができる
const objj2 = {
   name: "John",
   age: 25,
}
console.log(Object.values(obj));
//object.entries()を使う
//object.entries()とは、オブジェクトのキーと値を配列で取得することができる
const objj3 = {
   name: "John",
   age: 25,

}
console.log(Object.entries(obj));
//object.assign()を使う
//object.assign()とは、オブジェクトをマージすることができる
const objj4 = {
   name: "John",
   age: 25,
}
const objj5 = {
   country: "USA",
}
const objj6 = Object.assign(objj4, objj5);
console.log(objj6);
//isNan()を使う
//isNan()とは、引数が数値かどうかを判定することができる
console.log(isNaN("Hello"));
//isFinite()を使う
//isFinite()とは、引数が有限数かどうかを判定することができる
console.log(isFinite(Infinity));
//parseInt()を使う
//parseInt()とは、文字列を整数に変換することができる
console.log(parseInt("10"));
//parseFloat()を使う
//parseFloat()とは、文字列を浮動小数点数に変換することができる
console.log(parseFloat("10.5"));
//Number()を使う
//Number()とは、文字列を数値に変換することができる
console.log(Number("10"));
//String()を使う
//String()とは、数値を文字列に変換することができる
console.log(String(10));
//Boolean()を使う
//Boolean()とは、数値を真偽値に変換することができる
console.log(Boolean(10));
//Array.isArray()を使う
//Array.isArray()とは、引数が配列かどうかを判定することができる
console.log(Array.isArray([1, 2, 3]));
//Array.from()を使う
//Array.from()とは、配列のようなオブジェクトを配列に変換することができる
console.log(Array.from("Hello"));
//Array.of()を使う
//Array.of()とは、引数を配列に変換することができる
console.log(Array.of(1, 2, 3));
//Array.prototype.concat()を使う
//Array.prototype.concat()とは、配列を結合することができる
console.log([1, 2, 3].concat([4, 5, 6]));
//Array.prototype.join()を使う
//Array.prototype.join()とは、配列の要素を指定した文字列で連結することができる
console.log([1, 2, 3].join("-"));

//Array.prototype.push()を使う
//Array.prototype.push()とは、配列の末尾に要素を追加することができる
const arr1 = [1, 2, 3];
arr1.push(4);
console.log(arr1);
//Array.prototype.pop()を使う
//Array.prototype.pop()とは、配列の末尾の要素を削除することができる

const arr2 = [1, 2, 3];
arr2.pop();
console.log(arr2);
//Array.prototype.shift()を使う
//Array.prototype.shift()とは、配列の先頭の要素を削除することができる
const arr3 = [1, 2, 3];
arr3.shift();
console.log(arr3);
//Array.prototype.unshift()を使う
//Array.prototype.unshift()とは、配列の先頭に要素を追加することができる
const arr4 = [1, 2, 3];
arr4.unshift(0);
console.log(arr4);
//Array.prototype.slice()を使う
//Array.prototype.slice()とは、配列の一部を切り出すことができる
const arr5 = [1, 2, 3, 4, 5];
console.log(arr5.slice(1, 3));
//Array.prototype.splice()を使う

//Array.prototype.splice()とは、配列の一部を削除または置き換えることができる
const arr6 = [1, 2, 3, 4, 5];
arr6.splice(1, 3);
console.log(arr6);
//Array.prototype.reverse()を使う
//Array.prototype.reverse()とは、配列の要素を逆順にすることができる
const arr7 = [1, 2, 3, 4, 5];
arr7.reverse();
console.log(arr7);
//Array.prototype.sort()を使う
//Array.prototype.sort()とは、配列の要素をソートすることができる
const arr8 = [1, 2, 3, 4, 5];
arr8.sort();
console.log(arr8);
//Array.prototype.includes()を使う
//Array.prototype.includes()とは、配列に指定した要素が含まれているかを判定することができる
const arr9 = [1, 2, 3, 4, 5];
console.log(arr9.includes(3));
//Array.prototype.indexOf()を使う
//Array.prototype.indexOf()とは、配列の指定した要素のインデックスを返すことができる
const arr10 = [1, 2, 3, 4, 5];
console.log(arr10.indexOf(3));
//Array.prototype.lastIndexOf()を使う
//Array.prototype.lastIndexOf()とは、配列の指定した要素のインデックスを後ろから検索して返すことができる

const arr11 = [1, 2, 3, 4, 5, 3];
console.log(arr11.lastIndexOf(3));
//Array.prototype.find()を使う
//Array.prototype.find()とは、配列の要素をテスト関数によって判定した結果を返すことができる
const arr12 = [1, 2, 3, 4, 5];
console.log(arr12.find(value => value > 3));
//Array.prototype.findIndex()を使う
//Array.prototype.findIndex()とは、配列の要素をテスト関数によって判定した結果のインデックスを返すことができる
const arr13 = [1, 2, 3, 4, 5];
console.log(arr13.findIndex(value => value > 3));
//Array.prototype.filter()を使う
//Array.prototype.filter()とは、配列の要素をテスト関数によって判定した結果を返すことができる
const arr14 = [1, 2, 3, 4, 5];
console.log(arr14.filter(value => value > 3));
//Array.prototype.map()を使う

//Array.prototype.map()とは、配列の要素をテスト関数によって判定した結果を返すことができる
const arr15 = [1, 2, 3, 4, 5];
console.log(arr15.map(value => value * 2));
//Array.prototype.every()を使う
//Array.prototype.every()とは、配列の要素をテスト関数によって判定した結果を返すことができる
const arr16 = [1, 2, 3, 4, 5];
console.log(arr16.every(value => value > 0));
//Array.prototype.some()を使う
//Array.prototype.some()とは、配列の要素をテスト関数によって判定した結果を返すことができる
const arr17 = [1, 2, 3, 4, 5];
console.log(arr17.some(value => value > 3));
//Array.prototype.reduce()を使う
//Array.prototype.reduce()とは、配列の要素をテスト関数によって判定した結果を返すことができる
const arr18 = [1, 2, 3, 4, 5];
console.log(arr18.reduce((accumulator, currentValue) => accumulator + currentValue));
//Array.prototype.reduceRight()を使う
//Array.prototype.reduceRight()とは、配列の要素をテスト関数によって判定した結果を返すことができる
const arr19 = [1, 2, 3, 4, 5];
console.log(arr19.reduceRight((accumulator, currentValue) => accumulator + currentValue));
//Array.prototype.join()を使う
//Array.prototype.join()とは、配列の要素を指定した区切り文字で連結した文字列を返すことができる
const arr20 = [1, 2, 3, 4, 5];
console.log(arr20.join(''));
//Array.prototype.toString()を使う
//Array.prototype.toString()とは、配列の要素を文字列に変換することができる
const arr21 = [1, 2, 3, 4, 5];
console.log(arr21.toString());
//Array.prototype.toLocaleString()を使う
//Array.prototype.toLocaleString()とは、配列の要素をロケールに応じた文字列に変換することができる
const arr22 = [1, 2, 3, 4, 5];
console.log(arr22.toLocaleString());
//Array.prototype.concat()を使う
//Array.prototype.concat()とは、配列の要素を結合した新しい配列を返すことができる
const arr23 = [1, 2, 3, 4, 5];
console.log(arr23.concat([6, 7, 8]));
//クラスを使う
//クラスとは、オブジェクトを生成するためのテンプレートのようなもの
//クラスの定義
class Person {
   constructor(name) {
      this.name = name;
   }
   sayHello() {
      console.log(`Hello! My name is ${this.name}.`);
   }
}
//クラスのインスタンス化
const person = new Person('John');
person.sayHello();
//クラスの継承
//クラスの継承とは、既存のクラスを継承して新しいクラスを作成すること
//クラスの継承の定義
class Person1 {
   constructor(name) {
      this.name = name;
   }
   sayHello() {
      console.log(`Hello! My name is ${this.name}.`);
   }
}
class Student extends Person1 {
   constructor(name, age) {
      super(name);
      this.age = age;
   }
   sayHello() {
      super.sayHello();
      console.log(`I'm ${this.age} years old.`);
   }

}
//クラスの継承のインスタンス化
const student1 = new Student('John', 15);
student.sayHello();
//クラスの継承のオーバーライド
//クラスの継承のオーバーライドとは、継承元のクラスのメソッドを継承先のクラスで上書きすること
//クラスの継承のオーバーライドの定義
class Person2 {

}
class Student1 extends Person2 {

}
//クラスの継承のオーバーライドのインスタンス化
const student = new Student();

//クラスの継承のオーバーライドの実行
student.sayHello();
//クラスの継承のオーバーライドの実行結果
//Hello! My name is John.
//I'm 15 years old.
//クラスの継承のオーバーライドの実行結果の説明
//bind()を使う
//bind()とは、関数のthisを指定したオブジェクトに固定することができる
//bind()の定義
const person2 = {
   name: 'John',
   sayHello: function () {
      console.log(`Hello! My name is ${this.name}.`);
   }
};
const student2 = {
   name: 'Bob',
   sayHello: person2.sayHello.bind(person2)
};
//bind()の実行
student2.sayHello();
//bind()の実行結果
//Hello! My name is John.
//generaterを使う
//generaterとは、関数の実行を途中で一時停止させて、後で再開することができる
//generaterの定義
function* createFibonacciGenerator() {
   let a = 0;
   let b = 1;
   while (true) {
      yield a;
      [a, b] = [b, a + b];
   }
}
//generaterの実行
const fibonacciGenerator = createFibonacciGenerator();
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
//@デコレータを使う
//デコレータとは、クラスやメソッドに対して付与することで、そのクラスやメソッドに対して様々な処理を行うことができる
//デコレータの定義
function log(target, name, descriptor) {
   const originalMethod = descriptor.value;
   descriptor.value = function (...args) {
      const result = originalMethod.apply(this, args);
      console.log(`Arguments: ${args}`);
      console.log(`Result: ${result}`);
      return result;
   };
   return descriptor;
}
/*class Calculator {
   @log
   add(a, b) {
      return a + b;
   }
}*/
//デコレータの実行
const calculator = new Calculator();
calculator.add(1, 2);
//デコレータの実行結果
//Arguments: 1,2
//Result: 3
//firebaseを使う
//firebaseとは、Googleが提供するクラウドサービスの一つ
//firebaseの定義
/*
import firebase from 'firebase';
//firebaseの実行
firebase.initializeApp({
});
//firebaseの実行結果
*/
//hasOwnProperty()を使う
//hasOwnProperty()とは、オブジェクトが指定したプロパティを持っているかどうかを判定することができる
//hasOwnProperty()の定義
const person3 = {
   name: 'John'
};
console.log(person3.hasOwnProperty('name'));
//hasOwnProperty()の実行
console.log(person3.hasOwnProperty('age'));
//hasOwnProperty()の実行結果
//true
//document.getElementById()を使う
//document.getElementById()とは、指定したid属性を持つ要素を取得することができる
//document.getElementById()の定義
const element = document.getElementById('element');
//指定したid属性を持つ要素を取得する
//document.getElementById()の実行
element.textContent = 'Hello World!';
//document.getElementById()の実行結果
//Hello World!
//document.getElementsByClassName()を使う
//document.getElementsByClassName()とは、指定したclass属性を持つ要素を取得することができる
//指定したclass属性を持つ要素を取得する
//document.getElementsByClassName()の定義
const elements = document.getElementsByClassName('element');
//document.getElementsByClassName()の実行
elements[0].textContent = 'Hello World!';
//document.getElementsByClassName()の実行結果
//Hello World!
//document.getElementsByTagName()を使う
//高階コンポーネント
//高階コンポーネントとは、他のコンポーネントを受け取って、新しいコンポーネントを返す関数
//高階コンポーネントの定義
/*const withHello = (WrappedComponent) => {
   return class extends React.Component {
      render() {
         return (
            <WrappedComponent {...this.props} />
         );
      }
   };
}/
//高階コンポーネントの実行
const Hello = withHello(Hello);
*/
//高階コンポーネントの実行結果
//Hello
//recoilを使う
//recoilとは、Reactの状態管理ライブラリ
//recoilの定義
//import  { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
//recoilの実行
//getServerSideProps()を使う
//getServerSideProps()とは、ページをレンダリングする前に、サーバーサイドでデータを取得することができる
//getServerSideProps()の定義
export async function getServerSideProps(context) {
   return {
      props: {
      }
   };
}
//getServerSideProps()の実行
//getServerSideProps()の実行結果
//getStaticProps()を使う
//getStaticProps()とは、ビルド時にデータを取得することができる
//getStaticProps()の定義
export async function getStaticProps(context) {
   return {
      props: {
      }
   };
}
//getStaticProps()の実行
//getStaticProps()の実行結果
//getStaticPaths()を使う
//getStaticPaths()とは、動的ルーティングのページで、ビルド時にパスを指定することができる
//getStaticPaths()の定義
export async function getStaticPaths() {
   return {
      paths: [
      ],
      fallback: false
   };
}
//getStaticPaths()の実行
//getStaticPaths()の実行結果
//getInitialProps()を使う
//getInitialProps()とは、ページをレンダリングする前に、クライアントサイドでデータを取得することができる
//getInitialProps()の定義
class Index extends React.Component {
   static async getInitialProps(context) {
      return {
      };
   }


}
//getInitialProps()の実行
//getInitialProps()の実行結果
//getDerivedStateFromProps()を使う
//getDerivedStateFromProps()とは、propsの変更に応じてstateを更新することができる
//auth().onAuthStateChanged()を使う
//auth().onAuthStateChanged()とは、ユーザーのログイン状態を監視することができる
//auth().onAuthStateChanged()の定義
auth().onAuthStateChanged((user) => {
   if (user) {
   } else {
   }
})
//auth().onAuthStateChanged()の実行
//auth().onAuthStateChanged()の実行結果
//auth().onIdTokenChanged()を使う
//auth().onIdTokenChanged()とは、ユーザーのログイン状態を監視することができる
//auth().currentUser.getIdToken()を使う
//auth().currentUser.getIdToken()とは、ユーザーのIDトークンを取得することができる
//auth().currentUser.getIdToken()の定義
auth().currentUser.getIdToken().then((idToken) => {
   // Send token to your backend via HTTPS
   // ...
}).catch((error) => {
   // Handle error
});
//auth().currentUser.getIdToken()の実行
//auth().currentUserとは
//auth().currentUserとは、現在ログインしているユーザーを取得することができる
//auth().currentUserの定義
const user = auth().currentUser;
//auth().currentUserの実行
//auth().currentUserの実行結果
//firebaseのパスワード認証を使う
//firebaseのパスワード認証とは、メールアドレスとパスワードでユーザーを認証することができる
//firebaseのパスワード認証の
//firebaseのパスワード認証の実行
//firebaseのパスワード認証の実行結果
//createUserWithEmailAndPassword()を使う
//createUserWithEmailAndPassword()とは、メールアドレスとパスワードでユーザーを作成することができる
//createUserWithEmailAndPassword()の定義
auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
   // Signed in
   const user = userCredential.user;
   // ...
}).catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   // ..
});
//siginInWithRedirect()を使う
//siginInWithRedirect()とは、リダイレクトを使ってサインインすることができる
//siginInWithRedirect()の定義
auth().signInWithRedirect(provider).then(() => {
   // Signed in
   // ...
}).catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   // ..
});
//siginInWithRedirect()の実行
//createUserWithEmailAndPassword()の実行
//createUserWithEmailAndPassword()の実行結果
//signInWithEmailAndPassword()を使う

//user.updateProfile()を使う
//user.updateProfile()とは、ユーザーのプロフィールを更新することができる
//user.updateProfile()の定義
user.updateProfile({
   displayName: "Jane Q. User",
   photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
   // Update successful
   // ...
})
//user.updateProfile()の実行
//user.updateProfile()の実行結果
//user.updateEmail()を使う
//user.updateEmail()とは、ユーザーのメールアドレスを更新することができる
//user.updateEmail()の定義
user.updateEmail("a").then(() => {
   // Update successful
   // ...
}).catch((error) => {
   // An error ocurred
   // ...
})
//user.updateEmail()の実行
//user.updateEmail()の実行結果

//user.updatePassword()を使う
//user.updatePassword()とは、ユーザーのパスワードを更新することができる
//user.updatePassword()の定義
user.updatePassword("a").then(() => {
   // Update successful
   // ...
})
//user.updatePassword()の実行
//user.updatePassword()の実行結果
//user.delete()を使う
//user.delete()とは、ユーザーを削除することができる
//user.delete()の定義
user.delete().then(() => {
   // User deleted
   // ...
})
//user.delete()の実行
//user.delete()の実行結果
//user.sendEmailVerification()を使う
//user.sendEmailVerification()とは、ユーザーにメールアドレスの確認を送信することができる
//user.sendEmailVerification()の定義
user.sendEmailVerification().then(() => {
})
//user.sendEmailVerification()の実行
//user.sendEmailVerification()の実行結果
//user.sendPasswordResetEmail()を使う
//user.sendPasswordResetEmail()とは、ユーザーにパスワードリセットのメールを送信することができる
//user.sendPasswordResetEmail()の定義
user.sendPasswordResetEmail("a").then(() => {
   // Email sent
   // ...
})
//user.sendPasswordResetEmail()の実行
   
//user.sendPasswordResetEmail()の実行結果
//collection("user").where()を使う
//collection("user").where()とは、コレクションの中から条件に合うドキュメントを取得することができる
//collection("user").where()の定義
const querySnapshot = await collection("user").where("a", "==", "a").get()
//collection("user").where()の実行
//collection("user").where()の実行結果
//collection("user").orderBy()を使う
//collection("user").orderBy()とは、コレクションの中から条件に合うドキュメントを取得することができる
//collection("user").orderBy()の定義
const querySnapshot1 = await collection("user").orderBy("a").get()
//collection("user").orderBy()の実行
//collection("user").orderBy()の実行結果
//collection("user").limit()を使う
//subcollectionを使う
//subcollectionとは、ドキュメントの中にコレクションを作成することができる
//subcollectionの定義
const querySnapshot2 = await collection("user").limit(1).get()
//collection("user").limit()の実行
//collection("user").limit()の実行結果
//subcollectionの実行
//subcollectionの実行結果
//collectionGroup()を使う
//collectionGroup()とは、コレクションの中から条件に合うドキュメントを取得することができる
//collectionGroup()の定義
const querySnapshot3 = await collectionGroup("user").get()
//collectionGroup()の実行
//collectionGroup()の実行結果
//collection("user").doc().set()を使う
//collection("user").doc().set()とは、ドキュメントを作成することができる
//collection("user").doc().set()の定義
await collection("user").doc("a").set({
   a: "a"
})
//collection("user").doc().set()の実行
//collection("user").doc().set()の実行結果
//doc("user").update()を使う
//doc("user").update()とは、ドキュメントを更新することができる
//doc("user").update()の定義
await doc("user").update({
   a: "a"
})
//doc("user").update()の実行
//doc("user").update()の実行結果
//doc("user").delete()を使う
//doc("user").delete()とは、ドキュメントを削除することができる
//doc("user").delete()の定義
await doc("user").delete()
//doc("user").delete()の実行
//doc("user").delete()の実行結果
//doc("user").get()を使う
//doc("user").get()とは、ドキュメントを取得することができる
//doc("user").get()の定義
const docSnapshot = await doc("user").get()
//doc("user").get()の実行
//doc("user").get()の実行結果
//batch()を使う
//batch()とは、複数の処理をまとめて実行することができる
//batch()の定義
const batch = db.batch()
batch.set(doc("user"), {
   a: "a"
})
batch.update(doc("user"), {
})
batch.delete(doc("user"))
await batch.commit()
//batch()の実行
//batch()の実行結果
//onSnapshot()を使う
//onSnapshot()とは、ドキュメントの変更を監視することができる
//onSnapshot()の定義
const unsubscribe = doc("user").onSnapshot((docSnapshot) => {
   // ...
})
//onSnapshot()の実行
//onSnapshot()の実行結果
//onSnapshot()の解除
//onSnapshot()の解除の定義
unsubscribe()
//onSnapshot()の解除の実行
//onSnapshot()の解除の実行結果
//enablePersistence()を使う
//enablePersistence()とは、オフラインでのデータの読み書きを可能にすることができる
//enablePersistence()の定義
await db.enablePersistence()
//enablePersistence()の実行
//enablePersistence()の実行結果
//runTransaction()を使う
//runTransaction()とは、トランザクションを実行することができる
//runTransaction()の定義
await db.runTransaction(async (transaction) => {

})
//service cloud.firestore {
//  match /databases/{database}/documents {
//    match /{document=**} {
//      allow read, write: if request.auth.uid != null;
//    }
//  }
//}
//runTransaction()の実行
//runTransaction()の実行結果
//ruleデータ検証
//ruleデータ検証の定義
const rule = fs.readFileSync("firestore.rules", "utf8")
//ruleデータ検証の実行
//ruleデータ検証の実行結果
//ruleデータ検証の解除
//ruleデータ検証の解除の定義
const rules = fs.readFileSync("firestore.rules", "utf8")
//amplify add auth
//amplify push
//subscription()を使う
//subscription()とは、ドキュメントの変更を監視することができる
//subscription()の定義
const subscription = doc("user").subscription((docSnapshot) => {
   // ...
})
//subscription()の実行
//subscription()の実行結果
//@modelを使う
//model()とは、データモデルを作成することができる
//@functionを使う
//function()とは、サーバーレスの関数を作成することができる
//@keyを使う
//key()とは、データモデルのキーを作成することができる
//@connectionを使う
//connection()とは、データモデルの接続を作成することができる
//@searchableを使う
//searchable()とは、データモデルの検索を作成することができる
//@authを使う
//auth()とは、データモデルの認証を作成することができる
//Auth.signup()を使う
//Auth.signup()とは、ユーザーを作成することができる
//Auth.signup()の定義
await Auth.signup({
   username: "username",
   password: "password",
   attributes: {
      email: "email"
   }
})
//Auth.signup()の実行
//Auth.signup()の実行結果
//Auth.signIn()を使う
//Auth.signIn()とは、ユーザーをサインインすることができる
//Auth.signIn()の定義
await Auth.signIn("username", "password")
//Auth.signIn()の実行

//Auth.signIn()の実行結果
//Auth.currentAuthenticatedUser()を使う
//Auth.currentAuthenticatedUser()とは、現在の認証ユーザーを取得することができる
//Auth.currentAuthenticatedUser()の定義
const user1 = await Auth.currentAuthenticatedUser()
//Auth.currentAuthenticatedUser()の実行
//window.onloadとは、ウィンドウが読み込まれた時に実行される
//window.onloadの定義
window.onload = () => {
   // ...
}
//window.onloadの実行
//window.onloadの実行結果
//e.preventDefault()を使う
//e.preventDefault()とは、イベントのデフォルトの動作を無効にすることができる
//e.preventDefault()の定義
e.preventDefault()
//e.preventDefault()の実行
//e.preventDefault()の実行結果
//element.getAttribute()を使う
//element.getAttribute()とは、要素の属性を取得することができる
//element.getAttribute()の定義
const value = element.getAttribute("attribute")
//element.getAttribute()の実行
//element.getAttribute()の実行結果
//element.innerHTMLを使う
//element.innerHTMLとは、要素のHTMLを取得することができる
//element.innerHTMLの定義
element.innerHTML = "HTML"
//element.innerHTMLの実行
//element.innerHTMLの実行結果
//element.addEventListener()を使う
//element.addEventListener()とは、要素にイベントリスナーを追加することができる
//一覧ソート
//一覧ソートの定義
const sort1 = (key) => {
}
//useContext()を使う
//useContext()とは、コンテキストを使用することができる
//useContext()の定義
const context = useContext(Context)
//useContext()の実行
//useContext()の実行結果
//useEffect()を使う
//useEffect()とは、副作用を使用することができる
//useEffect()の定義
useEffect(() => {
   // ...
}, [])

//document.querySelector()を使う
//document.querySelector()とは、ドキュメントの要素を取得することができる
//document.querySelector()の定義
const element1 = document.querySelector("selector")
//document.querySelector()の実行
//createElement()を使う
//createElement()とは、要素を作成することができる
//createElement()の定義
const element2 = document.createElement("element")
//createTextNode()を使う
//createTextNode()とは、テキストノードを作成することができる
//createTextNode()の定義
const textNode = document.createTextNode("text")
//appendChild()を使う
//appendChild()とは、要素に子要素を追加することができる
//appendChild()の定義
element.appendChild(childElement)
//appendChild()の実行
//appendChild()の実行結果
//element.appendChild()を使う
//element.appendChild()とは、要素に子要素を追加することができる
//element.appendChild()の定義
element.appendChild(childElement)   
//element.appendChild()の実行
//element.appendChild()の実行結果
//element.insertBefore()を使う
//element.insertBefore()とは、要素の子要素の前に要素を追加することができる
//element.insertBefore()の定義
element.insertBefore(newElement, referenceElement)
//element.lastElementChild
//element.lastElementChildとは、要素の最後の子要素を取得することができる
//switch()を使う
//switch()とは、条件分岐を行うことができる
//switch()の定義
switch (value) {
   case "value":
      // ...
      break
   default:
      // ...
}
//switch()の実行
//switch()の実行結果
//while()を使う
//while()とは、条件が真の間、繰り返し処理を行うことができる
//while()の定義
while (condition) {
   // ...
}
//while()の実行
//alert()を使う
//alert()とは、アラートダイアログを表示することができる
//alert()の定義
alert("message")
//confirm()を使う
//confirm()とは、確認ダイアログを表示することができる
//confirm()の定義
const result = confirm("message")
//prompt()を使う
//prompt()とは、入力ダイアログを表示することができる
//prompt()の定義
//decodeURI
//decodeURIとは、URIをデコードすることができる
//decodeURIの定義
const uri = decodeURI("uri")
//