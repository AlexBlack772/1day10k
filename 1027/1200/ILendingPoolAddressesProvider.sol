pragma solidity ^0.6.0;

contract ILendingPoolAddressesProvider {
   //getLendingPool()とは、LendingPoolのアドレスを返す関数
    function getLendingPool() public view returns (address);
   //seLendingPoolImpl()とは、LendingPoolの実装アドレスを返す関数
   function setLendingPoolImpl(address _pool) public;
   //getLendingPoolCore()とは、LendingPoolCoreのアドレスを返す関数
   function getLendingPoolCore() public view returns (address payable);
   //setLendingPoolCoreImpl()とは、LendingPoolCoreの実装アドレスを返す関数
   function setLendingPoolCoreImpl(address _lendingPoolCore) public;
   //getLendingPoolConfigurator()とは、LendingPoolConfiguratorのアドレスを返す関数
   function getLendingPoolConfigurator() public view returns (address);
   //setLendingPoolConfiguratorImpl()とは、LendingPoolConfiguratorの実装アドレスを返す関数
   function setLendingPoolConfiguratorImpl(address _configurator) public;
   //getLendingPoolDataProvider()とは、LendingPoolDataProviderのアドレスを返す関数
   function getLendingPoolDataProvider() public view returns (address);
   //setLendingPoolDataProviderImpl()とは、LendingPoolDataProviderの実装アドレスを返す関数
   function setLendingPoolDataProviderImpl(address _provider) public;
   //getLendingPoolParametersProviderとは、


}