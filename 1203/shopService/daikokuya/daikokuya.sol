pragma solidity ^0.8.13;

interface IERC721 {

}

contract daikokuya {
      uint public profit;
      uint public huruhon;
      IERC721 public nft;

      address public owner;

      modifier onlyOwner() {
          require(msg.sender == owner);
          _;
         
      }

      function kaitori() public payable onlyOwner() {
         _mint(msg.sender, msg.value);
      }

      function kantei(uint rishi) public payable {
         _mint(msg.sender, msg.value);
      }

      function withdraw() public {
         require(msg.sender == owner);
         payable(msg.sender).transfer(profit);
      }

      function _mint(address to, uint value) internal {
         nft.mint(to, value);
      }

      function _haiki(address to, uint value) internal {
         nft.burn(to, value);
      }
      
}