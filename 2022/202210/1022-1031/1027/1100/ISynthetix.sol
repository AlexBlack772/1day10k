pragma solidity ^0.8.0;

interface ISynthetix {
    function availabeCurrencyKeys() external view returns (bytes32[] memory);

    function availableSynthCount() external view returns (uint256);

    function collateral(address account) external view returns (uint256);

    function collateralisationRatio(address issuer) external view returns (uint256);

    function debtBalanceOf(address issuer, bytes32 currencyKey) external view returns (uint256);

    function debtBalanceOf(address issuer, bytes32[] calldata currencyKeys) external view returns (uint256[] memory);

    
}