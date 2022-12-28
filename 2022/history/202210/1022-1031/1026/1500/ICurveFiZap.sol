pragma solidity ^0.8.13;

contract ICurveFiZap {
    function add_liquidity(uint256[4] calldata amounts, uint256 min_mint_amount) external;
    function remove_liquidity(uint256 _amount, uint256[4] calldata min_amounts) external;
    function remove_liquidity_imbalance(uint256[4] calldata amounts, uint256 max_burn_amount) external;
    function calc_token_amount(uint256[4] calldata amounts, bool deposit) external view returns (uint256 out);
    function calc_withdraw_one_coin(uint256 _token_amount, int128 i) external view returns (uint256 out);
    function withdraw_donated_dust() external;
    