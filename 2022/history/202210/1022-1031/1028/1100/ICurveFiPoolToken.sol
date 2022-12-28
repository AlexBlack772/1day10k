pragma solidity ^0.6.0;

contract ICurveFiPoolToken {
   //set_minterとは、ミンターを設定する
   function set_minter(address) external;
   //totalSupplyとは、総供給量を取得する
   function totalSupply() external view returns (uint256);
   //allowanceとは、許可を取得する
   function allowance(address, address) external view returns (uint256);
   //transferとは、転送する
   function transfer(address, uint256) external returns (bool);
   //approveとは、承認する
   function approve(address, uint256) external returns (bool);
   //transferFromとは、転送する
   function transferFrom(address, address, uint256) external returns (bool);
   //mintとは、ミントする
   function mint(address, uint256) external;
   //burnとは、バーンする
   function burn(address, uint256) external;
   //burnFromとは、バーンする
   function burnFrom(address, uint256) external;
   //nameとは、名前を取得する
   function name() external view returns (string memory);
   //symbolとは、シンボルを取得する
   function symbol() external view returns (string memory);
   //decimalsとは、小数点を取得する
   function decimals() external view returns (uint8);
   //balanceOfとは、残高を取得する
   function balanceOf(address) external view returns (uint256);
}