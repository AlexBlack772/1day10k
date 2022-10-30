pragma solidity ^0.8.13;

//bankとは、銀行
contract bank {
    //depositとは、預金する
    function deposit() public payable {}
    //withdrawとは、引き出す
    function withdraw(uint256 amount) public {}
    //balanceとは、バランスを取得する
    function balance() public view returns (uint256) {}
}