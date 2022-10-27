pragma solidity ^0.6.0;

interface IUniswapV2Pair {
    function name() external pure returns (string memory);
      function symbol() external pure returns (string memory);
      function decimals() external pure returns (uint8);
      function totalSupply() external view returns (uint);
      function balanceOf(address owner) external view returns (uint);
      function allowance(address owner, address spender) external view returns (uint);
      function approve(address spender, uint value) external returns (bool);
      function transfer(address to, uint value) external returns (bool);
      //tranferFromとは、トークンを転送する関数
      function transferFrom(address from, address to, uint value) external returns (bool);
      //DOMAIN_SEPARATORとは、ドメインセパレーター
      function DOMAIN_SEPARATOR() external view returns (bytes32);
      //PERMIT_TYPEHASHとは、許可のハッシュ
      function PERMIT_TYPEHASH() external pure returns (bytes32);
      //noncesとは、nonceの値を取得する関数
      function nonces(address owner) external view returns (uint);
      //permitとは、許可する関数
      function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;
      //MINIMUM_LIQUIDITYとは、最小のリクイディティ
      function MINIMUM_LIQUIDITY() external pure returns (uint);
      //factoryとは、ファクトリーのアドレス
      function factory() external view returns (address);
      //token0とは、トークン0のアドレス
      function token0() external view returns (address);
      //token1とは、トークン1のアドレス
      function token1() external view returns (address);
      //getReservesとは、リザーブを取得する関数
      function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
      //price0CumulativeLastとは、最後の価格0の累積
      

      
      

}