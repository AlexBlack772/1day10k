//expect.extend(matchers)とは、expectの拡張を行うためのメソッド
import { expect, test } from '@jest/globals';
import '../toBeWithinRange';

test('is within range', () => expect(100).toBeWithinRange(90, 110));

test('is NOT within range', () => expect(101).not.toBeWithinRange(0, 100));

test('asymmetric ranges', () => {
   expect({ apples: 6, bananas: 3 }).toEqual({
      apples: expect.toBeWithinRange(1, 10),
      bananas: expect.not.toBeWithinRange(11, 20),
   });
});

expect.extend({
   async toBeDivisibleByExternalValue(received) {
      const externalValue = await getExternalValueFromRemoteSource();
      const pass = received % externalValue == 0;
      if (pass) {
         return {
            message: () =>
               `expected ${received} not to be divisible by ${externalValue}`,
            pass: true,
         };
      } else {
         return {
            message: () =>
               `expected ${received} to be divisible by ${externalValue}`,
            pass: false,
         };
      }
   },
});

test('is divisible by external value', async () => {
   await expect(100).toBeDivisibleByExternalValue();
   await expect(101).not.toBeDivisibleByExternalValue();
});

//this.isNotとは、notを使った場合にtrueになるプロパティ。

//expect.anything()とは、何かしらの値が入っていることを確認するためのプロパティ。
test('map calls its argument with a non-null argument', () => {
   const mock = jest.fn();
   [1].map(x => mock(x));
   expect(mock).toHaveBeenCalledWith(expect.anything());
});

//expect.any()とは、引数に指定した型の値が入っていることを確認するためのプロパティ。
class Cat { }
function getCat(fn) {
   return fn(new Cat());
}

test('randocall calls its callback with a class instance', () => {
   const mock = jest.fn();
   getCat(mock);
   expect(mock).toHaveBeenCalledWith(expect.any(Cat));
});

function randocall(fn) {
   return fn(Math.floor(Math.random() * 6 + 1));
}

test('randocall calls its callback with a number', () => {
   const mock = jest.fn();
   randocall(mock);
   expect(mock).toHaveBeenCalledWith(expect.any(Number));
});

//expect.arrayContaining(array)とは、引数に指定した配列の中に含まれる値が入っていることを確認するためのプロパティ。
describe('arrayContaining', () => {
   const expected = ['Alice', 'Bob'];
   it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
   });
   it('does not match if received does not contain expected elements', () => {
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
   });
});

//expect.assertions(number)とは、expectの数を指定するためのプロパティ。
test('doAsync calls both callbacks', () => {
   expect.assertions(2);
   function callback1(data) {
      expect(data).toBeTruthy();
   }
   function callback2(data) {
      expect(data).toBeTruthy();
   }

   doAsync(callback1, callback2);
});

//expect.closeTo(number, numDigits?)とは、引数に指定した値と近い値が入っていることを確認するためのプロパティ。
test('compare float in object properties', () => {
   expect({
      title: '0.1 + 0.2',
      sum: 0.1 + 0.2,
   }).toEqual({
      title: '0.1 + 0.2',
      sum: expect.closeTo(0.3, 5),
   });
});

//expect.hasAssertions()とは、expectが実行されたかどうかを確認するためのプロパティ。
test('prepareState prepares a valid state', () => {
   expect.hasAssertions();
   prepareState(state => {
      expect(validateState(state)).toBeTruthy();
   });
   return waitOnState();
});

//expect.not.arrayContaining(array)とは、引数に指定した配列の中に含まれない値が入っていることを確認するためのプロパティ。
describe('not.arrayContaining', () => {
   const expected = ['Samantha'];

   it('matches if the actual array does not contain the expected elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(
         expect.not.arrayContaining(expected),
      );
   });
});

//expect.not.objectContaining(object)とは、引数に指定したオブジェクトの中に含まれない値が入っていることを確認するためのプロパティ。
describe('not.objectContaining', () => {
   const expected = { foo: 'bar' };

   it('matches if the actual object does not contain expected key: value pairs', () => {
      expect({ bar: 'baz' }).toEqual(expect.not.objectContaining(expected));
   });
});

//expect.not.stringContaining(string)とは、引数に指定した文字列の中に含まれない値が入っていることを確認するためのプロパティ。
describe('not.stringContaining', () => {
   const expected = 'Hello world!';

   it('matches if the received value does not contain the expected substring', () => {
      expect('How are you?').toEqual(expect.not.stringContaining(expected));
   });
});

//expect.not.stringMatching(string | regexp)とは、引数に指定した文字列の中に含まれない値が入っていることを確認するためのプロパティ。
describe('not.stringMatching', () => {
   const expected = /Hello world!/;

   it('matches if the received value does not match the expected regex', () => {
      expect('How are you?').toEqual(expect.not.stringMatching(expected));
   });
});

//expect.objectContaining(object)とは、引数に指定したオブジェクトの中に含まれる値が入っていることを確認するためのプロパティ。
test('onPress gets called with the right thing', () => {
   const onPress = jest.fn();
   simulatePresses(onPress);
   expect(onPress).toHaveBeenCalledWith(
      expect.objectContaining({
         x: expect.any(Number),
         y: expect.any(Number),
      }),
   );
});

