pragma solidity ^0.8.13;

//CPAMMとは、CPAMM
contract CPAMM {
   IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint public reserve0;
    uint public reserve1;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    //constructorとは、コンストラクタ
      constructor(IERC20 _token0, IERC20 _token1) {
         token0 = _token0;
         token1 = _token1;
      }

      //mintとは、トークンを発行する関数
      function mint(uint amount0, uint amount1) external {
         require(amount0 > 0, "CPAMM: amount0 is 0");
         require(amount1 > 0, "CPAMM: amount1 is 0");
         require(
            token0.transferFrom(msg.sender, address(this), amount0),
            "CPAMM: transfer0 failed"
         );
         require(
            token1.transferFrom(msg.sender, address(this), amount1),
            "CPAMM: transfer1 failed"
         );
         uint liquidity = totalSupply == 0
            ? amount0 * amount1
            : (amount0 * totalSupply) / reserve0 + (amount1 * totalSupply) / reserve1;
         totalSupply += liquidity;
         balanceOf[msg.sender] += liquidity;
         reserve0 += amount0;
         reserve1 += amount1;
      }

      //burnとは、トークンを破棄する関数
      function burn(uint liquidity) external {
         require(liquidity > 0, "CPAMM: liquidity is 0");
         require(
            balanceOf[msg.sender] >= liquidity,
            "CPAMM: balance too low"
         );
         uint amount0 = (liquidity * reserve0) / totalSupply;
         uint amount1 = (liquidity * reserve1) / totalSupply;
         require(amount0 > 0, "CPAMM: amount0 is 0");
         require(amount1 > 0, "CPAMM: amount1 is 0");
         totalSupply -= liquidity;
         balanceOf[msg.sender] -= liquidity;
         reserve0 -= amount0;
         reserve1 -= amount1;
         require(
            token0.transfer(msg.sender, amount0),
            "CPAMM: transfer0 failed"
         );
         require(
            token1.transfer(msg.sender, amount1),
            "CPAMM: transfer1 failed"
         );
      }

      //updateとは、リザーブを更新する関数
      function update(uint amount0, uint amount1) external {
         require(amount0 > 0, "CPAMM: amount0 is 0");
         require(amount1 > 0, "CPAMM: amount1 is 0");
         require(
            token0.transferFrom(msg.sender, address(this), amount0),
            "CPAMM: transfer0 failed"
         );
         require(
            token1.transferFrom(msg.sender, address(this), amount1),
            "CPAMM: transfer1 failed"
         );
         reserve0 += amount0;
         reserve1 += amount1;
      }
      //swapとは、トークンを交換する関数
      function swap(uint amount0, uint amount1) external {
         require(amount0 > 0, "CPAMM: amount0 is 0");
         require(amount1 > 0, "CPAMM: amount1 is 0");
         require(
            token0.transferFrom(msg.sender, address(this), amount0),
            "CPAMM: transfer0 failed"
         );
         require(
            token1.transferFrom(msg.sender, address(this), amount1),
            "CPAMM: transfer1 failed"
         );
         uint liquidity = totalSupply == 0
            ? amount0 * amount1
            : (amount0 * totalSupply) / reserve0 + (amount1 * totalSupply) / reserve1;
         totalSupply += liquidity;
         balanceOf[msg.sender] += liquidity;
         reserve0 += amount0;
         reserve1 += amount1;
      }
      //addLiquidityとは、リザーブを追加する関数
      function addLiquidity(uint amount0, uint amount1) external {
         require(amount0 > 0, "CPAMM: amount0 is 0");
         require(amount1 > 0, "CPAMM: amount1 is 0");
         require(
            token0.transferFrom(msg.sender, address(this), amount0),
            "CPAMM: transfer0 failed"
         );
         require(
            token1.transferFrom(msg.sender, address(this), amount1),
            "CPAMM: transfer1 failed"
         );
         uint liquidity = totalSupply == 0
            ? amount0 * amount1
            : (amount0 * totalSupply) / reserve0 + (amount1 * totalSupply) / reserve1;
         totalSupply += liquidity;
         balanceOf[msg.sender] += liquidity;
         reserve0 += amount0;
         reserve1 += amount1;
      }
      //removeLiquidityとは、リザーブを削除する関数
      function removeLiquidity(uint liquidity) external {
         require(liquidity > 0, "CPAMM: liquidity is 0");
         require(
            balanceOf[msg.sender] >= liquidity,
            "CPAMM: balance too low"
         );
         uint amount0 = (liquidity * reserve0) / totalSupply;
         uint amount1 = (liquidity * reserve1) / totalSupply;
         require(amount0 > 0, "CPAMM: amount0 is 0");
         require(amount1 > 0, "CPAMM: amount1 is 0");
         totalSupply -= liquidity;
         balanceOf[msg.sender] -= liquidity;
         reserve0 -= amount0;
         reserve1 -= amount1;
         require(
            token0.transfer(msg.sender, amount0),
            "CPAMM: transfer0 failed"
         );
         require(
            token1.transfer(msg.sender, amount1),
            "CPAMM: transfer1 failed"
         );
      }
      //sqrtとは、平方根を求める関数
      function sqrt(uint x) internal pure returns (uint y) {
         uint z = (x + 1) / 2;
         y = x;
         while (z < y) {
            y = z;
            z = (x / z + z) / 2;
         }
      }
      //minとは、最小値を求める関数
      function min(uint x, uint y) internal pure returns (uint z) {
         z = x < y ? x : y;
      }

}