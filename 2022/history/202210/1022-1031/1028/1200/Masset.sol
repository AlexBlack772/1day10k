pragma solidity ^0.6.0;

interface Masset {
   //mintとは、ミントする
   function mint(address _bAsset, uint256 _bAssetQuantity) external;
   //mintToとは、ミントする
   function mintTo(address _bAsset, uint256 _bAssetQuantity, address _recipient) external;
   //mintMultiとは、ミントする
   function mintMulti(address[] calldata _bAssets, uint256[] calldata _bAssetQuantities, address _recipient) external;
   //swapとは、交換する
   function swap(address _input, address _output, uint256 _quantity, address _recipient) external;
   //getSwapOutputとは、スワップ出力を取得する
   function getSwapOutput(address _input, address _output, uint256 _quantity) external view returns (uint256);
   //redeemとは、リディームする
   function redeem(address _bAsset, uint256 _mAssetQuantity) external;
   //redeemToとは、リディームする
   function redeemTo(address _bAsset, uint256 _mAssetQuantity, address _recipient) external;
   //redeemMassetとは、リディームする
   function redeemMasset(uint256 _mAssetQuantity, address _recipient) external;
   
}