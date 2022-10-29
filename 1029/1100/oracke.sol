pragma solidity ^0.8.10;

//Oracleとは、外部のデータを取得するためのコントラクトです。
contract Oracle is usingOraclize　{
   string public EURUSD;

   //updatePriceとは、価格を更新するための関数です。
   function updatePrice() public payable {
      if (oraclize_getPrice("URL") > address(this).balance) {
         emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
      } else {
         emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
         oraclize_query("URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0");
      }
   }

   //__callbackとは、コールバック関数です。
   function __callback(bytes32 myid, string memory result) public override {
      if (msg.sender != oraclize_cbAddress()) revert();
      EURUSD = result;
      emit LogNewPriceTicker(result);
   }
}