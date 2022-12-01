pragma solidity ^0.8.10;

//Massetとは、マルチアセットを管理するためのコントラクトです。
interface Masset {
   //mintとは、マルチアセットを発行するための関数です。
   function mint(address _bAsset, uint256 _bAssetQuantity) external;

   //mintToとは、マルチアセットを発行するための関数です。
   function mintTo(address _bAsset, uint256 _bAssetQuantity, address _recipient) external;

   //mintMultiとは、マルチアセットを発行するための関数です。
   function mintMulti(address[] calldata _bAssets, uint256[] calldata _bAssetQuantities, address _recipient) external;

   //swapとは、マルチアセットを交換するための関数です。
   function swap(address _input, address _output, uint256 _quantity, address _recipient) external;

   //redeemとは、マルチアセットを取り出すための関数です。
   function redeem(address _bAsset, uint256 _bAssetQuantity) external;

   //redeemToとは、マルチアセットを取り出すための関数です。
   function redeemTo(address _bAsset, uint256 _bAssetQuantity, address _recipient) external;

   //redeemMassetとは、マルチアセットを取り出すための関数です。
   function redeemMasset(uint256 _mAssetQuantity) external;
   

}