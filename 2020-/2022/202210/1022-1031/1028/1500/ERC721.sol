pragma solidity ^0.8.13;

//IERC165とは、ERC165トークンのインターフェースです。
interface IERC165 {
   //supportsInterfaceとは、インターフェースをサポートしているか確認する関数です。
   function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721 is IERC165 {
   //balanceofとは、所有しているトークンの数を確認する関数です。
   function balanceOf(address owner) external view returns (uint256 balance);
   //ownerofとは、所有者を確認する関数です。
   function ownerOf(uint256 tokenId) external view returns (address owner);
   //safeTransferFromとは、所有権を移転する関数です。
   function safeTransferFrom(address from, address to, uint256 tokenId) external;
   //tranferFromとは、所有権を移転する関数です。
   function transferFrom(address from, address to, uint256 tokenId) external;
   //approveとは、所有権を移転する関数です。
   function approve(address to, uint256 tokenId) external;
   //getApprovedとは、所有権を移転する関数です。
   function getApproved(uint256 tokenId) external view returns (address operator);
   //setApprovalForAllとは、所有権を移転する関数です。
   function setApprovalForAll(address operator, bool _approved) external;
   //isApprovedForAllとは、所有権を移転する関数です。
   function isApprovedForAll(address owner, address operator) external view returns (bool);

}

//IERC721Receiverとは、ERC721トークンのインターフェースです。
interface IERC721Receiver {
   //onERC721Receivedとは、所有権を移転する関数です。
   function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}

//ERC721とは、ERC721トークンのコントラクトです。
contract ERC721 is IERC721 {
   //Transfer()
   event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
   //Approval()
   event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
   //ApprovalForAll()
   event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

   mapping(uint => address) internal _ownerOf;

    //
    mapping(address => uint) internal _balanceOf;

    //
    mapping(uint => address) internal _approvals;

    //
    mapping(address => mapping(address => bool)) public isApprovedForAll;

    //supportsInterfaceとは、インターフェースをサポートしているか確認する関数です。
      function supportsInterface(bytes4 interfaceId) external view override returns (bool) {
         return interfaceId == type(IERC721).interfaceId || interfaceId == type(IERC165).interfaceId;
      }

      //ownerOfとは、所有者を確認する関数です。
      function ownerOf(uint256 tokenId) external view override returns (address) {
         return _ownerOf[tokenId];
      }
      //balanceOfとは、所有しているトークンの数を確認する関数です。
      function balanceOf(address owner) external view override returns (uint256) {
         return _balanceOf[owner];
      }
      //setApprovalForAllとは、所有権を移転する関数です。
      function setApprovalForAll(address operator, bool _approved) external override {
         isApprovedForAll[msg.sender][operator] = _approved;
         emit ApprovalForAll(msg.sender, operator, _approved);
      }
      //isApprovedForAllとは、所有権を移転する関数です。
      function isApprovedForAll(address owner, address operator) external view override returns (bool) {
         return isApprovedForAll[owner][operator];
      }
      //getApprovedとは、所有権を移転する関数です。
      function getApproved(uint256 tokenId) external view override returns (address) {
         return _approvals[tokenId];
      }
      //approveとは、所有権を移転する関数です。
      function approve(address to, uint256 tokenId) external override {
         address owner = _ownerOf[tokenId];
         require(to != owner, "ERC721: approval to current owner");
         require(msg.sender == owner || isApprovedForAll[owner][msg.sender], "ERC721: approve caller is not owner nor approved for all");
         _approvals[tokenId] = to;
         emit Approval(owner, to, tokenId);
      }
      //transferFromとは、所有権を移転する関数です。
      function transferFrom(address from, address to, uint256 tokenId) external override {
         address owner = _ownerOf[tokenId];
         require(owner == from, "ERC721: transfer of token that is not own");
         require(msg.sender == owner || isApprovedForAll[owner][msg.sender] || _approvals[tokenId] == msg.sender, "ERC721: transfer caller is not owner nor approved");
         _transfer(from, to, tokenId);
      }
      //safeTransferFromとは、所有権を移転する関数です。
      function safeTransferFrom(address from, address to, uint256 tokenId) external override {
         safeTransferFrom(from, to, tokenId, "");
      }
      //safeTransferFromとは、所有権を移転する関数です。
      function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) public override {
         transferFrom(from, to, tokenId);
         require(_checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
      }
      //mint
