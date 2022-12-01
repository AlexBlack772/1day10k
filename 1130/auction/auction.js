import react from 'react';
import { ReactDOM } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const auction = () => {
   const [auction0, setAuction] = useState();
   const [auctionId, setAuctionId] = useState();
   const [auctionName, setAuctionName] = useState();
   const [auctionDescription, setAuctionDescription] = useState();
   const [auctionPrice, setAuctionPrice] = useState();
   const [auctionOwner, setAuctionOwner] = useState();
   const [auctionStatus, setAuctionStatus] = useState();
   const [auctionWinner, setAuctionWinner] = useState();
   const [auctionWinnerPrice, setAuctionWinnerPrice] = useState();
   const [auctionWinnerTime, setAuctionWinnerTime] = useState();

   

   const auction = new ethers.Contract(address, abi, signer);
   auction.on('AuctionCreated', (auctionId, auctionName, auctionDescription, auctionPrice, auctionOwner, auctionStatus, auctionWinner, auctionWinnerPrice, auctionWinnerTime) => {
      setAuctionId(auctionId);
      setAuctionName(auctionName);
      setAuctionDescription(auctionDescription);
      setAuctionPrice(auctionPrice);
      setAuctionOwner(auctionOwner);
      setAuctionStatus(auctionStatus);
      setAuctionWinner(auctionWinner);
      setAuctionWinnerPrice(auctionWinnerPrice);
      setAuctionWinnerTime(auctionWinnerTime);
   });
   

   const createAuction = async () => {
      const auctionId = await auction.createAuction();
      setAuctionId(auctionId);
   }

   const bid = async () => {
      const bid = await auction.bid();
      setBid(bid);
   }

   const endAuction = async () => {
      const endAuction = await auction.endAuction();


   return (
      <div>
         <h1>Auction</h1>
         <button onClick={createAuction}>Create Auction</button>
      </div>
   )

   
}