//expect.stringMatching(string | regexp)とは、引数に指定した文字列の中に含まれる値が入っていることを確認するためのプロパティ。
describe('stringMatching in arrayContaining', () => {
   const expected = [
      expect.stringMatching(/^Alic/),
      expect.stringMatching(/^[BR]ob/),
   ];
   it('matches even if received contains additional elements', () => {
      expect(['Alicia', 'Roberto', 'Evelina']).toEqual(
         expect.arrayContaining(expected),
      );
   });
   it('does not match if received does not contain expected elements', () => {
      expect(['Roberto', 'Evelina']).not.toEqual(
         expect.arrayContaining(expected),
      );
   });
});

//expect(Promise.resolve('lemon')).resolves.toBe('lemon')とは、Promiseがresolveされた時に、引数に指定した値が入っていることを確認するためのプロパティ。
test('resolves to lemon', () => {
   // make sure to add a return statement
   return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});

//expect(Promise.reject()).rejects.toBe('lemon')とは、Promiseがrejectされた時に、引数に指定した値が入っていることを確認するためのプロパティ。
test('rejects to octopus', () => {
   // make sure to add a return statement
   return expect(Promise.reject(new Error('octopus'))).rejects.toThrow(
      'octopus',
   );
});

//expect(can.ounces).toBe(12)とは、引数に指定した値が入っていることを確認するためのプロパティ。
const can = {
   name: 'pamplemousse',
   ounces: 12,
};

describe('the can', () => {
   test('has 12 ounces', () => {
      expect(can.ounces).toBe(12);
   });

   test('has a sophisticated name', () => {
      expect(can.name).toBe('pamplemousse');
   });
});

//expect(drink).toHaveBeenCalled()とは、引数に指定した関数が実行されたかどうかを確認するためのプロパティ。
function drinkAll(callback, flavour) {
   if (flavour !== 'octopus') {
      callback(flavour);
   }
}

describe('drinkAll', () => {
   test('drinks something lemon-flavoured', () => {
      const drink = jest.fn();
      drinkAll(drink, 'lemon');
      expect(drink).toHaveBeenCalled();
   });

   test('does not drink something octopus-flavoured', () => {
      const drink = jest.fn();
      drinkAll(drink, 'octopus');
      expect(drink).not.toHaveBeenCalled();
   });
});

//mockFn.mock.callsとは、引数に指定した関数が実行された時に、引数に指定した値が入っていることを確認するためのプロパティ。
[
   ['arg1', 'arg2'],
   ['arg3', 'arg4'],
];

//mockFn.mock.instancesとは、引数に指定した関数が実行された時に、引数に指定したインスタンスが入っていることを確認するためのプロパティ。
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; 

//mockFn.mock.contextsとは、引数に指定した関数が実行された時に、引数に指定したコンテキストが入っていることを確認するためのプロパティ。
const mockFn = jest.fn();

const boundMockFn = mockFn.bind(thisContext0);
boundMockFn('a', 'b');
mockFn.call(thisContext1, 'a', 'b');
mockFn.apply(thisContext2, ['a', 'b']);

mockFn.mock.contexts[0] === thisContext0; // true
mockFn.mock.contexts[1] === thisContext1; // true
mockFn.mock.contexts[2] === thisContext2; 

//mockFn.mockImplementation(fn)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const mockFn = jest.fn(scalar => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

mockFn.mockImplementation(scalar => 36 + scalar);

mockFn(2); // 38
mockFn(3); // 39


//mockFn.mockImplementationOnce(fn)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const mockFn = jest
   .fn()
   .mockImplementationOnce(cb => cb(null, true))
   .mockImplementationOnce(cb => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val)); /

//mockFn.mockName(name)とは、引数に指定した関数が実行された時に、引数に指定した名前を付けることを確認するためのプロパティ。
const mockFn = jest.fn().mockName('mockedFunction');

// mockFn();
expect(mockFn).toHaveBeenCalled();

//jest.enableAutomock()とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
jest.enableAutomock();

import utils from '../utils';

test('original implementation', () => {
   // now we have the mocked implementation,
   expect(utils.authorize._isMockFunction).toBeTruthy();
   expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});

//jest.createMockFromModule(moduleName)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const utils = jest.createMockFromModule('../utils');

utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
   expect(jest.isMockFunction(utils.authorize)).toBe(true);
   expect(utils.isAuthorized('not wizard')).toBe(true);
});

//createMockFromModuleとは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const example = jest.createMockFromModule('../example');

