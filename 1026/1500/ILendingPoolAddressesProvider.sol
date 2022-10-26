pragma solidity ^0.8.13;

contract ILendingPoolAddressesProvider{
   function getLendingPool() external view returns (address);
   function setLendingPoolImpl(address _pool) external;
   function getLendingPoolCore() external view returns (address payable);
   function setLendingPoolCoreImpl(address _lendingPoolCore) external;
   function getLendingPoolConfigurator() external view returns (address);
   function setLendingPoolConfiguratorImpl(address _configurator) external;
   function getLendingPoolDataProvider() external view returns (address);
   function setLendingPoolDataProviderImpl(address _provider) external;
   function getLendingPoolParametersProvider() external view returns (address);
   function setLendingPoolParametersProvider(address _parametersProvider) external;
   function getTokenDistributor() external view returns (address);
   function setTokenDistributor(address _tokenDistributor) external;
   function getFeeProvider() external view returns (address);
   function setFeeProviderImpl(address _feeProvider) external;
   function getLendingPoolLiquidationManager() external view returns (address);
   function setLendingPoolLiquidationManager(address _manager) external;
   
}