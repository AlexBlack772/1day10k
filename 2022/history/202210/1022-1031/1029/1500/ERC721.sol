pragma solidity ^0.8.13;

//IERC165とは、ERC165トークンのインターフェース
interface IERC165 {
   //supportsInterfaceとは、インターフェースをサポートしているかどうかを返す関数
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

interface IERC721 is IERC165 {
   //balanceOfとは、アドレスが保持しているトークンの数を返す関数
    function balanceOf(address owner) external view returns (uint256 balance);
   //ownerOfとは、トークンの所有者を返す関数
      function ownerOf(uint256 tokenId) external view returns (address owner);

   //safeTransferFromとは、トークンを送る関数
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
   //trasferFromとは、トークンを送る関数
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

   //approveとは、トークンを承認する関数
      function approve(address to, uint256 tokenId) external;
   //getApprovedとは、トークンを承認しているアドレスを返す関数
      function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);
   //setApprovalForAllとは、全てのトークンを承認する関数
      function setApprovalForAll(address operator, bool _approved) external;
   //isApprovedForAllとは、全てのトークンを承認しているかどうかを返す関数
      function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);
}

//IERC721Receiverとは、ERC721トークンを受け取るインターフェース
interface IERC721Receiver {
   //onERC721Receivedとは、ERC721トークンを受け取る関数
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

contract ERC721 is IERC721 {
   //Transferとは、トークンを送るイベント
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
   //Approvalとは、トークンを承認するイベント
      event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
   //ApprovalForAllとは、全てのトークンを承認するイベント
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    mapping(uint => address) internal _ownerOf;

    mapping(address => uint) internal _balanceOf;

    mapping(uint => address) internal _approvals;

    mapping(address => mapping(address => bool)) public isApprovedForAll;

    //supportsInterfaceとは、インターフェースをサポートしているかどうかを返す関数
      function supportsInterface(bytes4 interfaceID) public view virtual override returns (bool) {
         return interfaceID == type(IERC721).interfaceId;
      }

      //ownerOfとは、トークンの所有者を返す関数
      function ownerOf(uint256 tokenId) public view virtual override returns (address) {
         return _ownerOf[tokenId];
      }

      //balanceOfとは、アドレスが保持しているトークンの数を返す関数
      function balanceOf(address owner) public view virtual override returns (uint256) {
         return _balanceOf[owner];
      }

      //setApprovalForAllとは、全てのトークンを承認する関数
      function setApprovalForAll(address operator, bool _approved) public virtual override {
         isApprovedForAll[msg.sender][operator] = _approved;
         emit ApprovalForAll(msg.sender, operator, _approved);
      }

      //approveとは、トークンを承認する関数
      function approve(address to, uint256 tokenId) public virtual override {
         address owner = ownerOf(tokenId);
         require(to != owner, "ERC721: approval to current owner");
         require(
            msg.sender == owner || isApprovedForAll[owner][msg.sender],
            "ERC721: approve caller is not owner nor approved for all"
         );
         _approvals[tokenId] = to;
         emit Approval(owner, to, tokenId);
      }

      //getApprovedとは、トークンを承認しているアドレスを返す関数
      function getApproved(uint256 tokenId) public view virtual override returns (address) {
         require(_exists(tokenId), "ERC721: approved query for nonexistent token");
         return _approvals[tokenId];
      }

      //isApprovedOrOwnerとは、トークンを承認しているか、所有者かどうかを返す関数
      function isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
         require(_exists(tokenId), "ERC721: operator query for nonexistent token");
         address owner = ownerOf(tokenId);
         return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
      }

      //transferFromとは、トークンを送る関数
      function transferFrom(address from, address to, uint256 tokenId) public virtual override {
         require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
         _transfer(from, to, tokenId);
      }

      //safeTransferFromとは、トークンを送る関数
      function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
         safeTransferFrom(from, to, tokenId, "");
      }

      //mintとは、トークンを作成する関数
      function mint(address to, uint256 tokenId) public {
         _mint(to, tokenId);
      }

      //burnとは、トークンを破棄する関数
      function burn(uint256 tokenId) public {
         _burn(tokenId);
      }

}

contract MyNFT is ERC721 {
   //mintとは、
   
}

