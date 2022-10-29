pragma solidity ^0.8.10;

//IUniswapExchangeとは、Uniswapの取引所を管理するためのインターフェースです。
interface IUniswapExchange {

   //tokenAddressとは、トークンのアドレスを取得するための関数です。
   function tokenAddress() external view returns (address);
   //factoryAddressとは、ファクトリーのアドレスを取得するための関数です。
   function factoryAddress() external view returns (address);
   //addLiquidityとは、流動性を追加するための関数です。
   function addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) external payable returns (uint256);
   //removeLiquidityとは、流動性を取り出すための関数です。
   function removeLiquidity(uint256 amount, uint256 min_eth, uint256 min_tokens, uint256 deadline) external returns (uint256, uint256);
   //getEthToTokenInputPriceとは、トークンを入力してETHを取得するための関数です。
   function getEthToTokenInputPrice(uint256 eth_sold) external view returns (uint256);
   //getTokenToEthInputPriceとは、ETHを入力してトークンを取得するための関数です。
   function getTokenToEthInputPrice(uint256 tokens_sold) external view returns (uint256);
   //ethToTokenSwapInputとは、トークンを入力してETHを取得するための関数です。
   function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256);
   //tokenToEthSwapInputとは、ETHを入力してトークンを取得するための関数です。
   function tokenToEthSwapInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline) external returns (uint256);
   //nameとは、名前を取得するための関数です。
   function name() external view returns (string memory);
   //symbolとは、シンボルを取得するための関数です。
   function symbol() external view returns (string memory);
   //decimalsとは、小数点以下の桁数を取得するための関数です。
   function decimals() external view returns (uint8);
   //totalSupplyとは、総供給量を取得するための関数です。
   function totalSupply() external view returns (uint256);
   //balanceOfとは、残高を取得するための関数です。
   function balanceOf(address owner) external view returns (uint256);
   //transferとは、トークンを送金するための関数です。
   function transfer(address to, uint256 value) external returns (bool);
   //transferFromとは、トークンを送金するための関数です。
   function transferFrom(address from, address to, uint256 value) external returns (bool);
   //approveとは、トークンを承認するための関数です。
   function approve(address spender, uint256 value) external returns (bool);
   //allowanceとは、承認された残高を取得するための関数です。
   function allowance(address owner, address spender) external view returns (uint256);
   //totalSupplyとは、総供給量を取得するための関数です。
   function totalSupply() external view returns (uint256);
   //balanceOfとは、残高を取得するための関数です。
   function balanceOf(address owner) external view returns (uint256);
   //setupとは、設定を行うための関数です。
   function setup(address token_addr) external;
   

}