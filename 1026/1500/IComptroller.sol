pragma solidity ^0.8.13;

interface IComptroller {
    function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);
    function exitMarket(address cToken) external returns (uint);
    function getAssetsIn(address account) external view returns (address[] memory);
    function getAccountLiquidity(address account) external view returns (uint, uint, uint);
    function markets(address cTokenAddress) external view returns (bool, uint);
    function claimComp(address holder) external;
    function compAccrued(address holder) external view returns (uint);
    function compAddress() external view returns (address);
}