pragma solidity ^0.8.13;

//Mathとは、数学的な計算を行うためのライブラリです。
library Math {
    //absとは、絶対値を取得する関数です。
      function abs(int x) internal pure returns (uint) {
         return x < 0 ? uint(-x) : uint(x);
      }
}

//StableSwapとは、StableCoinを交換するためのコントラクトです。
contract StableSwap {
   uint private constant N = 3;
    
    uint private constant A = 1000 * (N**(N - 1));
    
    uint private constant SWAP_FEE = 300;
    
    uint private constant LIQUIDITY_FEE = (SWAP_FEE * N) / (4 * (N - 1));
    uint private constant FEE_DENOMINATOR = 1e6;

    address[N] public tokens;
    
    uint[N] private multipliers = [1, 1e12, 1e12];
    uint[N] public balances;

    
    uint private constant DECIMALS = 18;
    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    //_mintとは、トークンを発行する関数です。
      function _mint(address account, uint amount) internal {
         totalSupply += amount;
         balanceOf[account] += amount;
      }
      //_burnとは、トークンを破棄する関数です。
      function _burn(address account, uint amount) internal {
         totalSupply -= amount;
         balanceOf[account] -= amount;
      }
      //_xpとは、トークンの総額を取得する関数です。
      function _xp(uint[N] memory _balances) internal pure returns (uint) {
         uint s = 0;
         for (uint i = 0; i < N; i++) {
             s += _balances[i];
         }
         if (s == 0) return 0;
         uint prevX = 0;
         uint x = s;
         for (uint i = 0; i < 255; i++) {
             uint num = 0;
             uint den = 0;
             for (uint j = 0; j < N; j++) {
                 num += x / _balances[j];
                 den += x;
             }
             prevX = x;
             x = (num * s) / den;
             if (x > prevX) {
                 if (x - prevX <= 1) break;
             } else {
                 if (prevX - x <= 1) break;
             }
         }
         return x;
      }
      //_getDとは、トークンの総額を取得する関数です。
      function _getD(uint[N] memory _balances, uint _supply) internal pure returns (uint) {
         uint sum = 0;
         for (uint i = 0; i < N; i++) {
             sum += _balances[i];
         }
         if (sum == 0) return 0;
         uint dprev = 0;
         uint d = sum;
         for (uint i = 0; i < 255; i++) {
             uint num = 0;
             uint den = 0;
             for (uint j = 0; j < N; j++) {
                 num += d / (_balances[j] * multipliers[j]);
                 den += d;
             }
             dprev = d;
             d = (num * sum) / den;
             if (d > dprev) {
                 if (d - dprev <= 1) break;
             } else {
                 if (dprev - d <= 1) break;
             }
         }
         return d;
      }
      //getVirtualPriceとは、仮想価格を取得する関数です。
      function getVirtualPrice() public view returns (uint) {
         uint[N] memory balances;
         for (uint i = 0; i < N; i++) {
             balances[i] = balances[i] * multipliers[i];
         }
         uint d = _getD(balances, totalSupply);
         return d * (10**(DECIMALS * 2)) / totalSupply;
      }

      //swapとは、トークンを交換する関数です。
      function swap(uint i, uint j, uint dx, uint minDy) public {
         require(i != j, "i != j");
         require(i < N, "i < N");
         require(j < N, "j < N");
         uint[N] memory balances;
         for (uint k = 0; k < N; k++) {
             balances[k] = balances[k] * multipliers[k];
         }
         uint x = balances[i] + dx;
         uint y = balances[j] * balances[i] / x;
         uint dy = Math.abs(balances[j] - y);
         require(dy >= minDy, "dy >= minDy");
         balances[i] = x;
         balances[j] = y;
         uint d = _getD(balances, totalSupply);
         uint fee = d * SWAP_FEE / FEE_DENOMINATOR;
         uint _fee = d * LIQUIDITY_FEE / FEE_DENOMINATOR;
         uint _d = d - fee;
         uint _x = _d * balances[i] / d;
         uint _y = _d * balances[j] / d;
         balances[i] = _x;
         balances[j] = _y;
         uint _dx = balances[i] - _x;
         uint _dy = balances[j] - _y;
         balances[i] = balances[i] / multipliers[i];
         balances[j] = balances[j] / multipliers[j];
         _mint(msg.sender, _fee);
         _burn(msg.sender, _dx);
         _burn(msg.sender, _dy);
      }
      //addLiquidtyとは、トークンを追加する関数です。
      function addLiquidity(uint[N] memory _amounts, uint _minMintAmount) public {
         uint[N] memory balances;
         for (uint i = 0; i < N; i++) {
             balances[i] = balances[i] * multipliers[i];
         }
         uint d = _getD(balances, totalSupply);
         uint _d = d;
         if (totalSupply != 0) {
             for (uint i = 0; i < N; i++) {
                 uint balance = balances[i] + _amounts[i];
                 uint amount = balance * d / balances[i] - _d;
                 _burn(msg.sender, amount);
                 balances[i] = balance;
             }
         } else {
             for (uint i = 0; i < N; i++) {
                 _burn(msg.sender, _amounts[i]);
                 balances[i] += _amounts[i];
             }
         }
         uint mintAmount = _d * totalSupply / d;
         require(mintAmount >= _minMintAmount, "mintAmount >= _minMintAmount");
         _mint(msg.sender, mintAmount);
      }
      //removeLiquidityとは、トークンを削除する関数です。
      function removeLiquidity(uint _amount, uint[N] memory _minAmounts) public {
         uint[N] memory balances;
         for (uint i = 0; i < N; i++) {
             balances[i] = balances[i] * multipliers[i];
         }
         uint d = _getD(balances, totalSupply);
         uint _d = d * _amount / totalSupply;
         for (uint i = 0; i < N; i++) {
             uint amount = balances[i] * _d / d;
             _mint(msg.sender, amount);
             balances[i] -= amount;
         }
         _burn(msg.sender, _amount);
      }

      //_calcWithdrawOneTokenとは、トークンを引き出す関数です。
      function _calcWithdrawOneToken(uint _tokenBalance, uint _totalSupply, uint _amount) internal pure returns (uint) {
         return _tokenBalance * _amount / _totalSupply;
      }
      //calcWithdrawOneTokenとは、トークンを引き出す関数です。
      function calcWithdrawOneToken(uint _tokenBalance, uint _totalSupply, uint _amount) public pure returns (uint) {
         return _calcWithdrawOneToken(_tokenBalance, _totalSupply, _amount);
      }
      //removeLiquidityOneTokenとは、トークンを削除する関数です。
      function removeLiquidityOneToken(uint _tokenIndex, uint _amount, uint _minAmount) public {
         require(_tokenIndex < N, "_tokenIndex < N");
         uint tokenBalance = balances[_tokenIndex];
         uint amount = _calcWithdrawOneToken(tokenBalance, totalSupply, _amount);
         require(amount >= _minAmount, "amount >= _minAmount");
         _mint(msg.sender, amount);
         _burn(msg.sender, _amount);
      }


}

//IERC20とは、ERC20のインターフェースです。
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}