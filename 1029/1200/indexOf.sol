//IndexOfとは、配列の中にある要素の位置を返す関数です。
contract IndexOf {
    //indexOfとは、配列の中にある要素の位置を返す関数です。
    function indexOf(uint[] storage self, uint value) internal returns (uint) {
        for (uint i = 0; i < self.length; i++) {
            if (self[i] == value) {
                return i;
            }
        }
        return uint(-1);
    }

    //whatWasTheValとは、配列の中にある要素の位置を返す関数です。
      function whatWasTheVal(uint[] storage self, uint value) internal returns (uint) {
         return self[indexOf(self, value)];
      }
      
}