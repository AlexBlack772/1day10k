pragma solidity ^0.8.10;

//FlashLoanReceiverBaseとは、FlashLoanを受け取るためのコントラクトです。
contract FlashLoanReceiverBase is IFlashLoanReceiver {
   using SafeMath for uint256;

    address constant ETHADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    //ILendingPoolAddressesProviderとは、LendingPoolのアドレスを提供するためのコントラクトです。
    ILendingPoolAddressesProvider public addressesProvider = ILendingPoolAddressesProvider(
        0x24a42fD28C976A61Df5D00D0599C34c4f90748c8
    );

    //transferFundsBackToPoolInternalとは、LendingPoolに資金を返すための関数です。
      function transferFundsBackToPoolInternal(address _reserve, uint256 _amount) internal {
         address payable core = addressesProvider.getLendingPoolCore();
         transferInternal(core, _reserve, _amount);
      }

      //transferInternalとは、資金を移動するための関数です。
      function transferInternal(address _destination, address _reserve, uint256 _amount) internal {
         if (_reserve == ETHADDRESS) {
            address payable to = payable(_destination);
            to.transfer(_amount);
         } else {
            IERC20(_reserve).transfer(_destination, _amount);
         }
      }

      //getBalanceInternalとは、残高を取得するための関数です。
      function getBalanceInternal(address _reserve) internal view returns (uint256) {
         if (_reserve == ETHADDRESS) {
            return address(this).balance;
         } else {
            return IERC20(_reserve).balanceOf(address(this));
         }
      }
      

}