pragma solidity ^0.8.13;

contract ILendingPoolAddressesProvider {
   //getLendingPoolとは、レンディングプールを取得する
   function getLendingPool() external view returns (address);
   //setLendingPoolImplとは、レンディングプールの実装を設定する
   function setLendingPoolImpl(address _pool) external;
   //getLendingPoolCoreとは、レンディングプールコアを取得する
   function getLendingPoolCore() external view returns (address payable);
   //setLendingPoolCoreImplとは、レンディングプールコアの実装を設定する
   function setLendingPoolCoreImpl(address _lendingPoolCore) external;
   //getLendingPoolConfiguratorとは、レンディングプールコンフィギュレーターを取得する
   function getLendingPoolConfigurator() external view returns (address);
   //setLendingPoolConfiguratorImplとは、レンディングプールコンフィギュレーターの実装を設定する
   function setLendingPoolConfiguratorImpl(address _configurator) external;
   //getLendingPoolDataProviderとは、レンディングプールデータプロバイダーを取得する
   function getLendingPoolDataProvider() external view returns (address);
   //setLendingPoolDataProviderImplとは、レンディングプールデータプロバイダーの実装を設定する
   function setLendingPoolDataProviderImpl(address _provider) external;
   //getLendingPoolParametersProviderとは、レンディングプールパラメータプロバイダーを取得する
   function getLendingPoolParametersProvider() external view returns (address);
   //setLendingPoolParametersProviderImplとは、レンディングプールパラメータプロバイダーの実装を設定する
   function setLendingPoolParametersProviderImpl(address _parametersProvider) external;
   //getTokenDistributorとは、トークンディストリビューターを取得する
   function getTokenDistributor() external view returns (address);
   //setTokenDistributorとは、トークンディストリビューターを設定する
   function setTokenDistributor(address _tokenDistributor) external;
   //getFeeProviderとは、手数料プロバイダーを取得する
   function getFeeProvider() external view returns (address);
   //setFeeProviderImplとは、手数料プロバイダーの実装を設定する
   function setFeeProviderImpl(address _feeProvider) external;
   //getLendingPoolLiquidationManagerとは、レンディングプールリキッドエーションマネージャーを取得する
   function getLendingPoolLiquidationManager() external view returns (address);
   //setLendingPoolLiquidationManagerとは、レンディングプールリキッドエーションマネージャーを設定する
   function setLendingPoolLiquidationManager(address _manager) external;
   //getLendingPoolManagerとは、レンディングプールマネージャーを取得する
   function getLendingPoolManager() external view returns (address);
   //setLendingPoolManagerとは、レンディングプールマネージャーを設定する
   function setLendingPoolManager(address _lendingPoolManager) external;
   

}