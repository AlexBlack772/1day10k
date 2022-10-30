pragma solidity ^0.8.10;
//ContractDetectorとは、コントラクトを検出するためのコントラクトです。

contract ContractDetector {

   address creator;
    string contract_or_normal = "not checked";

    //ContractDetectorとは、コントラクトを検出するための関数です
    function ContractDetector() public {
        creator = msg.sender;
    }
    //testContractOrNormalとは、コントラクトかどうかを検出するための関数です。
      function testContractOrNormal(address _addr) public returns (string) {
         if (_addr == creator) {
               contract_or_normal = "normal";
         } else {
               uint32 size;
               assembly {
                  size := extcodesize(_addr)
               }
               if (size > 0) {
                  contract_or_normal = "contract";
               } else {
                  contract_or_normal = "normal";
               }
         }
         return contract_or_normal;
      }
      //getContractOrNormalとは、コントラクトかどうかを取得するための関数です。
      function getContractOrNormal() public constant returns (string) {
         return contract_or_normal;
      }
      
}