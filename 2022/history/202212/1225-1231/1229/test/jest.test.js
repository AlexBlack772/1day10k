//expect(value)とは、valueが期待値であることをテストするための関数
test('the best flavor is grapefruit', () => {
   expect(bestLaCroixFlavor()).toBe('grapefruit');
});

//expect.extend(matchers)とは、カスタムマッチャーを追加するための関数
import { expect } from '@jest/globals';

function toBeWithinRange(actual, floor, ceiling) {
   if (
      typeof actual !== 'number' ||
      typeof floor !== 'number' ||
      typeof ceiling !== 'number'
   ) {
      throw new Error('These must be of type number!');
   }

   const pass = actual >= floor && actual <= ceiling;
   if (pass) {
      return {
         message: () =>
            `expected ${this.utils.printReceived(
               actual,
            )} not to be within range ${this.utils.printExpected(
               `${floor} - ${ceiling}`,
            )}`,
         pass: true,
      };
   } else {
      return {
         message: () =>
            `expected ${this.utils.printReceived(
               actual,
            )} to be within range ${this.utils.printExpected(
               `${floor} - ${ceiling}`,
            )}`,
         pass: false,
      };
   }
}

expect.extend({
   toBeWithinRange,
});


//expect.anything()とは、何かしらの値があることをテストするための関数
test('map calls its argument with a non-null argument', () => {
   const mock = jest.fn();
   [1].map(x => mock(x));
   expect(mock).toHaveBeenCalledWith(expect.anything());
});

//expect.any(constructor)とは、引数のコンストラクターを持つ値があることをテストするための関数
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

//expect.arrayContaining(array)とは、引数の配列を含む配列があることをテストするための関数
describe('arrayContaining', () => {
   const expected = ['Alice', 'Bob'];
   it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
   });
   it('does not match if received does not contain expected elements', () => {
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
   });
});

//expect.assertions(number)とは、テスト内で呼び出されるexpectの数をテストするための関数
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

//expect.closeTo(number, numDigits?)とは、引数の数値が近い値であることをテストするための関数
test('compare float in object properties', () => {
   expect({
      title: '0.1 + 0.2',
      sum: 0.1 + 0.2,
   }).toEqual({
      title: '0.1 + 0.2',
      sum: expect.closeTo(0.3, 5),
   });
});

//expect.hasAssertions()とは、テスト内でexpectが呼び出されることをテストするための関数
test('prepareState prepares a valid state', () => {
   expect.hasAssertions();
   prepareState(state => {
      expect(validateState(state)).toBeTruthy();
   });
   return waitOnState();
})

//jest.fn(implementation?)とは、モック関数を作成するための関数
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); // true;

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

//jest.spyOn(object, methodName, accessType?)とは、オブジェクトのメソッドをスパイするための関数
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

//jest.useFakeTimers(fakeTimersConfig?)とは、モックタイマーを作成するための関数
test('advance the timers automatically', () => {
   jest.useFakeTimers({ advanceTimers: true });
   // ...
});

test('do not advance the timers and do not fake `performance`', () => {
   jest.useFakeTimers({ doNotFake: ['performance'] });
   // ...
});

test('uninstall fake timers for the rest of tests in the file', () => {
   jest.useRealTimers();
   // ...
});

//jest.useRealTimers()とは、モックタイマーを解除するための関数
afterEach(() => {
   jest.useRealTimers();
});

test('do something with fake timers', () => {
   jest.useFakeTimers();
   // ...
});

test('do something with real timers', () => {
   // ...
});

//jest.setTimeout(timeout)とは、テストのタイムアウト時間を設定するための関数
jest.setTimeout(1000);

//jest.retryTimes(numRetries, options)
jest.retryTimes(3);
test('will fail', () => {
   expect(true).toBe(false);
});

//jest.disableAutomock()とは、モックを無効にするための関数
import utils from '../utils';

jest.disableAutomock();

test('original implementation', () => {
   // now we have the original implementation,
   // even if we set the automocking in a jest configuration
   expect(utils.authorize()).toBe('token');
});

//jest.enableAutomock()とは、モックを有効にするための関数
jest.enableAutomock();

import utils from '../utils';

test('original implementation', () => {
   // now we have the mocked implementation,
   expect(utils.authorize._isMockFunction).toBeTruthy();
   expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});

//jest.createMockFromModule(moduleName)とは、モジュールからモックを作成するための関数
const utils = jest.createMockFromModule('../utils');

utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
   expect(jest.isMockFunction(utils.authorize)).toBe(true);
   expect(utils.isAuthorized('not wizard')).toBe(true);
});

