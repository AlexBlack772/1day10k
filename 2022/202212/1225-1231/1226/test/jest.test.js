//afterAll(fn, timeout)とは、テストの実行が終了した後に呼び出される関数を登録するメソッドです。
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

//afterEach(fn, timeout)とは、各テストの実行が終了した後に呼び出される関数を登録するメソッドです。
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

//expect.extend(matchers)とは、カスタムマッチャーを登録するメソッドです。
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

//expect.arrayContaining(array)とは、配列の中に含まれる要素を指定するメソッドです。 
expect.extend({ toBeWithinRange });

describe('arrayContaining', () => {
   const expected = ['Alice', 'Bob'];
   it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
   });
   it('does not match if received does not contain expected elements', () => {
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
   });
});

//expect.assertions(number)とは、テスト内で呼び出されるexpectの数を指定するメソッドです。
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

//expect.closeTo(number, numDigits?)とは、指定した数値と近い数値かどうかを判定するメソッドです。
test('compare float in object properties', () => {
   expect({
      title: '0.1 + 0.2',
      sum: 0.1 + 0.2,
   }).toEqual({
      title: '0.1 + 0.2',
      sum: expect.closeTo(0.3, 5),
   });
});

//expect.hasAssertions()とは、expectが呼び出されたかどうかを判定するメソッドです。
test('prepareState prepares a valid state', () => {
   expect.hasAssertions();
   prepareState(state => {
      expect(validateState(state)).toBeTruthy();
   });
   return waitOnState();
});

//expect.not.arrayContaining(array)とは、配列の中に含まれない要素を指定するメソッドです。
describe('not.arrayContaining', () => {
   const expected = ['Samantha'];

   it('matches if the actual array does not contain the expected elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(
         expect.not.arrayContaining(expected),
      );
   });
});

//expect.not.objectContaining(object)とは、オブジェクトの中に含まれない要素を指定するメソッドです。
describe('not.objectContaining', () => {
   const expected = { foo: 'bar' };

   it('matches if the actual object does not contain expected key: value pairs', () => {
      expect({ bar: 'baz' }).toEqual(expect.not.objectContaining(expected));
   });
});

//expect.not.stringContaining(string)とは、文字列の中に含まれない要素を指定するメソッドです。
describe('not.stringContaining', () => {
   const expected = 'Hello world!';

   it('matches if the received value does not contain the expected substring', () => {
      expect('How are you?').toEqual(expect.not.stringContaining(expected));
   });
});

//expect.not.stringMatching(string | regexp)とは、文字列の中に含まれない要素を指定するメソッドです。
describe('not.stringMatching', () => {
   const expected = /Hello world!/;

   it('matches if the received value does not match the expected regex', () => {
      expect('How are you?').toEqual(expect.not.stringMatching(expected));
   });
});

//expect.objectContaining(object)とは、オブジェクトの中に含まれる要素を指定するメソッドです。
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

//expect.stringMatching(string | regexp)とは、文字列の中に含まれる要素を指定するメソッドです。
test('the best flavor is not coconut', () => {
   expect(bestLaCroixFlavor()).not.toBe('coconut');
});

//.resolvesとは、Promiseがresolveされることを期待するメソッドです。
test('resolves to lemon', () => {
   // make sure to add a return statement
   return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});

//.rejectsとは、Promiseがrejectされることを期待するメソッドです。
test('rejects with an error', () => {
   return expect(Promise.reject(new Error('nope'))).rejects.toThrow('nope');
}
)

//.toBe(value)とは、値が同じかどうかを判定するメソッドです。
test('two plus two is four', () => {
   expect(2 + 2).toBe(4);
}
)

//.toBeCloseTo(number, numDigits?)とは、指定した数値と近い数値かどうかを判定するメソッドです。
test('adding floating point numbers', () => {
   const value = 0.1 + 0.2;
   expect(value).toBeCloseTo(0.3);
}
)

