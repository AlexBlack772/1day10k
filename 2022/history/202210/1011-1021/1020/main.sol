//2つの文字列を連結する関数
function concat(string memory _str1, string memory _str2) public pure returns (string memory) {
    bytes memory _bytes1 = bytes(_str1);
    bytes memory _bytes2 = bytes(_str2);
    string memory _tmpValue = new string(_bytes1.length + _bytes2.length);
    bytes memory _newValue = bytes(_tmpValue);
    uint i;
    uint j;
    for (i = 0; i < _bytes1.length; i++) {
        _newValue[j++] = _bytes1[i];
    }
    for (i = 0; i < _bytes2.length; i++) {
        _newValue[j++] = _bytes2[i];
    }
    return string(_newValue);
}
//配列の最小値を返す関数
function min(uint[] memory _array) public pure returns (uint) {
    uint _min = _array[0];
    for (uint i = 1; i < _array.length; i++) {
        if (_min > _array[i]) {
            _min = _array[i];
        }
    }
    return _min;
}
//配列の最大値を返す関数
function max(uint[] memory _array) public pure returns (uint) {
    uint _max = _array[0];
    for (uint i = 1; i < _array.length; i++) {
        if (_max < _array[i]) {
            _max = _array[i];
        }
    }
    return _max;
}
//配列の合計値を返す関数
function sum(uint[] memory _array) public pure returns (uint) {
    uint _sum = 0;
    for (uint i = 0; i < _array.length; i++) {
        _sum += _array[i];
    }
    return _sum;
}
//配列の平均値を返す関数
function avg(uint[] memory _array) public pure returns (uint) {
    return sum(_array) / _array.length;
}
//配列の中央値を返す関数
function median(uint[] memory _array) public pure returns (uint) {
    uint[] memory _sortedArray = sort(_array);
    if (_sortedArray.length % 2 == 0) {
        return (_sortedArray[_sortedArray.length / 2 - 1] + _sortedArray[_sortedArray.length / 2]) / 2;
    } else {
        return _sortedArray[_sortedArray.length / 2];
    }
}
//配列の２番目に大きい値
function secondMax(uint[] memory _array) public pure returns (uint) {
    uint[] memory _sortedArray = sort(_array);
    return _sortedArray[_sortedArray.length - 2];
}
//文字列のn文字目
function nthChar(string memory _str, uint _n) public pure returns (string memory) {
    bytes memory _bytes = bytes(_str);
    require(_bytes.length >= _n, "String length is less than n");
    string memory _tmpValue = new string(1);
    bytes memory _newValue = bytes(_tmpValue);
    _newValue[0] = _bytes[_n - 1];
    return string(_newValue);
}
//文字列のn文字目からm文字目まで
function nthCharToMthChar(string memory _str, uint _n, uint _m) public pure returns (string memory) {
    bytes memory _bytes = bytes(_str);
    require(_bytes.length >= _m, "String length is less than m");
    string memory _tmpValue = new string(_m - _n + 1);
    bytes memory _newValue = bytes(_tmpValue);
    for (uint i = _n - 1; i < _m; i++) {
        _newValue[i - _n + 1] = _bytes[i];
    }
    return string(_newValue);
}
//配列のソート
function sort(uint[] memory _array) public pure returns (uint[] memory) {
    uint[] memory _sortedArray = _array;
    for (uint i = 0; i < _sortedArray.length - 1; i++) {
        for (uint j = i + 1; j < _sortedArray.length; j++) {
            if (_sortedArray[i] > _sortedArray[j]) {
                uint _tmp = _sortedArray[i];
                _sortedArray[i] = _sortedArray[j];
                _sortedArray[j] = _tmp;
            }
        }
    }
    return _sortedArray;
}
//配列の重複を削除
function unique(uint[] memory _array) public pure returns (uint[] memory) {
    uint[] memory _sortedArray = sort(_array);
    uint[] memory _uniqueArray = new uint[](_sortedArray.length);
    uint _uniqueArrayIndex = 0;
    _uniqueArray[_uniqueArrayIndex] = _sortedArray[0];
    for (uint i = 1; i < _sortedArray.length; i++) {
        if (_uniqueArray[_uniqueArrayIndex] != _sortedArray[i]) {
            _uniqueArrayIndex++;
            _uniqueArray[_uniqueArrayIndex] = _sortedArray[i];
        }
    }
    uint[] memory _resultArray = new uint[](_uniqueArrayIndex + 1);
    for (uint i = 0; i < _resultArray.length; i++) {
        _resultArray[i] = _uniqueArray[i];
    }
    return _resultArray;
}
//文字列を改行
function lineBreak(string memory _str, uint _n) public pure returns (string memory) {
    bytes memory _bytes = bytes(_str);
    uint _lineBreakCount = _bytes.length / _n;
    string memory _tmpValue = new string(_bytes.length + _lineBreakCount);
    bytes memory _newValue = bytes(_tmpValue);
    uint _newValueIndex = 0;
    for (uint i = 0; i < _bytes.length; i++) {
        if (i % _n == 0 && i != 0) {
            _newValue[_newValueIndex] = 0x0a;
            _newValueIndex++;
        }
        _newValue[_newValueIndex] = _bytes[i];
        _newValueIndex++;
    }
    return string(_newValue);
}
//文字列の長さ
function length(string memory _str) public pure returns (uint) {
    bytes memory _bytes = bytes(_str);
    return _bytes.length;
}
//1文字を繰り返して改行
function createTable(uint _length, uint _n, string memory _fillStr) public pure returns (string memory) {
    bytes memory _bytes = bytes(_fillStr);
    string memory _tempValue = new string(_length * _n);
    bytes memory _newValue = bytes(_tempValue);
    uint _index = 0;
    for (uint i = 0; i < _length; i++) {
        for (uint j = 0; j < _n; j++) {
            if (_n * i + j == _newValue.length - 1) {
                _newValue[_n * i + j] = 0x0a;
            } else {
                _newValue[_n * i + j] = _bytes[_index];
                _index++;
                if (_index == _bytes.length) {
                    _index = 0;
                }
            }
        }
    }
    return string(_newValue);
}
//ソート済み配列ならYes, そうでなければNoを返す
function isSorted(uint[] memory _array) public pure returns (string memory) {
    for (uint i = 0; i < _array.length - 1; i++) {
        if (_array[i] > _array[i + 1]) {
            return "No";
        }
    }
    return "Yes";
}
//配列の要素を逆にした配列を返す
function arrayReverse(uint[] memory _array) public pure returns (uint[] memory) {
    uint[] memory _reversedArray = new uint[](_array.length);
    for (uint i = 0; i < _array.length; i++) {
        _reversedArray[i] = _array[_array.length - i - 1];
    }
    return _reversedArray;
}
//２つの配列をつなげた配列を返す
function arrayConnect(uint[] memory _array, uint[] memory _array2) public pure returns (uint[] memory) {
    uint[] memory _array2Reverse = arrayReverse(_array2);
    uint[] memory _resultArray = new uint[](_array.length + _array2.length);
    uint _index = 0;
    for (uint i = 0; i < _array.length; i++) {
        _resultArray[i] = _array[i];
        _index = i;
    }
    _index++;
    for (uint i = 0; i < _array2Reverse.length; i++) {
        _resultArray[i + _index] = _array2Reverse[i];
    }
    return _resultArray;
}
//数値を繰り返し足した値
function sumTimes(uint _num, uint _count) public pure returns (uint) {
    uint _result = 0;
    for (uint i = 0; i < _count; i++) {
        _result += _num;
    }
    return _result;
}
//配列の個数をカウント
function countArray(uint[] memory _array, uint _num) public pure returns (uint) {
    uint _count = 0;
    for (uint i = 0; i < _array.length; i++) {
        if (_array[i] == _num) {
            _count++;
        }
    }
    return _count;
}
//配列Aと配列Bを比較し、あっていてかつないでもない中から重複した値を取り出した配列を返す
function arrayFindMatchAndNotMatch(uint[] memory _array, uint[] memory _array2) public pure returns (uint[] memory) {
    uint[] memory _resultArray = new uint[](0);
    uint _index = 0;
    for (uint i = 0; i < _array.length; i+=countArray(_array, _array[i])) {
        if (exist(_array2, _array[i]) && exist(_array, _array[i])) {
            if (countArray(_array, _array[i]) >= countArray(_array2, _array[i])) {
                for (uint j = 0; j < countArray(_array, _array[i]); j++) {
                    _resultArray.push(_array[i]);
                }
            } else {
                for (uint j = 0; j < countArray(_array2, _array[i]); j++) {
                    _resultArray.push(_array[i]);
                }
            }
        }
    }
    return _resultArray;
}
//aをbで除し、差の集合を返す
function arraySubtraction(uint[] memory _array, uint[] memory _array2) public pure returns (uint[] memory) {
    uint[] memory _resultArray = new uint[](0);
    for (uint i = 0; i < _array.length; i+=countArray(_array, _array[i])) {
        if (!exist(_array2, _array[i])) {
            for (uint j = 0; j < countArray(_array, _array[i]); j++) {
                _resultArray.push(_array[i]);
            }
        } else {
            if (countArray(_array, _array[i]) > countArray(_array2, _array[i])) {
                for (uint j = 0; j < countArray(_array, _array[i]) - countArray(_array2, _array[i]); j++) {
                    _resultArray.push(_array[i]);
                }
            }
        }
    }
    return _resultArray;
}
//配列Aと配列Bの和の集合を返す
function arrayAdd(uint[] memory _array, uint[] memory _array2) public pure returns (uint[] memory) {
    uint[] memory _resultArray = new uint[](0);
    for (uint i = 0; i < _array.length; i+=countArray(_array, _array[i])) {
        if (!exist(_array2, _array[i])) {
            for (uint j = 0; j < countArray(_array, _array[i]); j++) {
                _resultArray.push(_array[i]);
            }
        } else {
            if (countArray(_array, _array[i]) <= countArray(_array2, _array[i])) {
                for (uint j = 0; j < countArray(_array2, _array[i]); j++) {
                    _resultArray.push(_array[i]);
                }
            } else {
                for (uint j = 0; j < countArray(_array, _array[i]); j++) {
                    _resultArray.push(_array[i]);
                }
            }
        }
    }
    for (uint i = 0; i < _array2.length; i+=countArray(_array2, _array2[i])) {
        if (!exist(_array, _array2[i])) {
            for (uint j = 0; j < countArray(_array2, _array2[i]); j++) {
                _resultArray.push(_array2[i]);
            }
        }
    }
    return _resultArray;
}
//整数の桁数
function countPlace(uint _num) public pure returns (uint) {
    uint _count = 0;
    while (_num % 10 != _num) {
        _num /= 10;
        _count++;
    }
    if (_num == 0) {
        return _count;
    } else {
        return _count + 1;
    }
}
//全角を二倍文字数で数える
function countCharacter(string memory _str) public view returns (uint) {
    uint value;
    bytes memory bytesValue = bytes(_str);
    for (uint i = 0; i < bytesValue.length; i++) {
        value += 1;
        if(uint8(bytesValue[i]) > 128) {
            value += 1;
        }
    }
    return value;
}
//整数の階乗
function factorial(uint _num) public pure returns (uint) {
    uint _result = 1;
    for (uint i = 1; i <= _num; i++) {
        _result *= i;
    }
    return _result;
}
//数値の逆数
function inversionNumber(uint _num) public pure returns (uint) {
    return 1 / _num;
}
//整数同士のフィボナッチ数列
function fibonacciNumber(uint _startNum, uint _endNum) public pure returns (uint, uint, uint[100] memory) {
    uint[100] memory _resultArray = [1];
    uint _num = 0;
    while (true){
        _num += _resultArray[_num];
        if (_endNum == 0 && (_num > _startNum)) {
            return (_startNum + 1, _num, _resultArray);
        }
        if (_num > _startNum && _num < _endNum) {
            _resultArray[_startNum + 1] = _num;
            _startNum++;
        } else if (_num >= _endNum) {
            return (_startNum + 1, _endNum, _resultArray);
        } else {
            _resultArray[_resultArray.length - 1] = _num;
        }
    }
}
//文字列列挙a-z
function numberLetterList(bool _inverse) public pure returns (bytes memory) {
    if (_inverse) {
        bytes memory _byteArray = new bytes(
            uint('z'.charCodeAt(0)) - uint('a'.charCodeAt(0)) + 1
        );
        bytes stringRef = "a";
        for (uint i = 0; i < _byteArray.length; i++) {
            _byteArray[i] = stringRef[0];
            revert(stringRef);
            stringRef = bytes1(uint8(stringRef[0]) + 1);
        }
        return _byteArray;
    } else {
        bytes memory _byteArray = new bytes(
            uint('z'.charCodeAt(0)) - uint('a'.charCodeAt(0)) + 1
        );
        bytes stringRef = "z";
        for (uint i = _byteArray.length; i >= 0; i--) {
            _byteArray[i] = stringRef[0];
            stringRef = bytes1(uint8(stringRef[0]) - 1);
        }
        return _byteArray;
    }
}
//半角大文字を小文字へ変換する
function toLower(string memory _str) public pure returns (string memory) {
    bytes memory bytesString = bytes(_str);
    for (uint8 i = 0; i < bytesString.length; i++) {
        if ((bytesString[i] >= 'A') && (bytesString[i] <= 'Z')) {
            bytesString[i] = bytes1(uint8(bytesString[i]) + 32);
        }
    }
    return string(bytesString);
}
//fizzbuzz
function fizzbuzz(uint _num) public pure returns (string memory) {
    if (_num % 15 == 0) {
        return "FizzBuzz";
    } else if (_num % 3 == 0) {
        return "Fizz";
    } else if (_num % 5 == 0) {
        return "Buzz";
    } else {
        return uint2str(_num);
    }
}
//二次元配列の指定要素
function array2d(uint _num1, uint _num2, uint[100][100] memory _array) public pure returns (uint) {
    return _array[_num1][_num2];
}
//配列の指定要素
function array(uint _num, uint[] memory _array) public pure returns (uint) {
    return _array[_num];
}
//二次元配列の和
//または　array2dSum(array2d(num, num2, uintArray2d[100][100]), 0, 0);
function array2dSum(uint[100][100] memory _array, uint _num1, uint num2) public pure returns (uint _result) {
    for (uint i = 0; i < _num1; i++) {
        for (uint j = 0; j < num2; j++) {
            _result += _array[i][j];
        }
    }
}
//配列の要素比較
function arrayCompare(uint[] memory _array, uint[] memory _array2, bool _equal) public pure returns (bool){
    if (_equal) {
        if (_array.length != _array2.length) {
            return false;
        }
        for (uint i = 0; i < _array.length; i++) {
                if (_array[i] != _array2[i]) {
                    return false;
                }
            }
            return true;
    } else {
        uint _count = 0;
        if (_array.length != _array2.length) {
            return true;
        }
        for (uint i = 0; i < _array.length; i++) {
            for (uint j = 0; j < _array2.length; j++) {
                if (_array[i] == _array2[j]) {
                    _count++;
                }
                if (_count == _array2.length) {
                    return false;
                }
            }
        }
        return true;
    }
}
//配列の中身を順番に出力する
function arrayOutput(uint[] memory _array) public view {
    for (uint i = 0; i < _array.length; i++) {
        storageArray[i] = _array[i];
    }
    uintArray = i;
}
//頭文字を切り出す
function headCharacter(uint _stringPointer) public view returns (bytes memory) {
    return str.getBytes(_stringPointer, 1);
}
//数字を文字列へ変更int
function int2str(int _num) public pure returns (string memory) { //Solution
    int i = _num;
    uint _len;
    bytes memory _str;
    if (_num == 0) {
        _str = "0";
        return string(_str);
    } else if (_num < 0) {
        _len = uint(_num).stringLength() + 1;
        _str = bytes(new string(_len));
        _str[_len--] = '0';
        while (i != 0) {
            _str[_len--] = bytes1(uint8(48 - i % 10));
            i /= 10;
        }
        _str[0] = "-";
        return string(_str);
    } else {
        _len = _num.stringLength();
        _str = bytes(new string(_len));
        _str[_len--] = '0';
        while (i != 0) {
            _str[_len--] = bytes1(uint8(48 + i % 10));
            i /= 10;
        }
        return string(_str);
    }
}
//数字を文字列へ変更uint
function uint2str(uint _num) public pure returns (string memory _result) { //Solution
    if (_num == 0) {
        _result = "0";
    } else {
        while (_num != 0) {
            bytes memory chars = "0123456789";
            if (bytes(_result).length == 0) {
                _result = bytes1(chars[(_num % 10)]);
            } else {
                _result = bytes1(chars[(_num % 10)]) + _result;
            }
            _num = _num / 10;
        }
    }
}
//イニシャル名orアドレスの一部分取得
function extract(string memory _str, bool _initial, uint _startFromPrevEmpty, uint _endLength) public view returns (string memory) {
    uint _startIndex = _startFromPrevEmpty ? (str.indexOfNthWhiteSpace(_str, (_startFromPrevEmpty - 1) * 2) + 1): 0;
    uint _limitLength = uint(str.substring(_startIndex, _str.stringLength(), _str).indexOfWhiteSpace2(), 0);
    string memory stringRef = _initial ? _limitLength < _endLength + 1 ? _limitLength > 1 ? str.substring(_startIndex, _limitLength - 1, _str) : str.substring(_startIndex, _limitLength, _str) : str.substring(_startIndex, _endLength, _str) : _str;
    return stringRef;
}
//大文字を小文字に変換
function toLower(string memory _input) public pure returns (string memory) {
    bytes memory byteStr = bytes(_input);
    for (uint i = 0; i < byteStr.length; i++) {
        if (byteStr[i] >= "A"[0] && byteStr[i] <= "Z"[0]) {
            byteStr[i] = byte(uint8(byteStr[i]) + 32);
        }
    }
    return string(byteStr);
}
//文字列の現れ方の回数調べる
function subStrings(string memory _main, string memory _sub, bool _numMinus) private pure returns (uint counts) { 
    bytes memory _bytes = bytes(_main);
    bytes memory _byteLength = bytes(_sub);
    for (uint i = 0; i < _bytes.length; i++) {
        bool flag = true;
        for (uint j = 0; j < _byteLength.length; j++) {
            if (_bytes[i + j] != _byteLength[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            if (_numMinus) {
                counts--;
            } else {
                counts++;
            }
        }
    }
}
//文字列が含まれているかをチェック
function contains(string memory _x, string memory _y) public pure returns (bool) {
    return (bytes(_x).length + bytes(_y).length > bytes(string(abi.encodePacked(_x, _y))).length);
}
//require Error Message
function requireString(string memory _storageNum, uint[2] memory _uintArray , uint _uintLength, string memory _string) public pure {
    if (_uintLength > 0) {
        require(_uintArray.length == _uintLength, _string);
    } else {
        require(strEqual(_storageNum, "000000"), _string);
    }
}
//オブジェクトの大きさ
function sizeOf(address _contractAddress, uint _num) public pure returns (uint) {
    _contractAddress;
    _num;
    return (_num + (32 * 5)) * 32;
}
//指定した期間のうち、秘密鍵で署名されたものを含むブロック番号を返します。
// _uintBlocks : 直近のブロックから24倍かもしくは48倍する
function getNBlockBack(uint[] memory _uintBlocks) public pure returns (uint, uint, uint) {
    uint _length = _uintBlocks.length;
    require(_length > 0, "require an array containing least one element");
    uint _median;
    uint _deadBlock;
    for (uint i = 0; i < _length; i++) {
        if ((_uintBlocks[i] * 8000) <= block.timestamp && _deadBlock == 0) {
            _deadBlock = _uintBlocks[i];
        }
    }
    uint _fullBlock = 0;
    for (uint i = 0; i < _length; i++) {
        if (_deadBlock < _uintBlocks[i]) {
            _fullBlock++;
        }
    }
    _length % 2 == 1 ? _median = _uintBlocks[_length / 2] : _median = (_uintBlocks[(_length / 2) - 1] + _uintBlocks[_length / 2]) / 2;
    return (_fullBlock, _median, _deadBlock);
}
//２つの真偽値の論理積を返します。 第一引数が false の場合、
//第二引数は評価されません。これは、
//ゲート式で使用するための計算効率の向上を可能にします。
function and(bool _x, bool _y) internal pure returns (bool) {
    return _x ? _y : false; 
}
//2つの真偽ちの論理和
function or(bool _x, bool _y) internal pure returns (bool) {
    return _x ? true : _y; 
}
//真偽値を反転させる
function xor(bool _x, bool _y) internal pure returns (bool) { 
    return _x & (!_y) || (_x) & (!_y);
}
//キーの検証
function verify(address _address, string memory _functionName, string memory _key) public pure returns (bool) {
    bytes memory _bytes = toBytes(_key);
    for (uint i = 0; true; i += 64) {
        if (i + 64 > _bytes.length) {
            break;
        } else {
            bytes memory _byte = new bytes(32);
            assembly {
                let _data := add(_bytes, mul(0x20, i))
                for {let j := 0} lt(j, 32) {} {
                    mstore(add(_byte, mul(0x20, 1)), _data)
                }
            }
            bytes20 _key = ripemd160(abi.encodePacked(_address, _functionName, bytes20(_byte)));
            bytes memory _byte1 = new bytes(20);
            assembly {
                let _keyDataB := mload(_key)
                mstore(_byte1, and(_keyDataB, 0xffffffffffffffffffffffffffffffffffffffff))
            }
            for (uint j = 20; j < 30; j++) {
                _byte1[j] = _byte[j + 2];
            }
            if (!_byte1.strEqual(_byte1)) {
                return false;
            }
        }
    }
    return true;
}
//署名した内容を取得
function sign(string memory _data, string memory _signData, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
    require(bytes(_data).length > 0, "Data must not be empty string");
    bytes32 hash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:

32", keccak256(abi.encodePacked(_signData))));

      return ecrecover(hash, v, r, s);
   }
}
//文字列をバイトに変換
function toBytes(string memory _string) public pure returns (bytes memory) {
    bytes memory _bytes = bytes(_string);
    bytes memory _byte = new bytes(_bytes.length);
    for (uint i = 0; i < _bytes.length; i++) {
        _byte[i] = _bytes[i];
    }
    return _byte;
}
//2つの真偽値の否定論理積
function nand(bool _x, bool _y) internal pure returns (bool) {
    return !(_x ? _y : false);
}
//半加算器
function halfAdder(bool _x, bool _y) internal pure returns (bool, bool) {
    return (_x ^ _y, _x & _y);
}
//全加算器
function fullAdder(bool _x, bool _y, bool _c) internal pure returns (bool, bool) {
    bool _s;
    bool _c1;
    bool _c2;
    (_s, _c1) = halfAdder(_x, _y);
    (_s, _c2) = halfAdder(_s, _c);
    return (_s, _c1 | _c2);
}
//公倍数
function lcm(uint _x, uint _y) internal pure returns (uint) {
    return _x * _y / gcd(_x, _y);
}
//最大公約数
