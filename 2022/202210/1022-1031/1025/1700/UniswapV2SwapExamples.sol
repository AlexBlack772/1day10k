pragma solidity ^0.8.13;

contract UniswapV2SwapExamples {

   IUniswapV2Router private router = IUniswapV2Router(UNISWAP_V2_ROUTER);

   IERC20 private token0 = IERC20(WETH);
   IERC20 private token1 = IERC20(DAI);

   function swapSignleHopExactAmoutIn() public {
      uint amountIn = 1000;
      uint amountOutMin = 1;
      address[] memory path = new address[](2);
      path[0] = address(token0);
      path[1] = address(token1);

      token0.approve(address(router), amountIn);
      uint[] memory amounts = router.swapExactTokensForTokens(
         amountIn,
         amountOutMin,
         path,
         address(this),
         block.timestamp
      );
   }

   function swapMultiHopExactAmountIn() public {
      uint amountIn = 1000;
      uint amountOutMin = 1;
      address[] memory path = new address[](3);
      path[0] = address(token0);
      path[1] = address(WETH);
      path[2] = address(token1);

      token0.approve(address(router), amountIn);
      uint[] memory amounts = router.swapExactTokensForTokens(
         amountIn,
         amountOutMin,
         path,
         address(this),
         block.timestamp
      );
   }

   function swapSignleHopExactAmoutOut() public {
      uint amountOut = 1000;
      uint amountInMax = 1;
      address[] memory path = new address[](2);
      path[0] = address(token0);
      path[1] = address(token1);

      token0.approve(address(router), amountInMax);
      uint[] memory amounts = router.swapTokensForExactTokens(
         amountOut,
         amountInMax,
         path,
         address(this),
         block.timestamp
      );
   }

   function swapMultiHopExactAmountOut(
      uint amountOut,
      uint amountInMax,
      address[] memory path
   ) public {
      token0.approve(address(router), amountInMax);
      uint[] memory amounts = router.swapTokensForExactTokens(
         amountOut,
         amountInMax,
         path,
         address(this),
         block.timestamp
      );
   }
   
}

interface IUniswapV2Router {
   function swapExactTokensForTokens(
      uint amountIn,
      uint amountOutMin,
      address[] calldata path,
      address to,
      uint deadline
   ) external returns (uint[] memory amounts);

   function swapTokensForExactTokens(
      uint amountOut,
      uint amountInMax,
      address[] calldata path,
      address to,
      uint deadline
   ) external returns (uint[] memory amounts);
}

interface IERC20 {
   function totalSupply() external view returns (uint256);

   function balanceOf(address account) external view returns (uint256);

   function transfer(address recipient, uint256 amount) external returns (bool);

   function allowance(address owner, address spender) external view returns (uint256);

   function approve(address spender, uint amount) external returns (bool);

   function transferFrom(
      address sender,
      address recipient,
      uint256 amount
   ) external returns (bool);

   event Transfer(address indexed from, address indexed to, uint256 value);
   event Approval(address indexed owner, address indexed spender, uint256 value);

}

interface IWETH is IERC20 {
   function deposit() external payable;

   function withdraw(uint wad) external;
   
}