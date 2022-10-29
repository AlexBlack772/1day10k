pragma solidity ^0.8.10;

//ICurveFiPoolTokenとは、CurveFiのプールトークンを管理するためのインターフェースです。
contract ICurveFiPoolToken {
   //set_minterとは、ミンターを設定するための関数です。
    function set_minter(address _minter) external;
    //mintとは、トークンを発行するための関数です。
      function mint(address _to, uint256 _value) external;
      //allowanceとは、許可を取得するための関数です。
      function allowance(address owner, address spender) external view returns (uint256);
      //approveとは、許可を設定するための関数です。
      function approve(address spender, uint256 amount) external returns (bool);
      //transferFromとは、トークンを転送するための関数です。
      function transferFrom(
         address sender,
         address recipient,
         uint256 amount
      ) external returns (bool);
      //transferとは、トークンを転送するための関数です。
      function transfer(address recipient, uint256 amount) external returns (bool);
      //balanceOfとは、残高を取得するための関数です。
      function balanceOf(address account) external view returns (uint256);
      //decimalsとは、小数点以下の桁数を取得するための関数です。
      function decimals() external view returns (uint8);
      //symbolとは、シンボルを取得するための関数です。
      function symbol() external view returns (string memory);
      //nameとは、名前を取得するための関数です。
      function name() external view returns (string memory);
      //totalSupplyとは、総供給量を取得するための関数です。
      function totalSupply() external view returns (uint256);
      //burnとは、トークンを破棄するための関数です。
      function burn(address _from, uint256 _value) external;
      //burnFromとは、トークンを破棄するための関数です。
      function burnFrom(address _from, uint256 _value) external;
      
}