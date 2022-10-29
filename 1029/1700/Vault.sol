pragma solidity ^0.8.13;

//Vaultとは、あるアドレスに送金できるようにする機能
contract Vault {
   IERC20 public immutable token;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

      //constructorとは、コンストラクタ   
      constructor(IERC20 _token) {
         token = _token;
      }

      //_mintとは、トークンを発行する関数
      function _mint(address to, uint amount) internal {
         totalSupply += amount;
         balanceOf[to] += amount;
      }

      //_burnとは、トークンを破棄する関数
      function _burn(address from, uint amount) internal {
         totalSupply -= amount;
         balanceOf[from] -= amount;
      }

      //depositとは、トークンを預ける関数
      function deposit(uint amount) external {
         require(
            token.transferFrom(msg.sender, address(this), amount),
            "Vault: transfer failed"
         );
         _mint(msg.sender, amount);
      }

      //withdrawとは、トークンを引き出す関数
      function withdraw(uint amount) external {
         require(balanceOf[msg.sender] >= amount, "Vault: insufficient balance");
         _burn(msg.sender, amount);
         require(token.transfer(msg.sender, amount), "Vault: transfer failed");
      }
      
}