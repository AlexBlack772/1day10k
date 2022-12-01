pragma solidity ^0.8.13;

interface Masset {
   //mintとは、
   function mint(address _bAsset, uint256 _bAssetQuantity, bool _hasTxFee) external;

   //mintToとは、
   function mintTo(address _bAsset, uint256 _bAssetQuantity, address _recipient, bool _hasTxFee) external;

   //mintMultiとは、
   function mintMulti(address[] calldata _bAssets, uint256[] calldata _bAssetQuantities, bool _hasTxFee) external;

   //swapとは、交換する関数
   function swap(
      address _input,
      address _output,
      uint256 _quantity,
      address _recipient,
      bool _hasTxFee
   ) external;

   //getSwapOutputとは、交換出力を取得する関数
   function getSwapOutput(address _input, address _output, uint256 _quantity) external view returns (uint256);

   //redeemとは、レーディーむする関数
   function redeem(address _bAsset, uint256 _mAssetQuantity, bool _hasTxFee) external;
   
}