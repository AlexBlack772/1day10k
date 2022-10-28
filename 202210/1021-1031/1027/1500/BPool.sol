pragma solidity ^0.6.0;

interface BPool {
   //isExternalSwapとは、外部スワップかどうかを取得する
   function isExternalSwap() external view returns (bool);
   //isFinalizedとは、ファイナライズされているかどうかを取得する
   function isFinalized() external view returns (bool);
   //isBoundとは、バウンドされているかどうかを取得する
   function isBound(address t) external view returns (bool);
   //getNumTokensとは、トークンの数を取得する
   function getNumTokens() external view returns (uint256);
   //getCurrentTokensとは、現在のトークンを取得する
   function getCurrentTokens() external view returns (address[] memory tokens);
   //getFinalTokensとは、ファイナルトークンを取得する
   function getFinalTokens() external view returns (address[] memory tokens);
   //getDenormalizedWeightとは、デノーマライズされたウェイトを取得する
   //デノーマライズとは、正規化されていない状態
   function getDenormalizedWeight(address token) external view returns (uint256);
   //getTotalDenormalizedWeightとは、トータルのデノーマライズされたウェイトを取得する
   function getTotalDenormalizedWeight() external view returns (uint256);
   //getNormalizedWeightとは、ノーマライズされたウェイトを取得する
   function getNormalizedWeight(address token) external view returns (uint256);
   //getBalanceとは、バランスを取得する
   function getBalance(address token) external view returns (uint256);
   //getSwapFeeとは、スワップ手数料を取得する
   function getSwapFee() external view returns (uint256);
   //getControllerとは、コントローラーを取得する
   function getController() external view returns (address);
   //setSwapFeeとは、スワップ手数料を設定する
   function setSwapFee(uint256 swapFee) external;
   //setControllerとは、コントローラーを設定する
   function setController(address manager) external;
   //setExternakSwapとは、外部スワップを設定する
   function setExternakSwap(bool isExternal) external;
   //finalizeとは、ファイナライズする
   function finalize() external;
   //bindとは、バインドする
   function bind(address token, uint256 balance, uint256 denorm) external;
   //rebindとは、リバインドする
   function rebind(address token, uint256 balance, uint256 denorm) external;
   //unbindとは、アンバインドする
   function unbind(address token) external;
   //gulpとは、グルップする
   //グルップとは、食べる
   function gulp(address token) external;
   //getSpotPriceとは、スポット価格を取得する
   //スポット価格とは、現在の価格
   function getSpotPrice(address tokenIn, address tokenOut) external view returns (uint256 spotPrice);
   //getSpotPriceSansFeeとは、スポット価格を取得する
   function getSpotPriceSansFee(address tokenIn, address tokenOut) external view returns (uint256 spotPrice);
   //joinPoolとは、プールに参加する
   function joinPool(uint256 poolAmountOut, uint256[] calldata maxAmountsIn) external;
   //exitPoolとは、プールから退出する
   function exitPool(uint256 poolAmountIn, uint256[] calldata minAmountsOut) external;
   //swapExactAmountInとは、入力の正確な量をスワップする
   function swapExactAmountIn(address tokenIn, uint256 tokenAmountIn, address tokenOut, uint256 minAmountOut, uint256 maxPrice) external;
   //swapExactAmountOutとは、出力の正確な量をスワップする
   function swapExactAmountOut(address tokenIn, uint256 maxAmountIn, address tokenOut, uint256 tokenAmountOut, uint256 maxPrice) external;
   //joinswapExternAmountInとは、入力の外部量を参加する
   function joinswapExternAmountIn(address tokenIn, uint256 tokenAmountIn, uint256 minPoolAmountOut) external returns (uint256 poolAmountOut);
   //joinswapPoolAmountOutとは、プールの量を参加する
   function joinswapPoolAmountOut(address tokenIn, uint256 poolAmountOut, uint256 maxAmountIn) external returns (uint256 tokenAmountIn);
   //exitswapPoolAmountInとは、プールの量を退出する
   function exitswapPoolAmountIn(address tokenOut, uint256 poolAmountIn, uint256 minAmountOut) external returns (uint256 tokenAmountOut);
   //exitswapExternAmountOutとは、出力の外部量を退出する
   function exitswapExternAmountOut(address tokenOut, uint256 tokenAmountOut, uint256 maxPoolAmountIn) external returns (uint256 poolAmountIn);
   //totalSupplyとは、トータルサプライを取得する
   function totalSupply() external view returns (uint256);
   //balanceOfとは、バランスを取得する
   function balanceOf(address who) external view returns (uint256);
   //allowanceとは、アローンスを取得する
   function allowance(address owner, address spender) external view returns (uint256);
   //approveとは、承認する
   function approve(address spender, uint256 value) external returns (bool);
   //transferとは、転送する
   function transfer(address to, uint256 value) external returns (bool);
   //transferFromとは、転送する
   function transferFrom(address from, address to, uint256 value) external returns (bool);
   //calcSpotPriceとは、スポット価格を計算する
   function calcSpotPrice(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 swapFee) external pure returns (uint256 spotPrice);
   //calcOutGivenInとは、入力を与えて出力を計算する
   function calcOutGivenIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountIn, uint256 swapFee) external pure returns (uint256 tokenAmountOut);
   //calcInGivenOutとは、出力を与えて入力を計算する
   function calcInGivenOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountOut, uint256 swapFee) external pure returns (uint256 tokenAmountIn);
   //calcPoolOutGivenSingleInとは、シングルインを与えてプールアウトを計算する
   function calcPoolOutGivenSingleIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 poolSupply, uint256 totalWeight, uint256 tokenAmountIn, uint256 swapFee) external pure returns (uint256 poolAmountOut);
   //calcSingleInGivenPoolOutとは、プールアウトを与えてシングルインを計算する
   function calcSingleInGivenPoolOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 poolSupply, uint256 totalWeight, uint256 poolAmountOut, uint256 swapFee) external pure returns (uint256 tokenAmountIn);
   //calcSingleOutGivenPoolInとは、プールインを与えてシングルアウトを計算する
   function calcSingleOutGivenPoolIn(uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 poolSupply, uint256 totalWeight, uint256 poolAmountIn, uint256 swapFee) external pure returns (uint256 tokenAmountOut);
   //calcPoolInGivenSingleOutとは、シングルアウトを与えてプールインを計算する
   function calcPoolInGivenSingleOut(uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 poolSupply, uint256 totalWeight, uint256 tokenAmountOut, uint256 swapFee) external pure returns (uint256 poolAmountIn);

}