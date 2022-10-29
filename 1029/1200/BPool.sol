pragma solidity ^0.8.10;

interface BPool {
   //isexternalSwapとは、外部スワップが可能かどうかを確認するための関数です。
   function isExternalSwap() external view returns (bool);
   //isFinalizedとは、ファイナライズされているかどうかを確認するための関数です。
   function isFinalized() external view returns (bool);
   //isBoundとは、バインドされているかどうかを確認するための関数です。
   function isBound(address t) external view returns (bool);
   //getNumTokensとは、トークンの数を取得するための関数です。
   function getNumTokens() external view returns (uint);
   //getCurrentTokensとは、現在のトークンを取得するための関数です。
   function getCurrentTokens() external view returns (address[] memory tokens);
   //getFinalTokensとは、最終的なトークンを取得するための関数です。
   function getFinalTokens() external view returns (address[] memory tokens);
   //getNormalizedWeightとは、正規化された重みを取得するための関数です。
   function getNormalizedWeight(address token) external view returns (uint);
   //getDenormalizedWeightとは、非正規化された重みを取得するための関数です。
   function getDenormalizedWeight(address token) external view returns (uint);
   //getBalanceとは、残高を取得するための関数です。
   function getBalance(address token) external view returns (uint);
   //getSwapFeeとは、スワップ手数料を取得するための関数です。
   function getSwapFee() external view returns (uint);
   //getControllerとは、コントローラーを取得するための関数です。
   function getController() external view returns (address);
   //setSwapFeeとは、スワップ手数料を設定するための関数です。
   function setSwapFee(uint swapFee) external;
   //setControllerとは、コントローラーを設定するための関数です。
   function setController(address manager) external;
   //finalizeとは、ファイナライズするための関数です。
   function finalize() external;
   //bindとは、バインドするための関数です。
   function bind(address token, uint balance, uint denorm) external;
   //rebindとは、再バインドするための関数です。
   function rebind(address token, uint balance, uint denorm) external;
   //unbindとは、バインドを解除するための関数です。
   function unbind(address token) external;
   //gulpとは、残高を取得するための関数です。
   function gulp(address token) external;
   //getSpotPriceとは、スポット価格を取得するための関数です。
   function getSpotPrice(address tokenIn, address tokenOut) external view returns (uint spotPrice);
   //getSpotPriceSansFeeとは、スポット価格を取得するための関数です。
   function getSpotPriceSansFee(address tokenIn, address tokenOut) external view returns (uint spotPrice);
   //joinPoolとは、プールに参加するための関数です。
   function joinPool(uint poolAmountOut, uint[] calldata maxAmountsIn) external;
   //swapExactAmountInとは、入金額を指定してスワップするための関数です。
   function swapExactAmountIn(address tokenIn, uint tokenAmountIn, address tokenOut, uint minAmountOut, uint maxPrice) external;
   //swapExactAmountOutとは、出金額を指定してスワップするための関数です。
   function swapExactAmountOut(address tokenIn, uint maxAmountIn, address tokenOut, uint tokenAmountOut, uint maxPrice) external;
   //exitswapPoolAmountInとは、プールの入金額を指定してプールから出るための関数です。
   function exitPool(uint poolAmountIn, uint[] calldata minAmountsOut) external;
   

}