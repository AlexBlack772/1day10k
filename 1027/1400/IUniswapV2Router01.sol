pragma solidity ^0.6.0;

interface IUniswapV2Router01 {
   //factoryとは、ファクトリーのアドレス
    function factory() external pure returns (address);
    //WETHとは、ウェーブイーエス
    function WETH() external pure returns (address);
    //addLiquidityとは、リクイディティを追加する関数
    function addLiquidity(
        address tokenA,
        address tokenB,
        //amountADesiredとは、トークンAの希望量
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    //addLiquidityETHとは、ETHをリクイディティに追加する関数
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    //removeLiquidityとは、リクイディティを削除する関数
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    //removeLiquidityETHとは、ETHをリクイディティから削除する関数
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    //removeLiquidityWithPermitとは、許可を持ってリクイディティを削除する関数
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    //removeLiquidityETHWithPermitとは、許

}