import chai from 'chai';
import ethers from 'ethers';

import { deployContract, getWallets, solidity } from 'ethereum-waffle';

describe('Bazaar', () => {
   let bazaar;
   let wallet;
   let otherWallet;
   
   beforeEach(async () => {
      [wallet, otherWallet] = await getWallets();
      const contract = new ethers.ContractFactory(
         Bazaar.abi,
         Bazaar.bytecode,
         wallet
      );
      bazaar = await contract.deploy();
   });
   
   it('Should create and execute a proposal', async () => {
      await bazaar.createProposal('0x0', 0, '0x0', 0, 0, 0, 0, 0);
      await bazaar.executeProposal(0);
   });
});