pragma solidity ^0.8.10;

//IUniswapFactoryとは、Uniswapのファクトリーを管理するためのインターフェースです。
interface IUniswapFactory {
   //createExchangeとは、Uniswapの交換所を作成するための関数です。
   function createExchange(address token) external returns (address exchange);
   //getExchangeとは、Uniswapの交換所を取得するための関数です。
   function getExchange(address token) external view returns (address exchange);
   //getTokenとは、トークンを取得するための関数です。
   function getToken(address exchange) external view returns (address token);
   //getTokenWithIdとは、トークンを取得するための関数です。
   function getTokenWithId(uint256 token_id) external view returns (address token);
   //initializeFactoryとは、ファクトリーを初期化するための関数です。
   function initializeFactory(address template) external;
   
}