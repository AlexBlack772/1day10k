pragma solidity ^0.5.0;

contract ILendingPoolAddressesProvider {
   //getLendingPoolとは、LendingPoolのアドレスを返す関数
    function getLendingPool() public view returns (address);
    //setLendingPoolImplとは、LendingPoolのアドレスを設定する関数
      function setLendingPoolImpl(address _pool) public;
      //getLendingPoolCoreとは、LendingPoolCoreのアドレスを返す関数
      function getLendingPoolCore() public view returns (address payable);
      //setLendingPoolCoreImplとは、LendingPoolCoreのアドレスを設定する関数
      function setLendingPoolCoreImpl(address _lendingPoolCore) public;
      //getLendingPoolConfiguratorとは、LendingPoolConfiguratorのアドレスを返す関数
      function getLendingPoolConfigurator() public view returns (address);
      
}