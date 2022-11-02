//chaijsとは、JavaScriptのテストフレームワークである。Mochaと組み合わせて使用することが多い。
import chai, { expect } from 'chai'
//Contractとは、Ethereum上にデプロイされたスマートコントラクトのこと
import { Contract } from 'ethers'
//MaxUint256は、uint256の最大値
import { MaxUint256 } from 'ethers/constants'
//ethers/utilsは、Ethereumのユーティリティ関数を提供する
import { bigNumberify, hexlify, keccak256, defaultAbiCoder, toUtf8Bytes } from 'ethers/utils'
//ethereum-waffleは、Ethereumのテストツール
import { solidity, MockProvider, deployContract } from 'ethereum-waffle'
//ethereumjs-utilとは、Ethereumのユーティリティ関数を提供する
import { ecsign } from 'ethereumjs-util'

import { expandTo18Decimals, getApprovalDigest } from './shared/utilities'
//ERC20.jsonは、ERC20のABIを記述したファイル
import ERC20 from '../build/ERC20.json'
//chai.use(solidity)は、chaiにsolidityを追加する
chai.use(solidity)

//expandTo18Decimalsは、18桁の数字を返す
const TOTAL_SUPPLY = expandTo18Decimals(10000)
const TEST_AMOUNT = expandTo18Decimals(10)

describe('UniswapV2ERC20', () => {
  //MockProviderは、Ethereumのテストツール
  const provider = new MockProvider({
    hardfork: 'istanbul',
    mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
    gasLimit: 9999999
  })
  //getWalletsとは、 providerの中にあるwalletを取得する関数
  const [wallet, other] = provider.getWallets()

  let token: Contract
  //beforeEachは、各テストの前に実行される
  beforeEach(async () => {
    //deployContractは、コントラクトをデプロイする関数
    token = await deployContract(wallet, ERC20, [TOTAL_SUPPLY])
  })

  it('name, symbol, decimals, totalSupply, balanceOf, DOMAIN_SEPARATOR, PERMIT_TYPEHASH', async () => {
    //name()とは、コントラクトの名前を取得する関数
    const name = await token.name()
    //expextは、期待する値を記述する関数
    //equalは、期待する値と実際の値が等しいかを確認する関数
    expect(name).to.eq('Uniswap V2')
    //symnol()とは、コントラクトのシンボルを取得する関数
    expect(await token.symbol()).to.eq('UNI-V2')
    //decimals()とは、コントラクトの小数点以下の桁数を取得する関数
    expect(await token.decimals()).to.eq(18)
    expect(await token.totalSupply()).to.eq(TOTAL_SUPPLY)
    expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY)
    expect(await token.DOMAIN_SEPARATOR()).to.eq(
      //keccak256は、ハッシュ値を計算する関数
      keccak256(
        //defaultAbiCoderは、ABIエンコードを行う関数
        defaultAbiCoder.encode(
          ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
          [
            keccak256(
              toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')
            ),
            keccak256(toUtf8Bytes(name)),
            keccak256(toUtf8Bytes('1')),
            1,
            token.address
          ]
        )
      )
    )
    expect(await token.PERMIT_TYPEHASH()).to.eq(
      keccak256(toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'))
    )
  })

    it('approve', async () => {
      //TEST_AMOUNTは、10の18乗
      await expect(token.approve(other.address, TEST_AMOUNT))
        //to.emitは、イベントが発火するかを確認する関数
        .to.emit(token, 'Approval')
        //withArgsは、イベントの引数を確認する関数
        //other.addressは、otherのアドレス
        .withArgs(wallet.address, other.address, TEST_AMOUNT)
      expect(await token.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
    })

    it('transfer', async () => {
      await expect(token.transfer(other.address, TEST_AMOUNT))
        .to.emit(token, 'Transfer')
        .withArgs(wallet.address, other.address, TEST_AMOUNT)
      //subは、引数を引く関数
      expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
      expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
    })

    it('transfer:fail', async () => {
      //revertedは、トランザクションが失敗するかを確認する関数
      await expect(token.transfer(other.address, TOTAL_SUPPLY.add(1))).to.be.reverted // ds-math-sub-underflow
      await expect(token.connect(other).transfer(wallet.address, 1)).to.be.reverted // ds-math-sub-underflow
    })

    it('transferFrom', async () => {
      await token.approve(other.address, TEST_AMOUNT)
      await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
        .to.emit(token, 'Transfer')
        .withArgs(wallet.address, other.address, TEST_AMOUNT)
      expect(await token.allowance(wallet.address, other.address)).to.eq(0)
      expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
      expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
    })

    it('transferFrom:max', async () => {
      //MAX_UINT256は、2の256乗-1
      await token.approve(other.address, MaxUint256)
      await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
        .to.emit(token, 'Transfer')
        //withArgsは、イベントの引数を確認する関数
        .withArgs(wallet.address, other.address, TEST_AMOUNT)
      expect(await token.allowance(wallet.address, other.address)).to.eq(MaxUint256)
      expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
      expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
    })

    it('permit', async () => {
      const nonce = await token.nonces(wallet.address)
      //MaxUint256は、2の256乗-1
      const deadline = MaxUint256
      //getApprovalDigestは、permitのハッシュ値を計算する関数
      const digest = await getApprovalDigest(
        token,
        { owner: wallet.address, spender: other.address, value: TEST_AMOUNT },
        nonce,
        deadline
      )

      //Buffer.fromは、文字列をバイナリに変換する関数
      //ecsignは、ECDSA署名を行う関数
      //sliceは、配列の一部を取り出す関数
      const { v, r, s } = ecsign(Buffer.from(digest.slice(2), 'hex'), Buffer.from(wallet.privateKey.slice(2), 'hex'))

      //pemitは、permitを実行する関数
      //hexlifyは、16進数に変換する関数
      await expect(token.permit(wallet.address, other.address, TEST_AMOUNT, deadline, v, hexlify(r), hexlify(s)))
        .to.emit(token, 'Approval')
        .withArgs(wallet.address, other.address, TEST_AMOUNT)
      expect(await token.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
      //noncesは、permitの回数を確認する関数
      //bigNumberifyは、16進数を10進数に変換する関数
      expect(await token.nonces(wallet.address)).to.eq(bigNumberify(1))
    })
  })

