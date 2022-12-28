pragma solidity ^0.6.0;

//IDssProxyActionsとは、IDssプロキシアクション

contract IDssProxyActions {
   //cdpAllowとは、CDPを許可する
   function cdpAllow(address _cdp, address _usr, uint256 _ok) external;
   //daiJoin_joinとは、Daiジョインをジョインする
   function daiJoin_join(address _join, address _urn, uint256 _wad) external;
   //drawとは、ドローする
   function draw(address _jug, address _join, address _urn, address _vow, address _end, uint256 _wad) external;
   //enterとは、入る
   function enter(address _manager, address _src, uint256 _cdp) external;
   //ethJoin_joinとは、Ethジョインをジョインする
   function ethJoin_join(address _join, address _urn) external payable;
   //exitETHとは、ETHを出る
   function exitETH(address _manager, address _dst, uint256 _cdp, uint256 _wad) external;
   //exitGemとは、ジェムを出る
   function exitGem(address _manager, address _dst, uint256 _cdp, uint256 _wad) external;
   //fluxとは、流す
   function flux(address _manager, address _src, address _dst, uint256 _cdp) external;
   //freeETHとは、ETHをフリーする
   function freeETH(address _manager, address _join, address _urn, uint256 _wad) external;
   //freeGemとは、ジェムをフリーする
   function freeGem(address _manager, address _join, address _urn, uint256 _wad) external;
   //frobとは、フロブする
   function frob(address manager, uint256 cdp, int256 dink, int256 dart)
        external;
   //gemJoin_joinとは、ジェムジョインをジョインする
   function gemJoin_join(address _join, address _urn, uint256 _wad) external;
   //giveとは、与える
   function give(address _manager, address _dst, uint256 _cdp) external;
   //giveToProxyとは、プロキシに与える
   function giveToProxy(address _manager, address _dst, uint256 _cdp) external;
   //hopeとは、希望する
   function hope(address _obj, address _usr) external;
   //lockETHとは、ETHをロックする
   function lockETH(address _manager, address _join, address _urn) external payable;
   //lockETHAndDrawとは、ETHをロックしてドローする
   function lockETHAndDraw(address _manager, address _join, address _urn, address _jug, address _vow, address _end, uint256 _wadD) external payable;
   //lockGemとは、ジェムをロックする
   function lockGem(address _manager, address _join, address _urn, uint256 _wad) external;
   //lockGemAndDrawとは、ジェムをロックしてドローする
   function lockGemAndDraw(address _manager, address _join, address _urn, address _jug, address _vow, address _end, uint256 _wadC, uint256 _wadD) external;
   //makeGemBagとは、ジェムバッグを作る
   function makeGemBag(address _bag, address _gemJoin) external;
   //moveとは、移動する
   function move(address _manager, address _src, address _dst, uint256 _cdp) external;
   //nopeとは、希望しない
   function nope(address _obj, address _usr) external;
   //openとは、開く
   function open(address _manager, bytes32 _ilk, address _usr) external returns (uint256);
   //openLockETHAndDrawとは、ETHをロックしてドローする
   function openLockETHAndDraw(address _manager, address _join, address _jug, address _vow, address _end, bytes32 _ilk, uint256 _wadD) external payable returns (uint256);
   //openLockGemAndDrawとは、ジェムをロックしてドローする
   function openLockGemAndDraw(address _manager, address _join, address _jug, address _vow, address _end, bytes32 _ilk, uint256 _wadC, uint256 _wadD) external returns (uint256);
   //openLockGNTAndDrawとは、GNTをロックしてドローする
   function openLockGNTAndDraw(address _manager, address _join, address _jug, address _vow, address _end, bytes32 _ilk, uint256 _wadC, uint256 _wadD) external returns (uint256);
   //quitとは、やめる
   function quit(address _manager, bytes32 _ilk, address _dst) external;
   //safeLockETHとは、ETHを安全にロックする
   function safeLockETH(address _manager, address _join, address _urn, uint256 _wad) external payable;
   //safeLockGemとは、ジェムを安全にロックする
   function safeLockGem(address _manager, address _join, address _urn, uint256 _wad) external;
   //safeWipeとは、安全にウォイプする
   function safeWipe(address _manager, address _join, address _urn, address _vow, address _end, uint256 _wad) external;
   //safeWipeAllとは、安全にすべてウォイプする
   function safeWipeAll(address _manager, address _join, address _urn, address _vow, address _end) external;
   //shiftとは、シフトする
   function shift(address _manager, uint256 _cdpSrc, uint256 _cdpDst) external;
   //transferとは、転送する
   function transfer(address _manager, address _dst, uint256 _cdp) external;
   //urnAllowとは、URNを許可する
   function urnAllow(address _urn, address _usr, uint256 _ok) external;
   //wipeとは、ウォイプする
   function wipe(address _manager, address _join, address _urn, address _vow, address _end, uint256 _wad) external;
   //wipeAllとは、すべてウォイプする
   function wipeAll(address _manager, address _join, address _urn, address _vow, address _end) external;
   //wipeAllAndFreeETHとは、すべてウォイプしてETHをフリーする
   function wipeAllAndFreeETH(address _manager, address _join, address _urn, address _vow, address _end) external;
   //wipeAllAndFreeGemとは、すべてウォイプしてジェムをフリーする
   function wipeAllAndFreeGem(address _manager, address _join, address _urn, address _vow, address _end) external;
   //wipeAndFreeETHとは、ウォイプしてETHをフリーする
   function wipeAndFreeETH(address _manager, address _join, address _urn, address _vow, address _end, uint256 _wad) external;
   //wipeAndFreeGemとは、ウォイプしてジェムをフリーする
   function wipeAndFreeGem(address _manager, address _join, address _urn, address _vow, address _end, uint256 _wad) external;

}

