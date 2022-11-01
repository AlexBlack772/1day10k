import chai, { expect } from 'chai'
//Contractとは、Ethereum上にデプロイされたスマートコントラクトのこと
import { Contract } from 'ethers'
//MaxUint256は、uint256の最大値
import { MaxUint256 } from 'ethers/constants'
//ethers/utilsは、Ethereumのユーティリティ関数を提供する
import { bigNumberify, hexlify, keccak256, defaultAbiCoder, toUtf8Bytes } from 'ethers/utils'
//ethereum-waffleは、Ethereumのテストツール
import { solidity, MockProvider, deployContract } from 'ethereum-waffle'
import { ecsign } from 'ethereumjs-util'

import { expandTo18Decimals, getApprovalDigest } from './shared/utilities'

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