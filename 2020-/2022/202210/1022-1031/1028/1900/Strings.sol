pragma solidity ^0.4.16;
pragma experimental "v0.5.0";
pragma experimental "ABIEncoderV2";

library Strings {
   uint constant internal DL = 0x80;
    uint constant internal DH = 0xBF;

   

    // R1 - 1
    uint constant internal B11L = 0x00;
    uint constant internal B11H = 0x7F;

    // R2 - 2
    uint constant internal B21L = 0xC2;
    uint constant internal B21H = 0xDF;

    // R3 - 3
    uint constant internal B31 = 0xE0;
    uint constant internal B32L = 0xA0;
    uint constant internal B32H = 0xBF;

    // R4 - 3
    uint constant internal B41L = 0xE1;
    uint constant internal B41H = 0xEC;

    // R5 - 3
    uint constant internal B51 = 0xED;
    uint constant internal B52L = 0x80;
    uint constant internal B52H = 0x9F;

    // R6 - 3
    uint constant internal B61L = 0xEE;
    uint constant internal B61H = 0xEF;

    // R7 - 4
    uint constant internal B71 = 0xF0;
    uint constant internal B72L = 0x90;
    uint constant internal B72H = 0xBF;

    // R8 - 4
    uint constant internal B81L = 0xF1;
    uint constant internal B81H = 0xF3;

    // R9 - 4
    uint constant internal B91 = 0xF4;
    uint constant internal B92L = 0x80;
    uint constant internal B92H = 0x8F;

    //validateとは、文字列が正しいかどうかを判定する関数です。
      function validate(string memory _str) internal pure returns (bool) {
         bytes memory b = bytes(_str);
         uint l = b.length;
         if (l == 0) {
               return false;
         }
         uint i = 0;
         while (i < l) {
               uint8 c = uint8(b[i]);
               if (c < DL) {
                  if (c < B11L) {
                     return false;
                  }
                  i += 1;
               } else if (c < DH) {
                  if (c < B21L) {
                     return false;
                  }
                  i += 2;
               } else if (c < B31) {
                  return false;
               } else if (c < B41L) {
                  if (c > B32H) {
                     return false;
                  }
                  i += 3;
               } else if (c < B51) {
                  if (c < B41H) {
                     return false;
                  }
                  if (c > B52H) {
                     return false;
                  }
                  i += 3;
               } else if (c < B61L) {
                  if (c > B52H) {
                     return false;
                  }
                  i += 3;
               } else if (c < B71) {
                  return false;
               } else if (c < B81L) {
                  if (c > B72H) {
                     return false;
                  }
                  i += 4;
               } else if (c < B91) {
                  if (c < B81H) {
                     return false;
                  }
                  if (c > B92H) {
                     return false;
                  }
                  i += 4;
               } else {
                  return false;
               }
         }
         return true;
      }
      //parseRuneとは、文字列のi番目の文字を取得する関数です。
      function parseRune(string memory _str, uint _i) internal pure returns (uint32) {
         bytes memory b = bytes(_str);
         uint l = b.length;
         if (_i >= l) {
               return 0;
         }
         uint32 c = uint32(b[_i]);
         if (c < DL) {
               return c;
         }
         if (c < DH) {
               if (_i + 1 >= l) {
                     return 0;
               }
               uint32 c1 = uint32(b[_i + 1]);
               if (c1 < DL || DH < c1) {
                     return 0;
               }
               return (c - B21L) * 64 + (c1 - DL);
         }
         if (c < B31) {
               return 0;
         }
         if (_i + 2 >= l) {
               return 0;
         }
         uint32 c1 = uint32(b[_i + 1]);
         if (c1 < DL || DH < c1) {
               return 0;
         }
         uint32 c2 = uint32(b[_i + 2]);
         if (c2 < DL || DH < c2) {
               return 0;
         }
         if (c < B51) {
               if (c < B41L) {
                     return 0;
               }
               if (c > B52H) {
                     return 0;
               }
               return (c - B41L) * 4096 + (c1 - DL) * 64 + (c2 - DL);
         }
         if (c < B61L) {
               return 0;
         }
         if (_i + 3 >= l) {
               return 0;
         }
         uint32 c3 = uint32(b[_i + 3]);
         if (c3 < DL || DH < c3) {
               return 0;
         }
         if (c < B81L) {
               if (c < B71) {
                     return 0;
               }
               if (c > B72H) {
                     return 0;
               }
               return (c - B71) * 262144 + (c1 - DL) * 4096 + (c2 - DL) * 64 + (c3 - DL);
         }
      }
}