pragma solidity ^0.8.10;

//IUniswapV2Pairとは、Uniswapのペアを管理するためのインターフェースです。
interface IUniswapV2Pair {
    //getReservesとは、リザーブを取得するための関数です。
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    //token0とは、トークン0を取得するための関数です。
    function token0() external view returns (address);
    //token1とは、トークン1を取得するための関数です。
    function token1() external view returns (address);
    //nameとは、名前を取得するための関数です。
      function name() external view returns (string memory);
      //symbolとは、シンボルを取得するための関数です。
      function symbol() external view returns (string memory);
      //decimalsとは、小数点以下の桁数を取得するための関数です。
      function decimals() external view returns (uint8);
      //totalSupplyとは、総供給量を取得するための関数です。
      function totalSupply() external view returns (uint);
      //balanceOfとは、残高を取得するための関数です。
      function balanceOf(address owner) external view returns (uint);
      //allowanceとは、許可を取得するための関数です。
      function allowance(address owner, address spender) external view returns (uint);
      //approveとは、許可を行うための関数です。
      function approve(address spender, uint value) external returns (bool);
      //transferとは、送金を行うための関数です。
      function transfer(address to, uint value) external returns (bool);
      //transferFromとは、送金を行うための関数です。
      function transferFrom(address from, address to, uint value) external returns (bool);
      //mintとは、発行を行うための関数です。
      function mint(address to) external returns (uint liquidity);
      //DOMAIN_SEPARATORとは、ドメインセパレーターを取得するための関数です。
      function DOMAIN_SEPARATOR() external view returns (bytes32);
      //PERMIT_TYPEHASHとは、許可のハッシュを取得するための関数です。
      function PERMIT_TYPEHASH() external pure returns (bytes32);
      //noncesとは、ノンスを取得するための関数です。
      function nonces(address owner) external view returns (uint);
      //permitとは、許可を行うための関数です。
      function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;
      //burnとは、破棄を行うための関数です。
      function burn(address to) external returns (uint amount0, uint amount1);
      //swapとは、スワップを行うための関数です。
      function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
      //skimとは、スキムを行うための関数です。
      function skim(address to) external;
      //syncとは、同期を行うための関数です。
      function sync() external;
      //initializeとは、初期化を行うための関数です。
      function initialize(address, address) external;
      

}