window.forward(1);

class Example extends React.Component {
  render() {
    return (
      <div>
        <h1>Example</h1>
        <p>Example page</p>
      </div>
    );
  }
}

class Animal {
   constructor(name) {
      this.name = name;
   }
}

class Dog extends Animal {
   constructor(name) {
      super(name);
   }
}

String.apply(null, [1, 2, 3]);

var a = [1, 2, 3];
var b = [4, 5, 6];

a.push.apply(a, b);

for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 0);
}

for (var i = 0; i < 10; i++) {
   (function(i) {
      setTimeout(function() {
         console.log(i);
      }, 0);
   })(i);
}
   
if (true) {
   var a = 1;
}

var a = 1;

switch (a) {
   case 1:
      var b = 2;
      break;
   case 2:
      var c = 3;
      break;
   default:
      var d = 4;
}

while (true) {
   var a = 1;
   break;
}

for (var i = 0; i < 10; i++) {
   var a = 1;
}

try {
   var a = 1;
}
catch (e) {
   var b = 2;
}

function foo() {
   var a = 1;
}

var a = 1;

debugger;

var a = 1;

for (var i = 0; i < 10; i++) {
   var a = 1;
}

const a = 1;

if (a === 1) {
   const b = 2;
}

if (a && b) {
   const c = 3;
}

if (a || b) {
   const d = 4;
}

if (a || b && c) {
   const e = 5;
}

if (a || b || c) {
   const f = 6;
}

function foo() {
   const a = 1;
   alert(a);
}

window.onload = function () {
   const a = 1;
   alert(a);
}

Element.prototype.remove = function () {
   this.parentElement.removeChild(this);
}

Array.prototype.remove = function (value) {
   var index = this.indexOf(value);
   if (index > -1) {
      this.splice(index, 1);
   }
}

Array.prototype.remove = function (value) {
   this.splice(this.indexOf(value), 1);
}

Math.prototype.sum = function (a, b) {
   return a + b;
}

var a = 1;

Number.parseInt('1');

Number.parseFloat('1.1');

Number.isInteger(1);

Number.isNaN(NaN);

Number.isFinite(1);

encodeURI('http://example.com');

encodeURIComponent('http://example.com');

decodeURIComponent('http%3A%2F%2Fexample.com');

decodeURI('http://example.com');

if (123 == 123 && 456 == 456) {
   console.log('true');
}

if (123 == 123 || 456 == 456) {
   console.log('true');
}

function tag(strings, ...values) {
   console.log(strings);
   console.log(values);
}

tag`Hello ${name}!`;

xx = new String('abc');

xx = new Number(1);

xx = new Boolean(true);

xx = new Array(1, 2, 3);

xx = new Object({ a: 1 });

xx = new Function('a', 'b', 'return a + b');

xx = new Date();

xx = new RegExp('a');

xx = new Error('error');

xx = new Symbol('a');

string.charAt(0);

string.charCodeAt(0);

string.concat('a', 'b');

string.indexOf('a');

string.lastIndexOf('a');

string.localeCompare('a');

string.match(/a/);

string.replace(/a/, 'b');

string.search(/a/);

string.slice(0, 1);

string.split('a');

string.substring(0, 1);

string.toLowerCase();

string.toUpperCase();

string.trim();

string.trimLeft();

string.trimRight();

string.valueOf();

array.concat([1, 2, 3]);

array.join(',');

array.pop();

array.push(1);

array.reverse();

array.shift();

array.slice(0, 1);

array.sort();

array.replace(0, 1);

array.unshift(1);

array.indexOf(1);

array.lastIndexOf(1);

array.every(function (item) {
   return item > 0;
}
)

array.some(function (item) {
   return item > 0;
}
)

array.forEach(function (item) {
   console.log(item);
}
)

array.map(function (item) {
   return item * 2;
}
)

array.filter(function (item) {
   return item > 0;
}
)

array.reduce(function (prev, curr) {
   return prev + curr;
}
)

array.reduceRight(function (prev, curr) {
   return prev + curr;
}
)

array.find(function (item) {
   return item > 0;
}
)

array.findIndex(function (item) {
   return item > 0;
}
)

