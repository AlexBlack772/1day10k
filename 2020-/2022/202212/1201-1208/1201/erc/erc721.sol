pragma solidity ^0.8.0;



   interface IERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint balance);

    function ownerOf(uint tokenId) external view returns (address owner);

    function safeTransferFrom(
        address from,
        address to,
        uint tokenId
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint tokenId,
        bytes calldata data
    ) external;

    function transferFrom(
        address from,
        address to,
        uint tokenId
    ) external;

    function approve(address to, uint tokenId) external;

    function getApproved(uint tokenId) external view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);
}

interface IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) external returns (bytes4);

}

contract ERC721 is IERC721 {

      mapping(address => uint) public balances;

      event Transfer(address indexed from, address indexed to, uint value);
      event Approval(address indexed owner, address indexed spender, uint value);
      event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

      mapping(address => mapping(address => uint)) public allowance;

      function transfer (address to, uint value) public returns (bool) {
            require(balanceOf(msg.sender) >= value, 'balance too low');
            balances[to] += value;
            balances[msg.sender] -= value;
            emit Transfer(msg.sender, to, value);
            return true;
      }

      function balanceOf(address account) public view returns (uint) {
            return balances[account];
      }

      function _mint(address to, uint tokenId) internal {
            balances[to] += 1;
            emit Transfer(address(0), to, tokenId);
      }

      function _burn(address owner, uint tokenId) internal {
            require(owner(tokenId) == owner, 'not owner');

            balances[owner] -= 1;
            emit Transfer(owner, address(0), tokenId);
      }


}

contract nft is ERC721 {

   function mint(address to, uint tokenId) public {
      _mint(to, tokenId);
   }

   function burn(address owner, uint tokenId) public {
      _burn(owner, tokenId);
   }

}