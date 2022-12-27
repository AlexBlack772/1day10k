//文字列を変数定義
string public name = "MyToken";
//2つの文字列を連結
string public symbol = "MT";
//小数点以下の桁数
uint8 public decimals = 18;
//文字列の配列化する関数
function stringToBytes32(string memory source) public pure returns (bytes32 result) {
    assembly {
        result := mload(add(source, 32))
    }
}
//文字列の抽出
function bytes32ToString(bytes32 x) public pure returns (string memory) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
        byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (uint j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
}
//引数を２倍にする関数
function double(uint256 _value) public pure returns (uint256) {
    return _value * 2;
}

//引数文字列の文字数を返す関数
function length(string memory _value) public pure returns (uint256) {
    bytes memory bytesString = bytes(_value);
    return bytesString.length;
}
//引数の文字数を判定する関数
function isEven(string memory _value) public pure returns (bool) {
    bytes memory bytesString = bytes(_value);
    return bytesString.length % 2 == 0;
}
//引数の文字列を逆順にする関数
function reverse(string memory _value) public pure returns (string memory) {
    bytes memory bytesString = bytes(_value);
    bytes memory bytesStringRev = new bytes(bytesString.length);
    for (uint i = 0; i < bytesString.length; i++) {
        bytesStringRev[i] = bytesString[bytesString.length - i - 1];
    }
    return string(bytesStringRev);
}
//引数の文字列を大文字にする関数
function toUpper(string memory _value) public pure returns (string memory) {
    bytes memory bytesString = bytes(_value);
    bytes memory bytesStringUpper = new bytes(bytesString.length);
    for (uint i = 0; i < bytesString.length; i++) {
        if ((uint8(bytesString[i]) >= 97) && (uint8(bytesString[i]) <= 122)) {
            bytesStringUpper[i] = bytes1(uint8(bytesString[i]) - 32);
        } else {
            bytesStringUpper[i] = bytesString[i];
        }
    }
    return string(bytesStringUpper);
}
//引数の最後の文字を消す関数
function removeLast(string memory _value) public pure returns (string memory) {
    bytes memory bytesString = bytes(_value);
    bytes memory bytesStringRev = new bytes(bytesString.length - 1);
    for (uint i = 0; i < bytesString.length - 1; i++) {
        bytesStringRev[i] = bytesString[i];
    }
    return string(bytesStringRev);
}
//trueとfalseを逆にする関数
function not(bool _value) public pure returns (bool) {
    return !_value;
}
//空のオブジェクト定義
struct EmptyStruct {}
//空のオブジェクトを返す関数
function getEmptyStruct() public pure returns (EmptyStruct memory) {
    return EmptyStruct();
}
//オブジェクトのプロパティの値を取得
function getEmptyStructProperty() public pure returns (uint256) {
    return getEmptyStruct().value;
}
//空の配列定義
uint256[] public emptyArray;
//オブジェクトのプロパティの値を変更
function setEmptyArrayProperty(uint256 _value) public {
    emptyArray.push(_value);
}
//配列の２番目の要素をログ出力する
function getEmptyArrayProperty() public view returns (uint256) {
    return emptyArray[1];
}
//空のマップ定義
mapping(uint256 => uint256) public emptyMap;
//マップの値を変更
function setEmptyMapProperty(uint256 _key, uint256 _value) public {
    emptyMap[_key] = _value;
}
//マップの値を取得
function getEmptyMapProperty(uint256 _key) public view returns (uint256) {
    return emptyMap[_key];
}
//require関数
function requireTest(uint256 _value) public pure {
    require(_value > 10, "value is less than 10");
}
//配列の最初に文字列要素を追加
function push(string memory _value) public pure returns (string[] memory) {
    string[] memory array = new string[](0);
    array.push(_value);
    return array;
}
//配列の最初の要素を削除する
function shift(string[] memory _array) public pure returns (string[] memory) {
    for (uint i = 0; i < _array.length - 1; i++) {
        _array[i] = _array[i + 1];
    }
    delete _array[_array.length - 1];
    return _array;
}
//配列からミカンのindexを取得する
function indexOf(string[] memory _array, string memory _value) public pure returns (int256) {
    for (uint i = 0; i < _array.length; i++) {
        if (keccak256(bytes(_array[i])) == keccak256(bytes(_value))) {
            return int256(i);
        }
    }
    return -1;
}
//配列の最後に文字列要素を追加
function unshift(string memory _value) public pure returns (string[] memory) {
    string[] memory array = new string[](0);
    array.unshift(_value);
    return array;
}
//配列の最後の要素を削除する
function pop(string[] memory _array) public pure returns (string[] memory) {
    delete _array[_array.length - 1];
    return _array;
}
//配列のそれぞれの要素をログ出力する
function logArray(string[] memory _array) public pure {
    for (uint i = 0; i < _array.length; i++) {
        log(_array[i]);
    }
}
//配列の要素数を取得する
function length(string[] memory _array) public pure returns (uint256) {
    return _array.length;
}
//配列の要素数を判定する
function isEven(string[] memory _array) public pure returns (bool) {
    return _array.length % 2 == 0;
}
//配列の要素を逆順にする
function reverse(string[] memory _array) public pure returns (string[] memory) {
    string[] memory arrayRev = new string[](_array.length);
    for (uint i = 0; i < _array.length; i++) {
        arrayRev[i] = _array[_array.length - i - 1];
    }
    return arrayRev;
}
//配列の要素を大文字にする
function toUpper(string[] memory _array) public pure returns (string[] memory) {
    string[] memory arrayUpper = new string[](_array.length);
    for (uint i = 0; i < _array.length; i++) {
        arrayUpper[i] = toUpper(_array[i]);
    }
    return arrayUpper;
}
//文字列コード順に並べ替える
function sort(string[] memory _array) public pure returns (string[] memory) {
    for (uint i = 0; i < _array.length; i++) {
        for (uint j = i + 1; j < _array.length; j++) {
            if (keccak256(bytes(_array[i])) > keccak256(bytes(_array[j]))) {
                string memory tmp = _array[i];
                _array[i] = _array[j];
                _array[j] = tmp;
            }
        }
    }
    return _array;
}
//配列の要素を結合する
function join(string[] memory _array, string memory _separator) public pure returns (string memory) {
    string memory result = "";
    for (uint i = 0; i < _array.length; i++) {
        result = string(abi.encodePacked(result, _array[i]));
        if (i < _array.length - 1) {
            result = string(abi.encodePacked(result, _separator));
        }
    }
    return result;
}
//配列を逆順にする
function reverseArray(string[] memory _array) public pure returns (string[] memory) {
    string[] memory arrayRev = new string[](_array.length);
    for (uint i = 0; i < _array.length; i++) {
        arrayRev[i] = _array[_array.length - i - 1];
    }
    return arrayRev;
}
//配列の要素を大文字にする
function toUpperArray(string[] memory _array) public pure returns (string[] memory) {
    string[] memory arrayUpper = new string[](_array.length);
    for (uint i = 0; i < _array.length; i++) {
        arrayUpper[i] = toUpper(_array[i]);
    }
    return arrayUpper;
}
//昇順ソートする
function sortArray(string[] memory _array) public pure returns (string[] memory) {
    for (uint i = 0; i < _array.length; i++) {
        for (uint j = i + 1; j < _array.length; j++) {
            if (keccak256(bytes(_array[i])) > keccak256(bytes(_array[j]))) {
                string memory tmp = _array[i];
                _array[i] = _array[j];
                _array[j] = tmp;
            }
        }
    }
    return _array;
}
//配列の要素を結合する
function joinArray(string[] memory _array, string memory _separator) public pure returns (string memory) {
    string memory result = "";
    for (uint i = 0; i < _array.length; i++) {
        result = string(abi.encodePacked(result, _array[i]));
        if (i < _array.length - 1) {
            result = string(abi.encodePacked(result, _separator));
        }
    }
    return result;
}
//スプレッド構文を使って配列を結合する
function concatArray(string[] memory _array1, string[] memory _array2) public pure returns (string[] memory) {
    string[] memory array = new string[](_array1.length + _array2.length);
    for (uint i = 0; i < _array1.length; i++) {
        array[i] = _array1[i];
    }
    for (uint i = 0; i < _array2.length; i++) {
        array[_array1.length + i] = _array2[i];
    }
    return array;
}
//配列オブジェクト定義
struct Array {
    string[] array;
}
//modifier関数を使う
modifier onlyOwner() {
    require(msg.sender == owner, "only owner");
    _;
}
//modifierで制限をする
function setOwner(address _owner) public onlyOwner {
    owner = _owner;
}
//配列オブジェクト定義する
struct Array {
    string[] array;
}
//配列オブジェクトを作成する
Array[] public arrays;
//interfaceを使う
interface IArray {
    function getArray() external view returns (string[] memory);
}
//配列オブジェクト絞り込み取得する
function getArray(uint _index) public view returns (string[] memory) {
    return arrays[_index].array;
}
//配列オブジェクトから特定のオブジェクトを取得する
function getArray(uint _index, uint _index2) public view returns (string memory) {
    return arrays[_index].array[_index2];
}
//配列オブジェクトのマージ
function mergeArray(uint _index1, uint _index2) public {
    Array memory array = Array(concatArray(arrays[_index1].array, arrays[_index2].array));
    arrays.push(array);
}
//配列の値の分割代入
function splitArray(uint _index, uint _index2) public {
    (string memory a, string memory b) = (arrays[_index].array[_index2], arrays[_index].array[_index2 + 1]);
}
//アラート
function alert(string memory _message) public {
    alert(_message);
}
//boolean型を定義
bool public isTrue = true;
//型エイリアス
type MyString is string;
//型エイリアスを使う
MyString public myString = "Hello";
//関数型
function() external payable {
    //何もしない
}
//payableを使う
function deposit() public payable {
    //何もしない
}
//参照透過性
function add(uint _a, uint _b) public pure returns (uint) {
    return _a + _b;
}
//非破壊的push
function pushArray(string memory _value) public {
    arrays.push(Array(new string[](0)));
    arrays[arrays.length - 1].array.push(_value);
}
//非破壊的pop
function popArray() public {
    arrays[arrays.length - 1].array.pop();
}
//非破壊的shift
function shiftArray() public {
    arrays[arrays.length - 1].array.shift();
}
//非破壊的unshift
function unshiftArray(string memory _value) public {
    arrays[arrays.length - 1].array.unshift(_value);
}
//非破壊的splice
function spliceArray(uint _index, uint _count) public {
    arrays[arrays.length - 1].array.splice(_index, _count);
}
//mapを利用する
function mapArray() public {
    arrays[arrays.length - 1].array.map(toUpper);
}
//filterを利用する
function filterArray() public {
    arrays[arrays.length - 1].array.filter(isEven);
}
//reduceを利用する
function reduceArray() public {
    arrays[arrays.length - 1].array.reduce(add);
}
//配列の最小値
function minArray() public view returns (string memory) {
    return arrays[arrays.length - 1].array.min();
}
//配列の最大値
function maxArray() public view returns (string memory) {
    return arrays[arrays.length - 1].array.max();
}
//配列の合計値
function sumArray() public view returns (string memory) {
    return arrays[arrays.length - 1].array.sum();
}
//配列の平均値
function avgArray() public view returns (string memory) {
    return arrays[arrays.length - 1].array.avg();
}
//配列の要素数
function countArray() public view returns (uint) {
    return arrays[arrays.length - 1].array.count();
}
//文字列の長さを返す関数
function length(string memory _value) public pure returns (uint) {
    return bytes(_value).length;
}
//文字列を繰り返してn文字目まで
function repeat(string memory _value, uint _count) public pure returns (string memory) {
    string memory result = "";
    for (uint i = 0; i < _count; i++) {
        result = string(abi.encodePacked(result, _value));
    }
    return result;
}
//数値を繰り返し足した値
function repeat(uint _value, uint _count) public pure returns (uint) {
    uint result = 0;
    for (uint i = 0; i < _count; i++) {
        result += _value;
    }
    return result;
}
//整数の桁数
function digit(uint _value) public pure returns (uint) {
    uint result = 0;
    while (_value > 0) {
        _value /= 10;
        result++;
    }
    return result;
}
//整数の階乗
function factorial(uint _value) public pure returns (uint) {
    uint result = 1;
    for (uint i = 1; i <= _value; i++) {
        result *= i;
    }
    return result;
}
//整数の約数
function divisor(uint _value) public pure returns (uint[] memory) {
    uint[] memory result = new uint[](0);
    for (uint i = 1; i <= _value; i++) {
        if (_value % i == 0) {
            result.push(i);
        }
    }
    return result;
}
//整数の素因数分解
function primeFactorization(uint _value) public pure returns (uint[] memory) {
    uint[] memory result = new uint[](0);
    for (uint i = 2; i <= _value; i++) {
        while (_value % i == 0) {
            result.push(i);
            _value /= i;
        }
    }
    return result;
}
//整数の最大公約数
function gcd(uint _a, uint _b) public pure returns (uint) {
    while (_b > 0) {
        uint r = _a % _b;
        _a = _b;
        _b = r;
    }
    return _a;
}
//整数の最小公倍数
function lcm(uint _a, uint _b) public pure returns (uint) {
    return _a * _b / gcd(_a, _b);
}
//整数の累乗
function pow(uint _value, uint _count) public pure returns (uint) {
    uint result = 1;
    for (uint i = 0; i < _count; i++) {
        result *= _value;
    }
    return result;
}
//整数の平方根
function sqrt(uint _value) public pure returns (uint) {
    uint result = 0;
    uint bit = 1 << 254;
    while (bit > _value) {
        bit >>= 2;
    }
    while (bit != 0) {
        if (_value >= result + bit) {
            _value -= result + bit;
            result = (result >> 1) + bit;
        } else {
            result >>= 1;
        }
        bit >>= 2;
    }
    return result;
}
//整数の立っているビット数
function bitCount(uint _value) public pure returns (uint) {
    uint result = 0;
    while (_value > 0) {
        if (_value & 1 == 1) {
            result++;
        }
        _value >>= 1;
    }
    return result;
}
//整数のビット反転
function bitReverse(uint _value) public pure returns (uint) {
    uint result = 0;
    while (_value > 0) {
        result <<= 1;
        result += _value & 1;
        _value >>= 1;
    }
    return result;
}
//数値列挙1~100
function range() public pure returns (uint[] memory) {
    uint[] memory result = new uint[](100);
    for (uint i = 0; i < 100; i++) {
        result[i] = i + 1;
    }
    return result;
}
//指定行から指定行までの配列の和
function sum(uint[] memory _array, uint _start, uint _end) public pure returns (uint) {
    uint result = 0;
    for (uint i = _start; i <= _end; i++) {
        result += _array[i];
    }
    return result;
}
//指定行から指定行までの配列の平均値
function avg(uint[] memory _array, uint _start, uint _end) public pure returns (uint) {
    uint result = 0;
    for (uint i = _start; i <= _end; i++) {
        result += _array[i];
    }
    return result / (_end - _start + 1);
}
//fizzbuzz
function fizzbuzz(uint _value) public pure returns (string memory) {
    if (_value % 15 == 0) {
        return "FizzBuzz";
    } else if (_value % 3 == 0) {
        return "Fizz";
    } else if (_value % 5 == 0) {
        return "Buzz";
    } else {
        return uint2str(_value);
    }
}
//２次元配列の指定要素を返す関数
function getArray(uint _index) public view returns (uint[] memory) {
    return arrays[_index].array;
}
//二次元配列の和
function sum2D(uint _index) public view returns (uint) {
    uint result = 0;
    for (uint i = 0; i < arrays[_index].array.length; i++) {
        result += arrays[_index].array[i];
    }
    return result;
}
//二次元配列の平均値
function avg2D(uint _index) public view returns (uint) {
    uint result = 0;
    for (uint i = 0; i < arrays[_index].array.length; i++) {
        result += arrays[_index].array[i];
    }
    return result / arrays[_index].array.length;
}
//二次元配列の最大値
function max2D(uint _index) public view returns (uint) {
    uint result = 0;
    for (uint i = 0; i < arrays[_index].array.length; i++) {
        if (result < arrays[_index].array[i]) {
            result = arrays[_index].array[i];
        }
    }
    return result;
}
//二次元配列の各行の和
function sum2DRow(uint _index) public view returns (uint[] memory) {
    uint[] memory result = new uint[](arrays[_index].array.length);
    for (uint i = 0; i < arrays[_index].array.length; i++) {
        result[i] = arrays[_index].array[i];
    }
    return result;
}
//配列の要素比較
function compare(uint[] memory _array1, uint[] memory _array2) public pure returns (bool) {
    if (_array1.length != _array2.length) {
        return false;
    }
    for (uint i = 0; i < _array1.length; i++) {
        if (_array1[i] != _array2[i]) {
            return false;
        }
    }
    return true;
}
//文字列の比較
function compare(string memory _str1, string memory _str2) public pure returns (bool) {
    return keccak256(abi.encodePacked(_str1)) == keccak256(abi.encodePacked(_str2));
}
//文字列の連結
function concat(string memory _str1, string memory _str2) public pure returns (string memory) {
    return string(abi.encodePacked(_str1, _str2));
}
//シングルバイト文字列の文字数
function length(string memory _str) public pure returns (uint) {
    return bytes(_str).length;
}
//文字列の指定文字数目の文字
function charAt(string memory _str, uint _index) public pure returns (string memory) {
    bytes memory strBytes = bytes(_str);
    bytes memory result = new bytes(1);
    result[0] = strBytes[_index];
    return string(result);
}
//文字列の指定文字数目の文字コード
function charCodeAt(string memory _str, uint _index) public pure returns (uint) {
    bytes memory strBytes = bytes(_str);
    return uint(strBytes[_index]);
}
//回文判定
function isPalindrome(string memory _str) public pure returns (bool) {
    bytes memory strBytes = bytes(_str);
    for (uint i = 0; i < strBytes.length / 2; i++) {
        if (strBytes[i] != strBytes[strBytes.length - i - 1]) {
            return false;
        }
    }
    return true;
}
//文字列が含まれているか
function contains(string memory _str, string memory _value) public pure returns (bool) {
    bytes memory strBytes = bytes(_str);
    bytes memory valueBytes = bytes(_value);
    for (uint i = 0; i < strBytes.length - valueBytes.length + 1; i++) {
        bool flag = true;
        for (uint j = 0; j < valueBytes.length; j++) {
            if (strBytes[i + j] != valueBytes[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            return true;
        }
    }
    return false;
}
//形式判定　バランス
function isBalance(string memory _str) public pure returns (bool) {
    bytes memory strBytes = bytes(_str);
    uint count = 0;
    for (uint i = 0; i < strBytes.length; i++) {
        if (strBytes[i] == 0x28) {
            count++;
        } else if (strBytes[i] == 0x29) {
            count--;
        }
    }
    return count == 0;
}
//２つの真偽値の論理積
function and(bool _value1, bool _value2) public pure returns (bool) {
    return _value1 && _value2;
}
//２つの真偽値の論理和
function or(bool _value1, bool _value2) public pure returns (bool) {
    return _value1 || _value2;
}
//真偽値の否定
function not(bool _value) public pure returns (bool) {
    return !_value;
}
//２つの真偽値の排他的論理和
function xor(bool _value1, bool _value2) public pure returns (bool) {
    return _value1 != _value2;
}
//２つの真偽値の排他的論理和
function nand(bool _value1, bool _value2) public pure returns (bool) {
    return !(_value1 && _value2);
}
//２つの真偽値の排他的論理和
function nor(bool _value1, bool _value2) public pure returns (bool) {
    return !(_value1 || _value2);
}
//数の総和
function sum(uint[] memory _array) public pure returns (uint) {
    uint result = 0;
    for (uint i = 0; i < _array.length; i++) {
        result += _array[i];
    }
    return result;
}
//数の平均
function average(uint[] memory _array) public pure returns (uint) {
    uint result = 0;
    for (uint i = 0; i < _array.length; i++) {
        result += _array[i];
    }
    return result / _array.length;
}
//文字列配列を並べる
function sort(string[] memory _array) public pure returns (string[] memory) {
    for (uint i = 0; i < _array.length - 1; i++) {
        for (uint j = i + 1; j < _array.length; j++) {
            if (compare(_array[i], _array[j])) {
                string memory tmp = _array[i];
                _array[i] = _array[j];
                _array[j] = tmp;
            }
        }
    }
    return _array;
}
//購入後の所持金
function afterPurchase(uint _value) public payable returns (uint) {
    return msg.value - _value;
}
//２つの配列の重複した数値
function intersection(uint[] memory _array1, uint[] memory _array2) public pure returns (uint[] memory) {
    uint[] memory result = new uint[](_array1.length);
    uint count = 0;
    for (uint i = 0; i < _array1.length; i++) {
        for (uint j = 0; j < _array2.length; j++) {
            if (_array1[i] == _array2[j]) {
                result[count] = _array1[i];
                count++;
                break;
            }
        }
    }
    uint[] memory result2 = new uint[](count);
    for (uint i = 0; i < count; i++) {
        result2[i] = result[i];
    }
    return result2;
}
//２つの配列の重複しない数値
function difference(uint[] memory _array1, uint[] memory _array2) public pure returns (uint[] memory) {
    uint[] memory result = new uint[](_array1.length);
    uint count = 0;
    for (uint i = 0; i < _array1.length; i++) {
        bool flag = true;
        for (uint j = 0; j < _array2.length; j++) {
            if (_array1[i] == _array2[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            result[count] = _array1[i];
            count++;
        }
    }
    uint[] memory result2 = new uint[](count);
    for (uint i = 0; i < count; i++) {
        result2[i] = result[i];
    }
    return result2;
}
//２つの配列の和集合
function union(uint[] memory _array1, uint[] memory _array2) public pure returns (uint[] memory) {
    uint[] memory result = new uint[](_array1.length + _array2.length);
    uint count = 0;
    for (uint i = 0; i < _array1.length; i++) {
        result[count] = _array1[i];
        count++;
    }
    for (uint i = 0; i < _array2.length; i++) {
        bool flag = true;
        for (uint j = 0; j < _array1.length; j++) {
            if (_array2[i] == _array1[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            result[count] = _array2[i];
            count++;
        }
    }
    uint[] memory result2 = new uint[](count);
    for (uint i = 0; i < count; i++) {
        result2[i] = result[i];
    }
    return result2;
}
//整数の反転
function reverse(uint _value) public pure returns (uint) {
    uint result = 0;
    while (_value > 0) {
        result = result * 10 + _value % 10;
        _value /= 10;
    }
    return result;
}
//文字列の反転
function reverse(string memory _value) public pure returns (string memory) {
    bytes memory result = bytes(_value);
    for (uint i = 0; i < result.length / 2; i++) {
        byte tmp = result[i];
        result[i] = result[result.length - i - 1];
        result[result.length - i - 1] = tmp;
    }
    return string(result);
}
//数値配列の中央値
function median(uint[] memory _array) public pure returns (uint) {
    uint[] memory array = sort(_array);
    if (array.length % 2 == 0) {
        return (array[array.length / 2 - 1] + array[array.length / 2]) / 2;
    } else {
        return array[array.length / 2];
    }
}
//数値配列の最頻値
function mode(uint[] memory _array) public pure returns (uint) {
    uint[] memory array = sort(_array);
    uint count = 1;
    uint maxCount = 1;
    uint result = array[0];
    for (uint i = 1; i < array.length; i++) {
        if (array[i] == array[i - 1]) {
            count++;
        } else {
            count = 1;
        }
        if (count > maxCount) {
            maxCount = count;
            result = array[i];
        }
    }
    return result;
}
//数値配列の最大値
function max(uint[] memory _array) public pure returns (uint) {
    uint result = _array[0];
    for (uint i = 1; i < _array.length; i++) {
        if (result < _array[i]) {
            result = _array[i];
        }
    }
    return result;
}
//重複する文字列の削除
function removeDuplicate(string[] memory _array) public pure returns (string[] memory) {
    string[] memory result = new string[](_array.length);
    uint count = 0;
    for (uint i = 0; i < _array.length; i++) {
        bool flag = true;
        for (uint j = 0; j < i; j++) {
            if (compare(_array[i], _array[j])) {
                flag = false;
                break;
            }
        }
        if (flag) {
            result[count] = _array[i];
            count++;
        }
    }
    string[] memory result2 = new string[](count);
    for (uint i = 0; i < count; i++) {
        result2[i] = result[i];
    }
    return result2;
}
//2つの合計値がyになる全ての計算式の数
function countAllCombinations(uint[] memory _array, uint _y) public pure returns (uint) {
    uint count = 0;
    for (uint i = 0; i < 2 ** _array.length; i++) {
        uint sum = 0;
        for (uint j = 0; j < _array.length; j++) {
            if (i & (2 ** j) > 0) {
                sum += _array[j];
            }
        }
        if (sum == _y) {
            count++;
        }
    }
    return count;
}
//3つの合計値がyになる全ての計算式の数
function countAllCombinations(uint[] memory _array, uint _y, uint _z) public pure returns (uint) {
    uint count = 0;
    for (uint i = 0; i < 2 ** _array.length; i++) {
        uint sum = 0;
        for (uint j = 0; j < _array.length; j++) {
            if (i & (2 ** j) > 0) {
                sum += _array[j];
            }
        }
        if (sum == _y || sum == _z) {
            count++;
        }
    }
    return count;
}
//公倍数
function lcm(uint _x, uint _y) public pure returns (uint) {
    return _x * _y / gcd(_x, _y);
}
//公約数
function gcd(uint _x, uint _y) public pure returns (uint) {
    if (_x < _y) {
        return gcd(_y, _x);
    }
    if (_y == 0) {
        return _x;
    }
    return gcd(_y, _x % _y);
}
//素数判定
function isPrime(uint _value) public pure returns (bool) {
    if (_value == 2) {
        return true;
    }
    if (_value < 2 || _value % 2 == 0) {
        return false;
    }
    for (uint i = 3; i * i <= _value; i += 2) {
        if (_value % i == 0) {
            return false;
        }
    }
    return true;
}
//素因数分解
function primeFactorization(uint _value) public pure returns (uint[] memory) {
    uint[] memory result = new uint[](0);
    for (uint i = 2; i * i <= _value; i++) {
        while (_value % i == 0) {
            result = push(result, i);
            _value /= i;
        }
    }
    if (_value > 1) {
        result = push(result, _value);
    }
    return result;
}
//階乗
function factorial(uint _value) public pure returns (uint) {
    uint result = 1;
    for (uint i = 2; i <= _value; i++) {
        result *= i;
    }
    return result;
}
//順列
function permutation(uint _n, uint _r) public pure returns (uint) {
    uint result = 1;
    for (uint i = _n; i > _n - _r; i--) {
        result *= i;
    }
    return result;
}
//組み合わせ
function combination(uint _n, uint _r) public pure returns (uint) {
    return permutation(_n, _r) / factorial(_r);
}
//2つの配列の積集合
function intersection(string[] memory _array1, string[] memory _array2) public pure returns (string[] memory) {
    string[] memory result = new string[](0);
    for (uint i = 0; i < _array1.length; i++) {
        for (uint j = 0; j < _array2.length; j++) {
            if (compare(_array1[i], _array2[j])) {
                result = push(result, _array1[i]);
                break;
            }
        }
    }
    return result;
}
//配列から選ぶ組み合わせ
function combination(string[] memory _array, uint _r) public pure returns (string[][] memory) {
    string[][] memory result = new string[][](combination(_array.length, _r));
    uint count = 0;
    for (uint i = 0; i < 2 ** _array.length; i++) {
        string[] memory temp = new string[](_r);
        uint index = 0;
        for (uint j = 0; j < _array.length; j++) {
            if (i & (2 ** j) > 0) {
                temp[index] = _array[j];
                index++;
            }
        }
        if (index == _r) {
            result[count] = temp;
            count++;
        }
    }
    return result;
}
//配列から選ぶ順列
function permutation(string[] memory _array, uint _r) public pure returns (string[][] memory) {
    string[][] memory result = new string[][](permutation(_array.length, _r));
    uint count = 0;
    for (uint i = 0; i < 2 ** _array.length; i++) {
        string[] memory temp = new string[](_r);
        uint index = 0;
        for (uint j = 0; j < _array.length; j++) {
            if (i & (2 ** j) > 0) {
                temp[index] = _array[j];
                index++;
            }
        }
        if (index == _r) {
            result[count] = temp;
            count++;
        }
    }
    return result;
}
//配列から同じ数値を選ぶ組み合わせ
function combinationWithSameNumber(string[] memory _array, uint _r) public pure returns (string[][] memory) {
    string[][] memory result = new string[][](combination(_array.length + _r - 1, _r));
    uint count = 0;
    for (uint i = 0; i < 2 ** _array.length; i++) {
        string[] memory temp = new string[](_r);
        uint index = 0;
        for (uint j = 0; j < _array.length; j++) {
            if (i & (2 ** j) > 0) {
                temp[index] = _array[j];
                index++;
            }
        }
        if (index == _r) {
            result[count] = temp;
            count++;
        }
    }
    return result;
}
//サイコロの出目の総和
function diceSum(uint _n, uint _x, uint _y) public pure returns (uint) {
    uint count = 0;
    for (uint i = _x; i <= _y; i++) {
        count += combination(_n, i);
    }
    return count;
}
//参加費用の比較
function compare(string memory _x, string memory _y) public pure returns (bool) {
    bytes memory x = bytes(_x);
    bytes memory y = bytes(_y);
    if (x.length != y.length) {
        return false;
    }
    for (uint i = 0; i < x.length; i++) {
        if (x[i] != y[i]) {
            return false;
        }
    }
    return true;
}
//参加費用の比較
function compare(string[] memory _x, string[] memory _y) public pure returns (bool) {
    if (_x.length != _y.length) {
        return false;
    }
    for (uint i = 0; i < _x.length; i++) {
        if (!compare(_x[i], _y[i])) {
            return false;
        }
    }
    return true;
}
//２で割り切れる回数
function countDivisibleBy2(uint _value) public pure returns (uint) {
    uint count = 0;
    while (_value % 2 == 0) {
        count++;
        _value /= 2;
    }
    return count;
}
//奇数か偶数か
function isEven(uint _value) public pure returns (bool) {
    return _value % 2 == 0;
}
//最大公約数
function gcd(uint _x, uint _y) public pure returns (uint) {
    if (_x < _y) {
        return gcd(_y, _x);
    }
    if (_y == 0) {
        return _x;
    }
    return gcd(_y, _x % _y);
}
//最小公倍数
function lcm(uint _x, uint _y) public pure returns (uint) {
    return _x * _y / gcd(_x, _y);
}
//乗数
function multiple(uint _x, uint _y) public pure returns (uint) {
    return _x * _y;
}
//2つの積の最大値
function maxMultiple(uint _x, uint _y) public pure returns (uint) {
    return _x * _y;
}
//フィボナッチ数列
function fibonacci(uint _n) public pure returns (uint) {
    if (_n == 0) {
        return 0;
    }
    if (_n == 1) {
        return 1;
    }
    return fibonacci(_n - 1) + fibonacci(_n - 2);
}
//リニアサーチ
function linearSearch(uint[] memory _array, uint _value) public pure returns (uint) {
    for (uint i = 0; i < _array.length; i++) {
        if (_array[i] == _value) {
            return i;
        }
    }
    return _array.length;
}
//バイナリサーチ
function binarySearch(uint[] memory _array, uint _value) public pure returns (uint) {
    uint left = 0;
    uint right = _array.length;
    while (left < right) {
        uint mid = (left + right) / 2;
        if (_array[mid] == _value) {
            return mid;
        }
        if (_array[mid] < _value) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return _array.length;
}
//バブルソート
function bubbleSort(uint[] memory _array) public pure returns (uint[] memory) {
    for (uint i = 0; i < _array.length; i++) {
        for (uint j = _array.length - 1; j > i; j--) {
            if (_array[j] < _array[j - 1]) {
                uint temp = _array[j];
                _array[j] = _array[j - 1];
                _array[j - 1] = temp;
            }
        }
    }
    return _array;
}
//選択ソート
function selectionSort(uint[] memory _array) public pure returns (uint[] memory) {
    for (uint i = 0; i < _array.length; i++) {
        uint min = i;
        for (uint j = i + 1; j < _array.length; j++) {
            if (_array[j] < _array[min]) {
                min = j;
            }
        }
        uint temp = _array[i];
        _array[i] = _array[min];
        _array[min] = temp;
    }
    return _array;
}
//挿入ソート
function insertionSort(uint[] memory _array) public pure returns (uint[] memory) {
    for (uint i = 1; i < _array.length; i++) {
        uint temp = _array[i];
        uint j = i;
        while (j > 0 && _array[j - 1] > temp) {
            _array[j] = _array[j - 1];
            j--;
        }
        _array[j] = temp;
    }
    return _array;
}
//マージソート
function mergeSort(uint[] memory _array) public pure returns (uint[] memory) {
    if (_array.length <= 1) {
        return _array;
    }
    uint mid = _array.length / 2;
    uint[] memory left = new uint[](mid);
    uint[] memory right = new uint[](_array.length - mid);
    for (uint i = 0; i < mid; i++) {
        left[i] = _array[i];
    }
    for (uint i = mid; i < _array.length; i++) {
        right[i - mid] = _array[i];
    }
    return merge(mergeSort(left), mergeSort(right));
}
//ハッピー数の判定
function isHappyNumber(uint _value) public pure returns (bool) {
    uint sum = 0;
    uint count = 0;
    while (sum != 1) {
        sum = 0;
        while (_value > 0) {
            sum += (_value % 10) * (_value % 10);
            _value /= 10;
        }
        _value = sum;
        count++;
        if (count > 100) {
            return false;
        }
    }
    return true;
}
//素数の判定
function isPrimeNumber(uint _value) public pure returns (bool) {
    if (_value == 1) {
        return false;
    }
    for (uint i = 2; i * i <= _value; i++) {
        if (_value % i == 0) {
            return false;
        }
    }
    return true;
}
//2進数のn桁目
function getNthBit(uint _value, uint _n) public pure returns (uint) {
    return (_value >> _n) & 1;
}
//2進数を10進数に変換
function binaryToDecimal(uint _value) public pure returns (uint) {
    uint decimal = 0;
    uint n = 0;
    while (_value > 0) {
        decimal += (_value % 10) * (2 ** n);
        _value /= 10;
        n++;
    }
    return decimal;
}
//10進数を2進数に変換
function decimalToBinary(uint _value) public pure returns (uint) {
    uint binary = 0;
    uint n = 0;
    while (_value > 0) {
        binary += (_value % 2) * (10 ** n);
        _value /= 2;
        n++;
    }
    return binary;
}
//2進数の桁数
function getBinaryLength(uint _value) public pure returns (uint) {
    uint length = 0;
    while (_value > 0) {
        _value /= 10;
        length++;
    }
    return length;
}
//2進数の反転
function reverseBinary(uint _value) public pure returns (uint) {
    uint binary = 0;
    uint n = getBinaryLength(_value);
    while (_value > 0) {
        binary += (_value % 10) * (10 ** (n - 1));
        _value /= 10;
        n--;
    }
    return binary;
}
//最小値と最大値
function getMinAndMax(uint[] memory _array) public pure returns (uint, uint) {
    uint min = _array[0];
    uint max = _array[0];
    for (uint i = 1; i < _array.length; i++) {
        if (_array[i] < min) {
            min = _array[i];
        }
        if (_array[i] > max) {
            max = _array[i];
        }
    }
    return (min, max);
}
//最小値
function getMin(uint[] memory _array) public pure returns (uint) {
    uint min = _array[0];
    for (uint i = 1; i < _array.length; i++) {
        if (_array[i] < min) {
            min = _array[i];
        }
    }
    return min;
}
//最大値
function getMax(uint[] memory _array) public pure returns (uint) {
    uint max = _array[0];
    for (uint i = 1; i < _array.length; i++) {
        if (_array[i] > max) {
            max = _array[i];
        }
    }
    return max;
}
//最小値のインデックス
function getMinIndex(uint[] memory _array) public pure returns (uint) {
    uint min = _array[0];
    uint index = 0;
    for (uint i = 1; i < _array.length; i++) {
        if (_array[i] < min) {
            min = _array[i];
            index = i;
        }
    }
    return index;
}
//最大値のインデックス
function getMaxIndex(uint[] memory _array) public pure returns (uint) {
    uint max = _array[0];
    uint index = 0;
    for (uint i = 1; i < _array.length; i++) {
        if (_array[i] > max) {
            max = _array[i];
            index = i;
        }
    }
    return index;
}
//2進数のn桁
function getNthBit(uint _value, uint _n) public pure returns (uint) {
    return (_value >> _n) & 1;
}
//2進数のn桁目を1にする
function setNthBit(uint _value, uint _n) public pure returns (uint) {
    return _value | (1 << _n);
}
//確認アラート
function alert(string memory _message) public pure {
    require(false, _message);
}
