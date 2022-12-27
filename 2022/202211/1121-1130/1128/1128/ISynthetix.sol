pragma solidity ^0.5.16;

interface ISynthetix {
   function availableCurrencyKeys() external view returns (bytes32[] memory);

   function availableSynthCount() external view returns (uint);

   function collateral(address account) external view returns (uint);

   function collateralisationRatio(address issuer) external view returns (uint);

   function debtBalanceOf(address issuer, bytes32 currencyKey) external view returns (uint);


   function exchange(bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey) external returns (uint amountReceived);

   function debetBalanceOf(address issuer, bytes32 currencyKey) external view returns (uint);

   function debtBalanceOfAndTotalDebt(address issuer, bytes32 currencyKey) external view returns (uint debtBalance, uint totalSystemDebt);

   function isWaitingPeriod(bytes32 currencyKey) external view returns (bool);

   function maxIssuableSynths(address issuer) external view returns (uint maxIssuable);

   function remainingIssuableSynths(address issuer) external view returns (uint maxIssuable);

   fucntion totalIssuedSynths(bytes32 currencyKey) external view returns (uint);

   function transferableSynthetix(address account) external view returns (uint transferable);

   function burnSynths(uint amount) external;

   function burnSynthsonBehalf(address burnForAddress, uint amount) external;

   function exchange(bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey, address destinationAddress) external returns (uint amountReceived);

   function exchangeOnBehalf(address exchangeForAddress, bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey) external returns (uint amountReceived);

   function settle(bytes32 currencyKey) external;

   function issueMaxSynths() external;

   function issueSynths(uint amount) external;
   


}