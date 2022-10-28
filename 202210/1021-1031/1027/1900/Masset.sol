pragma solidity ^0.8.13;

//Massetとは、マセット
interface Masset {
   //mintとは、ミントする
   function mint(address _bAsset, uint256 _bAssetQuantity) external;
   //redeemとは、リデームする
   //リデームとは、返還する
   function redeem(address _bAsset, uint256 _mAssetQuantity) external;
   //mintToとは、ミントする
   function mintTo(address _bAsset, uint256 _bAssetQuantity, address _recipient) external;
   //mintMultiとは、ミントする
   function mintMulti(address[] calldata _bAssets, uint256[] calldata _bAssetQuantities, address _recipient) external;
   //swapとは、 スワップする
   function swap(address _input, address _output, uint256 _quantity, address _recipient) external;
   //getSwapOutputとは、スワップの出力を取得する
   function getSwapOutput(address _input, address _output, uint256 _quantity) external view returns (uint256);
   //redeemMassetとは、マセットをリデームする
   function redeemMasset(uint256 _mAssetQuantity, address _recipient) external;
   
}