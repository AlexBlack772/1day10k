pragma solidity ^0.8.0;

address constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

//IERC721Receiverとは、ERC721トークンを受け取るためのインターフェースです。
interface IERC721Receiver {
   //onERC721Receivedとは、ERC721トークンを受け取ったときに実行される関数です。
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}

contract UniswapV3Liquidity is IERC721Receiver {
   IERC20 private constant dai = IERC20(DAI);
    IWETH private constant weth = IWETH(WETH);

    int24 private constant MIN_TICK = -887272;
    int24 private constant MAX_TICK = -MIN_TICK;
    int24 private constant TICK_SPACING = 60;

    //nonfungiblePositionManagerとは、UniswapV3のNFTを管理するためのコントラクトです。
    INonfungiblePositionManager public nonfungiblePositionManager =
        INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);


      //onERC721Receivedとは、ERC721トークンを受け取ったときに実行される関数です。
      function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4) {
         return this.onERC721Received.selector;

      //mintNewPositionとは、新しいポジションを作成する関数です。
      function mintNewPosition(uint256 amount) external {
         dai.approve(address(nonfungiblePositionManager), amount);
         nonfungiblePositionManager.mint(INonfungiblePositionManager.MintParams({
            token0: DAI,
            token1: WETH,
            fee: 3000,
            //tickLowerとは、下限の価格を設定する関数です。
            tickLower: MIN_TICK,
            tickUpper: MAX_TICK,
            amount0Desired: amount,
            amount1Desired: 0,
            amount0Min: 0,
            amount1Min: 0,
            recipient: address(this),
            deadline: block.timestamp
         }));
      }


      }
      //collectAllFeesとは、収集された手数料を受け取る関数です。
      function collectAllFees(uint256 tokenId) external {
         nonfungiblePositionManager.collect(INonfungiblePositionManager.CollectParams({
            tokenId: tokenId,
            recipient: msg.sender,
            amount0Max: type(uint128).max,
            amount1Max: type(uint128).max
         }));
      }

      //increaseLiquidityCurrentRangeとは、現在のレンジでリクイジットを増やす関数です。
      function increaseLiquidityCurrentRange(uint256 tokenId, uint256 amount) external {
         dai.approve(address(nonfungiblePositionManager), amount);
         nonfungiblePositionManager.increaseLiquidity(INonfungiblePositionManager.IncreaseLiquidityParams({
            tokenId: tokenId,
            amount0Desired: amount,
            amount1Desired: 0,
            amount0Min: 0,
            amount1Min: 0,
            deadline: block.timestamp
         }));
      }

      //decreaseLiquidityCurrentRangeとは、現在のレンジでリクイジットを減らす関数です。
      function decreaseLiquidityCurrentRange(uint256 tokenId, uint128 liquidity) external {
         nonfungiblePositionManager.decreaseLiquidity(INonfungiblePositionManager.DecreaseLiquidityParams({
            tokenId: tokenId,
            liquidity: liquidity,
            amount0Min: 0,
            amount1Min: 0,
            deadline: block.timestamp
         }));
      }
}

//INonfungiblePositionManagerとは、UniswapV3のNFTを管理するためのインターフェースです。
interface INonfungiblePositionManager {
   //MintParamsとは、mint関数の引数をまとめた構造体です。
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

   //mintとは、新しいポジションを作成する関数です。
   function mint(MintParams calldata params) external returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1);
   
   //IncreaseLiquidityParamsとは、increaseLiquidity関数の引数をまとめた構造体です。

   struct IncreaseLiquidityParams {
      uint256 tokenId;
      uint256 amount0Desired;
      uint256 amount1Desired;
      uint256 amount0Min;
      uint256 amount1Min;
      uint256 deadline;
   }

   //increaseLiquidityとは、現在のレンジでリクイジットを増やす関数です。
   function increaseLiquidity(IncreaseLiquidityParams calldata params) external returns (uint128 liquidity, uint256 amount0, uint256 amount1);

   //DecreaseLiquidityParamsとは、decreaseLiquidity関数の引数をまとめた構造体です。
   struct DecreaseLiquidityParams {
      uint256 tokenId;
      uint128 liquidity;
      uint256 amount0Min;
      uint256 amount1Min;
      uint256 deadline;
   }

   //decreaseLiquidityとは、現在のレンジでリクイジットを減らす関数です。
   function decreaseLiquidity(DecreaseLiquidityParams calldata params) external returns (uint256 amount0, uint256 amount1);

   //CollectParamsとは、collect関数の引数をまとめた構造体です。
   struct CollectParams {
      uint256 tokenId;
      address recipient;
      uint128 amount0Max;
      uint128 amount1Max;
   }
   
   //collectとは、収集された手数料を受け取る関数です。
   function collect(CollectParams calldata params) external returns (uint256 amount0, uint256 amount1);

}

interface IERC20 {
   //approveとは、ERC20トークンを承認する関数です。
   function approve(address spender, uint256 amount) external returns (bool);
   //totalSupplyとは、トークンの総供給量を取得する関数です。
   function totalSupply() external view returns (uint256);
   //balanceOfとは、指定したアドレスの残高を取得する関数です。
   function balanceOf(address account) external view returns (uint256);
   //transferとは、指定したアドレスにトークンを送金する関数です。
   function transfer(address recipient, uint256 amount) external returns (bool);
   //allowanceとは、指定したアドレスが承認されている残高を取得する関数です。
   function allowance(address owner, address spender) external view returns (uint256);
   //transferFromとは、指定したアドレスからトークンを送金する関数です。
   function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
   
}