test('should run example code', () => {
   // creates a new mocked function with no formal arguments.
   expect(example.function.name).toBe('square');
   expect(example.function).toHaveLength(0);

   // async functions get the same treatment as standard synchronous functions.
   expect(example.asyncFunction.name).toBe('asyncSquare');
   expect(example.asyncFunction).toHaveLength(0);

   // creates a new class with the same interface, member functions and properties are mocked.
   expect(example.class.constructor.name).toBe('Bar');
   expect(example.class.foo.name).toBe('foo');
   expect(example.class.array).toHaveLength(0);

   // creates a deeply cloned version of the original object.
   expect(example.object).toEqual({
      baz: 'foo',
      bar: {
         fiz: 1,
         buzz: [],
      },
   });

   // creates a new empty array, ignoring the original array.
   expect(example.array).toHaveLength(0);

   // creates a new property with the same primitive value as the original property.
   expect(example.number).toBe(123);
   expect(example.string).toBe('baz');
   expect(example.boolean).toBe(true);
   expect(example.symbol).toEqual(Symbol.for('a.b.c'));
});

//jest.mock(moduleName, factory, options)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
jest.mock('../moduleName', () => {
   return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';

//jest.doMock(moduleName, factory, options)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
beforeEach(() => {
   jest.resetModules();
});

test('moduleName 1', () => {
   jest.doMock('../moduleName', () => {
      return jest.fn(() => 1);
   });
   const moduleName = require('../moduleName');
   expect(moduleName()).toBe(1);
});

test('moduleName 2', () => {
   jest.doMock('../moduleName', () => {
      return jest.fn(() => 2);
   });
   const moduleName = require('../moduleName');
   expect(moduleName()).toBe(2);
});

//jest.requireActual(moduleName)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
jest.mock('../myModule', () => {
   // Require the original module to not be mocked...
   const originalModule = jest.requireActual('../myModule');

   return {
      __esModule: true, // Use it when dealing with esModules
      ...originalModule,
      getRandom: jest.fn(() => 10),
   };
});

const getRandom = require('../myModule').getRandom;

getRandom(); // Always returns 10

//jest.resetModules()とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
beforeEach(() => {
   jest.resetModules();
});

test('works', () => {
   const sum = require('../sum');
});

test('works too', () => {
   const sum = require('../sum');
   // sum is a different copy of the sum module from the previous test.
});

//jest.isolateModules(fn)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
let myModule;
jest.isolateModules(() => {
   myModule = require('myModule');
});

const otherCopyOfMyModule = require('myModule');

//jest.fn(implementation?)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); 

//jest.spyOn(object, methodName)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const video = require('./video');

afterEach(() => {
   // restore the spy created with spyOn
   jest.restoreAllMocks();
});

test('plays video', () => {
   const spy = jest.spyOn(video, 'play');
   const isPlaying = video.play();

   expect(spy).toHaveBeenCalled();
   expect(isPlaying).toBe(true);
});

//jest.spyOn(object, methodName, accessType?)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const audio = require('./audio');
const video = require('./video');

afterEach(() => {
   // restore the spy created with spyOn
   jest.restoreAllMocks();
});

test('plays video', () => {
   const spy = jest.spyOn(video, 'play', 'get'); // we pass 'get'
   const isPlaying = video.play;

   expect(spy).toHaveBeenCalled();
   expect(isPlaying).toBe(true);
});

test('plays audio', () => {
   const spy = jest.spyOn(audio, 'volume', 'set'); // we pass 'set'
   audio.volume = 100;

   expect(spy).toHaveBeenCalled();
   expect(audio.volume).toBe(100);
});

//afterEach(fn, timeout)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {
   db.cleanUp();
}

afterEach(() => {
   cleanUpDatabase(globalDatabase);
});

test('can find things', () => {
   return globalDatabase.find('thing', {}, results => {
      expect(results.length).toBeGreaterThan(0);
   });
});

test('can insert a thing', () => {
   return globalDatabase.insert('thing', makeThing(), response => {
      expect(response.success).toBeTruthy();
   });
});

//beforeAll(fn, timeout)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const globalDatabase = makeGlobalDatabase();

beforeAll(() => {
   // Clears the database and adds some testing data.
   // Jest will wait for this promise to resolve before running tests.
   return globalDatabase.clear().then(() => {
      return globalDatabase.insert({ testData: 'foo' });
   });
});

// Since we only set up the database once in this example, it's important
// that our tests don't modify it.
test('can find things', () => {
   return globalDatabase.find('thing', {}, results => {
      expect(results.length).toBeGreaterThan(0);
   });
});

//beforeEach(fn, timeout)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const globalDatabase = makeGlobalDatabase();

beforeEach(() => {
   // Clears the database and adds some testing data.
   // Jest will wait for this promise to resolve before running tests.
   return globalDatabase.clear().then(() => {
      return globalDatabase.insert({ testData: 'foo' });
   });
});

test('can find things', () => {
   return globalDatabase.find('thing', {}, results => {
      expect(results.length).toBeGreaterThan(0);
   });
});

test('can insert a thing', () => {
   return globalDatabase.insert('thing', makeThing(), response => {
      expect(response.success).toBeTruthy();
   });
});

//describe(name, fn)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
const myBeverage = {
   delicious: true,
   sour: false,
};

describe('my beverage', () => {
   test('is delicious', () => {
      expect(myBeverage.delicious).toBeTruthy();
   });

   test('is not sour', () => {
      expect(myBeverage.sour).toBeFalsy();
   });
});

//expect(value)とは、引数に指定した関数が実行された時に、引数に指定した関数を実行することを確認するためのプロパティ。
