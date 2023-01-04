//afterAll(fn, timeout)とは、すべてのテストが実行された後に呼び出される関数を登録する。
const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {
   db.cleanUp();
}

afterAll(() => {
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

//afterEach(fn, timeout)とは、各テストの実行後に呼び出される関数を登録する。
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

//beforeAll(fn, timeout)とは、すべてのテストが実行される前に呼び出される関数を登録する。
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

//beforeEach(fn, timeout)とは、各テストの実行前に呼び出される関数を登録する。
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

describe.each([
   { a: 1, b: 1, expected: 2 },
   { a: 1, b: 2, expected: 3 },
   { a: 2, b: 1, expected: 3 },
])('.add($a, $b)', ({ a, b, expected }) => {
   test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
   });

   test(`returned value not be greater than ${expected}`, () => {
      expect(a + b).not.toBeGreaterThan(expected);
   });

   test(`returned value not be less than ${expected}`, () => {
      expect(a + b).not.toBeLessThan(expected);
   });
});

describe.only('my beverage', () => {
   test('is delicious', () => {
      expect(myBeverage.delicious).toBeTruthy();
   });

   test('is not sour', () => {
      expect(myBeverage.sour).toBeFalsy();
   });
});

describe('my other beverage', () => {
   // ... will be skipped
});

describe.only.each([
   [1, 1, 2],
   [1, 2, 3],
   [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
   test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
   });
});

test('will not be run', () => {
   expect(1 / 0).toBe(Infinity);
});

//expect.anything()とは、何かしらの値が与えられていることを確認する。
test('map calls its argument with a non-null argument', () => {
   const mock = jest.fn();
   [1].map(x => mock(x));
   expect(mock).toHaveBeenCalledWith(expect.anything());
});

//expect.any(constructor)とは、引数に与えられたコンストラクタのインスタンスであることを確認する。
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

//expect.arrayContaining(array)とは、引数に与えられた配列の要素を含む配列であることを確認する。
describe('arrayContaining', () => {
   const expected = ['Alice', 'Bob'];
   it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
   });
   it('does not match if received does not contain expected elements', () => {
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
   });
});

//expect.assertions(number)とは、テスト内で呼び出されるexpectの数を指定する。
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

//expect.closeTo(number, numDigits?)とは、引数に与えられた数値と近い数値であることを確認する。
test('compare float in object properties', () => {
   expect({
      title: '0.1 + 0.2',
      sum: 0.1 + 0.2,
   }).toEqual({
      title: '0.1 + 0.2',
      sum: expect.closeTo(0.3, 5),
   });
})

//expect.hasAssertions()とは、テスト内でexpectが呼び出されることを確認する。
test('prepareState prepares a valid state', () => {
   expect.hasAssertions();
   prepareState(state => {
      expect(validateState(state)).toBeTruthy();
   });
   return waitOnState();
});

//expect.not.arrayContaining(array)とは、引数に与えられた配列の要素を含まない配列であることを確認する。
describe('not.arrayContaining', () => {
   const expected = ['Samantha'];

   it('matches if the actual array does not contain the expected elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(
         expect.not.arrayContaining(expected),
      );
   });
});

//expect.not.objectContaining(object)とは、引数に与えられたオブジェクトのプロパティを含まないオブジェクトであることを確認する。
describe('not.objectContaining', () => {
   const expected = { foo: 'bar' };

   it('matches if the actual object does not contain expected key: value pairs', () => {
      expect({ bar: 'baz' }).toEqual(expect.not.objectContaining(expected));
   });
});

//expect.not.stringContaining(string)とは、引数に与えられた文字列を含まない文字列であることを確認する。
describe('not.stringContaining', () => {
   const expected = 'Hello world!';

   it('matches if the received value does not contain the expected substring', () => {
      expect('How are you?').toEqual(expect.not.stringContaining(expected));
   });
});

