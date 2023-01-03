//expect.extend(matchers)とは、expectの拡張を行うメソッドである。
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

//expect.anything()とは、何かしらの値があることを表す。
//expect.anything()は、expect.anything()とは異なり、何かしらの値があることを表す。
test('map calls its argument with a non-null argument', () => {
   const mock = jest.fn();
   [1].map(x => mock(x));
   expect(mock).toHaveBeenCalledWith(expect.anything());
});

//expect.any(constructor)とは、引数に指定したコンストラクタのインスタンスであることを表す。
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

//expect.arrayContaining(array)とは、引数に指定した配列の要素を含むことを表す。
describe('arrayContaining', () => {
   const expected = ['Alice', 'Bob'];
   it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
   });
   it('does not match if received does not contain expected elements', () => {
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
   });
});

//expect.assertions(number)とは、テストケース内で実行されるexpectの数を指定する。
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

//expect.hasAssertions()とは、テストケース内でexpectが実行されることを表す。
test('doAsync calls both callbacks', () => {
   expect.hasAssertions();
   function callback1(data) {
      expect(data).toBeTruthy();
   }
   function callback2(data) {
      expect(data).toBeTruthy();
   }

   doAsync(callback1, callback2);
}
)

//jest.disableAutomock()とは、モックを自動生成しないように設定する。
import utils from '../utils';

jest.disableAutomock();

test('original implementation', () => {
   // now we have the original implementation,
   // even if we set the automocking in a jest configuration
   expect(utils.authorize()).toBe('token');
});

//jest.enableAutomock()とは、モックを自動生成するように設定する。
test('original implementation', () => {
   // now we have the mocked implementation,
   expect(utils.authorize._isMockFunction).toBeTruthy();
   expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});

//jest.createMockFromModule(moduleName)とは、モジュールをモック化する。
test('implementation created by jest.createMockFromModule', () => {
   expect(jest.isMockFunction(utils.authorize)).toBe(true);
   expect(utils.isAuthorized('not wizard')).toBe(true);
});

//jest.mock(moduleName, factory, options)とは、モジュールをモック化する。
jest.mock('../moduleName', () => {
   return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';

jest.mock('../moduleName', () => {
   return {
      __esModule: true,
      default: jest.fn(() => 42),
      foo: jest.fn(() => 43),
   };
});

moduleName(); // Will return 42
foo(); // Will return 43

//jest.doMock(moduleName, factory, options)とは、モジュールをモック化する。
jest.doMock('../moduleName', () => {
   return jest.fn(() => 42);
}
)

//jest.dontMock(moduleName)とは、モジュールをモック化しないように設定する。
jest.dontMock('../moduleName');

//mockFn.getMockName()とは、モック関数の名前を取得する。
const mockFn = jest.fn();

//mockFn.mock.instancesとは、モック関数が呼び出されたインスタンスを取得する。
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true

//mockFn.mock.callsとは、モック関数が呼び出された引数を取得する。
const mockFn = jest.fn();

//mockFn.mock.contextsとは、モック関数が呼び出されたコンテキストを取得する。
const mockFn = jest.fn();

const boundMockFn = mockFn.bind(thisContext0);
boundMockFn('a', 'b');
mockFn.call(thisContext1, 'a', 'b');
mockFn.apply(thisContext2, ['a', 'b']);

mockFn.mock.contexts[0] === thisContext0; // true
mockFn.mock.contexts[1] === thisContext1; // true
mockFn.mock.contexts[2] === thisContext2;

//mockFn.mock.resultsとは、モック関数が呼び出された結果を取得する。
const mockFn = jest.fn();

//mockFn.mockImplementation(fn)とは、モック関数の実装を設定する。
const mockFn = jest.fn(scalar => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

mockFn.mockImplementation(scalar => 36 + scalar);

mockFn(2); // 38
mockFn(3); // 39

//mockFn.mockImplementationOnce(fn)とは、モック関数の実装を一度だけ設定する。
const mockFn = jest.fn();

//mockFn.mockImplementationOnce(fn)
const mockFn = jest
   .fn()
   .mockImplementationOnce(cb => cb(null, true))
   .mockImplementationOnce(cb => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val)); // false

//mockFn.mockName(name)とは、モック関数の名前を設定する。
const mockFn = jest.fn().mockName('mockedFunction');

// mockFn.mockReturnValueOnce(value)とは、モック関数の戻り値を一度だけ設定する。
const mockFn = jest
   .fn()
   .mockReturnValue('default')
   .mockReturnValueOnce('first call')
   .mockReturnValueOnce('second call');

mockFn(); // 'first call'
mockFn(); // 'second call'
mockFn(); // 'default'
mockFn(); // 'default'

//mockFn.mockResolvedValueOnce(value)とは、モック関数の戻り値を一度だけ設定する。
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockResolvedValue('default')
      .mockResolvedValueOnce('first call')
      .mockResolvedValueOnce('second call');

   await asyncMock(); // 'first call'
   await asyncMock(); // 'second call'
   await asyncMock(); // 'default'
   await asyncMock(); // 'default'
});

//mockFn.mockRejectedValueOnce(value)とは、モック関数の戻り値を一度だけ設定する。
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockRejectedValue('default')
      .mockRejectedValueOnce('first call')
      .mockRejectedValueOnce('second call');

   await asyncMock(); // 'first call'
   await asyncMock(); // 'second call'
   await asyncMock(); // 'default'
   await asyncMock(); // 'default'
}
)

//mockFn.mockRejectedValue(value)とは、モック関数の戻り値を設定する。
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockRejectedValue(new Error('Async error message'));

   await asyncMock(); // throws 'Async error message'
});

