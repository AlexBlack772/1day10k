pragma solidity ^0.8.13;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/Strings.sol";

contract SecuredFindThisHash {

   struct Commit {
         bytes32 solutionHash;
         uint256 committime;
         bool revealed;
   }

   bytes32 public hash = 0x0000000000000000000000000000000000000000000000000000000000000000;

   address public owner;
   uint256 public reward;
   bool public ended;

   mapping(address => Commit) public commits;

   modifier gameActive() {
         require(!ended, "Game has ended");
         _;
   }

   constructor() payable {
         owner = msg.sender;
         reward = msg.value;
   }

   function commitSolution(bytes32 solutionHash) public gameActive {
         commits[msg.sender] = Commit(solutionHash, block.timestamp, false);
   }

   function getMySolution() public view returns (bytes32) {
         return commits[msg.sender].solutionHash;
   }

   function revealSolution(string memory solution) public gameActive {
         require(!commits[msg.sender].revealed, "Solution already revealed");
         require(keccak256(abi.encodePacked(solution)) == commits[msg.sender].solutionHash, "Solution is not correct");
         commits[msg.sender].revealed = true;
   }
}