pragma solidity ^0.6.0;
//experimentalとは、実験的な
pragma experimental ABIEncoderV2;

//libraryとは、ライブラリ
library Account {
   enum Status {Normal, Liquid, Vapor}
    struct Info {
        address owner; // The address that owns the account
        uint256 number; // A nonce that allows a single address to control many accounts
    }
    struct Storage {
        mapping(uint256 => Types.Par) balances; // Mapping from marketId to principal
        Status status;
    }
      
}

library Actions {
   enum ActionType {
        Deposit, //預金
        Withdraw, //引き出し
        Transfer, //転送
        Buy, //購入
        Sell, //売却
        Trade, //取引
        Liquidate, //清算
        Vaporize, //蒸発とは、消滅
        Call //コール
    }
    //AccountLayoutとは、アカウントレイアウト
    enum AccountLayout {
        OnePrimary, //1つのプライマリ
        TwoPrimary, //2つのプライマリ
        PrimarySecondary, //プライマリセカンダリ
        SecondaryPrimary //セカンダリプライマリ
    }
    //MarketLayoutとは、マーケットレイアウト
      enum MarketLayout {
         ZeroMarkets, //0つのマーケット
         OneMarket, //1つのマーケット
         TwoMarkets, //2つのマーケット
      }

      //ActionArgsとは、アクション引数
      struct ActionArgs {
         //actionTypeとは、アクションタイプ
         ActionType actionType;
         //accountIdとは、アカウントID
         uint accountId;
         //amountとは、量
         uint256 amount;
         //primaryMarketIdとは、プライマリマーケットID
         uint256 primaryMarketId;
         //secondaryMarketIdとは、セカンダリマーケットID
         uint256 secondaryMarketId;
         //otherAddressとは、他のアドレス
         address otherAddress;
         //otherAccountIdとは、他のアカウントID
         uint256 otherAccountId;
         //dataとは、データ
         bytes data;
      }

      //DepositArgsとは、デポジット引数
      struct DepositArgs {
         //marketIdとは、マーケットID
         uint256 marketId;
         //fromとは、から
         address from;
         //tokenAmountとは、トークン量
         Types.AssetAmount tokenAmount;
         //Account.Infoとは、アカウント情報
         Account.Info account;
      }

      //WithdrawArgsとは、引き出し引数
      struct WithdrawArgs {
         //marketIdとは、マーケットID
         uint256 marketId;
         //toとは、に
         address payable to;
         //tokenAmountとは、トークン量
         Types.AssetAmount tokenAmount;
         //Account.Infoとは、アカウント情報
         Account.Info account;
      }

      //TransferArgsとは、転送引数
      struct TransferArgs {
         //marketIdとは、マーケットID
         uint256 marketId;
         //toとは、に
         address to;
         //tokenAmountとは、トークン量
         Types.AssetAmount tokenAmount;
         //Account.Infoとは、アカウント情報
         Account.Info account;
      }

      //BuyArgsとは、購入引数
      struct BuyArgs {
         //marketIdとは、マーケットID
         uint256 marketId;
         //fromとは、から
         address from;
         //toとは、に
         address to;
         //tokenAmountとは、トークン量
         Types.AssetAmount tokenAmount;
         //Account.Infoとは、アカウント情報
         Account.Info account;
      }

      //SellArgsとは、売却引数
      struct SellArgs {
         //marketIdとは、マーケットID
         uint256 marketId;
         //fromとは、から
         address from;
         //toとは、に
         address to;
         //tokenAmountとは、トークン量
         Types.AssetAmount tokenAmount;
         //Account.Infoとは、アカウント情報
         Account.Info account;
      }

      //TradeArgsとは、取引引数
      struct TradeArgs {
         //marketIdとは、マーケットID
         uint256 marketId;
         //fromとは、から
         address from;
         //toとは、に
         address to;
         //tokenAmountとは、トークン量
         Types.AssetAmount tokenAmount;
         //Account.Infoとは、アカウント情報
         Account.Info account;
      }

      //LiquidateArgsとは、清算引数
      struct LiquidateArgs {
         //liquidatorとは、清算者
         address liquidator;
         //beneificiaryとは、受益者
         address beneficiary;
         //closeAccountとは、アカウントを閉じる
         Account.Info closeAccount;
         //liquidateAccountとは、アカウントを清算する
         Account.Info liquidateAccount;
         //repayMarketIdとは、返済マーケットID
         uint256 repayMarketId;
         //repayAmountとは、返済量
         Types.AssetAmount repayAmount;
         //collateralMarketIdとは、担保マーケットID
         uint256 collateralMarketId;
         //collateralAmountとは、担保量
         Types.AssetAmount collateralAmount;
      }

      //VaporizeArgsとは、蒸発引数
      struct VaporizeArgs {
         //liquidatorとは、清算者
         address liquidator;
         //beneificiaryとは、受益者
         address beneficiary;
         //closeAccountとは、アカウントを閉じる
         Account.Info closeAccount;
         //liquidateAccountとは、アカウントを清算する
         Account.Info liquidateAccount;
         //repayMarketIdとは、返済マーケットID
         uint256 repayMarketId;
         //repayAmountとは、返済量
         Types.AssetAmount repayAmount;
         //collateralMarketIdとは、担保マーケットID
         uint256 collateralMarketId;
         //collateralAmountとは、担保量
         Types.AssetAmount collateralAmount;
      }
      




}