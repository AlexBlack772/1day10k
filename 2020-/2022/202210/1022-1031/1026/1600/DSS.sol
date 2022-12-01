pragma solidity ^0.8.13;

contract DssProxyActionsBase {
   uint constant WAD = 10 ** 18;
   uint constant RAY = 10 ** 27;

   function mul(uint x, uint y) internal pure returns (uint z) {
      require(y == 0 || (z = x * y) / y == x, "mul-overflow");
   }

   function sub(uint x, uint y) internal pure returns (uint z) {
      require((z = x - y) <= x, "sub-overflow");
   }

   function toInt(uint x) internal pure returns (int y) {
      y = int(x);
      require(y >= 0, "int-overflow");
   }

   //toRadとは、単位を変換する関数
   function toRad(uint wad) internal pure returns (uint rad) {
      rad = mul(wad, 10 ** 27);
   }

   //covertto18とは、単位を変換する関数
   function convertTo18(address gemJoin, uint256 amt) internal returns (uint256 wad) {
      wad = mul(amt, 10 ** (18 - GemJoinAbstract(gemJoin).dec()));
   }

   //dai_joinとは、Daiの合成を行うためのコントラクト
   function daiJoin_join(address apt, address urn, uint wad) internal {
      // Gets DAI from the user's wallet
      DaiJoinAbstract(apt).dai().transferFrom(msg.sender, address(this), wad);
      // Approves adapter to take the DAI amount
      DaiJoinAbstract(apt).dai().approve(address(apt), wad);
      // Joins DAI into the vat
      DaiJoinAbstract(apt).join(urn, wad);
   }

   //getDartとは、Daiの量を計算する関数
   function _getDrawDart(
      address vat,
      address jug,
      address urn,
      bytes32 ilk,
      uint wad
   ) internal returns (int dart) {
      // Updates stability fee rate
      uint rate = JugAbstract(jug).drip(ilk);

      // Gets DAI balance of the urn in the vat
      uint dai = VatAbstract(vat).dai(urn);

      // If there was already enough DAI in the vat balance, just exits it without adding more debt
      if (dai < mul(RAY, wad)) {
         // Calculates the needed dart so together with the existing dai in the vat is enough to exit wad amount of DAI tokens
         dart = toInt(sub(mul(RAY, wad), dai) / rate);
         // This is neeeded due lack of precision. It might need to sum an extra dart wei (for the given DAI wad amount)
         dart = mul(uint(dart), rate) < mul(RAY, wad) ? dart + 1 : dart;
      }
   }

   //
   function _getWipeDart(
      address vat,
      uint dai,
      address urn,
      bytes32 ilk
   ) internal view returns (int dart) {
      // Gets actual rate from the vat
      (, uint rate,,,) = VatAbstract(vat).ilks(ilk);
      // Gets actual art value of the urn
      (, uint art) = VatAbstract(vat).urns(ilk, urn);

      // Uses the whole dai balance in the vat to reduce the debt
      dart = toInt(dai / rate);
      // Checks the calculated dart is not higher than urn.art (total debt), otherwise uses its value
      dart = uint(dart) <= art ? - dart : - toInt(art);
   }

   //openとは、Cdpを作成する関数
   function _getWipeAllWad(
      address vat,
      address urn,
      bytes32 ilk
   ) internal view returns (uint wad) {
      // Gets actual rate from the vat
      (, uint rate,,,) = VatAbstract(vat).ilks(ilk);
      // Gets actual art value of the urn
      (, uint art) = VatAbstract(vat).urns(ilk, urn);

      uint rad = sub(mul(art, rate), VatAbstract(vat).dai(urn));
      wad = rad / RAY;

      wad = mul(wad, RAY) < rad ? wad + 1 : wad;
   }

   //


}