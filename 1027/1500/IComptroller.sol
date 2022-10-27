pragma solidity ^0.6.0;

interface IComptroller {

   //isComptrollerとは、コントローラーかどうかを判定する
   function isComptroller() external view returns (bool);
   //enterMarketsとは、マーケットに入る
   function enterMarkets(address[] calldata cTokens) external returns (uint256[] memory);
   //exitMarketとは、マーケットから出る
   function exitMarket(address cToken) external returns (uint256);

   //getAccountLiquidityとは、アカウントの流動性を取得する
   function getAccountLiquidity(address account) external view returns (uint256, uint256, uint256);
   //getAssetsInとは、アセットを取得する
   function getAssetsIn(address account) external view returns (address[] memory);
   //mintAllowedとは、ミントを許可する
   function mintAllowed(address cToken, address minter, uint256 mintAmount) external returns (uint256);
   //mintVerifyとは、ミントを検証する
   function mintVerify(address cToken, address minter, uint256 mintAmount, uint256 mintTokens) external;

   //redemAllowedとは、リデームを許可する
   function redeemAllowed(address cToken, address redeemer, uint256 redeemTokens) external returns (uint256);
   //redeemVerifyとは、リデームを検証する
   function redeemVerify(address cToken, address redeemer, uint256 redeemAmount, uint256 redeemTokens) external;

   //borrowAllowedとは、借りを許可する
   function borrowAllowed(address cToken, address borrower, uint256 borrowAmount) external returns (uint256);
   //borrowVerifyとは、借りを検証する
   function borrowVerify(address cToken, address borrower, uint256 borrowAmount) external;

   //repayBorrowAllowedとは、借りを返すのを許可する
   function repayBorrowAllowed(address cToken, address payer, address borrower, uint256 repayAmount) external returns (uint256);
   //repayBorrowVerifyとは、借りを返すのを検証する
   function repayBorrowVerify(address cToken, address payer, address borrower, uint256 repayAmount, uint256 borrowerIndex) external;

   //liquidateBorrowAllowedとは、借りをリキューデートするのを許可する
   function liquidateBorrowAllowed(address cTokenBorrowed, address cTokenCollateral, address liquidator, address borrower, uint256 repayAmount) external returns (uint256);
   //liquidateBorrowVerifyとは、借りをリキューデートするのを検証する
   function liquidateBorrowVerify(address cTokenBorrowed, address cTokenCollateral, address liquidator, address borrower, uint256 repayAmount, uint256 seizeTokens) external;

   //seizeAllowedとは、奪うのを許可する
   function seizeAllowed(address cTokenCollateral, address cTokenBorrowed, address liquidator, address borrower, uint256 seizeTokens) external returns (uint256);
   //seizeVerifyとは、奪うのを検証する
   function seizeVerify(address cTokenCollateral, address cTokenBorrowed, address liquidator, address borrower, uint256 seizeTokens) external;

   //transferAllowedとは、転送を許可する
   function transferAllowed(address cToken, address src, address dst, uint256 transferTokens) external returns (uint256);
   //transferVerifyとは、転送を検証する
   function transferVerify(address cToken, address src, address dst, uint256 transferTokens) external;

   //


   
}