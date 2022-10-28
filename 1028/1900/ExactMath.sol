pragma solidity ^0.4.16;
pragma experimental "v0.5.0";
pragma experimental "ABIEncoderV2";

//ExactMathとは、精度を保つためのライブラリです。
library ExactMath {

   uint constant internal UINT_ZERO = 0;
    uint constant internal UINT_ONE = 1;
    uint constant internal UINT_TWO = 2;
    uint constant internal UINT_MAX = ~uint(0);
    uint constant internal UINT_MIN = 0;

    int constant internal INT_ZERO = 0;
    int constant internal INT_ONE = 1;
    int constant internal INT_TWO = 2;
    int constant internal INT_MINUS_ONE = -1;
    int constant internal INT_MAX = int(2**255 - 1);
    int constant internal INT_MIN = int(2**255);

    //mulDivとは、a*b/cを計算する関数です。
    function mulDiv(uint a, uint b, uint c) internal pure returns (uint) {
        uint d = a * b;
        require(d / a == b);
        uint e = d / c;
        require(d == e * c);
        return e;
    }
    //exactAddとは、a+bを計算する関数です。
      function exactAdd(uint a, uint b) internal pure returns (uint) {
         uint c = a + b;
         require(c >= a);
         return c;
      }
      //exactSubとは、a-bを計算する関数です。
      function exactSub(uint a, uint b) internal pure returns (uint) {
         require(b <= a);
         return a - b;
      }
      //exactMulとは、a*bを計算する関数です。
      function exactMul(uint a, uint b) internal pure returns (uint) {
         uint c = a * b;
         require(a == 0 || c / a == b);
         return c;
      }
      
}