//toHaveBeenCalled()とは、関数が呼び出されたかどうかを判定するメソッドです。
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

//.toHaveBeenCalledTimes(number)とは、関数が指定した回数呼び出されたかどうかを判定するメソッドです。
test('drinkEach drinks each drink', () => {
   const drink = jest.fn();
   drinkEach(drink, ['lemon', 'octopus']);
   expect(drink).toHaveBeenCalledTimes(2);
});

//.toHaveBeenCalledWith(arg1, arg2, ...)とは、関数が指定した引数で呼び出されたかどうかを判定するメソッドです。
test('registration applies correctly to orange La Croix', () => {
   const beverage = new LaCroix('orange');
   register(beverage);
   const f = jest.fn();
   applyToAll(f);
   expect(f).toHaveBeenCalledWith(beverage);
});

//.toHaveReturned()とは、関数がreturnされたかどうかを判定するメソッドです。
test('drinks returns', () => {
   const drink = jest.fn(() => true);

   drink();

   expect(drink).toHaveReturned();
});

//.toHaveReturnedTimes(number)とは、関数が指定した回数returnされたかどうかを判定するメソッドです。
test('drink returns twice', () => {
   const drink = jest.fn(() => true);

   drink();
   drink();

   expect(drink).toHaveReturnedTimes(2);
});

//mockFn.mock.resultsとは、関数がreturnした値を取得するメソッドです。
[
   {
      type: 'return',
      value: 'result1',
   },
   {
      type: 'throw',
      value: {
         /* Error instance */
      },
   },
   {
      type: 'return',
      value: 'result2',
   },
];
//mockFn.mock.instancesとは、関数が呼び出されたインスタンスを取得するメソッドです。
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true

//mockFn.mock.contextsとは、関数が呼び出されたコンテキストを取得するメソッドです。
const mockFn = jest.fn();

const boundMockFn = mockFn.bind(thisContext0);
boundMockFn('a', 'b');
mockFn.call(thisContext1, 'a', 'b');
mockFn.apply(thisContext2, ['a', 'b']);

mockFn.mock.contexts[0] === thisContext0; // true
mockFn.mock.contexts[1] === thisContext1; // true
mockFn.mock.contexts[2] === thisContext2; // true

//mockFn.mockImplementation(fn)とは、関数が呼び出されたときに実行される関数を指定するメソッドです。
const mockFn = jest.fn(scalar => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

mockFn.mockImplementation(scalar => 36 + scalar);

mockFn(2); // 38
mockFn(3); // 39

//mockFn.mockImplementationOnce(fn)とは、関数が一度だけ呼び出されたときに実行される関数を指定するメソッドです。
const mockFn = jest
   .fn()
   .mockImplementationOnce(cb => cb(null, true))
   .mockImplementationOnce(cb => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val)); // false

//mockFn.mockReturnThis()とは、関数が呼び出されたときにthisを返すようにするメソッドです。
jest.fn(function () {
   return this;
});

const mock = jest.fn();

mock.mockReturnValue(42);
mock(); // 42

mock.mockReturnValue(43);
mock(); // 43

//jest.disableAutomock()とは、モジュールの自動モック化を無効にするメソッドです。
import utils from '../utils';

jest.disableAutomock();

test('original implementation', () => {
   // now we have the original implementation,
   // even if we set the automocking in a jest configuration
   expect(utils.authorize()).toBe('token');
});

//jest.enableAutomock()とは、モジュールの自動モック化を有効にするメソッドです。
jest.enableAutomock();

import utils from '../utils';

test('original implementation', () => {
   // now we have the mocked implementation,
   expect(utils.authorize._isMockFunction).toBeTruthy();
   expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});

//jest.isolateModules(fn)とは、モジュールの自動モック化を有効にするメソッドです。
jest.isolateModules(() => {
   jest.doMock('../utils', () => ({
      authorize: jest.fn(()
         => 'token'),
      isAuthorized: jest.fn(() => true),
   }));
})

