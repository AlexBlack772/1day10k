pragma solidity ^0.5.0;



contract FlashLoanReceiverBase  {
   using SafeMath for uint256;

    address constant ETHADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    ILendingPoolAddressesProvider public addressesProvider = ILendingPoolAddressesProvider(
        0x24a42fD28C976A61Df5D00D0599C34c4f90748c8
    );
    
    function transferFundsBackToPoolInternal(
      address _reserve,uint _amount
    ) internal{
         address payable core = addressesProvider.getLendingPoolCore();
         transferInternal(core, getBalanceInternal(address(this)));
    }
    
    function transferInternal(
      address payable _destination,
      uint256 _amount
    ) internal {
        if (_amount > 0) {
            if (_destination == ETHADDRESS) {
                address(uint160(_destination)).transfer(_amount);
            } else {
                ERC20(_destination).transfer(_destination, _amount);
            }
        }
    }

      function getBalanceInternal(address _target)
         internal
         view
         returns (uint256)
      {
         if (_target == ETHADDRESS) {
               return address(this).balance;
         } else {
               return ERC20(_target).balanceOf(address(this));
         }
      }  

      
    
}