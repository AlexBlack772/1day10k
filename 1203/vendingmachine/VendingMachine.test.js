import chai from 'chai';
import ethers from 'ethers';
import { it } from 'node:test';

describe('VendingMachine', () => {
   beforeEach(async () => {
      const VendingMachine = await ethers.getContractFactory('VendingMachine');
      const vendingMachine = await VendingMachine.deploy();
      await vendingMachine.deployed();
   });
   it('should return a message when no money is inserted', () => {
      const vendingMachine = new VendingMachine();
      expect(vendingMachine.insertMoney()).toEqual('Please insert money');
   });

   it('it buy it', () => {
      const buy = VendingMachine.buy(100);
      expect(vendingMachine.buy(100)).toEqual(buy);

   })

   it('it repay', () => {
      const repay = VendingMachine.repay(100);
      expect(vendingMachine.repay(100)).toEqual(repay);
   })   
});