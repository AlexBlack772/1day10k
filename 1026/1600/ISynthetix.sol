pragma solidity ^0.8.13;

interface ISynthetix {
   function availableCurrencyKeys() external view returns (bytes32[] memory);

   function availableSynths() external view returns (ISynth[] memory);

   function collateral(address account) external view returns (uint);

   function collateralisationRatio(address issuer) external view returns (uint);

   function debtBalanceOf(address issuer, bytes32 currencyKey) external view returns (uint);

   function debtBalanceOf(address issuer, bytes32[] calldata currencyKeys) external view returns (uint[] memory debtBalances);

   function debtBalanceOfAndTotalDebt(
      address issuer,
      bytes32 currencyKey
   ) external view returns (uint debtBalance, uint totalSystemDebt);

   function isWaitingPeriod(bytes32 currencyKey) external view returns (bool);

   function maxIssuableSynths(address issuer) external view returns (uint maxIssuable);

   function remainingIssuableSynths(address issuer) external view returns (uint maxIssuable);

   function synths(byte32 currencyKey) external view returns (ISynth);

   function synthsByAddress(address synthAddress) external view returns (bytes32);

   function totalIssuedSynths(bytes32 currencyKey) external view returns (uint);

   function totalIssuedSynths(bytes32[] calldata currencyKeys) external view returns (uint[] memory totalIssued);

   function totalIssuedSynthsExcludeEtherCollateral(bytes32 currencyKey) external view returns (uint);
   
   function transferableSynthetix(address account) external view returns (uint transferable);

   function burnSynths(uint amount) external;

   function burnSynthsOnBehalf(address burnForAddress, uint amount) external;

   function burnSynthsToTarget() external;

   function burnSynthsToTargetOnBehalf(address burnForAddress) external;

   function exchange(
      bytes32 sourceCurrencyKey,
      uint sourceAmount,
      bytes32 destinationCurrencyKey
   ) external returns (uint amountReceived);

   function exchangeOnBehalf(
      address exchangeForAddress,
      bytes32 sourceCurrencyKey,
      uint sourceAmount,
      bytes32 destinationCurrencyKey
   ) external returns (uint amountReceived);

   function exchangeOnBehalf(
      address exchangeForAddress,
      bytes32 sourceCurrencyKey,
      uint sourceAmount,
      bytes32 destinationCurrencyKey,
      address destinationAddress
   ) external returns (uint amountReceived);

   function issueMaxSynths() external;

   function issueMaxSynthsOnBehalf(address issueForAddress) external;

   function issueSynths(uint amount) external;

   function issueSynthsOnBehalf(address issueForAddress, uint amount) external;

   function mint() external;

   function settle(bytes32 currencyKey) external;

   function liguidateDelinquentAccount(address account, uint susdAmount) external;
   

   
}