//expect.not.stringMatching(string | regexp)とは、引数に与えられた文字列または正規表現にマッチしない文字列であることを確認する。
describe('not.stringMatching', () => {
   const expected = /Hello world!/;

   it('matches if the received value does not match the expected regex', () => {
      expect('How are you?').toEqual(expect.not.stringMatching(expected));
   });
});

//expect.objectContaining(object)とは、引数に与えられたオブジェクトのプロパティを含むオブジェクトであることを確認する。
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

//mockFn.mock.contextsとは、mock関数が呼び出されたコンテキストの配列を返す。
const mockFn = jest.fn();

const boundMockFn = mockFn.bind(thisContext0);
boundMockFn('a', 'b');
mockFn.call(thisContext1, 'a', 'b');
mockFn.apply(thisContext2, ['a', 'b']);

mockFn.mock.contexts[0] === thisContext0; // true
mockFn.mock.contexts[1] === thisContext1; // true
mockFn.mock.contexts[2] === thisContext2; // true

//mockFn.mockImplementation(fn)とは、mock関数の実装を指定する。
const mockFn = jest.fn(scalar => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

mockFn.mockImplementation(scalar => 36 + scalar);

mockFn(2); // 38
mockFn(3);

//mockFn.mockImplementationOnce(fn)とは、mock関数の実装を一度だけ指定する。
const mockFn = jest
   .fn()
   .mockImplementationOnce(cb => cb(null, true))
   .mockImplementationOnce(cb => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val));

//mockFn.mockReturnValueOnce(value)とは、mock関数の戻り値を一度だけ指定する。
const mockFn = jest
   .fn()
   .mockReturnValue('default')
   .mockReturnValueOnce('first call')
   .mockReturnValueOnce('second call');

mockFn(); // 'first call'
mockFn(); // 'second call'
mockFn(); // 'default'
mockFn(); // 'default'

//mockFn.mockResolvedValueOnce(value)とは、mock関数の戻り値を一度だけPromise.resolve()でラップしたものとして指定する。
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

//mockFn.mockRejectedValue(value)とは、mock関数の戻り値をPromise.reject()でラップしたものとして指定する。
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockRejectedValue(new Error('Async error message'));

   await asyncMock(); // throws 'Async error message'
})

//mockFn.mockRejectedValueOnce(value)とは、mock関数の戻り値を一度だけPromise.reject()でラップしたものとして指定する。
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockResolvedValueOnce('first call')
      .mockRejectedValueOnce(new Error('Async error message'));

   await asyncMock(); // 'first call'
   await asyncMock(); // throws 'Async error message'
});

//mockFn.withImplementation(fn, callback)とは、mock関数の実装を指定する。
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

//jest.disableAutomock()とは、自動モックを無効にする。

import utils from '../utils';

jest.disableAutomock();

test('original implementation', () => {
   // now we have the original implementation,
   // even if we set the automocking in a jest configuration
   expect(utils.authorize()).toBe('token');
});

//jest.enableAutomock()とは、自動モックを有効にする。
jest.enableAutomock();

import utils from '../utils';

test('original implementation', () => {
   // now we have the mocked implementation,
   expect(utils.authorize._isMockFunction).toBeTruthy();
   expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});

//jest.createMockFromModule(moduleName)とは、モジュールからモックを作成する。
const utils = jest.createMockFromModule('../utils');

utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
   expect(jest.isMockFunction(utils.authorize)).toBe(true);
   expect(utils.isAuthorized('not wizard')).toBe(true);
});

//jest.mock(moduleName, factory, options)とは、モジュールをモックにする。
jest.mock('../moduleName', () => {
   return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';

//jest.doMock(moduleName, factory, options)とは、モジュールをモックにする。
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

//jest.requireActual(moduleName)とは、モジュールの実際の実装を取得する。
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

getRandom(); 

//jest.resetModules()とは、モジュールをリセットする。
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

//jest.fn(implementation?)とは、モック関数を作成する。
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); 