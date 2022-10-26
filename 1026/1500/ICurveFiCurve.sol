pragma solidity ^0.8.13;

contract ICurveFiCurve {
   function get_virtual_price() external view returns (uint256 out);
   function add_liquidity(uint256[4] calldata amounts, uint256 min_mint_amount) external;
   function get_dy(int128 i, int128 j, uint256 dx) external view returns (uint256 out);
   function get_dy_underlying(int128 i, int128 j, uint256 dx) external view returns (uint256 out);
   function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
   function exchange_underlying(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
   function remove_liquidity(uint256 _amount, uint256[4] calldata min_amounts) external;
   function remove_liquidity_imbalance(uint256[4] calldata amounts, uint256 max_burn_amount) external;
   function commit_new_parameters(uint256 amplification_coefficient, uint256 new_fee, uint256 new_admin_fee) external;
   function apply_new_parameters() external;
   function revert_new_parameters() external;
   function apply_transfer_ownership() external;
   function revert_transfer_ownership() external;
   function withdraw_admin_fees() external;
   function coins(int128 arg0) external view returns (address out);
   function underlying_coins(int128 arg0) external view returns (address out);
   function balances(int128 arg0) external view returns (uint256 out);
   function A() external view returns (uint256 out);
   function fee() external view returns (uint256 out);
   function admin_fee() external view returns (uint256 out);
   function owner() external view returns (address out);
   function admin_actions_deadline() external view returns (uint256 out);
   function transfer_ownership_deadline() external view returns (uint256 out);
   function future_A() external view returns (uint256 out);
   function future_fee() external view returns (uint256 out);
   function future_admin_fee() external view returns (uint256 out);
   function future_owner() external view returns (address out);
   

}