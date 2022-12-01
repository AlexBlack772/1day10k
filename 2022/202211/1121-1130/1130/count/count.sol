pragma solidity ^0.8.0;

contract Count {
    uint256 public count = 0;

    function increment() public {
        count += 1;
    }

      function decrement() public {
         count -= 1;
      }

      function reset() public {
         count = 0;
      }

      function set(uint256 _count) public {
         count = _count;
      }

      function get() public view returns (uint256) {
         return count;
      }

      function add(uint256 _count) public {
         count += _count;
      }

      function sub(uint256 _count) public {
         count -= _count;
      }

      function mul(uint256 _count) public {
         count *= _count;
      }

      function div(uint256 _count) public {
         count /= _count;
      }

      function mod(uint256 _count) public {
         count %= _count;
      }

      
}