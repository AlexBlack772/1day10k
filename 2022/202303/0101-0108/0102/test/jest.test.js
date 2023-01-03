//expect.extend(matchers)とは、expectの拡張を行うためのもの

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

//expect.anything()とは、何でも良いという意味
test('map calls its argument with a non-null argument', () => {
   const mock = jest.fn();
   [1].map(x => mock(x));
   expect(mock).toHaveBeenCalledWith(expect.anything());
});

//expect.any(constructor)とは、constructorのインスタンスであることを期待する
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

//expect.arrayContaining(array)とは、配列の中にarrayが含まれていることを期待する
describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
   const expected = [1, 2, 3, 4, 5, 6];
   it('matches even with an unexpected number 7', () => {
      expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
         expect.arrayContaining(expected),
      );
   });
   it('does not match without an expected number 2', () => {
      expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
         expect.arrayContaining(expected),
      );
   });
});

//expect.assertions(number)とは、numberの数だけexpectが呼ばれることを期待する
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

//expect.closeTo(number, numDigits?)とは、numberの近傍にある数値であることを期待する
test('compare float in object properties', () => {
   expect({
      title: '0.1 + 0.2',
      sum: 0.1 + 0.2,
   }).toEqual({
      title: '0.1 + 0.2',
      sum: expect.closeTo(0.3, 5),
   });
});

//expect.hasAssertions()とは、expectが呼ばれることを期待する
test('prepareState prepares a valid state', () => {
   expect.hasAssertions();
   prepareState(state => {
      expect(validateState(state)).toBeTruthy();
   });
   return waitOnState();
});

//expect.not.arrayContaining(array)とは、配列の中にarrayが含まれていないことを期待する
describe('not.arrayContaining', () => {
   const expected = ['Samantha'];

   it('matches if the actual array does not contain the expected elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(
         expect.not.arrayContaining(expected),
      );
   });
});

//expect.not.objectContaining(object)とは、objectの中に含まれていないことを期待する
describe('not.objectContaining', () => {
   const expected = { foo: 'bar' };

   it('matches if the actual object does not contain expected key: value pairs', () => {
      expect({ bar: 'baz' }).toEqual(expect.not.objectContaining(expected));
   });
});

//expect.not.stringContaining(string)とは、stringの中に含まれていないことを期待する
describe('not.stringContaining', () => {
   const expected = 'Hello world!';

   it('matches if the received value does not contain the expected substring', () => {
      expect('How are you?').toEqual(expect.not.stringContaining(expected));
   });
});

//expect.not.stringMatching(string | regexp)とは、stringの中に含まれていないことを期待する
describe('not.stringMatching', () => {
   const expected = /Hello world!/;

   it('matches if the received value does not match the expected regex', () => {
      expect('How are you?').toEqual(expect.not.stringMatching(expected));
   });
});

//expect.objectContaining(object)とは、objectの中に含まれていることを期待する
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

//expect.stringContaining(string)とは、stringの中に含まれていることを期待する


//expect.stringMatching(string | regexp)とは、stringの中に含まれていることを期待する
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

//expect.addSnapshotSerializer(serializer)とは、シリアライザを追加する
import serializer from 'my-serializer-module';
expect.addSnapshotSerializer(serializer);

//jest.disableAutomock()とは、モックを無効にする
import utils from '../utils';

jest.disableAutomock();

test('original implementation', () => {
   // now we have the original implementation,
   // even if we set the automocking in a jest configuration
   expect(utils.authorize()).toBe('token');
});

//jest.enableAutomock()とは、モックを有効にする
jest.enableAutomock();

import utils from '../utils';

test('original implementation', () => {
   // now we have the mocked implementation,
   expect(utils.authorize._isMockFunction).toBeTruthy();
   expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});

//jest.mock(moduleName, factory?, options?)とは、モックを作成する
const utils = jest.createMockFromModule('../utils');

utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
   expect(jest.isMockFunction(utils.authorize)).toBe(true);
   expect(utils.isAuthorized('not wizard')).toBe(true);
});

//
module.exports = {
   function: function square(a, b) {
      return a * b;
   },
   asyncFunction: async function asyncSquare(a, b) {
      const result = (await a) * b;
      return result;
   },
   class: new (class Bar {
      constructor() {
         this.array = [1, 2, 3];
      }
      foo() { }
   })(),
   object: {
      baz: 'foo',
      bar: {
         fiz: 1,
         buzz: [1, 2, 3],
      },
   },
   array: [1, 2, 3],
   number: 123,
   string: 'baz',
   boolean: true,
   symbol: Symbol.for('a.b.c'),
};

//jest.mock(moduleName, factory, options)とは、モックを作成する
jest.mock('../moduleName', () => {
   return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName();

//jest.doMock(moduleName, factory, options)とは、モックを作成する
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

//jest.dontMock(moduleName)とは、モックを作成しない
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

//jest.resetModules()とは、モジュールをリセットする
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

//jest.isolateModules(fn)とは、モジュールを分離する
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

//jest.spyOn(object, methodName, accessType?)とは、オブジェクトのメソッドをスパイする
const video = {
   // it's a getter!
   get play() {
      return true;
   },
};

module.exports = video;

const audio = {
   _volume: false,
   // it's a setter!
   set volume(value) {
      this._volume = value;
   },
   get volume() {
      return this._volume;
   },
};

module.exports = audio;

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


//jest.useFakeTimers(fakeTimersConfig ?)とは、
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

//jest.useRealTimers()とは、
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

//afterAll(fn, timeout)とは、
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

//afterEach(fn, timeout)とは、
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