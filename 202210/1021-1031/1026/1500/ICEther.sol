pragma solidity ^0.5.0;

import "./IFlashLoanReceiver.sol";

contract FlashLoanReceiverBase is IFlashLoanReceiver {
      using SafeMath for uint256;
      using SafeERC20 for IERC20;
   
      address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
   
      function transferFundsBackToPoolInternal(address _reserve, uint256 _amount) internal {
         address payable core = ILendingPoolAddressesProvider(address(0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728)).getLendingPoolCore();
         transferInternal(core, _reserve, _amount);
      }
   
      function transferInternal(address _destination, address _reserve, uint256 _amount) internal {
         if (_reserve == ETH_ADDRESS) {
               address payable to = address(uint160(_destination));
               to.transfer(_amount);
         } else {
               IERC20(_reserve).safeTransfer(_destination, _amount);
         }
      }

      function getBalanceInternal(address _reserve) internal view returns(uint256) {
         if (_reserve == ETH_ADDRESS) {
               return address(this).balance;
         } else {
               return IERC20(_reserve).balanceOf(address(this));
         }
      }

      


}