//jest.createMockFromModule(moduleName)とは、モジュールの自動モック化を有効にするメソッドです。
const utils = jest.createMockFromModule('../utils');

utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
   expect(jest.isMockFunction(utils.authorize)).toBe(true);
   expect(utils.isAuthorized('not wizard')).toBe(true);
});

//jest.mock(moduleName, factory, options)とは、モジュールの自動モック化を有効にするメソッドです。
jest.mock('../banana');

const banana = require('../banana'); // banana will be explicitly mocked.

banana();

//jest.doMock(moduleName, factory, options)とは、モジュールの自動モック化を有効にするメソッドです。
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

//jest.dontMock(moduleName)とは、モジュールの自動モック化を有効にするメソッドです。
jest.dontMock('../moduleName');


//jest.setMock(moduleName, moduleExports)とは、モジュールの自動モック化を有効にするメソッドです。
jest.setMock('../moduleName', 42);

//jest.requireActual(moduleName)とは、モジュールの自動モック化を有効にするメソッドです。
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

//jest.requireMock(moduleName)とは、モジュールの自動モック化を有効にするメソッドです。
jest.mock('../moduleName');

//jest.resetModules()とは、モジュールの自動モック化を有効にするメソッドです。
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

//jest.isolateModules(fn)とは、モジュールの自動モック化を有効にするメソッドです。
let myModule;
jest.isolateModules(() => {
   myModule = require('myModule');
});

const otherCopyOfMyModule = require('myModule');

//jest.fn(implementation?)とは、モジュールの自動モック化を有効にするメソッドです。
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); // true;

//jest.spyOn(object, methodName)とは、モジュールの自動モック化を有効にするメソッドです。
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

//jest.clearAllMocks()とは、モジュールの自動モック化を有効にするメソッドです。
const mockFn = jest.fn();

//jest.useFakeTimers(fakeTimersConfig?)とは、モジュールの自動モック化を有効にするメソッドです。

//jest.useRealTimers()とは、モジュールの自動モック化を有効にするメソッドです。
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

//jest.runAllTicks()とは、モジュールの自動モック化を有効にするメソッドです。
jest.useFakeTimers();

//jest.setTimeout(timeout)とは、モジュールの自動モック化を有効にするメソッドです。
jest.setTimeout(1000);

jest.retryTimes(3, { logErrorsBeforeRetry: true });
test('will fail', () => {
   expect(true).toBe(false);
});

//mockFn.mockImplementation(fn)とは、モジュールの自動モック化を有効にするメソッドです。
const mockFn = jest.fn(scalar => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

mockFn.mockImplementation(scalar => 36 + scalar);

mockFn(2); // 38
mockFn(3); 

//mockFn.mockImplementationOnce(fn)とは、モジュールの自動モック化を有効にするメソッドです。
const mockFn = jest
   .fn()
   .mockImplementationOnce(cb => cb(null, true))
   .mockImplementationOnce(cb => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val)); 

//mockFn.mockName(name)とは、モジュールの自動モック化を有効にするメソッドです。
const mockFn = jest.fn().mockName('mockedFunction');

// mockFn();
expect(mockFn).toHaveBeenCalled();

//mockFn.mockReturnThis()とは、モジュールの自動モック化を有効にするメソッドです。
jest.fn(function () {
   return this;
});

//mockFn.mockReturnValue(value)とは、モジュールの自動モック化を有効にするメソッドです。
const mock = jest.fn();

mock.mockReturnValue(42);
mock(); // 42

mock.mockReturnValue(43);
mock();

//mockFn.mockResolvedValue(value)とは、モジュールの自動モック化を有効にするメソッドです。
test('async test', async () => {
   const asyncMock = jest.fn().mockResolvedValue(43);

   await asyncMock(); // 43
});

