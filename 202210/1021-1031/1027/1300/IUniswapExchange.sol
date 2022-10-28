pragma solidity ^0.6.0;

interface IUniswapExchange {
   //tokenAddressとは、トークンのアドレス
   function tokenAddress() external view returns (address);
   //factoryAddressとは、ファクトリーのアドレス
   function factoryAddress() external view returns (address);
   //addLiquidityとは、リクイディティを追加する関数
   function addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) external payable returns (uint256);
   //removeLiquidityとは、リクイディティを削除する関数
   function removeLiquidity(uint256 amount, uint256 min_eth, uint256 min_tokens, uint256 deadline) external returns (uint256, uint256);
   //getEthToTokenInputPriceとは、トークンを入力して、ETHの価格を取得する関数
   function getEthToTokenInputPrice(uint256 eth_sold) external view returns (uint256);
   //getEthToTokenOutputPriceとは、トークンを出力して、ETHの価格を取得する関数
   function getEthToTokenOutputPrice(uint256 tokens_bought) external view returns (uint256);
   //getTokenToEthInputPriceとは、ETHの価格を入力して、トークンの価格を取得する関数
   function getTokenToEthInputPrice(uint256 tokens_sold) external view returns (uint256);
   //getTokenToEthOutputPriceとは、ETHを出力して、トークンの価格を取得する関数
   function getTokenToEthOutputPrice(uint256 eth_bought) external view returns (uint256);
   //ethToTokenSwapInputとは、トークンを入力して、ETHをスワップする関数
   function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256);
   //ethToTokenTransferInputとは、トークンを入力して、ETHをスワップして、トークンを転送する関数
   function ethToTokenTransferInput(uint256 min_tokens, uint256 deadline, address recipient) external payable returns (uint256);
   //ethToTokenSwapOutputとは、トークンを出力して、ETHをスワップする関数
   function ethToTokenSwapOutput(uint256 tokens_bought, uint256 deadline) external payable returns (uint256);
   //ethToTokenTransferOutputとは、トークンを出力して、ETHをスワップして、トークンを転送する関数
   function ethToTokenTransferOutput(uint256 tokens_bought, uint256 deadline, address recipient) external payable returns (uint256);
   //tokenToEthSwapInputとは、ETHを入力して、トークンをスワップする関数
   function tokenToEthSwapInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline) external returns (uint256);
   //tokenToEthTransferInputとは、ETHを入力して、トークンをスワップして、ETHを転送する関数
   function tokenToEthTransferInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline, address recipient) external returns (uint256);
   

}