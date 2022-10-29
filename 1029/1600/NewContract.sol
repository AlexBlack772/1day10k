pragma solidity ^0.8.13;

//Carとは、車を表すコントラクト
contract Car {
   //colorとは、車の色を表す変数
   string public color;
   //constructorとは、コントラクトをデプロイする際に呼び出される関数
   constructor(string memory _color) {
      color = _color;
   }
}

//CarFactoryとは、車を作成するコントラクト
contract CarFactory {
   //createCarとは、車を作成する関数
   function createCar(string memory color) public returns (address) {
      return address(new Car(color));
   }
   //createAndSendEtherとは、Etherを送信する関数
   function createAndSendEther(string memory color) public payable returns (address) {
      return address(new Car).value(msg.value)(color);
   }
   //getCarとは、車の色を取得する関数
   function getCar(address carAddress) public view returns (string memory) {
      return Car(carAddress).color();
   }
   
}