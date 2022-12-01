pragma solidity ^0.6.0;

contract IDssProxyActions {
    //joinとは、参加する
    function join(address, uint256) external;
    //exitとは、退出する
    function exit(address, uint256) external;
    //lockETHとは、ETHをロックする
    function lockETH(address, address) external payable;
    //lockGemとは、ジェムをロックする
    function lockGem(address, address, uint256) external;
    //freeETHとは、ETHをフリーにする
    function freeETH(address, address, uint256) external;
    //freeGemとは、ジェムをフリーにする
    function freeGem(address, address, uint256) external;
    //drawDaiとは、Daiを引く
    function drawDai(address, address, uint256) external;
    //wipeDaiとは、Daiを拭く
    function wipeDai(address, address, uint256) external;
    //wipeAllDaiとは、全てのDaiを拭く
    function wipeAllDai(address, address) external;
    //lockETHAndDrawDaiとは、ETHをロックしてDaiを引く
    function lockETHAndDrawDai(address, address) external payable;
    //lockGemAndDrawDaiとは、ジェムをロックしてDaiを引く
    function lockGemAndDrawDai(address, address, uint256) external;
    //wipeDaiAndFreeETHとは、Daiを拭いてETHをフリーにする
    function wipeDaiAndFreeETH(address, address, uint256) external;
    //wipeDaiAndFreeGemとは、Daiを拭いてジェムをフリーにする
    function wipeDaiAndFreeGem(address, address, uint256, uint256) external;
    //wipeAllDaiAndFreeETHとは、全てのDaiを拭いてETHをフリーにする
    function wipeAllDaiAndFreeETH(address, address, uint256) external;
    //wipeAllDaiAndFreeGemとは、全てのDaiを拭いてジェムをフリーにする
      function wipeAllDaiAndFreeGem(address, address, uint256, uint256) external;
      //gemJoin_joinとは、ジェムジョインを参加する
      function gemJoin_join(address, address, uint256) external;
      //giveToProxyとは、プロキシに与える
      function giveToProxy(address, address, uint256) external;
      //giveToProxyAndCallとは、プロキシに与えてコールする
      function giveToProxyAndCall(address, address, uint256, bytes calldata) external;
      //lockETHAndDrawとは、ETHをロックして引く
      function lockETHAndDraw(address, address, uint256) external payable;
      //lockGemAndDrawとは、ジェムをロックして引く
      function lockGemAndDraw(address, address, uint256, uint256) external;
      //makeGemBagとは、ジェムバッグを作る
      function makeGemBag(address, address, uint256) external;
      //wipeAndFreeETHとは、拭いてETHをフリーにする
      function wipeAndFreeETH(address, address, uint256, uint256) external;
      //safeLockEthとは、安全にETHをロックする
      function safeLockEth(address, address, uint256) external payable;
      //safeLockGemとは、安全にジェムをロックする
      function safeLockGem(address, address, uint256, uint256) external;
      //shiftとは、シフトする
      function shift(address, address, uint256) external;
}

