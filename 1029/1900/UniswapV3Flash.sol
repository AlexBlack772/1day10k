pragma solidity ^0.8.13;

contract UniswapV3Flash {
    address private constant FACTORY = 0x1F98431c8aD98523631AE4a59f267346ea31F984;

    //FlashCallbackDataとは、フラッシュコールバックデータ
    struct FlashCallbackData {
        uint amount0;
        uint amount1;
        address caller;
    }

    IERC20 private immutable token0;
    IERC20 private immutable token1;

    IUniswapV3Pool private immutable pool;

    //constructorとは、コンストラクタ
      constructor(address _token0, address _token1, uint24 _fee) {
         token0 = IERC20(_token0);
         token1 = IERC20(_token1);
   
         pool = IUniswapV3Pool(
               PoolAddress.computeAddress(
                  FACTORY,
                  PoolAddress.getPoolKey(_token0, _token1, _fee)
               )
         );
      }

      //getPoolとは、プールを取得する関数
      function getPool() external view returns (IUniswapV3Pool) {
         return pool;
      }

      //flashとは、フラッシュする関数
      function flash(uint amount0, uint amount1) external {
         pool.flash(
            address(this),
            abi.encode(FlashCallbackData(amount0, amount1, msg.sender)),
            amount0,
            amount1
         );
      }

      //uniswapV3SwapCallbackとは、UniswapV3スワップコールバック関数
      function uniswapV3SwapCallback(
         int256 amount0Delta,
         int256 amount1Delta,
         bytes calldata data
      ) external {
         require(msg.sender == address(pool), "UniswapV3Flash: unauthorized");

         (FlashCallbackData memory callbackData) = abi.decode(data, (FlashCallbackData));

         if (amount0Delta > 0) {
            token0.transfer(callbackData.caller, uint(amount0Delta));
         } else if (amount1Delta > 0) {
            token1.transfer(callbackData.caller, uint(amount1Delta));
         }

         if (callbackData.amount0 > 0) {
            token0.transferFrom(callbackData.caller, address(this), callbackData.amount0);
            token0.approve(address(pool), callbackData.amount0);
         }

         if (callbackData.amount1 > 0) {
            token1.transferFrom(callbackData.caller, address(this), callbackData.amount1);
            token1.approve(address(pool), callbackData.amount1);
         }
      }
}

//poolAddressとは、プールアドレス
library PoolAddress {
   //computeAddressとは、アドレスを計算する関数
   function computeAddress(
      address factory,
      PoolKey memory key
   ) internal pure returns (address pool) {
      pool = address(
         uint160(
            uint256(
               keccak256(
                  abi.encodePacked(
                     hex"ff",
                     factory,
                     keccak256(abi.encode(key.token0, key.token1, key.fee)),
                     hex"e9c5d2f5b0e3a25e2ea2512f1e0546bb8d87417f2f2f445f7382d7a65c052600"
                  )
               )
            )
         )
      );
   }

   //getPoolKeyとは、プールキーを取得する関数
   function getPoolKey(
      address tokenA,
      address tokenB,
      uint24 fee
   ) internal pure returns (PoolKey memory key) {
      require(fee <= 3000, "UniswapV3Flash: fee exceeds 30%");
      (key.token0, key.token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
      key.fee = fee;
   }

   //PoolKeyとは、プールキー
   struct PoolKey {
      address token0;
      address token1;
      uint24 fee;
   }
}
