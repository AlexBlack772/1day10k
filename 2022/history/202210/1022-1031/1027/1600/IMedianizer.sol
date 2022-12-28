pragma solidity ^0.6.0;

interface IMedianizer {
    //setOwnerとは、オーナーを設定する
      function setOwner(address owner_) external;
      //pokeとは、ポークする
      function poke() external;
      //computeとは、計算する
      function compute() external view returns (uint256);
      //setとは、設定する
      function set(address[] calldata medians_) external;
      //unsetとは、アンセットする
      function unset(address median_) external;
      //indexesとは、インデックスを取得する
      function indexes(address median_) external view returns (uint256);
      //nextとは、次を取得する
      function next(address median_) external view returns (address);
      //readとは、読み取る
      function read() external view returns (uint256);
      //peekとは、ピークする
      function peek() external view returns (uint256, bool);
      //valuesとは、値を取得する
      function values(address median_) external view returns (uint256);
      //setMinとは、最小値を設定する
      function setMin(uint256 min_) external;
      //setAuthorityとは、権限を設定する
      function setAuthority(address authority_) external;
      //ownerとは、オーナーを取得する
      function owner() external view returns (address);
      //authorityとは、権限を取得する
      function authority() external view returns (address);
      //voidとは、ヴォイドする
      function void() external;
      //unsetとは、アンセットする
      function unset() external;
      
}