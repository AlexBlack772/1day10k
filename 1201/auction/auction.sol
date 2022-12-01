pragma solidity ^0.8.0;

contract Auction {
      address payable public owner;
      uint public startAt;
      uint public endAt;
      string public ipfsHash;
      uint public duration;
   
      enum State {Started, Running, Ended, Canceled}
      State public auctionState;
   
      uint public highestBindingBid;
      address payable public highestBidder;
   
      mapping(address => uint) public bids;
   
      uint bidIncrement;
   
      constructor() {
         owner = payable(msg.sender);
         auctionState = State.Running;
   
         startAt = block.number;
         endAt = startAt + duration;

         bidIncrement = 1000000000000000000;
      }
   
      modifier notOwner() {
         require(msg.sender != owner);
         _;
      }
   
      modifier onlyOwner() {
         require(msg.sender == owner);
         _;
      }
   
      modifier afterStart() {
         require(block.number >= startAt);
         _;
      }
   
      modifier beforeEnd() {
         require(block.number <= endAt);
         _;
      }
   
      function min(uint a, uint b) pure internal returns (uint) {
         if (a <= b) {
               return a;
         } else {
               return b;
         }
      }
   
      function cancelAuction() public onlyOwner {
         auctionState = State.Canceled;
      }
   
      function placeBid() public payable notOwner afterStart beforeEnd returns (bool) {
         require(auctionState == State.Running);
         require(msg.value > 0.001 ether);
   
         uint currentBid = bids[msg.sender] + msg.value;
   
         require(currentBid > highestBindingBid);
   
         bids[msg.sender] = currentBid;
   
         if (currentBid <= bids[highestBidder]) {
               highestBindingBid = min(currentBid + bidIncrement, bids[highestBidder]);
         } else {
               highestBindingBid = min(currentBid, bids[highestBidder] + bidIncrement);
               highestBidder = payable(msg.sender);
         }
   
         return true;
      }
   
      function finalizeAuction() public {
         require(auctionState == State.Canceled || block.number > endAt);
         require(msg.sender == owner || bids[msg.sender] > 0);
   
         address payable recipient;
         uint value;
   
         if (auctionState == State.Canceled) {
               recipient = payable(msg.sender);
               value = bids[msg.sender];
         } else {
               if (msg.sender == owner) {
                  recipient = owner;
                  value = highestBindingBid;
               } else {
               }
         }
      }

      fucntion 
}