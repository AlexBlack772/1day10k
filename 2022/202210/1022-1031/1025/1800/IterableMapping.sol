pragma solidity ^0.8.13;

library IterableMapping {
    // Iterable mapping from address to uint;
    struct Map {
        address[] keys;
        mapping(address => uint) values;
        mapping(address => uint) indexOf;
        mapping(address => bool) inserted;
    }

    function get(Map storage map, address key) public view returns (uint) {
        return map.values[key];
    }

    function getKeyAtIndex(Map storage map, uint index) public view returns (address) {
        return map.keys[index];
    }

    function size(Map storage map) public view returns (uint) {
        return map.keys.length;
    }

    function set(Map storage map, address key, uint val) public {
        if (map.inserted[key]) {
            map.values[key] = val;
        } else {
            map.inserted[key] = true;
            map.values[key] = val;
            map.indexOf[key] = map.keys.length;
            map.keys.push(key);
        }
    }

    function remove(Map storage map, address key) public {
        if (!map.inserted[key]) {
            return;
        }

        delete map.inserted[key];
        delete map.values[key];

        uint index = map.indexOf[key];
        uint lastIndex = map.keys.length - 1;
        address lastKey = map.keys[lastIndex];

        map.keys[index] = lastKey;
        map.indexOf[lastKey] = index;
        map.keys.pop();
    }
}
   
contract TestIterableMapping {
    IterableMapping.Map private map;

    function test() public {
        map.set(address(0), 1);
        map.set(address(1), 2);
        map.set(address(2), 3);

        assert(map.size() == 3);
        assert(map.get(address(0)) == 1);
        assert(map.get(address(1)) == 2);
        assert(map.get(address(2)) == 3);

        map.remove(address(1));

        assert(map.size() == 2);
        assert(map.get(address(0)) == 1);
        assert(map.get(address(1)) == 0);
        assert(map.get(address(2)) == 3);

        map.set(address(1), 4);

        assert(map.size() == 3);
        assert(map.get(address(0)) == 1);
        assert(map.get(address(1)) == 4);
        assert(map.get(address(2)) == 3);
    }
}
    IterableMapping.Map private map;

    function test() public {
        map.set(address(0), 1);
        map.set(address(1), 2);
        map.set(address(2), 3);

        assert(map.size() == 3);
        assert(map.get(address(0)) == 1);
        assert(map.get(address(1)) == 2);
        assert(map.get(address(2)) == 3);

        map.remove(address(1));

        assert(map.size() == 2);
        assert(map.get(address(0)) == 1);
        assert(map.get(address(1)) == 0);
        assert(map.get(address(2)) == 3);

        map.set(address(1), 4);

        assert(map.size() == 3);
        assert(map.get(address(0)) == 1);
        assert(map.get(address(1)) == 4);
        assert(map.get(address(2)) == 3);
    }
}