pragma solidity ^0.6.0;

contract ICurveFiCurve {
   //get_virtual_priceとは、仮想価格を取得する
   function get_virtual_price() external view returns (uint256);
   //add_liquidityとは、リキッドティを追加する
   function add_liquidity(uint256[4] calldata amounts, uint256 min_mint_amount) external;
   //get_dyとは、dyを取得する
   function get_dy(int128 i, int128 j, uint256 dx) external view returns (uint256);
   //get_dy_underlyingとは、アンダーリングのdyを取得する
   function get_dy_underlying(int128 i, int128 j, uint256 dx) external view returns (uint256);
   //exchangeとは、交換する
   function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
   //exchange_underlyingとは、アンダーリングを交換する
   function exchange_underlying(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
   //remove_liquidityとは、リキッドティを削除する
   function remove_liquidity(uint256 _amount, uint256[4] calldata min_amounts) external;
   //remove_liquidity_imbalanceとは、リキッドティの不均衡を削除する
   function remove_liquidity_imbalance(uint256[4] calldata amounts, uint256 max_burn_amount) external;
   //commit_new_parametersとは、新しいパラメータをコミットする
   function commit_new_parameters(uint256 amplification_coefficient, uint256 new_fee, uint256 new_admin_fee) external;
   //apply_new_parametersとは、新しいパラメータを適用する
   function apply_new_parameters() external;
   //revert_new_parametersとは、新しいパラメータを元に戻す
   function revert_new_parameters() external;
   //commit_transfer_ownershipとは、所有権の移転をコミットする
   function commit_transfer_ownership(address _owner) external;
   //apply_transfer_ownershipとは、所有権の移転を適用する
   function apply_transfer_ownership() external;
   //revert_transfer_ownershipとは、所有権の移転を元に戻す
   function revert_transfer_ownership() external;
   //withdraw_admin_feesとは、管理者の手数料を引き出す
   function withdraw_admin_fees() external;
   //coinsとは、コインを取得する
   function coins(uint256 arg0) external view returns (address);
   //underlying_coinsとは、アンダーリングコインを取得する
   function underlying_coins(uint256 arg0) external view returns (address);
   //balancesとは、バランスを取得する
   function balances(uint256 arg0) external view returns (uint256);
   //admin_feeとは、管理者の手数料を取得する
   function admin_fee() external view returns (uint256);
   //ownerとは、所有者を取得する
   function owner() external view returns (address);
   //admin_actions_deadlineとは、管理者のアクションの締め切りを取得する
   function admin_actions_deadline() external view returns (uint256);
   //transfer_ownership_deadlineとは、所有権の移転の締め切りを取得する
   function transfer_ownership_deadline() external view returns (uint256);
   //future_feeとは、未来の手数料を取得する
   function future_fee() external view returns (uint256);
   //future_admin_feeとは、未来の管理者の手数料を取得する
   function future_admin_fee() external view returns (uint256);
   //future_amplification_coefficientとは、未来の増幅係数を取得する
   function future_amplification_coefficient() external view returns (uint256);
   


}