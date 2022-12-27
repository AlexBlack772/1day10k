pragma solidity ^0.8.13;

contract CSAMM {
   IERC20 public token0;
   IERC20 public token1;

   uint public reserve0;
   uint public reserve1;

   uint public totalSupply;
   mapping(address => uint) public balanceOf;

   constructor(
      address _token0,
      address _token1,
      uint _reserve0,
      uint _reserve1
   ) {
      token0 = IERC20(_token0);
      token1 = IERC20(_token1);
      reserve0 = _reserve0;
      reserve1 = _reserve1;
   }

   function _mint(address _to, uint _amount) internal {
      totalSupply += _amount;
      balanceOf[_to] += _amount;
   }

   function _burn(address _from, uint _amount) internal {
      totalSupply -= _amount;
      balanceOf[_from] -= _amount;
   }

   function _update(uint _reserve0, uint _reserve1) internal {
      reserve0 = _reserve0;
      reserve1 = _reserve1;
   }

   function _swap(
      uint _amount0Out,
      uint _amount1Out,
      address _to
   ) internal {
      uint balance0 = token0.balanceOf(address(this));
      uint balance1 = token1.balanceOf(address(this));
      require(balance0 >= _amount0Out, "Insufficient token0 balance");
      require(balance1 >= _amount1Out, "Insufficient token1 balance");
      _safeTransfer(token0, _to, _amount0Out);
      _safeTransfer(token1, _to, _amount1Out);
      _update(balance0 - _amount0Out, balance1 - _amount1Out);
   }

   function addLiquidty(uint _amount0Desired, uint _amount1Desired) external {
      uint amount0;
      uint amount1;
      if (totalSupply == 0) {
         amount0 = _amount0Desired;
         amount1 = _amount1Desired;
         _mint(msg.sender, _amount0Desired);
      } else {
         amount0 = _amount0Desired * reserve0 / totalSupply;
         amount1 = _amount1Desired * reserve1 / totalSupply;
      }
      _safeTransferFrom(token0, msg.sender, address(this), amount0);
      _safeTransferFrom(token1, msg.sender, address(this), amount1);
      _update(reserve0 + amount0, reserve1 + amount1);
   }
}

interface IERC20 {
   function totalSupply() external view returns (uint);
   function balanceOf(address _owner) external view returns (uint);
   function transfer(address _to, uint _value) external returns (bool);
   function allowance(address _owner, address _spender) external view returns (uint);
   function approve(address _spender, uint _value) external returns (bool);
   function transferFrom(address _from, address _to, uint _value) external returns (bool);
}