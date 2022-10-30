pragma solidity ^0.8.10;

//ICurveFiZapとは、CurveFiZapを表すコントラクトです。
contract ICurveFiZap {
    //add_liquidityとは、CurveFiに対してリクエストを送信するための関数です。
    function add_liquidity(
        uint256[4] calldata uamounts,
        uint256 min_mint_amount
    ) external payable returns (uint256);
    //calc_withdraw_one_coinとは、1つのコインを計算するための関数です。
      function calc_withdraw_one_coin(uint256 _token_amount, int128 i)
         external
         view
         returns (uint256);
      //remove_liquidity_one_coinとは、1つのコインを削除するための関数です。
      function remove_liquidity_one_coin(
         uint256 _token_amount,
         int128 i,
         uint256 min_uamount
      ) external returns (uint256);
      //withdraw_donated_dustとは、寄付されたダストを引き出すための関数です。
      function withdraw_donated_dust() external;
      //coinsとは、コインを取得するための関数です。
      function coins(int128 arg0) external view returns (address);
      //coinsとは、コインを取得するための関数です。
      function coins() external view returns (address[4] memory);
      //tokenとは、トークンを取得するための関数です。
      function token() external view returns (address);
}