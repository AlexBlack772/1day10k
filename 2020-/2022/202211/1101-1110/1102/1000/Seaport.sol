pragma solidity ^0.8.13;

import { Consideration } from "./lib/Consideration.sol";


//Seaportとは、NFTを売買するためのプラットフォームです。
contract Seaport is Consideration {
    constructor(address conduitController) Consideration(conduitController) {}

    //nameは、NFTの名前の関数です。
      function name() public pure returns (string memory) {
         return "Seaport";
      }

      //nameStringは、NFTの名前の関数です。
      function nameString() public pure returns (string memory) {
         return "Seaport";
      }
      
}