array.fill(1);

array.copyWithin(0, 1);

array.entries();

array.keys();

array.values();

array.includes(1);

array[Symbol.iterator]();

array[Symbol.unscopables];

array[Symbol.isConcatSpreadable];

array[Symbol.species];

array[Symbol.match];

array[Symbol.replace];

array[Symbol.search];

array[Symbol.split];

array[Symbol.hasInstance];

array[Symbol.toPrimitive];

array[Symbol.toStringTag];

array[Symbol.unscopables];

array[Symbol.isConcatSpreadable];

onclick = function () {
   console.log('click');
}

onmouseover = function () {
   console.log('mouseover');
}

onmouseout = function () {

}

addEventListener('click', function () {
   console.log('click');
}
)

removeEventListener('click', function () {
   console.log('click');
}

)

dispatchEvent(new Event('click'));

var a = 1;

var b = 2;

if (a === 1) {
   var c = 3;
}

var a = 1;

let b = 2;

yy = (xx >= 1) ? "big" : "small";

zz = (xx >= 1) ? "big" : (xx < 0) ? "small" : "medium";

ww = (xx >= 1) ? "big" : (xx < 0) ? "small" : "medium";

xx += 1;
xx &= 0xff;

xx ||= 5;
xx &&= 5;
xx ??= 5;

xx = 1;

xx **= 2;

delete xx;

Object = {
   a: 1,
   b: 2,
   c: 3
}

typeof (xx);
typeof (null);

xx instanceof Object;

xx in Object;

xx = 1;

typeof (true)

void function func() { }

if (true) {
   console.log('true');
}

if ("name" in Object) {
   console.log('true');
}

if (xx instanceof Object) {
   console.log('true');
}

if (typeof (xx) === 'number') {
   console.log('true');
}

if (xx === 1)  {
   console.log('true');
}

if (xx == 1) {
   console.log('true');
}

window.localStorage.clear();
window.localStorage.setItem('a', 1);
window.localStorage.getItem('a');
window.localStorage.removeItem('a');
window.localStorage.key(0);
window.localStorage.length;
window.localStorage.a = 1;
window.localStorage.key;

document.evaluate('//div', document, null, XPathResult.ANY_TYPE, null);

document.querySelector('div');
document.querySelectorAll('div');

document.getElementById('id');
document.getElementsByClassName('class');
document.getElementsByTagName('div');
document.getElementsByName('name');

document.createElement('div');
document.createTextNode('text');

document.createAttribute('class');
document.createComment('comment');
document.createDocumentFragment();
document.createEvent('Event');
document.createNodeIterator(document, NodeFilter.SHOW_ALL, null, false);
document.createProcessingInstruction('target', 'data');

document.adoptNode(document);
document.appendChild(document);
document.cloneNode(true);
document.compareDocumentPosition(document);

document.createAttribute('class');
document.createComment('comment');
document.createDocumentFragment();
document.createEvent('Event');
document.createNodeIterator(document, NodeFilter.SHOW_ALL, null, false);
document.createProcessingInstruction('target', 'data');

document.adoptNode(document);
document.appendChild(document);
document.cloneNode(true);
document.compareDocumentPosition(document);
window.find('a');

document.getElementById('id');
document.getElementsByClassName('class');


try {
   throw new Error('error');
}
catch (e) {
   console.log(e);
}

const a !== 1: throw new Error('error');

try {
   throw new Error('error');
}

catch (e) {
   console.log(e);
}

finally {
   console.log('finally');
}

switch (xx) {
   case 1:
      console.log('1');
      break;
   case 2:
      console.log('2');
      break;
   default:
      console.log('default');
}

for (var i = 0; i < 10; i++) {
   console.log(i);
}

while (true) {
   console.log('true');
}

import { a } from 'a';
export { a };
   
export default a;
use strict;

var a = 1;

function func() {
   var b = 2;
}

if ( a == b ) {
   console.log('true');
}

if ( a === b ) {
   console.log('true');
}

parseInt('1');

parseFloat('1.1');

isNaN('1');

isFinite('1');

encodeURI('http://www.example.com');

encodeURIComponent('http://www.example.com');

eval('var a = 1');




