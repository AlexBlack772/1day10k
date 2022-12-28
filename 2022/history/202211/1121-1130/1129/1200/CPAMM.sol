pragma solidity ^0.8.13;

contract CPAMM {
   IERC20 public immutable token0;
   IERC20 public immutable token1;

   uint public reserve0;
   uint public reserve1;

   uint public totalSupply;

   mapping(address => uint) public balanceOf;


   constructor(address _token0, address _token1) {
       token0 = IERC20(_token0);
       token1 = IERC20(_token1);
   }

   function _mint(address to, uint amount0, uint amount1) external {
       balanceOf[to] += amount;
       totalSupply += amount;
   }

   function _burn(address from, uint amount) external {
       balanceOf[from] -= _amount;
       totalSupply -= _amount;
   }

   function _update(uint _reserve0, uint _reserve1) private {
       reserve0 = _reserve0;
       reserve1 = _reserve1;
   }

   function swap(address _tokenIn, uint _amountIn) external returns (uint amountOut) {
      require(
            _tokenIn == address(token0) || _tokenIn == address(token1),
            "invalid token"
        );
        require(_amountIn > 0, "amount in = 0")

        bool isToken0 = _tokenIn == address(token0);
         (IERC20 tokenIn, IERC tokenOut, uint reserveIn, uint reserveOut) = isToken0 
         ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

            tokenIn.transferFrom(msg.sender, address(this), _amountIn);

   }

   function addLiquidity(uint _amount0, uint _amount1) external {
       require(_amount0 > 0 && _amount1 > 0, "amount = 0");

       uint amount0 = _amount0;
       uint amount1 = _amount1;

       uint liquidity = 0;
       if (totalSupply == 0) {
           liquidity = Math.sqrt(amount0 * amount1);
           totalSupply = liquidity;
       } else {
           liquidity = Math.min(
               (amount0 * totalSupply) / reserve0,
               (amount1 * totalSupply) / reserve1
           );
       }

       balanceOf[msg.sender] += liquidity;
       _update(reserve0 + amount0, reserve1 + amount1);

       token0.transferFrom(msg.sender, address(this), amount0);
       token1.transferFrom(msg.sender, address(this), amount1);
   }

}