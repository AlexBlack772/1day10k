pragma solidity ^0.8.13;

//UniswapV3Flash
contract UniswapV3Flash {
   address private constant FACTORY = 0x1F98431c8aD98523631AE4a59f267346ea31F984;

   //FlashCallbackDataとは、フラッシュコールバックデータです。
   struct FlashCallbackData {
      address token0;
      address token1;
      uint amount0;
      uint amount1;
   }

   IERC20 private immutable token0;
    IERC20 private immutable token1;

    IUniswapV3Pool private immutable pool;

    //constructorとは、コンストラクタです。
      constructor(address _token0, address _token1) {
         token0 = IERC20(_token0);
         token1 = IERC20(_token1);
         pool = IUniswapV3Pool(IUniswapV3Factory(FACTORY).getPool(_token0, _token1, 3000));
      }

   //getPoolとは、プールを取得する関数です。
   function getPool() public view returns (address) {
      return address(pool);
   }

   //flashとは、フラッシュを実行する関数です。
   function flash(uint amount0, uint amount1) public {
      FlashCallbackData memory data = FlashCallbackData({
         token0: address(token0),
         token1: address(token1),
         amount0: amount0,
         amount1: amount1
      });
      pool.flash(address(this), abi.encode(data), amount0, amount1);
   }

   //niswapV3FlashCallbackとは、UniswapV3FlashCallbackを実装する関数です。
   function uniswapV3FlashCallback(
      uint amount0,
      uint amount1,
      bytes calldata data
   ) external {
      FlashCallbackData memory callbackData = abi.decode(data, (FlashCallbackData));
      require(callbackData.token0 == address(token0), "token0 mismatch");
      require(callbackData.token1 == address(token1), "token1 mismatch");
      require(callbackData.amount0 == amount0, "amount0 mismatch");
      require(callbackData.amount1 == amount1, "amount1 mismatch");
      token0.transfer(msg.sender, amount0);
      token1.transfer(msg.sender, amount1);
   }

}

//PoolAddressとは、プールアドレスです。
library PoolAddress {
   //bytes32とは、256ビットのデータを格納するためのデータ型
    bytes32 internal constant POOL_INIT_CODE_HASH =
        0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54;

        //PoolKeyとは、プールキーです。
         struct PoolKey {
               address token0;
               address token1;
               uint24 fee;
         }

         //getPoolKeyとは、プールキーを取得する関数です。
         function getPoolKey(
               address tokenA,
               address tokenB,
               uint24 fee
         ) internal pure returns (PoolKey memory) {
               return PoolKey(tokenA < tokenB ? tokenA : tokenB, tokenA < tokenB ? tokenB : tokenA, fee);
         }

         //computeAddressとは、アドレスを計算する関数です。
         function computeAddress(
               address factory,
               PoolKey memory poolKey
         ) internal pure returns (address pool) {
               pool = address(uint160(uint256(keccak256(abi.encodePacked(
                     hex'ff',
                     factory,
                     keccak256(abi.encode(poolKey.token0, poolKey.token1, poolKey.fee)),
                     POOL_INIT_CODE_HASH
               )))));
         }

}

//IUniswapV3Poolとは、UniswapV3Poolのインターフェースです。
interface IUniswapV3Pool {
   //flashとは、フラッシュを実行する関数です。
   function flash(
      address recipient,
      bytes calldata data,
      uint256 amount0,
      uint256 amount1
   ) external;
}

//IERC20とは、ERC20のインターフェースです。
interface IERC20 {
   //transferとは、トークンを転送する関数です。
   function transfer(address to, uint256 value) external returns (bool);
}

//IWTHとは、WETHのインターフェースです。
interface IWETH {
   //depositとは、デポジットを実行する関数です。
   function deposit() external payable;

   //withdrawとは、ウィズドローを実行する関数です。
   function withdraw(uint256) external;
}


