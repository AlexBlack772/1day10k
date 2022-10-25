pragma solidity ^0.8.13;

interface IERC721Receiver {
   function onERC721Received(
      address operator,
      address from,
      uint256 tokenId,
      bytes calldata data
   ) external returns (bytes4);
}

contract UniswapV3Liquidity is IERC721Receiver {
   IERC20 private constant dai = IERC20(DAI);
    IWETH private constant weth = IWETH(WETH);

    int24 private constant MIN_TICK = -887272;
    int24 private constant MAX_TICK = -MIN_TICK;
    int24 private constant TICK_SPACING = 60;

    INonfungiblePositionManager public nonfungiblePositionManager =
        INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);

   function onERC721Received(
      address operator,
      address from,
      uint256 tokenId,
      bytes calldata data
   ) external override returns (bytes4) {
      return this.onERC721Received.selector;
   }
   
   function mintNewPosition(uint amount) public {
      uint256 deadline = block.timestamp + 60;
      uint256 amountTokenDesired = amount;
      uint256 amountTokenMin = 0;
      uint256 amountETHMin = 0;
      address to = address(this);
      uint256 tokenId = 0;
      INonfungiblePositionManager.MintParams memory params =
         INonfungiblePositionManager.MintParams({
            token0: address(dai),
            token1: address(weth),
            fee: 3000,
            tickLower: MIN_TICK,
            tickUpper: MAX_TICK,
            amount0Desired: amountTokenDesired,
            amount1Desired: 0,
            amount0Min: amountTokenMin,
            amount1Min: amountETHMin,
            recipient: to,
            deadline: deadline
         });
      tokenId = nonfungiblePositionManager.mint(params);
   }

   function collectAllFees(uint tokenId) public {
      INonfungiblePositionManager.CollectParams memory params =
         INonfungiblePositionManager.CollectParams({
            tokenId: tokenId,
            recipient: address(this),
            amount0Max: type(uint128).max,
            amount1Max: type(uint128).max
         });
      nonfungiblePositionManager.collect(params);
   }

   function increaseLiquidityCurrentRange(
      uint tokenId,
      uint amountTokenDesired,
      uint amountETHDesired
   ) public {
      INonfungiblePositionManager.IncreaseLiquidityParams memory params =
         INonfungiblePositionManager.IncreaseLiquidityParams({
            tokenId: tokenId,
            amount0Desired: amountTokenDesired,
            amount1Desired: amountETHDesired,
            amount0Min: 0,
            amount1Min: 0,
            deadline: block.timestamp + 60
         });
      nonfungiblePositionManager.increaseLiquidity(params);
   }

   function decreaseLiquidityCurrentRange(
      uint tokenId,
      uint amountTokenDesired,
      uint amountETHDesired
   ) public {
      INonfungiblePositionManager.DecreaseLiquidityParams memory params =
         INonfungiblePositionManager.DecreaseLiquidityParams({
            tokenId: tokenId,
            liquidity: 0,
            amount0Min: amountTokenDesired,
            amount1Min: amountETHDesired,
            deadline: block.timestamp + 60
         });
      nonfungiblePositionManager.decreaseLiquidity(params);
   }
}

interface INonfungiblePositionManager {
   struct MintParams {
      address token0;
      address token1;
      uint24 fee;
      int24 tickLower;
      int24 tickUpper;
      uint256 amount0Desired;
      uint256 amount1Desired;
      uint256 amount0Min;
      uint256 amount1Min;
      address recipient;
      uint256 deadline;
   }

   function mint(MintParams calldata params)
      external
      returns (uint256 tokenId);

   struct IncreaseLiquidityParams {
      uint256 tokenId;
      uint128 liquidity;
      uint256 amount0Desired;
      uint256 amount1Desired;
      uint256 amount0Min;
      uint256 amount1Min;
      uint256 deadline;
   }

   function increaseLiquidity(IncreaseLiquidityParams calldata params)
      external
      returns (uint128 liquidity);

   struct DecreaseLiquidityParams {
      uint256 tokenId;
      uint128 liquidity;
      uint256 amount0Min;
      uint256 amount1Min;
      uint256 deadline;
   }

   function decreaseLiquidity(DecreaseLiquidityParams calldata params)
      external
      returns (uint256 amount0, uint256 amount1);

   struct CollectParams {
      uint256 tokenId;
      address recipient;
      uint128 amount0Max;
      uint128 amount1Max;
   }

   function collect(CollectParams calldata params) 
   external 
   returns (uint256 amount0, uint256 amount1);
}

interface IERC20 {
   function totalSupply() external view returns (uint256);

   function balanceOf(address account) external view returns (uint256);

   function transfer(address recipient, uint256 amount)
      external
      returns (bool);

   function allowance(address owner, address spender)

      external
      view
      returns (uint256);

   function approve(address spender, uint256 amount) external returns (bool);

   function transferFrom(
      address sender,
      address recipient,
      uint256 amount
   ) external returns (bool);

   event Transfer(address indexed from, address indexed to, uint256 value);
   event Approval(
      address indexed owner,
      address indexed spender,
      uint256 value
   );

}

interface IWETH is IERC20 {
   function deposit() external payable;

   function withdraw(uint256) external;
}
