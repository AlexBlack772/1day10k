pragma solidity ^0.6.0;

contract ICurveFiZap {
   //add_liquidityとは、流動性を追加する
   function add_liquidity(uint256[4] calldata amounts, uint256 min_mint_amount) external;
   //remove_liquidityとは、流動性を削除する
   function remove_liquidity(uint256 _amount, uint256[4] calldata min_amounts) external;
   //remove_liquidity_imbalanceとは、流動性の不均衡を削除する
   function remove_liquidity_imbalance(uint256[4] calldata amounts, uint256 max_burn_amount) external;
   //calc_withdraw_one_coinとは、コインを計算する
   function calc_withdraw_one_coin(uint256 _token_amount, int128 i) external view returns (uint256);
   //remove_liquidity_one_coinとは、コインを削除する
   function remove_liquidity_one_coin(uint256 _token_amount, int128 i, uint256 min_amount) external;
   //withdraw_donated_dustとは、寄付されたダストを引き出す
   function withdraw_donated_dust() external;
   //coinsとは、コインを取得する
   function coins(int128 arg0) external view returns (address);
   //underlying_coinsとは、アンダーリングコインを取得する
   function underlying_coins(int128 arg0) external view returns (address);
   //curveとは、カーブを取得する
   function curve() external view returns (address);
   //tokenとは、トークンを取得する
   function token() external view returns (address);
   

}