pragma solidity ^0.8.13;

//Vaultとは、ステーキングしたトークンを保管するコントラクトです。
contract Vault {
   IERC20 public immutable token;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

      constructor(address _token) {
         token = IERC20(_token);
      }

      //mintとは、トークンを発行する関数です。
      function mint(address account, uint amount) external {
         totalSupply += amount;
         balanceOf[account] += amount;
         token.transferFrom(msg.sender, address(this), amount);
      }

      //burnとは、トークンを破棄する関数です。
      function burn(address account, uint amount) external {
         totalSupply -= amount;
         balanceOf[account] -= amount;
         token.transfer(account, amount);
      }

      //depositとは、トークンを預ける関数です。
      function deposit(uint amount) external {
         mint(msg.sender, amount);
      }

      //withdrawとは、トークンを引き出す関数です。
      function withdraw(uint amount) external {
         burn(msg.sender, amount);
      }

}

interface IERC20 {
   //totalSupplyとは、トークンの総発行量を取得する関数です。
   function totalSupply() external view returns (uint);;

   //balanceOfとは、指定したアドレスのトークンの残高を取得する関数です。
   function balanceOf(address account) external view returns (uint);
   //allowanceとは、指定したアドレスが他のアドレスに許可されているトークンの残高を取得する関数です。
   function allowance(address owner, address spender) external view returns (uint);
   //approveとは、指定したアドレスにトークンを許可する関数です。
   function approve(address spender, uint amount) external returns (bool);
   //transferとは、指定したアドレスにトークンを送金する関数です。
   function transfer(address recipient, uint amount) external returns (bool);
   //transferFromとは、指定したアドレスからトークンを送金する関数です。
   function transferFrom(address sender, address recipient, uint amount) external returns (bool);
   
}