//mockFn.mockResolvedValueOnce(value)とは、モジュールの自動モック化を有効にするメソッドです。
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

//mockFn.mockRejectedValue(value)とは、モジュールの自動モック化を有効にするメソッドです。
test('async test', async () => {
   const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));

   await expect(asyncMock()).rejects.toThrow('Async error');
}

)

//mockFn.mockRejectedValue(value)とは、モジュールの自動モック化を有効にするメソッドです。
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockRejectedValue(new Error('Async error message'));

   await asyncMock(); // throws 'Async error message'
});

//mockFn.mockRejectedValueOnce(value)とは、モジュールの自動モック化を有効にするメソッドです。
test('async test', async () => {
   const asyncMock = jest
      .fn()
      .mockResolvedValueOnce('first call')
      .mockRejectedValueOnce(new Error('Async error message'));

   await asyncMock(); // 'first call'
   await asyncMock(); // throws 'Async error message'
});

//mockFn.withImplementation(fn, callback)とは、モジュールの自動モック化を有効にするメソッドです。
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

//jest.Mock < T >とは、モジュールの自動モック化を有効にするメソッドです。
const mock = jest.fn();

//jest.Mocked<Source>とは、モジュールの自動モック化を有効にするメソッドです。
import { expect, jest, test } from '@jest/globals';
import type { fetch } from 'node-fetch';

jest.mock('node-fetch');

let mockedFetch: jest.Mocked<typeof fetch>;

afterEach(() => {
   mockedFetch.mockClear();
});

test('makes correct call', () => {
   mockedFetch = getMockedFetch();
   // ...
});

test('returns correct data', () => {
   mockedFetch = getMockedFetch();
   // ...
});

//jest.mocked(source, options?)とは、モジュールの自動モック化を有効にするメソッドです。
export const song = {
   one: {
      more: {
         time: (t: number) => {
            return t;
         },
      },
   },
};

//jest.Spied<Source>とは、モジュールの自動モック化を有効にするメソッドです。
import { afterEach, expect, jest, test } from '@jest/globals';
import { setDateNow } from './__utils__/setDateNow';

let spiedDateNow: jest.Spied<typeof Date.now> | undefined = undefined;

afterEach(() => {
   spiedDateNow?.mockReset();
});

test('renders correctly with a given date', () => {
   spiedDateNow = setDateNow(1482363367071);
   // ...

   expect(spiedDateNow).toHaveBeenCalledTimes(1);
});

//jest.spyOn(object, methodName)とは、モジュールの自動モック化を有効にするメソッドです。
import { expect, jest, test } from '@jest/globals';

//describe(name, fn)とは、テストのグループ化を行うメソッドです。
describe('test', () => {
   //it(name, fn)とは、テストの実行を行うメソッドです。
   it('test', () => {
      //expect(value)とは、テストの実行を行うメソッドです。
      expect(1).toBe(1);
   })
})

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

//describe.each(table)(name, fn, timeout)とは、テストのグループ化を行うメソッドです。
describe.each([
   [1, 1, 2],
   [1, 2, 3],
   [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
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

//describe.only(name, fn)とは、テストのグループ化を行うメソッドです。
describe.only('this will be the only test that runs', () => {
   test('will not run', () => {
      expect(true).toBe(false);
   })
})

//describe.skip(name, fn)とは、テストのグループ化を行うメソッドです。
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

//describe.only.each(table)(name, fn)とは、テストのグループ化を行うメソッドです。
describe.only.each([
   [1, 1, 2],
   [1, 2, 3],
   [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
   test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
   });
});

test('will not be ran', () => {
   expect(1 / 0).toBe(Infinity);
});

//describe.skip(name, fn)とは、テストのグループ化を行うメソッドです。
describe('my beverage', () => {
   test('is delicious', () => {
      expect(myBeverage.delicious).toBeTruthy();
   });

   test('is not sour', () => {
      expect(myBeverage.sour).toBeFalsy();
   });
});

describe.skip('my other beverage', () => {
   // ... will be skipped
});

//describe.skip.each(table)(name, fn)とは、テストのグループ化を行うメソッドです。
describe.skip.each([
   [1, 1, 2],
   [1, 2, 3],
   [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
   test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected); // will not be ran
   });
});

