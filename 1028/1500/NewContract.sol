pragma solidity ^0.8.13;

contract Car {
    address public owner;
    string public model;
    address public carAddr;

    //constructorとは、コントラクトがデプロイされたときに実行される関数です。
      constructor(string memory _model) {
         owner = msg.sender;
         model = _model;
         carAddr = address(this);
      }

}
//CarFactoryとは、車を作成するファクトリです。
contract CarFactory {
   //carsとは、車の配列です。
   Car[] public cars;

   //createCarとは、車を作成する関数です。
   function createCar(string memory _model) public {
      Car car = new Car(_model);
      cars.push(car);
   }
   //createAndSendEtherとは、Etherを送信して車を作成する関数です。
   function createAndSendEther(string memory _model) public payable {
      Car car = new Car{value: msg.value}(_model);
      cars.push(car);
   }

   //create2とは、
   function create2(string memory _model) public {
      bytes32 salt = keccak256(abi.encodePacked(_model));
      Car car = new Car{salt: salt}(_model);
      cars.push(car);
   }
   //create2AndSendEtherとは、Etherを送信して車を作成する関数です。
   function create2AndSendEther(string memory _model) public payable {
      bytes32 salt = keccak256(abi.encodePacked(_model));
      Car car = new Car{salt: salt, value: msg.value}(_model);
      cars.push(car);
   }
   //getCarとは、車を取得する関数です。
   function getCar(uint _index) public view returns (Car) {
      return cars[_index];
   }
   
}