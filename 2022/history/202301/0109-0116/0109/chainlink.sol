//setChainlinkOracleとは、ChainlinkのOracleを設定する関数である。
function setChainlinkOracle(
  address _oracle
)

//setChainlinkTokenとは、Chainlinkのトークンを設定する関数である。
//constructor(address _link)
  public
{
  setChainlinkToken(_link);
}

//buildChainlinkRequestとは、Chainlinkのリクエストを作成する関数である。
function buildChainlinkRequest(
    bytes32 _jobId,
    address _callbackAddress,
    bytes4 _callbackFunctionSignature
) returns (Chainlink.Request memory request)

//
//function requestPrice()
  public
{
  bytes32 jobId = "493610cff14346f786f88ed791ab7704";
  bytes4 selector = this.myCallback.selector;
  // build a request that calls the myCallback function defined
  //   below by specifying the address of this contract and the function
  //   selector of the myCallback
  Chainlink.Request memory request = buildChainlinkRequest(
    jobId,
    address(this),
    selector);
}

//buildOperatorRequestとは、Chainlinkのオペレーターのリクエストを作成する関数である。
function buildOperatorRequest(
    bytes32 _jobId,
    bytes4 _callbackFunctionSignature
) returns (Chainlink.Request memory request)

//requestPrice()とは、価格をリクエストする関数である。
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

//sendChainlinkRequestとは、Chainlinkのリクエストを送信する関数である。
function sendChainlinkRequest(
    Chainlink.Request memory _req,
    uint256 _payment
) returns (bytes32 requestId)

//sendChainlinkRequestToとは、Chainlinkのリクエストを送信する関数である。
function　sendChainlinkRequestTo(
  address _oracle,
  Chainlink.Request memory _req,
  uint256 _payment
) returns (bytes32 requestId)

//sendOperatorRequestとは、Chainlinkのオペレーターのリクエストを送信する関数である。
function sendOperatorRequest(
    Chainlink.Request memory _req,
    uint256 _payment
) returns (bytes32 requestId)

//addChainlinkExternalRequestとは、Chainlinkの外部リクエストを追加する関数である。
function addChainlinkExternalRequest(
  address _oracle,
  bytes32 _requestId
)

//cancelChainlinkRequestとは、Chainlinkのリクエストをキャンセルする関数である。
function cancelChainlinkRequest(
  bytes32 _requestId,
  uint256 _payment,
  bytes4 _callbackFunctionId,
  uint256 _expiration
)

//chainlinkOracleAddressとは、ChainlinkのOracleのアドレスを返す関数である。
function getOracle() public view returns (address) {
  return chainlinkOracleAddress();
}

//ChainlinkRequestedとは、Chainlinkのリクエストが発行されたときに発行されるイベントである。
event ChainlinkRequested(
  bytes32 indexed id
)

//recordChainlinkFulfillmentとは、Chainlinkのフルフィルメントを記録する関数である。
function myCallback(bytes32 _requestId, uint256 _price)
  public
  recordChainlinkFulfillment(_requestId) // always validate callbacks
{
  currentPrice = _price;
}

//addIntとは、Chainlinkのリクエストに整数を追加する関数である。
function addInt(
  Request memory self,
  string _key,
  int256 _value
)

//addStringArrayとは、Chainlinkのリクエストに文字列の配列を追加する関数である。
function addStringArray(
  Request memory self,
  string _key,
  string[] _values
)
