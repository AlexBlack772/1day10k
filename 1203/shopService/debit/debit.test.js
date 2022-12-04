import chai from 'chai';
import ethers from 'ethers';

describe('Debit', function () {

   beforeEach('should be deployed', async function () {
      const Debit = new ethers.getContractFactory('Debit');
      const debit = await Debit.deploy();
      await debit.deployed();
      expect(debit.address).to.be.a('');
   });

   it('start', async function () {

   })

   
})