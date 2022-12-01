pragma solidity ^0.5.0;


interface {
   //isBoundとは、boundされているかどうかを返す関数
   function isBound(address t) external view returns (bool);
   //isFinalizedとは、finalizedされているかどうかを返す関数
   function isFinalized() external view returns (bool);
   //getNumTokensとは、トークンの数を返す関数
   function getNumTokens() external view returns (uint);
   //getCurrentTokensとは、現在のトークンを返す関数
   function getCurrentTokens() external view returns (address[] memory tokens);
   //getFinalTokensとは、最終的なトークンを返す関数
   function getFinalTokens() external view returns (address[] memory tokens);
   //getNormalizedWeightとは、トークンの正規化された重みを返す関数
   function getNormalizedWeight(address token) external view returns (uint);
   //getNormalizedWeightsとは、トークンの正規化された重みを返す関数
   function getNormalizedWeights() external view returns (uint[] memory);
   //getDenormalizedWeightとは、トークンの非正規化された重みを返す関数
   function getDenormalizedWeight(address token) external view returns (uint);
   //getBalanceとは、トークンのバランスを返す関数
   function getBalance(address token) external view returns (uint);
   //getSwapFeeとは、スワップ手数料を返す関数
   function getSwapFee() external view returns (uint);
   //getControllerとは、コントローラーを返す関数
   function getController() external view returns (address);
   //getPublicSwapとは、publicSwapを返す関数
   function getPublicSwap() external view returns (bool);
   //getSpotPriceとは、スポット価格を返す関数
   function getSpotPrice(address tokenIn, address tokenOut) external view returns (uint spotPrice);
   //getSpotPriceSansFeeとは、スポット価格を返す関数
   function getSpotPriceSansFee(address tokenIn, address tokenOut) external view returns (uint spotPrice);
   //joinPoolとは、プールに参加する関数
   function joinPool(uint poolAmountOut, uint[] calldata maxAmountsIn) external;
   //bindとは、トークンをバインドする関数
   function bind(address token, uint balance, uint denorm) external;
   //unbindとは、トークンをアンバインドする関数
   function unbind(address token) external;
   //rebindとは、トークンを再バインドする関数
   function rebind(address token, uint balance, uint denorm) external;
   //gulpとは、gulpする関数
   function gulp(address token) external;
   //setSwapFeeとは、スワップ手数料を設定する関数
   function setSwapFee(uint swapFee) external;
   //setControllerとは、コントローラーを設定する関数
   function setController(address manager) external;
   //setPublicSwapとは、publicSwapを設定する関数
   function setPublicSwap(bool public_) external;
   //finalizeとは、finalizedする関数
   function finalize() external;
   //exitPoolとは、プールから出る関数
   function exitPool(uint poolAmountIn, uint[] calldata minAmountsOut) external;
   //totalSupplyとは、総供給量を返す関数
   function totalSupply() external view returns (uint);
   //balanceOfとは、アカウントのバランスを返す関数
   function balanceOf(address who) external view returns (uint);
   //transferとは、トークンを移動する関数
   function transfer(address dst, uint rawAmount) external returns (bool);
   //transferFromとは、トークンを移動する関数
   function transferFrom(address src, address dst, uint rawAmount) external returns (bool);
   //approveとは、トークンを許可する関数
   function approve(address spender, uint rawAmount) external returns (bool);
   //allowanceとは、トークンの許可量を返す関数
   function allowance(address owner, address spender) external view returns (uint);
   //permitとは、トークンを許可する関数
   function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;
   

}