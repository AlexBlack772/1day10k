pragma solidity ^0.5.0;

contract ICurveFiZap {
   //add_liquidityとは、流動性を追加する関数
   function add_liquidity(uint256[4] calldata uamounts, uint256 min_mint_amount) external;
   //remove_liquidityとは、流動性を削除する関数
   function remove_liquidity(uint256 _amount, uint256[4] calldata min_uamounts) external;
   //remove_liquidity_imbalanceとは、流動性の不均衡を削除する関数
   function remove_liquidity_imbalance(uint256[4] calldata uamounts, uint256 max_burn_amount) external;
   //remove_liquidity_one_coinとは、流動性の一つのコインを削除する関数
   function remove_liquidity_one_coin(uint256 _token_amount, int128 i, uint256 min_uamount) external;
   //withdraw_donated_dustとは、

   //underlying_coinsとは、基本コイン
   function underlying_coins(int128 arg0) external view returns (address);
   
}