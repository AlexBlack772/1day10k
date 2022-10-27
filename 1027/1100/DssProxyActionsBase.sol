pragma solidity ^0.8.0;

contract DssProxyActionsBase{
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

   function convertTo18(address gemJoin, uint256 amt) internal returns (uint256 wad) {
       wad = mul(amt, 10 ** (18 - GemJoinAbstract(gemJoin).dec()));
   }

   function jaiJoin_join(address apt, address urn, uint256 wad) internal {
       require(wad <= 2 ** 255, "overflow");
       require(int(wad) >= 0, "int-overflow");
       DaiJoinAbstract(apt).join(urn, wad);
   }

   function _getDrawDart(
         address vat,
         address jug,
         address urn,
         bytes32 ilk,
         uint256 wad
      ) internal returns (int dart) {
         // Updates stability fee rate
         uint256 rate = JugAbstract(jug).drip(ilk);
   
         // Gets DAI balance of the urn in the vat
         uint256 dai = VatAbstract(vat).dai(urn);
   
         // If there was already enough DAI in the vat balance,
         // just exits it without adding more debt
         if (dai < mul(wad, RAY)) {
            // Calculates the needed dart so together with the existing dai in the vat is enough to exit wad amount of DAI tokens
            dart = toInt(sub(mul(wad, RAY), dai) / rate);
            // This is neeeded due lack of precision. It might need to sum an extra dart wei (for the given DAI wad amount)
            dart = mul(uint(dart), rate) < mul(wad, RAY) ? dart + 1 : dart;
         }
      }

      //_getWipeDartとは、Vatのdaiの残高を減らすために必要なdaiの量を計算する関数です。
      //vatとは、Cdpの状態を管理するコントラクトで、daiの残高を管理しています。
      //cdpとは、借りたdaiを保管するためのコントラクトです。
      //urnとは、cdpの所有者を表します。
      //ilkとは、借りたdaiの種類を表します。
      function _getWipeDart(
         address vat,
         uint256 dai,
         address urn,
         bytes32 ilk
      ) internal view returns (int dart) {
         // Gets actual rate from the vat
         (, uint256 rate,,,) = VatAbstract(vat).ilks(ilk);
         // Gets actual art value of the urn
         (, uint256 art) = VatAbstract(vat).urns(ilk, urn);
   
         // Uses the whole dai balance in the vat to reduce the debt
         dart = toInt(dai / rate);
         // Checks the calculated dart is not higher than urn.art (total debt), otherwise uses its value
         dart = uint(dart) <= art ? - dart : - toInt(art);
      }

      //getWipeAllWadとは、urnの全てのdebtをwipeするために必要なwadの量を返す関数
      //wadとは、daiの量を表します。
      function _getWipeAllWad(
         address vat,
         address urn,
         bytes32 ilk
      ) internal view returns (uint wad) {
         // Gets actual rate from the vat
         (, uint256 rate,,,) = VatAbstract(vat).ilks(ilk);
         // Gets actual art value of the urn
         (, uint256 art) = VatAbstract(vat).urns(ilk, urn);
   
         uint256 dai = VatAbstract(vat).dai(urn);
   
         uint rad = sub(mul(art, rate), dai);
         wad = rad / RAY;
   
         // If the rad precision has some dust, it will need to request for 1 extra wad wei
         wad = mul(wad, RAY) < rad ? wad + 1 : wad;
      }

      function transfer(address gem, address dst, uint wad) internal {
         GemAbstract(gem).transfer(dst, wad);
      }


      //ethJoinとは、ETHをDaiに変換するためのコントラクト
      //aptとは、Daiを保管するためのコントラクト
      function ethJoin_join(address apt, address urn) internal payable {
         require(int(msg.value) >= 0, "int-overflow");
         EthJoinAbstract(apt).join{value: msg.value}(urn);
      }

      //gemJoinとは、gemのjoin adapterのこと
      function gemJoin_join(address apt, address urn, uint wad) internal {
         require(wad <= 2 ** 255, "overflow");
         require(int(wad) >= 0, "int-overflow");
         GemJoinAbstract(apt).join(urn, wad);
      }

      function hope(
         address obj,
         address usr
      ) internal {
         HopeAbstract(obj).hope(usr);
      }

      //hopeとは、コントラクトの権限を与えること
      function hope(
         address obj,
         address[] memory usrs
      ) internal {
         for (uint i = 0; i < usrs.length; i++) {
            HopeAbstract(obj).hope(usrs[i]);
         }
      }

      //nopeとは、hopeを取り消すこと
      function nope(
         address obj,
         address usr
      ) internal {
         HopeAbstract(obj).nope(usr);
      }


      function open(
         address manager,
         bytes32 ilk,
         address usr
      ) internal returns (uint cdp) {
         cdp = ManagerAbstract(manager).open(ilk, usr);
      }

      function give(
         address manager,
         uint cdp,
         address usr
      ) internal {
         ManagerAbstract(manager).give(cdp, usr);
      }

      //giveToProxyとは、Proxyのアドレスを引数に取るgiveのこと
      function giveToProxy(
         address manager,
         address proxyRegistry,
         uint cdp,
         address dst
      ) internal {
         address owner = ManagerAbstract(manager).owns(cdp);
         if (owner != dst && ProxyRegistryAbstract(proxyRegistry).proxies(owner) == dst) {
            give(manager, cdp, dst);
         }
      }
      
      function cdpAllow(
         address manager,
         uint cdp,
         address usr,
         uint ok
      ) internal {
         ManagerAbstract(manager).cdpAllow(cdp, usr, ok);
      }

      function urnAllow(
         address manager,
         address usr,
         uint ok
      ) internal {
         ManagerAbstract(manager).urnAllow(usr, ok);
      }

      //fluxとは、cdpの所有権を移すこと
      //dstとは、移す先のアドレス
      function flux(
         address manager,
         uint cdp,
         address dst,
         uint wad
      ) internal {
         ManagerAbstract(manager).flux(cdp, dst, wad);
      }

      function move(
         address manager,
         uint cdp,
         address dst,
         uint rad
      ) internal {
         ManagerAbstract(manager).move(cdp, dst, rad);
      }

      function quit(
         address manager,
         uint cdp,
         address dst
      ) internal {
         ManagerAbstract(manager).quit(cdp, dst);
      }

      function enter(
         address manager,
         address src,
         uint cdp
      ) internal {
         ManagerAbstract(manager).enter(src, cdp);
      }

      function shift(
         address manager,
         uint cdpSrc,
         uint cdpOrg
      ) internal {
         ManagerAbstract(manager).shift(cdpSrc, cdpOrg);
      }
      



   
}