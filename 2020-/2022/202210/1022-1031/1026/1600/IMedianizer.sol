pragma solidity ^0.8.13;

//IMedianizerとは、複数の価格情報を取得し、その平均値を返す契約のこと
interface IMedianizer {
   //setOwnerとは、
   function setOwner(address) external;
   //pokeとは、
   function poke(bytes32) external;
   function compute() external view returns (uint256);
   function read() external view returns (uint256);
   function peek() external view returns (uint256, bool);
   function poke() external;
   function set(bytes32, uint256) external;
   function setPriceFeed(address) external;
   function setMin(uint256) external;
   function setMax(uint256) external;

}