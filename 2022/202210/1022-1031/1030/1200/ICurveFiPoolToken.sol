pragma solidity ^0.5.0;

contract ICurveFiPoolToken {
   //totalSupplyとは、全部の供給量
   function totalSupply() external view returns (uint256);
   //balanceOfとは、残高
   function balanceOf(address account) external view returns (uint256);
   //transferとは、転送する関数
   function transfer(address recipient, uint256 amount) external returns (bool);
   //transferFromとは、転送する関数
   function transferFrom(
      address sender,
      address recipient,
      uint256 amount
   ) external returns (bool);
   //approveとは、承認する関数
   function approve(address spender, uint256 amount) external returns (bool);
   //allowanceとは、残高
   function allowance(address owner, address spender)
      external
      view
      returns (uint256);
   //mintとは、新規発行する関数
   function mint(address account, uint256 amount) external;
   //burnとは、破棄する関数
   function burn(address account, uint256 amount) external;
   //burnFromとは、破棄する関数
   function burnFrom(address account, uint256 amount) external;
   //nameとは、名前
   function name() external view returns (string memory);
   //symbolとは、シンボル
   function symbol() external view returns (string memory);
   //decimalsとは、小数点
   function decimals() external view returns (uint8);

}