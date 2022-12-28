pragma solidity ^0.8.13;

//CPAMMとは、CPAMMコントラクトです。
contract CPAMM {
   IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint public reserve0;
    uint public reserve1;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    //constructorとは、コンストラクタです。
      constructor(IERC20 _token0, IERC20 _token1) {
         token0 = _token0;
         token1 = _token1;
      }

      //mintとは、トークンを発行する関数です。
      function mint(uint _amount0, uint _amount1) external {
         require(_amount0 > 0 && _amount1 > 0, "Invalid input");

         uint _totalSupply = totalSupply;
         if (_totalSupply == 0) {
            reserve0 = _amount0;
            reserve1 = _amount1;
            totalSupply = _amount0;
            balanceOf[msg.sender] = _amount0;
            token0.transferFrom(msg.sender, address(this), _amount0);
            token1.transferFrom(msg.sender, address(this), _amount1);
         } else {
            uint _balance0 = _amount0 * _totalSupply / reserve0;
            uint _balance1 = _amount1 * _totalSupply / reserve1;
            require(_balance0 == _balance1, "Invalid input");

            reserve0 += _amount0;
            reserve1 += _amount1;
            totalSupply += _balance0;
            balanceOf[msg.sender] += _balance0;
            token0.transferFrom(msg.sender, address(this), _amount0);
            token1.transferFrom(msg.sender, address(this), _amount1);
         }
      }
      //burnとは、トークンを破棄する関数です。
      function burn(uint _amount) external {
         require(_amount > 0, "Invalid input");

         uint _totalSupply = totalSupply;
         uint _balance = balanceOf[msg.sender];
         require(_balance >= _amount, "Invalid input");

         uint _amount0 = _amount * reserve0 / _totalSupply;
         uint _amount1 = _amount * reserve1 / _totalSupply;
         require(_amount0 > 0 && _amount1 > 0, "Invalid input");

         reserve0 -= _amount0;
         reserve1 -= _amount1;
         totalSupply -= _amount;
         balanceOf[msg.sender] -= _amount;
         token0.transfer(msg.sender, _amount0);
         token1.transfer(msg.sender, _amount1);
      }
      //updateとは、リザーブを更新する関数です。
      function update() external {
         uint _balance0 = token0.balanceOf(address(this));
         uint _balance1 = token1.balanceOf(address(this));
         require(_balance0 > 0 && _balance1 > 0, "Invalid input");

         reserve0 = _balance0;
         reserve1 = _balance1;
      }
      //swapとは、トークンを交換する関数です。
      function swap(uint _amount0, uint _amount1) external {
         require(_amount0 > 0 && _amount1 > 0, "Invalid input");

         uint _balance0 = token0.balanceOf(address(this));
         uint _balance1 = token1.balanceOf(address(this));
         require(_balance0 > 0 && _balance1 > 0, "Invalid input");

         uint _reserve0 = reserve0;
         uint _reserve1 = reserve1;
         uint _balance0After = _balance0 + _amount0;
         uint _balance1After = _balance1 + _amount1;
         require(
            _balance0After * _balance1After >= _reserve0 * _reserve1,
            "Invalid input"
         );

         reserve0 = _balance0After;
         reserve1 = _balance1After;
         token0.transfer(msg.sender, _amount0);
         token1.transfer(msg.sender, _amount1);
      }
      //addLiquidityとは、リクイジットを追加する関数です。
      function addLiquidity(uint _amount0, uint _amount1) external {
         require(_amount0 > 0 && _amount1 > 0, "Invalid input");

         uint _balance0 = token0.balanceOf(address(this));
         uint _balance1 = token1.balanceOf(address(this));
         require(_balance0 > 0 && _balance1 > 0, "Invalid input");

         uint _reserve0 = reserve0;
         uint _reserve1 = reserve1;
         uint _balance0After = _balance0 + _amount0;
         uint _balance1After = _balance1 + _amount1;
         require(
            _balance0After * _balance1After >= _reserve0 * _reserve1,
            "Invalid input"
         );

         uint _totalSupply = totalSupply;
         uint _balance = _balance0After * _balance1After / _reserve0 / _reserve1;
         if (_totalSupply == 0) {
            totalSupply = _balance;
            balanceOf[msg.sender] = _balance;
         } else {
            uint _balanceOf = balanceOf[msg.sender];
            uint _balanceAfter = _balanceOf * _balance / _totalSupply;
            require(_balanceAfter > _balanceOf, "Invalid input");

            totalSupply = _balance;
            balanceOf[msg.sender] = _balanceAfter;
         }

         reserve0 = _balance0After;
         reserve1 = _balance1After;
         token0.transfer(msg.sender, _amount0);
         token1.transfer(msg.sender, _amount1);
      }
      //removeLiquidityとは、リクイジットを破棄する関数です。
      function removeLiquidity(uint _amount) external {
         require(_amount > 0, "Invalid input");

         uint _balance = balanceOf[msg.sender];
         require(_balance >= _amount, "Invalid input");

         uint _balance0 = token0.balanceOf(address(this));
         uint _balance1 = token1.balanceOf(address(this));
         require(_balance0 > 0 && _balance1 > 0, "Invalid input");

         uint _reserve0 = reserve0;
         uint _reserve1 = reserve1;
         uint _amount0 = _amount * _balance0 / _reserve0;
         uint _amount1 = _amount * _balance1 / _reserve1;
         require(_amount0 > 0 && _amount1 > 0, "Invalid input");

         reserve0 = _balance0 - _amount0;
         reserve1 = _balance1 - _amount1;
         totalSupply -= _amount;
         balanceOf[msg.sender] -= _amount;
         token0.transfer(msg.sender, _amount0);
         token1.transfer(msg.sender, _amount1);
      }
      //sqrtとは、平方根を計算する関数です。
      function sqrt(uint _x) internal pure returns (uint) {
         uint _z = (_x + 1) / 2;
         uint _y = _x;
         while (_z < _y) {
            _y = _z;
            _z = (_x / _z + _z) / 2;
         }
         return _y;
      }
      //minとは、最小値を計算する関数です。
      function min(uint _x, uint _y) internal pure returns (uint) {
         return _x < _y ? _x : _y;
      }

}

interface IERC20 {
   //totalSupplyとは、トークンの総発行量を返す関数です。
   function totalSupply() external view returns (uint);
   //balanceOfとは、指定したアドレスの残高を返す関数です。
   function balanceOf(address _owner) external view returns (uint);
   //transferとは、指定したアドレスにトークンを送金する関数です。
   function transfer(address _to, uint _value) external returns (bool);
   //transferFromとは、指定したアドレスからトークンを送金する関数です。
   function transferFrom(
      address _from,
      address _to,
      uint _value
   ) external returns (bool);
   //approveとは、指定したアドレスにトークンを送金することを許可する関数です。
   function approve(address _spender, uint _value) external returns (bool);
   //allowanceとは、指定したアドレスに送金することを許可されているトークンの量を返す関数です。
   function allowance(address _owner, address _spender)
      external
      view
      returns (uint);
      
}