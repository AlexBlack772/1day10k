//
function setChainlinkOracle(
  address _oracle
)

//
setChainlinkToken(
  address _link
)

//requestPrice()とは、ChainlinkのAPIを呼び出すための関数
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

//
function sendChainlinkRequestTo(
  address _oracle,
  Chainlink.Request memory _req,
  uint256 _payment
) returns (bytes32 requestId)

//Chainlink.Requesttとは、ChainlinkのAPIを呼び出すための構造体
function requestPriceFrom(address _oracle)
  public
{
  Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.callback.callbackSelector);
  uint256 paymentAmount = 1 * LINK_DIVISIBILITY; // = 1 LINK

  // send the request that you just built to a specified oracle
  sendChainlinkRequestTo(_oracle, request, paymentAmount);
}

//
function sendOperatorRequest(
    Chainlink.Request memory _req,
    uint256 _payment
) returns (bytes32 requestId)

//
function requestPrice()
  public
{
  Chainlink.Request memory request = buildOperatorRequest(jobId, this.callback.selector);
  uint256 paymentAmount = 1 * LINK_DIVISIBILITY / 10; // Equivalent to 0.1 LINK

  // send the request that you just built
  sendOperatorRequest(request, paymentAmount);
}

//
function myCallback(bytes32 _requestId, uint256 _price)
  public
{
  validateChainlinkCallback(_requestId);
  currentPrice = _price;
}