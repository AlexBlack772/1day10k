import chai from 'chai';
import auction from './auction.js';
import { expect } from 'chai';
import { ethers } from 'ethers';

describe('auction', () => {
   beforeEach( async () => {
      const auction = new ethers.Contract(address, abi, signer);
      deployer = await ethers.getSigner();
      const Auction = await ethers.getContractFactory("Auction");
      auction = await Auction.deploy();
      await auction.deployed();
   });

   it('auction', () => {
      expect(auction(1)).toBe(2);
   });

   it('createAuction', () => {
      expect(auction(1)).toBe(2);
   }
   )
   
});

// Path: 1130/aucti