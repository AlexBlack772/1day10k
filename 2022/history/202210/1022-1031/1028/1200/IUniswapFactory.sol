pragma solidity ^0.5.0;

interface IUniswapFactory {
   //createExchangeとは、交換を作成する
   function createExchange(address token) external returns (address payable);
   //getExchangeとは、交換を取得する
   function getExchange(address token) external view returns (address payable);
   //getTokenとは、トークンを取得する
   function getToken(address token) external view returns (address);
   //getTokenWithIdとは、トークンIDを取得する
   function getTokenWithId(uint256 tokenId) external view returns (address);
   //initializeFactoryとは、ファクトリーを初期化する
   function initializeFactory(address template) external;
   
}