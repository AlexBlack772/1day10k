pragma solidity ^0.8.13;

contract ICurveFiCurve {
   //get_virtual_priceとは、仮想価格を取得する関数
   function get_virtual_price() external view returns (uint);
   //add_liquidityとは、add_liquidityの関数
   function add_liquidity(uint256[4] calldata uamounts, uint256 min_mint_amount) external;
   //exchangeとは、交換する関数
   function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
   //exchange_underlyingとは、基本コインを交換する関数
   function exchange_underlying(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
   //get_dyとは、dyを取得する関数
   function get_dy(int128 i, int128 j, uint256 dx) external view returns (uint256);
   //get_dy_underlyingとは、基本コインのdyを取得する関数
   function get_dy_underlying(int128 i, int128 j, uint256 dx) external view returns (uint256);
   //remove_liquidityとは、流動性を削除する関数
   function remove_liquidity(uint256 _amount, uint256[4] calldata min_uamounts) external;
   //remove_liquidity_imbalanceとは、流動性の不均衡を削除する関数
   function remove_liquidity_imbalance(uint256[4] calldata uamounts, uint256 max_burn_amount) external;
   //remove_liquidity_one_coinとは、流動性の一つのコインを削除する関数
   function remove_liquidity_one_coin(uint256 _token_amount, int128 i, uint256 min_uamount) external;
   //commit_new_parametersとは、新しいパラメータをコミットする関数
   function commit_new_parameters(uint256 amplification, uint256 new_fee, uint256 new_admin_fee) external;
   //apply_new_parametersとは、新しいパラメータを適用する関数
   function apply_new_parameters() external;
   //revert_new_parametersとは、新しいパラメータを元に戻す関数
   function revert_new_parameters() external;
   //withdraw_admin_feesとは、管理者手数料を引き出す関数
   function withdraw_admin_fees() external;
   //balancesとは、残高
   function balances(int128 arg0) external view returns (uint256);
   //coinsとは、コイン
   function coins(int128 arg0) external view returns (address);
   //ownerとは、所有者
   function owner() external view returns (address);
   //admin_actions_deadlineとは、管理者アクションの期限
   function admin_actions_deadline() external view returns (uint256);
   //transfer_ownershipとは、所有権を移転する関数
   function transfer_ownership(address _owner) external;
   //future_admin_feeとは、未来の管理者手数料
   function future_admin_fee() external view returns (uint256);
   //future_feeとは、未来の手数料


}