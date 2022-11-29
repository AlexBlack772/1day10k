pragma solidity ^0.4.24;

contract DssProxyActionsBase {
   uint256 constant RAY = 10**27;

   function mul(uint x, uint y) internal pure returns (uint z) {
       require(y == 0 || (z = x * y) / y == x);
   }

   function sub(uint x, uint y) internal pure returns (uint z) {
       require((z = x - y) <= x);
   }

   function toInt(uint x) internal pure returns (int y) {
       y = int(x);
       require(y >= 0);
   }

   function toRad(uint wad) internal pure returns (uint rad) {
       rad = mul(wad, 10 ** 9);
   }

   function convertTo18(address gemJoin, uint256 amt) internal returns (uint256 wad) {
       wad = mul(amt, 10 ** (18 - GemJoinAbstract(gemJoin).dec()));
   }

   function daiJoin_join(address apt, address urn, uint wad) internal {
       // Gets DAI from the user's wallet
       DaiJoinAbstract(apt).dai().transferFrom(msg.sender, this, wad);
       // Approves adapter to take the DAI amount
       DaiJoinAbstract(apt).dai().approve(apt, wad);
       // Joins DAI into the vat
       DaiJoinAbstract(apt).join(urn, wad);
   }


   function _getDrawDart(address vat, address jug, address urn, bytes32 ilk, uint wad) internal returns (int dart) {
       // Updates stability fee rate
       uint rate = JugAbstract(jug).drip(ilk);
       // Gets DAI balance of the urn in the vat
       uint dai = VatAbstract(vat).dai(urn);
       // If there was already enough DAI in the vat balance, just exits it without adding more debt
       dart = toInt(sub(mul(rate, wad), dai) / RAY);
       // This is neeeded due lack of precision. It might need to sum an extra dart wei (for the given DAI wad amount)
       dart = mul(uint(dart), RAY) < mul(rate, wad) ? dart + 1 : dart;
   }


   function _getWipeDart(address vat, uint dai, address urn, bytes32 ilk) internal view returns (int dart) {
       // Gets actual rate from the vat
       (, uint rate,,,) = VatAbstract(vat).ilks(ilk);
       // Gets actual art value of the urn
       (, uint art) = VatAbstract(vat).urns(ilk, urn);
       // Uses the whole dai balance in the vat to reduce the debt
       dart = toInt(dai / rate);
       // Checks the calculated dart is not higher than urn.art (total debt), otherwise uses its value
       dart = uint(dart) <= art ? - dart : - toInt(art);
   }


   function _getWipeAllWad(address vat, address urn, bytes32 ilk) internal view returns (uint wad) {
       // Gets actual rate from the vat
       (, uint rate,,,) = VatAbstract(vat).ilks(ilk);
       // Gets actual art value of the urn
       (, uint art) = VatAbstract(vat).urns(ilk, urn);
       uint dai = VatAbstract(vat).dai(urn);
       uint rad = sub(mul(art, rate), dai);
       wad = rad / RAY;
       // If the rad precision has some dust, it will need to request for 1 extra wad wei
       wad = mul(wad, RAY) < rad ? wad + 1 : wad;
   }


   function transfer(address gem, address dst, uint wad) internal {
       GemAbstract(gem).transfer(dst, wad);
   }

   function ethJoin_join(address apt, address urn) internal payable {
       // Wraps ETH in WETH
       GemJoinAbstract(apt).gem().deposit.value(msg.value)();
       // Approves adapter to take the WETH amount
       GemJoinAbstract(apt).gem().approve(apt, msg.value);
       // Joins WETH collateral into the vat
       GemJoinAbstract(apt).join(urn, msg.value);
   }


   function gemJoin_join(address apt, address urn, uint wad) internal {
       // Gets token from the user's wallet
       GemJoinAbstract(apt).gem().transferFrom(msg.sender, this, wad);
       // Approves adapter to take the token amount
       GemJoinAbstract(apt).gem().approve(apt, wad);
       // Joins token collateral into the vat
       GemJoinAbstract(apt).join(urn, wad);
   }

   function hope(address obj, address usr) internal {
       HopeAbstract(obj).hope(usr);
   }
   
   function nope(address obj, address usr) internal {
       HopeAbstract(obj).nope(usr);
   }

   function open(address manager, bytes32 ilk, address usr) internal returns (uint cdp) {
       cdp = ManagerAbstract(manager).open(ilk, usr);
   }

   function give(address manager, uint cdp, address usr) internal {
       ManagerAbstract(manager).give(cdp, usr);
   }

   function giveToProxy(address manager, uint cdp, address dst, address usr) internal {
       ManagerAbstract(manager).giveToProxy(cdp, dst, usr);
   }

   function cdpAllow(address manager, uint cdp, address usr, uint ok) internal {
       ManagerAbstract(manager).cdpAllow(cdp, usr, ok);
   }

   function urnAllow(address manager, address usr, uint ok) internal {
       ManagerAbstract(manager).urnAllow(usr, ok);
   }

   function flux(address manager, uint cdp, address dst, uint wad) internal {
       ManagerAbstract(manager).flux(cdp, dst, wad);
   }

   function move(address manager, uint cdp, address dst, uint rad) internal {
       ManagerAbstract(manager).move(cdp, dst, rad);
   }

   function frob(address manager) internal {
       ManagerAbstract(manager).frob.apply(manager, arguments);
   }

   function quit(address manager, bytes32 ilk, uint cdp) internal {
       ManagerAbstract(manager).quit(ilk, cdp);
   }

   function enter(address manager, address src, uint cdp) internal {
       ManagerAbstract(manager).enter(src, cdp);
   }

   function shift(address manager, uint cdpSrc, uint cdpOrg) internal {
       ManagerAbstract(manager).shift(cdpSrc, cdpOrg);
   }

   function exit(address manager, address dst, uint cdp, uint wad) internal {
       ManagerAbstract(manager).exit(dst, cdp, wad);
   }

   function draw(address jug, address vat, bytes32 ilk, address urn, address daiJoin, uint wad) internal {
       // Generates debt in the CDP
       frob(vat, jug, urn, ilk, 0, _getDrawDart(vat, jug, urn, ilk, wad));
       // Moves the DAI amount (balance in the vat in rad) to proxy's address
       move(vat, urn, address(this), toRad(wad));
       // Allows adapter to access to proxy's DAI balance in the vat
       if (VatAbstract(vat).can(address(this), address(daiJoin)) == 0) {
           VatAbstract(vat).hope(daiJoin);
       }
       // Exits DAI to the user's wallet as a token
       daiJoin_join(daiJoin, urn, wad);
   }

   function wipe(address jug, address vat, bytes32 ilk, address urn, address daiJoin, uint wad) internal {
       // Joins DAI amount into the vat
       daiJoin_exit(daiJoin, urn, wad);
       // Paybacks debt to the CDP
       frob(vat, jug, urn, ilk, 0, -_getWipeDart(vat, VatAbstract(vat).dai(urn), urn, ilk));
   }

   



}