contract DssProxyActionsCommon{
   uint256 constant RAY = 10**27;

   //mulとは、乗算する
   function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
      require(y == 0 || (z = x * y) / y == x, "mul-overflow");
   }
   //subとは、減算する
   function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
      require((z = x - y) <= x, "sub-overflow");
   }
   //toIntとは、整数に変換する
   function toInt(uint256 x) internal pure returns (int256 y) {
      y = int256(x);
      require(y >= 0, "int-overflow");
   }
   //toRadとは、ラジアンに変換する
   //ラジアンとは、角度を表す単位
   function toRad(uint256 wad) internal pure returns (uint256 rad) {
      rad = mul(wad, 10**9);
   }
   //convertTo18とは、18に変換する
   function covertTo18(address gemJoin, uint256 amt) internal returns (uint256 wad) {
      //decとは、小数点
      //gemとは、宝石
      string memory sym = GemJoinAbstract(gemJoin).dec();
      //uintとは、符号なし整数
      //uint256とは、符号なし256ビット整数
      uint256 _dec = 10**(uint256(18) - uint256(uint8(sym[0])));
      wad = mul(amt, _dec);
   }

   //daiJoin_joinとは、Daiジョインを参加する
   function daiJoin_join(address apt, address urn, uint256 wad) internal {
      //vatとは、VAT
      //urnとは、ユーザー
      //hopeとは、希望する
      VatAbstract(DaiJoinAbstract(apt).vat()).hope(apt);
      DaiJoinAbstract(apt).join(urn, wad);
   }
   //_getDrawDartとは、Dartを引く
   function _getDrawDart(
      address vat,
      address jug,
      address urn,
      bytes32 ilk,
      uint256 wad
   ) internal returns (int256 dart) {
      //dripとは、滴る
      JugAbstract(jug).drip(ilk);
      //tabとは、タブ
      uint256 rate = JugAbstract(jug).ilks(ilk).rate;
      //artとは、アート
      uint256 art;
      (, art) = VatAbstract(vat).urns(ilk, urn);
      //radとは、ラジアン
      //wadとは、ワッド
      dart = toInt(sub(mul(rate, wad), VatAbstract(vat).dai(urn)));
      dart = toInt(mul(uint256(dart), RAY)) / int256(rate);
      dart = int256(sub(uint256(dart), art));
   }
   //_getWipeDartとは、Dartを拭く
   function _getWipeDart(
      address vat,
      uint256 dai,
      address urn,
      bytes32 ilk
   ) internal view returns (int256 dart) {
      //artとは、アート
      (, uint256 art) = VatAbstract(vat).urns(ilk, urn);
      dart = toInt(dai / VatAbstract(vat).ilks(ilk).rate);
      dart = uint256(dart) <= art ? -dart : -toInt(art);
   }
   //_getWipeAllDartとは、全てのDartを拭く
   function _getWipeAllDart(address vat, address urn, bytes32 ilk)
      internal
      view
      returns (int256 dart)
   {
      //artとは、アート
      (, uint256 art) = VatAbstract(vat).urns(ilk, urn);
      dart = -toInt(art);
   }
   //_getWipeAllWadとは、全てのWadを拭く
   function _getWipeAllWad(address vat, address urn, bytes32 ilk)
      internal
      view
      returns (uint256 wad)
   {
      //artとは、アート
      (, uint256 art) = VatAbstract(vat).urns(ilk, urn);
      uint256 rate = VatAbstract(vat).ilks(ilk).rate;
      uint256 dai = VatAbstract(vat).dai(urn);
      wad = mul(art, rate) <= dai ? art : dai / rate;
   }
   //ethJoin_joinとは、ETHジョインを参加する
   function ethJoin_join(address apt, address urn) internal {
      //vatとは、VAT
      //urnとは、ユーザー
      //hopeとは、希望する
      VatAbstract(ETHJoinAbstract(apt).vat()).hope(apt);
      ETHJoinAbstract(apt).join.value(msg.value)(urn);
   }

   //hopeとは、希望する
   function hope(
      address obj,
      address usr
   ) internal {
      HopeAbstract(obj).hope(usr);
   }
   //nopeとは、希望しない
   function nope(
      address obj,
      address usr
   ) internal {
      HopeAbstract(obj).nope(usr);
   }

   //giveToProxyとは、プロキシに与える
   function giveToProxy(
      address proxyRegistry,
      address dst,
      address token
   ) internal {
      //giveとは、与える
      ProxyRegistryAbstract(proxyRegistry).give(dst, token);
   }

   //cdpAllowとは、CDPを許可する
   function cdpAllow(
      address cdp,
      address usr,
      uint256 ok
   ) internal {
      //urnとは、ユーザー
      address urn = ManagerAbstract(cdp).urns(ManagerAbstract(cdp).owns());
      VatAbstract(ManagerAbstract(cdp).vat()).hope(usr);
      if (ok > 0) {
         VatAbstract(ManagerAbstract(cdp).vat()).hope(usr);
      } else {
         VatAbstract(ManagerAbstract(cdp).vat()).nope(usr);
      }
   }
   //urnAllowとは、URNを許可する
   function urnAllow(
      address cdp,
      address usr,
      uint256 ok
   ) internal {
      //urnとは、ユーザー
      address urn = ManagerAbstract(cdp).urns(ManagerAbstract(cdp).owns());
      if (ok > 0) {
         VatAbstract(ManagerAbstract(cdp).vat()).hope(usr);
      } else {
         VatAbstract(ManagerAbstract(cdp).vat()).nope(usr);
      }
   }
   //

   


}

