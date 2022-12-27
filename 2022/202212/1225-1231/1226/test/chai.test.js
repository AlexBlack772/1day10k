//.notとは、否定の意味
expect(function () { }).to.not.throw();
expect({ a: 1 }).to.not.have.property('b');
expect([1, 2]).to.be.an('array').that.does.not.include(3);

//assert(expression, message)は、expressionがfalseの場合にエラーを発生させる
assert('foo' !== 'bar', 'foo is not bar');
assert(Array.isArray([]), 'empty arrays are arrays');

//assert.fail(actual, expected, message, operator)は、常にエラーを発生させる
assert.fail();
assert.fail("custom error message");
assert.fail(1, 2);
assert.fail(1, 2, "custom error message");
assert.fail(1, 2, "custom error message", ">");
assert.fail(1, 2, undefined, ">");

//assert.isOk(value, [message])は、valueが真であることを確認する
assert.isOk('everything', 'everything is ok');
assert.isOk(false, 'this will fail');

//expect({a: 1}).to.deep.equalとは、オブジェクトのプロパティの値が同じであることを確認する
expect({ a: 1 }).to.deep.equal({ a: 1 });

//expect({a: {b: ['x', 'y']}}).to.have.nested.propertyとは、オブジェクトのネストされたプロパティが存在することを確認する
expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]');

//expect({a: 1}).to.have.ownPropertyとは、オブジェクトのプロパティが存在することを確認する
expect({ a: 1 }).to.have.ownProperty('a');

//expect({a: 1}).to.have.propertyとは、オブジェクトのプロパティが存在することを確認する
expect({ a: 1 }).to.have.property('a');

//expect([1, 2]).to.have.orderedとは、配列の順序が同じであることを確認する
expect([1, 2]).to.have.ordered.members([1, 2]).but.not.have.ordered.members([2, 1]);
expect([1, 2]).to.have.ordered.members([1, 2])
   .but.not.have.ordered.members([2, 1]);

//expect({a: 1, b: 2}).to.not.have.any.keysとは、オブジェクトのプロパティが存在しないことを確認する
expect('foo').to.be.a('string');

//expect('foo').to.be.a('string')とは、文字列であることを確認する
expect('foo').to.be.a('string');

//expect('foo').to.be.an('string')とは、文字列であることを確認する
expect('foo').to.be.an('string');

//expect('foobar').to.includeとは、文字列が含まれていることを確認する
expect('foobar').to.include('foo');

//expect('foobar').to.not.includeとは、文字列が含まれていないことを確認する
expect('foobar').to.not.include('baz');

//expect(1).to.be.okとは、値が真であることを確認する
expect(1).to.be.ok;

//expect(true).to.be.true;とは、値がtrueであることを確認する
expect(true).to.be.true;

//expect(false).to.be.false;とは、値がfalseであることを確認する
expect(false).to.be.false;

//expect(true).to.be.true;とは、値がtrueであることを確認する
expect(true).to.be.true;

//expect(false).to.be.false;とは、値がfalseであることを確認する
expect(false).to.be.false;

//expect(null).to.be.null;とは、値がnullであることを確認する
expect(null).to.be.null;

//expect(1).to.equal(1);とは、値が等しいことを確認する
expect(1).to.equal(1);

//expect(undefined).to.be.undefined;とは、値がundefinedであることを確認する
expect(undefined).to.be.undefined;

//expect(NaN).to.be.NaN;とは、値がNaNであることを確認する
expect(NaN).to.be.NaN;

//expect(1).to.exist; とは、値が存在することを確認する
expect(1).to.exist;

//expect('').to.be.empty;とは、値が空であることを確認する
expect('').to.be.empty;

//expect('test').to.have.lengthOf(4);とは、文字列の長さが4であることを確認する
expect('test').to.have.lengthOf(4);

//expect(arguments).to.be.arguments;とは、引数があることを確認する
function test() {
   expect(arguments).to.be.arguments;
}

test();

//expect(1).to.equal(1);とは、値が等しいことを確認する
expect(1).to.equal(1);

//expect(1).to.not.equal(2);とは、値が等しくないことを確認する
expect(1).to.not.equal(2);

//expect({a: 1}).to.eql({a: 1});とは、オブジェクトのプロパティの値が同じであることを確認する
expect({ a: 1 }).to.eql({ a: 1 });

//expect(2).to.be.above(1);とは、値が1より大きいことを確認する
expect(2).to.be.above(1);

//expect('foo').to.have.lengthOf.above(2);とは、文字列の長さが2より大きいことを確認する
expect('foo').to.have.lengthOf.above(2);

//expect(1).to.be.at.least(1);とは、値が1以上であることを確認する
expect(1).to.be.at.least(1);