//DssProxyActionsCommonとは、Dssプロキシアクションズコモン
contract DssProxyActionsCommon {
   //mulとは、乗算する
   function mul(uint x, uint y) internal pure returns (uint z) {
       require(y == 0 || (z = x * y) / y == x);
   }
   //subとは、減算する
   function sub(uint x, uint y) internal pure returns (uint z) {
       require((z = x - y) <= x);
   }
   //toInt256とは、int256に変換する
   function toInt256(uint x) internal pure returns (int y) {
       y = int(x);
       require(y >= 0);
   }
   //toRadとは、radに変換する
   function toRad(uint wad) internal pure returns (uint rad) {
       rad = mul(wad, 10 ** 27);
   }
   //convertTo18とは、18に変換する
   function convertTo18(address _join, uint256 _amt) internal returns (uint256 wad) {
       wad = mul(_amt, 10 ** (18 - Join(_join).dec()));
   }
   //daiJoin_joinとは、Daiジョインに参加する
   function daiJoin_join(address _join, address _urn, uint256 _wad) internal {
       // vat抽出
       VatAbstract vat = VatAbstract(Join(_join).vat());
       // dai抽出
       DaiAbstract dai = DaiAbstract(Join(_join).dai());
       // urn抽出
       urn = _urn == address(0) ? ManagerAbstract(Join(_join).manager()).urns(_cdp) : _urn;
       // vatのdaiをdaiに移動する
       vat.hope(_join);
       // daiをdaiJoinに移動する
       Join(_join).join(urn, _wad);
       // daiをurnに移動する
       dai.transferFrom(msg.sender, urn, _wad);
       // daiをurnに移動する
       dai.approve(_join, _wad);
   }
   //_getDrawDartとは、ドローdartを取得する
   function _getDrawDart(address _vat, address _jug, address _vow, address _end, uint256 _wad) internal returns (int dart) {
       // vat抽出
       VatAbstract vat = VatAbstract(_vat);
       // jug抽出
       JugAbstract jug = JugAbstract(_jug);
       // vow抽出
       VowAbstract vow = VowAbstract(_vow);
       // end抽出
       EndAbstract end = EndAbstract(_end);
       // ilk抽出
       bytes32 ilk = ManagerAbstract(vat.manager()).ilks(_cdp);
       // rate抽出
       uint256 rate = jug.drip(ilk);
       // dai抽出
       uint256 dai = vat.dai(address(this));
       // dart抽出
       dart = toInt256(_wad);
       // dartを更新する
       dart = mul(uint(dart), rate) <= dai ? - dart : toInt256(dai / rate);
       // dartを更新する
       dart = uint256(dart) <= vow.Sin() - vow.Ash() ? dart : toInt256(vow.Sin() - vow.Ash());
       // dartを更新する
       dart = uint256(dart) <= vat.dai(address(vow)) / rate ? dart : - toInt256(vat.dai(address(vow)) / rate);
       // dartを更新する
       dart = uint256(dart) <= end.tag() ? dart : - toInt256(end.tag());
   }
   //_getWipeDartとは、ウォイプdartを取得する
   function _getWipeDart(address _vat, uint256 _dai, address _urn) internal view returns (int dart) {
       // vat抽出
       VatAbstract vat = VatAbstract(_vat);
       // urn抽出
       urn = _urn == address(0) ? ManagerAbstract(vat.manager()).urns(_cdp) : _urn;
       // ilk抽出
       bytes32 ilk = ManagerAbstract(vat.manager()).ilks(_cdp);
       // urnのdaiを抽出する
       uint256 dai = vat.dai(urn);
       // dartを更新する
       dart = toInt256(_dai);
       // dartを更新する
       dart = dai < mul(uint(dart), RAY) ? - toInt256(dai / RAY) : dart;
   }
   //_getWipeAllWadとは、すべてウォイプwadを取得する
   function _getWipeAllWad(address _vat, address _jug, address _urn) internal view returns (uint wad) {
       // vat抽出
       VatAbstract vat = VatAbstract(_vat);
       // jug抽出
       JugAbstract jug = JugAbstract(_jug);
       // urn抽出
       urn = _urn == address(0) ? ManagerAbstract(vat.manager()).urns(_cdp) : _urn;
       // ilk抽出
       bytes32 ilk = ManagerAbstract(vat.manager()).ilks(_cdp);
       // rate抽出
       uint rate = jug.drip(ilk);
       // urnのdaiを抽出する
       uint dai = vat.dai(urn);
       // wadを更新する
       wad = dai / rate;
       // wadを更新する
       wad = mul(wad, RAY) < dai ? wad + 1 : wad;
   }
   //transferとは、転送する
   function transfer(address _dst, uint256 _wad) internal {
       // vat抽出
       VatAbstract vat = VatAbstract(ManagerAbstract(vat.manager()).vat());
       // urn抽出
       urn = ManagerAbstract(vat.manager()).urns(_cdp);
       // ilk抽出
       bytes32 ilk = ManagerAbstract(vat.manager()).ilks(_cdp);
       // urnのgemを抽出する
       vat.flux(ilk, urn, _dst, toRad(_wad));
   }
   //ethJoin_joinとは、ethジョインに参加する
   function ethJoin_join(address _join, address _urn) internal {
       // vat抽出
       VatAbstract vat = VatAbstract(Join(_join).vat());
       // urn抽出
       urn = _urn == address(0) ? ManagerAbstract(Join(_join).manager()).urns(_cdp) : _urn;
       // vatのgemをethに移動する
       vat.hope(_join);
       // ethをethJoinに移動する
       Join(_join).join.value(msg.value)(urn);
   }
   //gemJoin_joinとは、gemジョインに参加する
   function gemJoin_join(address _join, address _urn, uint256 _wad) internal {
       // vat抽出
       VatAbstract vat = VatAbstract(Join(_join).vat());
       // urn抽出
       urn = _urn == address(0) ? ManagerAbstract(Join(_join).manager()).urns(_cdp) : _urn;
       // vatのgemをgemに移動する
       vat.hope(_join);
       // gemをgemJoinに移動する
       Join(_join).join(urn, _wad);
   }
   //hopeとは、希望する
   function hope(address _usr) internal {
       // vat抽出
       VatAbstract vat = VatAbstract(ManagerAbstract(vat.manager()).vat());
       // urn抽出
       urn = ManagerAbstract(vat.manager()).urns(_cdp);
       // vatのgemをgemに移動する
       vat.hope(_usr);
   }
   //nopeとは、希望しない
   function nope(address _usr) internal {
       // vat抽出
       VatAbstract vat = VatAbstract(ManagerAbstract(vat.manager()).vat());
       // urn抽出
       urn = ManagerAbstract(vat.manager()).urns(_cdp);
       // vatのgemをgemに移動する
       vat.nope(_usr);
   }
   //openとは、開く
   function open() internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       _cdp = manager.open(ilk, address(this));
   }
   //giveとは、与える
   function give(address _dst) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.give(_cdp, _dst);
   }
   //giveToProxyとは、プロキシに与える
   function giveToProxy(address _dst, bytes32 _cdpi) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.giveToProxy(_cdp, _dst, _cdpi);
   }
   //cdpAllowとは、cdpを許可する
   function cdpAllow(address _usr, uint256 _ok) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.cdpAllow(_cdp, _usr, _ok);
   }
   //urnAllowとは、urnを許可する
   function urnAllow(address _usr, uint256 _ok) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.urnAllow(_cdp, _usr, _ok);
   }
   //fluxとは、流す
   function flux(address _dst, uint256 _wad) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.flux(_cdp, _dst, _wad);
   }
   //moveとは、移動する
   function move(address _dst, uint256 _rad) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.move(_cdp, _dst, _rad);
   }
   //frobとは、frobする
   function frob()

   //quitとは、quitする
   function quit(uint256 _wad) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.quit(_cdp, _wad);
   }
   //enterとは、enterする
   function enter(address _src, uint256 _wad) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.enter(_src, _wad);
   }
   //shiftとは、シフトする
   function shift(uint256 _cdpi) internal {
       // manager抽出
       ManagerAbstract manager = ManagerAbstract(ManagerAbstract(vat.manager()).manager());
       // cdpを更新する
       manager.shift(_cdpi);
   }
   
}