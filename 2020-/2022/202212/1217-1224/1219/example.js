Array.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

Array.bind('change', function (ev, attr, how, newVals, oldVals) {
      console.log('Array changed!');
}
)

test.filter(function (item) {
      return item % 2 === 0;
}
)

test.bind('change', function (ev, attr, how, newVals, oldVals) {
      console.log('test changed!');
}
)

test.sort(function (a, b) {
      return a - b;
}
)

test.bind('change', function (ev, attr, how, newVals, oldVals) {
      console.log('test changed!');
}
)

