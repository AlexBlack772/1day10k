pragma solidity ^0.8.17;

import Chainlink.sol;

contract Chainlink {
     
   function setChainlinkOracle(
      address _oracle) {
      }

      function buildChainlinkRequest(
    bytes32 _jobId,
    address _callbackAddress,
    bytes4 _callbackFunctionSignature
) returns (Chainlink.Request memory request){

}

function requestPrice()
  public
{
  bytes32 jobId = "493610cff14346f786f88ed791ab7704";
  bytes4 selector = this.myCallback.selector;
  // build a request that calls the myCallback function defined
  //   below by specifying the function selector of myCallback
  Chainlink.Request memory request = buildOperatorRequest(
    jobId,
    selector);
}

   function requestPrice()
  public
{
  Chainlink.Request memory request = buildOperatorRequest(jobId, this.callback.selector);
  uint256 paymentAmount = 1 * LINK_DIVISIBILITY / 10; // Equivalent to 0.1 LINK

  // send the request that you just built
  sendOperatorRequest(request, paymentAmount);
}

function sendChainlinkRequestTo(
  address _oracle,
  Chainlink.Request memory _req,
  uint256 _payment
) returns (bytes32 requestId)

event ChainlinkRequested(
  bytes32 indexed id
)

event ChainlinkFulfilled(
  bytes32 indexed id
)

uint256 constant private ORACLE_PAYMENT = 100 * LINK_DIVISIBILITY; // = 100 LINK

function myCallback(bytes32 _requestId, uint256 _price)
  public
  recordChainlinkFulfillment(_requestId) // always validate callbacks
{
  currentPrice = _price;
}

function requestPrice()
  public
{
  Chainlink.Request memory req = buildChainlinkRequest(jobId, this, this.fulfill.selector);

  req.addInt("times", 100);

  sendChainlinkRequest(req, LINK_DIVISIBILITY * 1);
}

function requestPrice()
  public
{
  Chainlink.Request memory req = buildChainlinkRequest(jobId, this, this.fulfill.selector);

  req.addUint("times", 100);

  sendChainlinkRequest(req, LINK_DIVISIBILITY * 1);
}

function requestPrice(string _currency)
  public
{
  Chainlink.Request memory req = buildChainlinkRequest(JOB_ID, this, this.myCallback.selector);
  string[] memory path = new string[](2);
  path[0] = _currency;
  path[1] = "recent";

  // specify templated fields in a job specification
  req.addStringArray("path", path);

  sendChainlinkRequest(req, PAYMENT);
}

function requestPrice(bytes _cbor)
  public
{
  Chainlink.Request memory req = buildChainlinkRequest(JOB_ID, this, this.myCallback.selector);

  req.setBuffer(_cbor);

  sendChainlinkRequest(req, PAYMENT);
}

}

library Chainlink {
  struct Request {
    bytes32 id;
    address callbackAddress;
    bytes4 callbackFunctionId;
    uint256 nonce;
    Buffer.buffer buf;
  }
}

function requestEthereumPrice()
  public
{
  Chainlink.Request memory req = buildChainlinkRequest(jobId, this, this.fulfill.selector);

  req.add("get", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,JPY");

  sendChainlinkRequest(req, 1 * LINK_DIVISIBILITY); // =1 LINK
}
