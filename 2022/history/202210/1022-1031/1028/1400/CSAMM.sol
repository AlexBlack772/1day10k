pragma solidity ^0.8.13;

//CSAMMとは、CSAMMコントラクトです。
contract CSAMM {
   IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint public reserve0;
    uint public reserve1;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    //constructorとは、コンストラクタです。
      constructor(IERC20 _token0, IERC20 _token1) {
         token0 = _token0;
         token1 = _token1;
      }

      //mintとは、トークンを発行する関数です。
      function _mint(address _to, uint _amount) private {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
    }
    //_burnとは、トークンを破棄する関数です。
      function _burn(address _from, uint _amount) private {
         balanceOf[_from] -= _amount;
         totalSupply -= _amount;
      }
      //_updateとは、リザーブを更新する関数です。
      function _update(uint _amount0, uint _amount1) private {
         reserve0 += _amount0;
         reserve1 += _amount1;
      }
      //swapとは、トークンを交換する関数です。
      function swap(uint _amount0, uint _amount1) external {
         require(_amount0 > 0 && _amount1 > 0, "Invalid input");

         uint _totalSupply = totalSupply;
         if (_totalSupply == 0) {
            reserve0 = _amount0;
            reserve1 = _amount1;
            _mint(msg.sender, _amount0);
            token0.transferFrom(msg.sender, address(this), _amount0);
            token1.transferFrom(msg.sender, address(this), _amount1);
         } else {
            uint _balance0 = _amount0 * _totalSupply / reserve0;
            uint _balance1 = _amount1 * _totalSupply / reserve1;
            require(_balance0 == _balance1, "Invalid input");

            _update(_amount0, _amount1);
            _mint(msg.sender, _balance0);
            token0.transferFrom(msg.sender, address(this), _amount0);
            token1.transferFrom(msg.sender, address(this), _amount1);
         }
      }
      //addLiquidityとは、リクイジットを追加する関数です。
      function addLiquidity(uint _amount0, uint _amount1) external {
         require(_amount0 > 0 && _amount1 > 0, "Invalid input");

         uint _totalSupply = totalSupply;
         if (_totalSupply == 0) {
            reserve0 = _amount0;
            reserve1 = _amount1;
            _mint(msg.sender, _amount0);
            token0.transferFrom(msg.sender, address(this), _amount0);
            token1.transferFrom(msg.sender, address(this), _amount1);
         } else {
            uint _balance0 = _amount0 * _totalSupply / reserve0;
            uint _balance1 = _amount1 * _totalSupply / reserve1;
            require(_balance0 == _balance1, "Invalid input");

            _update(_amount0, _amount1);
            _mint(msg.sender, _balance0);
            token0.transferFrom(msg.sender, address(this), _amount0);
            token1.transferFrom(msg.sender, address(this), _amount1);
         }
      }
      //removeLiquidityとは、リクイジットを削除する関数です。
      function removeLiquidity(uint _amount) external {
         require(_amount > 0, "Invalid input");

         uint _totalSupply = totalSupply;
         uint _amount0 = _amount * reserve0 / _totalSupply;
         uint _amount1 = _amount * reserve1 / _totalSupply;

         _burn(msg.sender, _amount);
         _update(-_amount0, -_amount1);
         token0.transfer(msg.sender, _amount0);
         token1.transfer(msg.sender, _amount1);
      }
}

//ERC20とは、ERC20トークンのインターフェースです。
interface IERC20 {
   //totalSupplyとは、トークンの総供給量を返す関数です。
   function totalSupply() external view returns (uint);
   //balanceOfとは、指定したアドレスの残高を返す関数です。
   function balanceOf(address _owner) external view returns (uint);
   //transferとは、指定したアドレスにトークンを送金する関数です。
   function transfer(address _to, uint _value) external returns (bool);
   //allowanceとは、指定したアドレスが送金できる残高を返す関数です。
   function allowance(address _owner, address _spender) external view returns (uint);
   //approveとは、指定したアドレスにトークンを送金できる残高を設定する関数です。
   function approve(address _spender, uint _value) external returns (bool);
   //transferFromとは、指定したアドレスからトークンを送金する関数です。
   function transferFrom(address _from, address _to, uint _value) external returns (bool);
   //eventとは、イベントです。
   event Transfer(address indexed _from, address indexed _to, uint _value);
   event Approval(address indexed _owner, address indexed _spender, uint _value);
   

}