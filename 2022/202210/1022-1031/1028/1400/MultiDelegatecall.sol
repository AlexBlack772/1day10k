pragma solidity ^0.8.13;

//MultiDelegatecallとは、複数のコントラクトをデリゲートコールするコントラクトです。
contract MultiDelegatecall {
   //DelegatecallFailedとは、デリゲートコールに失敗したときに発生するエラーです。
   error DelegatecallFailed(uint256 _id, bytes _returnData);

   //multiDelegatecallとは、複数のコントラクトをデリゲートコールする関数です。
   function multiDelegatecall(
      address[] calldata _targets,
      bytes[] calldata _calldata
   ) external payable returns (bytes[] memory _returnData) {
      require(_targets.length == _calldata.length, "Invalid input");

      _returnData = new bytes[](_targets.length);

      for (uint256 i = 0; i < _targets.length; i++) {
         (bool success, bytes memory returnData) = _targets[i].delegatecall(
            _calldata[i]
         );
         if (!success) {
            revert DelegatecallFailed(i, returnData);
         }
         _returnData[i] = returnData;
      }
   }
   
}