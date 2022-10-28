pragma solidity ^0.6.0;

interface IMedianizer {
   //setOwnerとは、オーナーを設定する
   function setOwner(address _owner) external;
   //pokeとは、突く
   function poke() external;
   //computeとは、計算する
   function compute() external;
   //setとは、セットする
   function set(address[] calldata _assets, uint256[] calldata _weights) external;
   //unsetとは、アンセットする
   function unset(address[] calldata _assets) external;
   //indexesとは、インデックス
   function indexes(address _asset) external view returns (uint256);
   //nextとは、次
   function next() external view returns (uint256);
   //readとは、読む
   function read() external view returns (uint256);
   //peekとは、ピークする
   function peek() external view returns (uint256, bool);
   //valuesとは、値
   function values(uint256 _index) external view returns (uint256);
   //setMinとは、最小をセットする
   function setMin(uint256 _min) external;
   //setAuthorityとは、権限をセットする
   function setAuthority(address _authority) external;
   //ownerとは、オーナー
   function owner() external view returns (address);
   //voidとは、無効にする
   function void() external;
   //setとは、セットする
   function set(address _asset, uint256 _weight) external;
   //authorityとは、権限
   function authority() external view returns (address);
   //unsetとは、アンセットする
   function unset(address _asset) external;
   //setNextとは、次をセットする
   function setNext(uint256 _next) external;
   //minとは、最小
   function min() external view returns (uint256);
   
}