//jest.mock(moduleName, factory, options)とは、モジュールをモックするための関数
jest.mock('../banana');

const banana = require('../banana'); // banana will be explicitly mocked.

banana(); // will return 'undefined' because the function is auto-mocked.

jest.mock('../moduleName', () => {
   return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';

import moduleName, { foo } from '../moduleName';

jest.mock('../moduleName', () => {
   return {
      __esModule: true,
      default: jest.fn(() => 42),
      foo: jest.fn(() => 43),
   };
});

moduleName(); // Will return 42
foo(); // Will return 43

//jest.doMock(moduleName, factory, options)とは、モジュールをモックするための関数
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

//jest.dontMock(moduleName)とは、モジュールをモックしないための関数
jest.dontMock('../moduleName');

//jest.requireActual(moduleName)とは、モジュールの実際の実装を取得するための関数
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

//jest.resetModules()とは、モジュールをリセットするための関数
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

//mockFn.mock.callsとは、モック関数が呼び出された回数と引数を取得するためのプロパティ
[
   ['arg1', 'arg2'],
   ['arg3', 'arg4'],
];

//mockFn.mock.instancesとは、モック関数が呼び出された回数とthisを取得するためのプロパティ
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true

//mockFn.mock.contextsとは、モック関数が呼び出された回数とthisを取得するためのプロパティ
const mockFn = jest.fn();

const boundMockFn = mockFn.bind(thisContext0);
boundMockFn('a', 'b');
mockFn.call(thisContext1, 'a', 'b');
mockFn.apply(thisContext2, ['a', 'b']);

mockFn.mock.contexts[0] === thisContext0; // true
mockFn.mock.contexts[1] === thisContext1; // true
mockFn.mock.contexts[2] === thisContext2; // true

//mockFn.mockImplementation(fn)とは、モック関数の実装を設定するための関数
const mockFn = jest.fn(scalar => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

mockFn.mockImplementation(scalar => 36 + scalar);

mockFn(2); // 38
mockFn(3); // 39

//mockFn.mockImplementationOnce(fn)とは、モック関数の実装を一度だけ設定するための関数
const mockFn = jest
   .fn()
   .mockImplementationOnce(cb => cb(null, true))
   .mockImplementationOnce(cb => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val)); // false

//mockFn.mockName(name)とは、モック関数の名前を設定するための関数
const mockFn = jest.fn();

//mockFn.mockReturnThis()とは、モック関数の戻り値をthisに設定するための関数
jest.fn(function () {
   return this;
});

//mockFn.mockReturnValue(value)とは、モック関数の戻り値を設定するための関数
const mock = jest.fn();

mock.mockReturnValue(42);
mock(); // 42

mock.mockReturnValue(43);
mock(); // 43

//mockFn.mockReturnValueOnce(value)とは、モック関数の戻り値を一度だけ設定するための関数
const mockFn = jest
   .fn()
   .mockReturnValue('default')
   .mockReturnValueOnce('first call')
   .mockReturnValueOnce('second call');

mockFn(); // 'first call'
mockFn(); // 'second call'
mockFn(); // 'default'
mockFn(); // 'default'

//mockFn.mockResolvedValue(value)とは、モック関数の戻り値をPromise.resolveでラップして設定するための関数
test('async test', async () => {
   const asyncMock = jest.fn().mockResolvedValue(43);

   await asyncMock(); // 43
});

//mockFn.mockResolvedValueOnce(value)とは、モック関数の戻り値をPromise.resolveでラップして一度だけ設定するための関数
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockResolvedValueOnce(42)
      .mockResolvedValueOnce(43);

   await asyncMock(); // 42
   await asyncMock(); // 43
}
)

//mockFn.mockRejectedValue(value)とは、モック関数の戻り値をPromise.rejectでラップして設定するための関数
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockRejectedValue(new Error('Async error message'));

   await asyncMock(); // throws 'Async error message'
});

//mockFn.mockRejectedValueOnce(value)とは、モック関数の戻り値をPromise.rejectでラップして一度だけ設定するための関数
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockResolvedValueOnce('first call')
      .mockRejectedValueOnce(new Error('Async error message'));

   await asyncMock(); // 'first call'
   await asyncMock(); // throws 'Async error message'
});

//mockFn.mockReset()とは、モック関数の実装をリセットするための関数

test('test', () => {
   const mock = jest.fn(() => 'outside callback');

   mock.withImplementation(
      () => 'inside callback',
      () => {
         mock(); // 'inside callback'
      },
   );

   mock(); // 'outside callback'
});

