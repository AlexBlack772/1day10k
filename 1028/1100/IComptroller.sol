pragma solidity ^0.6.0;

interface IComptroller {
   //isComptrollerとは、コントローラーかどうかを判定する
   function isComptroller() external view returns (bool);
   //enterMarketsとは、マーケットに入る
   function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);
   //exitMarketとは、マーケットから出る
   function exitMarket(address cToken) external returns (uint);
   //getAccountLiquidityとは、アカウントの流動性を取得する
   function getAccountLiquidity(address account) external view returns (uint, uint, uint);
   //getAssetsInとは、アセットを取得する
   function getAssetsIn(address account) external view returns (address[] memory);
   //mintAllowedとは、ミントを許可する
   function mintAllowed(address cToken, address minter, uint mintAmount) external returns (uint);
   //mintVerifyとは、ミントを検証する
   function mintVerify(address cToken, address minter, uint mintAmount, uint mintTokens) external;
   //redeemAllowedとは、レデムを許可する
   function redeemAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);
   //redeemVerifyとは、レデムを検証する
   function redeemVerify(address cToken, address redeemer, uint redeemAmount, uint redeemTokens) external;
   //borrowAllowedとは、借りるを許可する
   function borrowAllowed(address cToken, address borrower, uint borrowAmount) external returns (uint);
   //borrowVerifyとは、借りるを検証する
   function borrowVerify(address cToken, address borrower, uint borrowAmount) external;
   //repayBorrowAllowedとは、返済を許可する
   function repayBorrowAllowed(address cToken, address payer, address borrower, uint repayAmount) external returns (uint);
   //repayBorrowVerifyとは、返済を検証する
   function repayBorrowVerify(address cToken, address payer, address borrower, uint repayAmount, uint borrowerIndex) external;
   //liquidateBorrowAllowedとは、返済を許可する
   function liquidateBorrowAllowed(address cTokenBorrowed, address cTokenCollateral, address liquidator, address borrower, uint repayAmount) external returns (uint);
   //liquidateBorrowVerifyとは、返済を検証する
   function liquidateBorrowVerify(address cTokenBorrowed, address cTokenCollateral, address liquidator, address borrower, uint repayAmount, uint seizeTokens) external;
   //seizeAllowedとは、差し押さえを許可する
   function seizeAllowed(address cTokenCollateral, address cTokenBorrowed, address liquidator, address borrower, uint seizeTokens) external returns (uint);
   //seizeVerifyとは、差し押さえを検証する
   function seizeVerify(address cTokenCollateral, address cTokenBorrowed, address liquidator, address borrower, uint seizeTokens) external;
   //transferAllowedとは、転送を許可する
   function transferAllowed(address cToken, address src, address dst, uint transferTokens) external returns (uint);
   //liquidateCalculateSeizeTokensとは、差し押さえを計算する
   function liquidateCalculateSeizeTokens(address cTokenBorrowed, address cTokenCollateral, uint repayAmount) external view returns (uint, uint);
   
}