test('will be ran', () => {
   expect(1 / 0).toBe(Infinity);
});

//test(name, fn, timeout)とは、テストの実行を行うメソッドです。
test('did not rain', () => {
   expect(inchesOfRain()).toBe(0);
});

//test.concurrent(name, fn, timeout)とは、テストの実行を行うメソッドです。
test.concurrent('did not rain', () => {
   expect(inchesOfRain()).toBe(0);
});

test.concurrent('addition of 2 numbers', async () => {
   expect(5 + 3).toBe(8);
});

test.concurrent('subtraction 2 numbers', async () => {
   expect(5 - 3).toBe(2);
});

//test.concurrent.each(table)(name, fn, timeout)とは、テストの実行を行うメソッドです。
test.concurrent.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`('returns $expected when $a is added $b', async ({ a, b, expected }) => {
   expect(a + b).toBe(expected);
});

//test.concurrent.only.each(table)(name, fn)とは、テストの実行を行うメソッドです。
test.concurrent.only.each([
   [1, 1, 2],
   [1, 2, 3],
   [2, 1, 3],
])('.add(%i, %i)', async (a, b, expected) => {
   expect(a + b).toBe(expected);
});

test('will not be ran', () => {
   expect(1 / 0).toBe(Infinity);
});

//each(table)(name, fn, timeout)とは、それぞれのテストの実行を行うメソッドです。

//failing(name, fn, timeout)とは、失敗
test.failing('it is not equal', () => {
   expect(5).toBe(6); // this test will pass
});

test.failing('it is equal', () => {
   expect(10).toBe(10); // this test will fail
});

//test.only.failing(name, fn, timeout)とは、失敗するのみのテストを実行するメソッドです。
test.only('it is raining', () => {
   expect(inchesOfRain()).toBeGreaterThan(0);
});

test('it is not snowing', () => {
   expect(inchesOfSnow()).toBe(0);
});

//test.only.each(table)(name, fn)とは、テストの実行を行うメソッドです。
test.only.each([
   [1, 1, 2],
   [1, 2, 3],
   [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
   expect(a + b).toBe(expected);
});

test('will not be ran', () => {
   expect(1 / 0).toBe(Infinity);
});

//test.skip(name, fn)とは、テストの実行を行うメソッドです。
test('it is raining', () => {
   expect(inchesOfRain()).toBeGreaterThan(0);
});

test.skip('it is not snowing', () => {
   expect(inchesOfSnow()).toBe(0);
});

//test.skip.each(table)(name, fn)とは、テストの実行を行うメソッドです。
test.skip.each([
   [1, 1, 2],
   [1, 2, 3],
   [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
   expect(a + b).toBe(expected); // will not be ran
});

test('will be ran', () => {
   expect(1 / 0).toBe(Infinity);
});

//test.todo(name)とは、テストの実行を行うメソッドです。
const add = (a, b) => a + b;

test.todo('add should be associative');

//test.each(table)(name, fn, timeout)とは、テストの実行を行うメソッドです。
import { test } from '@jest/globals';

test.each([
   { name: 'a', path: 'path/to/a', count: 1, write: true },
   { name: 'b', path: 'path/to/b', count: 3 },
])('inline table', ({ name, path, count, write }) => {
   // arguments are typed as expected, e.g. `write: boolean | undefined`
});

//.toBeCloseTo(number, numDigits?)とは、テストの実行を行うメソッドです。
test('two plus two is four', () => {
   expect(2 + 2).toBe(4);
});

