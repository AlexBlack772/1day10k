pragma solidity ^0.5.0;

contract ICurveFiCurve {
   //get_virtual_priceとは、仮想価格を取得するための関数です。
   function get_virtual_price() external view returns (uint256);
   //add_liquidityとは、CurveFiに対してリクエストを送信するための関数です。
   function add_liquidity(uint256[4] calldata uamounts, uint256 min_mint_amount)
      external
      payable
      returns (uint256);
      //get_dyとは、dyを取得するための関数です。
   function get_dy(int128 i, int128 j, uint256 dx) external view returns (uint256);
   //get_dy_underlyingとは、dyを取得するための関数です。
   function get_dy_underlying(int128 i, int128 j, uint256 dx)
      external
      view
      returns (uint256);
   //exchangeとは、交換するための関数です。
   function exchange(
      int128 i,
      int128 j,
      uint256 dx,
      uint256 min_dy
   ) external payable returns (uint256);
   //exchange_underlyingとは、交換するための関数です。
   function exchange_underlying(
      int128 i,
      int128 j,
      uint256 dx,
      uint256 min_dy
   ) external payable returns (uint256);
   //commit_new_parametersとは、新しいパラメータをコミットするための関数です。
   function commit_new_parameters(
      uint256 amplification,
      uint256 new_fee,
      uint256 new_admin_fee
   ) external;
   //apply_new_parametersとは、新しいパラメータを適用するための関数です。
   function apply_new_parameters() external;
   //revert_new_parametersとは、新しいパラメータを元に戻すための関数です。
   function revert_new_parameters() external;
   //apply_transfer_ownershipとは、所有権の移転を適用するための関数です。
   function apply_transfer_ownership() external;
   //revert_transfer_ownershipとは、所有権の移転を元に戻すための関数です。
   function revert_transfer_ownership() external;
   //commit_transfer_ownershipとは、所有権の移転をコミットするための関数です。
   function commit_transfer_ownership(address _owner) external;
   //underlying_coinsとは、基本コインを取得するための関数です。
   function underlying_coins(int128 arg0) external view returns (address);
   //balancesとは、残高を取得するための関数です。
   function balances(int128 arg0) external view returns (uint256);
   //admin_feeとは、管理者の手数料を取得するための関数です。
   function admin_fee() external view returns (uint256);
   //ownerとは、オーナーを取得するための関数です。
   function owner() external view returns (address);
   //admin_actions_deadlineとは、管理者のアクションの期限を取得するための関数です。
   function admin_actions_deadline() external view returns (uint256);
   //future_feeとは、未来の手数料を取得するための関数です。
   function future_fee() external view returns (uint256);
   //future_admin_feeとは、未来の管理者の手数料を取得するための関数です。
   function future_admin_fee() external view returns (uint256);
   //future_ownerとは、未来のオーナーを取得するための関数です。
   function future_owner() external view returns (address);

}
