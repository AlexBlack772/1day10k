pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

library Account {
   enum Status {
      Normal,
      Liquid,
      Vapor
   }
   struct Info {
      address owner;
      uint256 number;
   }
   struct Storage {
      mapping(uint256 => mapping(uint256 => Types.Par)) balances;

   }
   
}

library Actions{
   enum ActionType {
      Deposit,
      Withdraw,
      Transfer,
      Buy,
      Sell,
      Trade,
      Liquidate,
      Vaporize,
      Call
   }
   struct ActionArgs {
      ActionType actionType;
      uint256 accountId;
      Types.AssetAmount amount;
      uint256 primaryMarketId;
      uint256 secondaryMarketId;
      address otherAddress;
      uint256 otherAccountId;
      bytes data;
   }
   struct DepositArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 tokenAmount;
   }
   struct WithdrawArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 tokenAmount;
   }
   struct TransferArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 tokenAmount;
   }
   struct BuyArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 makerAmount;
      uint256 takerAmount;
   }
   struct SellArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 makerAmount;
      uint256 takerAmount;
   }
   struct TradeArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 makerAmount;
      uint256 takerAmount;
   }
   struct LiquidateArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 liquidator;
      uint256 borrower;
      uint256 repayAmount;
   }
   struct VaporizeArgs {
      uint256 marketId;
      uint256 from;
      uint256 to;
      uint256 liquidator;
      uint256 borrower;
      uint256 seizeTokens;
   }
   struct CallArgs {
      address callee;
      bytes data;
   }

}
library Decimal {
   struct D256 {
      uint256 value;
   }
}

library Interest {
   struct Rate {
      uint256 value;
   }
   struct Index {
      uint256 value;
   }

}

library Monetary {
   struct Price {
      uint256 value;
   }
   struct Value {
      uint256 value;
   }
}

library Storage {
   struct Market {
      address token;
      bool isClosing;
      bool isPaused;
      bool isSettled;
      bool isGlobalSettled;
      bool isFinalized;
      bool isSeized;
      uint256 totalPar;
   }
   struct RiskParams {
      uint256 marginRatio;
      uint256 liquidationSpread;
      uint256 liquidationDust;
      
   }
}