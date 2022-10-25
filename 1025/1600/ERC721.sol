pragma solidity ^0.8.13;

interface IERC165 {
      function supportsInterface(bytes4 interfaceId) external view returns (bool);
   
}

interface IERC721 is IERC165 {
   function balanceOf(address owner) external view returns (uint256 balance);

   function ownerOf(uint256 tokenId) external view returns (address owner);

   function safeTransferFrom(address from, address to, uint256 tokenId) external;

   function transferFrom(address from, address to, uint256 tokenId) external;

   function approve(address to, uint256 tokenId) external;

   function getApproved(uint256 tokenId) external view returns (address operator);

   function setApprovalForAll(address operator, bool _approved) external;

   function isApprovedForAll(address owner, address operator) external view returns (bool);

}

interface IERC721Receiver {
   function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}

contract ERC721 is IERC721 {
   event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
   event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
   event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

   mapping (uint => addres)  internal _ownerOf;

   mapping (uint => address)  internal _tokenApprovals;
   
   mapping (address => mapping (address => bool))  internal _operatorApprovals;

   function supportsInterface(bytes4 interfaceId) external view override returns (bool) {
      return interfaceId == type(IERC721).interfaceId;
   }

   function ownerOf(uint id) external view override returns (address) {
      return _ownerOf[id];
   }

   function balanceOf(address owner) external view override returns (uint) {
      return _ownerOf.length;
   }

   function setApprovalForAll(address operator, bool approved) external override {
      _operatorApprovals[msg.sender][operator] = approved;
      emit ApprovalForAll(msg.sender, operator, approved);
   }

   function approve(address to, uint id) external override {
      address owner = _ownerOf[id];
      require(to != owner, "ERC721: approval to current owner");
      require(msg.sender == owner || isApprovedForAll(owner, msg.sender), "ERC721: approve caller is not owner nor approved for all");
      _tokenApprovals[id] = to;
      emit Approval(owner, to, id);
   }

   function getApproved(uint id) external view override returns (address) {
      return _tokenApprovals[id];
   }

   function _isApprovedOrOwner(address spender, uint id) internal view returns (bool) {
      address owner = _ownerOf[id];
      return (spender == owner || getApproved(id) == spender || isApprovedForAll(owner, spender));
   }

   function transferFrom(
      address from,
      address to,
      uint id
   ) external override {
      require(_isApprovedOrOwner(msg.sender, id), "ERC721: transfer caller is not owner nor approved");
      _transfer(from, to, id);
   }

   function safeTransferFrom(
      address from,
      address to,
      uint id
   ) external override {
      safeTransferFrom(from, to, id, "");
   }
}