//expect(1).to.be.below(2);とは、値が2より小さいことを確認する
expect(1).to.be.below(2);

//expect(1).to.be.at.most(2);とは、値が2以下であることを確認する
expect(1).to.be.at.most(2);

//expect(2).to.be.within(1, 3);とは、値が1以上3以下であることを確認する
expect(2).to.be.within(1, 3);

//expect([1, 2]).to.be.an.instanceof(Array);とは、値が配列であることを確認する
expect([1, 2]).to.be.an.instanceof(Array);

//expect({a: 1}).to.have.property('a');とは、オブジェクトがプロパティaを持っていることを確認する
expect({ a: 1 }).to.have.property('a');

//expect({a: 1}).to.have.ownPropertyDescriptor('a');とは、オブジェクトがプロパティaを持っていることを確認する
expect({ a: 1 }).to.have.ownPropertyDescriptor('a');

//expect({a: 1}).to.have.property('a').that.is.a('number');とは、オブジェクトがプロパティaを持っていて、値が数値であることを確認する
expect({ a: 1 }).to.have.property('a').that.is.a('number');

//expect({b: 2}).to.not.have.ownPropertyDescriptor('a');とは、オブジェクトがプロパティaを持っていないことを確認する
expect({ b: 2 }).to.not.have.ownPropertyDescriptor('a');

//expect('foo').to.have.lengthOf(3);とは、文字列の長さが3であることを確認する
expect('foo').to.have.lengthOf(3);

//assert.fail();とは、テストを失敗させる
assert.fail();

//ssert.notEqual(1, 2);とは、値が等しくないことを確認する
assert.notEqual(1, 2);

//assert.notStrictEqual(1, '1');とは、値が厳密に等しくないことを確認する
assert.notStrictEqual(1, '1');

//assert.deepEqual({a: 1}, {a: 1});とは、オブジェクトのプロパティの値が同じであることを確認する
assert.deepEqual({ a: 1 }, { a: 1 });

//assert.notDeepEqual({a: 1}, {b: 1});とは、オブジェクトのプロパティの値が同じでないことを確認する
assert.notDeepEqual({ a: 1 }, { b: 1 });

//assert.isAbove(2, 1);とは、値が1より大きいことを確認する
assert.isAbove(2, 1);

//assert.isAtLeast(1, 1);とは、値が1以上であることを確認する
assert.isAtLeast(1, 1);

//assert.isBelow(1, 2);とは、値が2より小さいことを確認する
assert.isBelow(1, 2);

//assert.isAtMost(2, 2);とは、値が2以下であることを確認する
assert.isAtMost(2, 2);

//isTrue(true);とは、値がtrueであることを確認する
assert.isTrue(teaServed, 'the tea has been served');

//assert.isNotTrue(false);とは、値がtrueでないことを確認する
assert.isNotTrue(teaServed, 'the tea has been served');

//assert.isFalse(false);とは、値がfalseであることを確認する
assert.isFalse(teaServed, 'the tea has been served');

//assert.isNotFalse(true);とは、値がfalseでないことを確認する
assert.isNotFalse(teaServed, 'the tea has been served');

//assert.isNull(null);とは、値がnullであることを確認する
assert.isNull(err, 'there was no error');

//assert.exists(1);とは、値が存在することを確認する
assert.exists(1);

//assert.notExists(null);とは、値が存在しないことを確認する
assert.notExists(null);

//assert.isUndefined(undefined);とは、値がundefinedであることを確認する
assert.isUndefined(undefined);

//assert.isDefined(1);とは、値がundefinedでないことを確認する
assert.isDefined(1);

//assert.isFunction(function(){});とは、値が関数であることを確認する
assert.isFunction(function () { });

//assert.isNotFunction(1);とは、値が関数でないことを確認する
assert.isNotFunction(1);

//とは、変数teaOrderに'chai'を代入する
assert.isString(teaOrder, 'order placed');

//assert.isNumber(1);とは、値が数値であることを確認する
assert.isNumber(1);

//assert.isBoolean(true);とは、値が真偽値であることを確認する
assert.isBoolean(true);

//assert.isNotBoolean(1);とは、値が真偽値でないことを確認する
assert.isNotBoolean(1);

//assert.isObject({a: 1});とは、値がオブジェクトであることを確認する
assert.isObject({ a: 1 });

//assert.isNotObject(1);とは、値がオブジェクトでないことを確認する
assert.isNotObject(1);

//assert.isArray([1]);とは、値が配列であることを確認する
assert.isArray([1]);

//assert.isNotArray(1);とは、値が配列でないことを確認する
assert.isNotArray(1);

