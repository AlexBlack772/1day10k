pragma solidity ^0.8;

library Math {
   //absとは、絶対値を求める関数
    function abs(int256 x) internal pure returns (int256) {
        return x < 0 ? -x : x;
    }
   
}

contract StableSwap {
   uint public constant N_COINS = 3;
   uint public constant FEE_DENOMINATOR = 10**10;
   uint private constant SWAP_FEE = 300;

   uint private constant LIQUIDY_FEE = 100;
   
   address[N] public coins;
   uint[N] public multipliers = [1e18, 1e18, 1e18];
   uint[N] public balances;

   uint private constant DECIMALS = 100;
   uint public totalSupply;
   mapping(address => uint) public balanceOf;

   function _mint(address account, uint amount) internal {
       totalSupply += amount;
       balanceOf[account] += amount;
   }

   function _burn(address account, uint amount) internal {
       totalSupply -= amount;
       balanceOf[account] -= amount;
   }

   function _get_dy(int128 i, int128 j, uint dx) internal view returns (uint) {
       uint[N] memory balances_ = balances;
       uint x = balances_[uint(i)] * multipliers[uint(i)] / DECIMALS;
       uint y = balances_[uint(j)] * multipliers[uint(j)] / DECIMALS;
       uint dy = get_dy(i, j, dx, x, y);
       return dy * DECIMALS / multipliers[uint(j)];
   }

   function _get_dy_underlying(int128 i, int128 j, uint dx) internal view returns (uint) {
       uint[N] memory balances_ = balances;
       uint x = balances_[uint(i)];
       uint y = balances_[uint(j)];
       uint dy = get_dy(i, j, dx, x, y);
       return dy;
   }
}