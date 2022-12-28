pragma solidity ^0.8.13;

contract ChainlinkPriceOracle {
   address public owner;
   address public oracle;
   bytes32 public jobId;
   uint256 public fee;

   uint256 public price;

   event PriceUpdated(uint256 price);

   constructor(
      address _oracle,
      bytes32 _jobId,
      uint256 _fee
   ) {
      owner = msg.sender;
      oracle = _oracle;
      jobId = _jobId;
      fee = _fee;
   }

   function requestPriceUpdate() public returns (bytes32 requestId) {
      Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
      return sendChainlinkRequestTo(oracle, request, fee);
   }

   function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId) {
      price = _price;
      emit PriceUpdated(_price);
   }

   function withdrawLink() external onlyOwner {
      require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
   }

   function setOracle(address _oracle) external onlyOwner {
      oracle = _oracle;
   }

   function setJobId(bytes32 _jobId) external onlyOwner {
      jobId = _jobId;
   }

   function setFee(uint256 _fee) external onlyOwner {
      fee = _fee;
   }

   modifier onlyOwner() {
      require(msg.sender == owner, "Only owner callable");
      _;
   }
}