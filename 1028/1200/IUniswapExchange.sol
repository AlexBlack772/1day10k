pragma solidity ^0.5.0;

interface IUniswapExchange {
   //tokenAddressとは、トークンアドレス
   function tokenAddress() external view returns (address);
   //factoryAddressとは、ファクトリーアドレス
   function factoryAddress() external view returns (address);
   //addLiquidityとは、リキッドティティを追加する
   function addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) external payable returns (uint256);
   //removeLiquidityとは、リキッドティティを削除する
   function removeLiquidity(uint256 amount, uint256 min_eth, uint256 min_tokens, uint256 deadline) external returns (uint256, uint256);
   //getEthToTokenInputPriceとは、トークンを入力してETHを取得する
   function getEthToTokenInputPrice(uint256 eth_sold) external view returns (uint256);
   //getEthToTokenOutputPriceとは、トークンを出力してETHを取得する
   function getEthToTokenOutputPrice(uint256 tokens_bought) external view returns (uint256);
   //getTokenToEthInputPriceとは、ETHを入力してトークンを取得する
   function getTokenToEthInputPrice(uint256 tokens_sold) external view returns (uint256);
   //getTokenToEthOutputPriceとは、ETHを出力してトークンを取得する
   function getTokenToEthOutputPrice(uint256 eth_bought) external view returns (uint256);
   //ethToTokenSwapInputとは、トークンを入力してETHをスワップする
   function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256);
   //ethToTokenTransferInputとは、トークンを入力してETHをスワップしてトークンを転送する
   
}