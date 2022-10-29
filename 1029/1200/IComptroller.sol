pragma solidity ^0.8.10;

//IComprollerとは、コントローラーのインターフェースです。
interface IComproller {
   //isComptrollerとは、コントローラーかどうかを判定するための関数です。
   function isComptroller() external view returns (bool);
   //enterMarketsとは、マーケットに参加するための関数です。
   function enterMarkets(address[] calldata cTokens) external returns (uint256[] memory);
   //exitMarketとは、マーケットから退出するための関数です。
   function exitMarket(address cToken) external returns (uint256);
   //getAssetsInとは、アセットの一覧を取得するための関数です。
   function getAssetsIn(address account) external view returns (address[] memory);
   //getAccountLiquidityとは、アカウントの流動性を取得するための関数です。
   function getAccountLiquidity(address account) external view returns (uint256, uint256, uint256);
   //mintAllowedとは、iTokenを発行するための関数です。
   function mintAllowed(address cToken, address minter, uint256 mintAmount) external returns (uint256);
   //mintVerifyとは、iTokenを発行するための関数です。
   function mintVerify(address cToken, address minter, uint256 mintAmount, uint256 mintTokens) external;
   //redeemAllowedとは、iTokenを赤字するための関数です。
   function redeemAllowed(address cToken, address redeemer, uint256 redeemTokens) external returns (uint256);
   //redeemVerifyとは、iTokenを赤字するための関数です。
   function redeemVerify(address cToken, address redeemer, uint256 redeemAmount, uint256 redeemTokens) external;
   //borrowAllowedとは、iTokenを借りるための関数です。
   function borrowAllowed(address cToken, address borrower, uint256 borrowAmount) external returns (uint256);
   //borrowVerifyとは、iTokenを借りるための関数です。
   function borrowVerify(address cToken, address borrower, uint256 borrowAmount) external;
   //repayBorrowAllowedとは、iTokenを返済するための関数です。
   function repayBorrowAllowed(address cToken, address payer, address borrower, uint256 repayAmount) external returns (uint256);
   //repayBorrowVerifyとは、iTokenを返済するための関数です。
   function repayBorrowVerify(address cToken, address payer, address borrower, uint256 repayAmount, uint256 borrowerIndex) external;
   //liquidateBorrowAllowedとは、iTokenを返済するための関数です。
   function liquidateBorrowAllowed(address cTokenBorrowed, address cTokenCollateral, address liquidator, address borrower, uint256 repayAmount) external returns (uint256);
   //liquidateBorrowVerifyとは、iTokenを返済するための関数です。
   function liquidateBorrowVerify(address cTokenBorrowed, address cTokenCollateral, address liquidator, address borrower, uint256 repayAmount, uint256 seizeTokens) external;
   //seizeとは、
}