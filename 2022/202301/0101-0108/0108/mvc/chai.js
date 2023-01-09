//
expect(function () { }).to.not.throw();
expect({ a: 1 }).to.not.have.property('b');
expect([1, 2]).to.be.an('array').that.does.not.include(3);

//
// Target object deeply (but not strictly) equals `{a: 1}`
expect({ a: 1 }).to.deep.equal({ a: 1 });
expect({ a: 1 }).to.not.equal({ a: 1 });

// Target array deeply (but not strictly) includes `{a: 1}`
expect([{ a: 1 }]).to.deep.include({ a: 1 });
expect([{ a: 1 }]).to.not.include({ a: 1 });

// Target object deeply (but not strictly) includes `x: {a: 1}`
expect({ x: { a: 1 } }).to.deep.include({ x: { a: 1 } });
expect({ x: { a: 1 } }).to.not.include({ x: { a: 1 } });

// Target array deeply (but not strictly) has member `{a: 1}`
expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }]);
expect([{ a: 1 }]).to.not.have.members([{ a: 1 }]);

// Target set deeply (but not strictly) has key `{a: 1}`
expect(new Set([{ a: 1 }])).to.have.deep.keys([{ a: 1 }]);
expect(new Set([{ a: 1 }])).to.not.have.keys([{ a: 1 }]);

// Target object deeply (but not strictly) has property `x: {a: 1}`
expect({ x: { a: 1 } }).to.have.deep.property('x', { a: 1 });
expect({ x: { a: 1 } }).to.not.have.property('x', { a: 1 });

//
assert('foo' !== 'bar', 'foo is not bar');
assert(Array.isArray([]), 'empty arrays are arrays');


//assert.fail()とは、assert.fail(actual, expected, message, operator)のことで、
assert.fail();
assert.fail("custom error message");
assert.fail(1, 2);
assert.fail(1, 2, "custom error message");
assert.fail(1, 2, "custom error message", ">");
assert.fail(1, 2, undefined, ">");

//assert.isOkとは、assert.isOk(value, [message])のことで、
assert.isOk('everything', 'everything is ok');
assert.isOk(false, 'this will fail');

//assert.isAtLeast()とは、assert.isAtLeast(actual, expected, [message])のことで、
assert.isAtLeast(5, 2, '5 is greater or equal to 2');
assert.isAtLeast(3, 3, '3 is greater or equal to 3');

//assert.isNotNull()とは、assert.isNotNull(value, [message])のことで、
var tea = 'tasty chai';
assert.isNotNull(tea, 'great, time for tea!');

.isUndefined(