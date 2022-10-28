pragma solidity ^0.6.0;

contract GemLike {
      function approve(address, uint) public virtual;
      function transfer(address, uint) public virtual;
      function transferFrom(address, address, uint) public virtual;
      function deposit() public virtual payable;
      function withdraw(uint) public virtual;
}

contract ManagerLike {
   //cdpCanとは、cdpを閉じることができるかどうかを確認する関数
   function cdpCan(address, uint, address) public virtual returns (uint);
   //iksとは、cdpの所有者を取得する関数
   function iks(uint) public virtual returns (address);
   //ownsとは、cdpの所有者を取得する関数
   function owns(uint) public virtual returns (address);
   //urnsとは、cdpのurnを取得する関数
   function urns(uint) public virtual returns (address);
   //vatとは、vatを取得する関数
   function vat() public virtual returns (address);
   //openとは、cdpを開く関数
   function open(bytes32, address) public virtual returns (uint);
   //giveとは、cdpの所有権を譲渡する関数
   function give(uint, address) public virtual;
   //frobとは、cdpを操作する関数 
   function frob(uint, int, int) public virtual;
   //cdpAllowとは、cdpを許可する関数
   //cdpとは、collateralized debt positionの略
   function cdpAllow(uint, address, uint) public virtual;
   //urnAllowとは、urnを許可する関数
   //urnとは、cdpの所有者のアドレス
   function urnAllow(address, uint) public virtual;
   //flux()とは、
   function flux(uint, address, uint) public virtual;
   //move()とは、何か、移動する関数
   function move(address, address, uint) public virtual;
   //exitとは、
   function exit(address, uint, address, uint) public virtual;
   //enterとは、
   function enter(address, address, uint) public virtual;
   //shiftとは、何か、移動する関数
   function shift(uint, uint) public virtual;
}

contract VatLike {
   //hopeとは、
}

contract IDssProcyActions {
   //cdpAllowとは、cdpを許可する関数
   function cdpAllow(
      address manager,
      uint cdp,
      address usr,
      uint ok
   ) public virtual;

   //daiJoin_joinの説明とは、

   //drawの翻訳は、引き出す
   function draw(
      address manager,
      address jug,
      address daiJoin,
      uint cdp,
      uint wad
   ) public virtual;

   //wipeの日本語訳とは、
   function wipe(
      address manager,
      address daiJoin,
      uint cdp,
      uint wad
   ) public virtual;

   //enterとは、
}