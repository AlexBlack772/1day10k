pragma solidity ^0.8.13;

address constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;


//IERC721Receiverとは、ERC721トークンを受け取るためのインターフェース
interface IERC721Receiver {
   //onERC721Receivedとは、ERC721トークンを受け取る関数
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

      //onERC721Receivedとは、ERC721トークンを受け取る関数
   function onERC721Received(
      address operator,
      address from,
      uint256 tokenId,
      bytes calldata data
   ) external override returns (bytes4) {
      return this.onERC721Received.selector;
   }

   //mintNewPositionとは、新しいポジションを作成する関数
   function mintNewPosition(
      address token0,
      address token1,
      uint24 fee,
      int24 tickLower,
      int24 tickUpper,
      uint256 amount0Desired,
      uint256 amount1Desired,
      uint256 amount0Min,
      uint256 amount1Min,
      uint256 deadline
   ) external {
      (uint256 amount0, uint256 amount1) =
         nonfungiblePositionManager.mint(
            INonfungiblePositionManager.MintParams({
               token0: token0,
               token1: token1,
               fee: fee,
               tickLower: tickLower,
               tickUpper: tickUpper,
               amount0Desired: amount0Desired,
               amount1Desired: amount1Desired,
               amount0Min: amount0Min,
               amount1Min: amount1Min,
               recipient: address(this),
               deadline: deadline
            })
         );
   }

   //collectAllFeesとは、すべての手数料を収集する関数
   function collectAllFees(
      uint256 tokenId,
      address recipient,
      uint128 amount0Max,
      uint128 amount1Max
   ) external {
      nonfungiblePositionManager.collect(
         INonfungiblePositionManager.CollectParams({
            tokenId: tokenId,
            recipient: recipient,
            amount0Max: amount0Max,
            amount1Max: amount1Max
         })
      );
   }

   //increaseLiquidityCurrentRangeとは、現在のレンジでリクイジットを増やす関数
   function increaseLiquidityCurrentRange(
      uint256 tokenId,
      uint256 amount0Desired,
      uint256 amount1Desired,
      uint256 amount0Min,
      uint256 amount1Min,
      uint256 deadline
   ) external {
      (, , , int24 tickLower, int24 tickUpper, , , , , , , ) =
         nonfungiblePositionManager.positions(tokenId);

      (uint256 amount0, uint256 amount1) =
         nonfungiblePositionManager.increaseLiquidity(
            INonfungiblePositionManager.IncreaseLiquidityParams({
               tokenId: tokenId,
               amount0Desired: amount0Desired,
               amount1Desired: amount1Desired,
               amount0Min: amount0Min,
               amount1Min: amount1Min,
               deadline: deadline
            })
         );
   }

   //decreaseLiquidityCurrentRangeとは、現在のレンジでリクイジットを減らす関数
   function decreaseLiquidityCurrentRange(
      uint256 tokenId,
      uint128 liquidity,
      uint256 amount0Min,
      uint256 amount1Min,
      uint256 deadline
   ) external {
      (, , , int24 tickLower, int24 tickUpper, , , , , , , ) =
         nonfungiblePositionManager.positions(tokenId);

      (uint256 amount0, uint256 amount1) =
         nonfungiblePositionManager.decreaseLiquidity(
            INonfungiblePositionManager.DecreaseLiquidityParams({
               tokenId: tokenId,
               liquidity: liquidity,
               amount0Min: amount0Min,
               amount1Min: amount1Min,
               deadline: deadline
            })
         );
   }

}

//INonfungiblePositionManagerとは、非同一性のあるポジションマネージャー
interface INonfungiblePositionManager {
   //MintParamsとは、Mint関数のパラメーター
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

   //mintとは、新しいポジションを作成する関数
   function mint(MintParams calldata params)
      external
      returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1);

   //IncreaseLiquidityParamsとは、increaseLiquidity関数のパラメーター
   struct IncreaseLiquidityParams {
      uint256 tokenId;
      uint256 amount0Desired;
      uint256 amount1Desired;
      uint256 amount0Min;
      uint256 amount1Min;
      uint256 deadline;
   }

   //increaseLiquidityとは、現在のレンジでリクイジットを増やす関数
   function increaseLiquidity(IncreaseLiquidityParams calldata params)
      external
      returns (uint256 amount0, uint256 amount1);

   //DecreaseLiquidityParamsとは、decreaseLiquidity関数のパラメーター
   struct DecreaseLiquidityParams {
      uint256 tokenId;
      uint128 liquidity;
      uint256 amount0Min;
      uint256 amount1Min;
      uint256 deadline;
   }


}

