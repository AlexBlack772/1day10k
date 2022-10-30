pragma solidity ^0.8.13;

contract Function {
   //returnManyとは、複数の値を返す関数

   function returnMany() public pure returns (uint, bool, uint) {
      return (1, true, 2);
   }

   //namedとは、名前付きの返り値を持つ関数
   function named() public pure returns (uint x, bool b, uint y) {
      return (1, true, 2);
   }

   //assignedとは、返り値を変数に代入する関数
   function assigned() public pure returns (uint x, bool b, uint y) {
      x = 1;
      b = true;
      y = 2;
   }

   //destructuringとは、返り値を分割代入する関数
   function destructuring() public pure returns (uint, bool, uint) {
      (uint i, bool b, uint j) = returnMany();
      return (i, b, j);
   }

   //arryaInputとは、配列を引数に取る関数
   function arrayInput(uint[] memory _arr) public {}


}

contract XYZ {
   //someFuncWithManyInputsとは、多くの引数を持つ関数
   function someFuncWithManyInputs(
      uint _a,
      uint _b,
      uint _c,
      uint _d,
      uint _e
   ) public {}

   //callFuncとは、someFuncWithManyInputsを呼び出す関数
   function callFunc() public {
      someFuncWithManyInputs(1, 2, 3, 4, 5);
   }

   //callFuncWithLessArgsとは、someFuncWithManyInputsを引数を減らして呼び出す関数
   function callFuncWithLessArgs() public {
      someFuncWithManyInputs(1, 2, 3, 4, 5);
   }
   
}