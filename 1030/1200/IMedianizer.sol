pragma solidity ^0.8.13;

interface IMedianizer {
   //setOwnerとは、所有者を設定する関数
   function setOwner(address _owner) external;
   //pokeとは、pokeする関数
   function poke() external;
   //computeとは、計算する関数
   function compute() external view returns (uint256);
   //readとは、読み込む関数
   function read() external view returns (uint256);
   //peekとは、peekする関数
   function peek() external view returns (uint256, bool);
   //setとは、設定する関数
   function set(uint256 _val) external;
   //indexesとは、インデックスを取得する関数
   function indexes() external view returns (address[] memory);
   //nextとは、次のインデックスを取得する関数
   function next() external view returns (address);
   //setNextとは、次のインデックスを設定する関数
   function setNext(address _next) external;
   //setMinとは、最小値を設定する関数
   function setMin(uint256 _min) external;
   //setMaxとは、最大値を設定する関数
   function setMax(uint256 _max) external;
   //setAuthorityとは、権限を設定する関数
   function setAuthority(address _authority) external;
   //authorityとは、権限を取得する関数
   function authority() external view returns (address);
   //unsetAuthorityとは、権限を解除する関数
   function unsetAuthority() external;
   
}