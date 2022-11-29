import assertBn from "@synthetixio/core-utils/utils/assertions/assert-bignumber";
import assertRevert from "@synthetixio/core-utils/utils/assertions/assert-revert";
import { ethers } from "ethers";

import { bootstrapWithMockMarketAndPool } from "../../bootstrap";

describe('LiquidationModule', function () {
  const {
    signers,
    systems,
    collateralAddress,
    collateralContract,
    poolId,
    accountId,
    MockMarket,
    marketId,
    depositAmount,
    restore,
  } = bootstrapWithMockMarketAndPool();
   
   let user1: ethers.Signer, user2: ethers.Signer;

   //beforeとは、テストケースの実行前に実行される
  before('identify signers', async () => {
    [, user1, user2] = signers();
  });

   //describeとは、テストケースをグループ化するためのものです。
  describe('liquidate()', () => {
    before(restore);

   //itとは、テストケースを定義するためのものです。
    it('does not allow liquidation of account with healthy c-ratio', async () => {
      await assertRevert(
        systems().Core.connect(user1).liquidate(accountId, poolId, collateralAddress()),
        'IneligibleForLiquidation(1000000000000000000000, 0, 0, 1500000000000000000)',
        systems().Core
      );
    });
     
     describe('account goes into debt', () => {
      // this should put us very close to 110% c-ratio
      const debtAmount = depositAmount
        .mul(ethers.utils.parseEther('1'))
        .div(ethers.utils.parseEther('1.1'));

        before('take out a loan', async () => {
         //systems()とは、bootstrap.tsで定義したsystems()関数を呼び出しています。
           await systems()
           //connnetct()とは、signerを指定して、コントラクトに接続するためのものです。
              .Core.connect(user1)
              //mint()とは、Synthetixコントラクトのmint()関数を呼び出しています。
           .mintUsd(accountId, poolId,
              //collateralAddress()とは、collateralAddress()関数を実行すると、collateralAddressの値が返ってくる
              //divとは、割り算をする
            collateralAddress(), debtAmount.div(10));
      });

      before('going into debt', async () => {
        await MockMarket().connect(user1).setReportedDebt(debtAmount.mul(9).div(10));

        // sanity
        assertBn.near(
          await systems().Core.callStatic.getVaultDebt(poolId, collateralAddress()),
          debtAmount
        );
      });
