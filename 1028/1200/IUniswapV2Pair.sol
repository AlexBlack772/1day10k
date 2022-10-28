pragma solidity ^0.5.0;

interface IUniswapV2Pair {
   //nameとは、名前
   function name() external pure returns (string memory);
   //symbolとは、シンボル
   function symbol() external pure returns (string memory);
   //decimalsとは、小数点
   function decimals() external pure returns (uint8);
   //totalSupplyとは、総供給量
   function totalSupply() external view returns (uint);
   //balanceOfとは、残高を取得する
   function balanceOf(address owner) external view returns (uint);
   //allowanceとは、許可を取得する
   function allowance(address owner, address spender) external view returns (uint);
   //approveとは、許可を設定する
   function approve(address spender, uint value) external returns (bool);
   //transferとは、転送する
   function transfer(address to, uint value) external returns (bool);
   //transferFromとは、転送する
   function transferFrom(address from, address to, uint value) external returns (bool);
   //DOMAIN_SEPARATORとは、ドメインセパレーター
   function DOMAIN_SEPARATOR() external view returns (bytes32);
   //PERMIT_TYPEHASHとは、許可タイプハッシュ
   function PERMIT_TYPEHASH() external pure returns (bytes32);
   //noncesとは、ノンス
   function nonces(address owner) external view returns (uint);
   //permitとは、許可を設定する
   function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;
   //MINIMUM_LIQUIDITYとは、最小流動性
   function MINIMUM_LIQUIDITY() external pure returns (uint);
   //factoryとは、ファクトリー
   function factory() external view returns (address);
   //token0とは、トークン0
   function token0() external view returns (address);
   //token1とは、トークン1
   function token1() external view returns (address);
   //getReservesとは、リザーブを取得する
   function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
   //price0CumulativeLastとは、価格0の最終累積
   function price0CumulativeLast() external view returns (uint);
   //price1CumulativeLastとは、価格1の最終累積
   function price1CumulativeLast() external view returns (uint);
   //kLastとは、最終K
   function kLast() external view returns (uint);
   //mintとは、ミントする
   function mint(address to) external returns (uint liquidity);
   //burnとは、バーンする
   function burn(address to) external returns (uint amount0, uint amount1);
   //swapとは、スワップする
   function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
   //skimとは、スキムする
   function skim(address to) external;
   //syncとは、同期する
   function sync() external;
   
}