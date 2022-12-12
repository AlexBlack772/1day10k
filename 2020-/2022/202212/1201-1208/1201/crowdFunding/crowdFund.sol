pragma solidity ^0.8.0;

contract CrowdFund {
      mapping(address => uint) public contributors;
      address public admin;
      uint public noOfContributors;
      uint public minimumContribution;
      uint public deadline; // timestamp
      uint public goal;
      uint public raisedAmount;
   
      struct Request {
         string description;
         address payable recipient;
         uint value;
         bool completed;
         uint noOfVoters;
         mapping(address => bool) voters;
      }
   
      Request[] public requests;
   
      constructor(uint _goal, uint _deadline) {
         goal = _goal;
         deadline = block.timestamp + _deadline;
         minimumContribution = 100 wei;
         admin = msg.sender;
      }
   
      function contribute() public payable {
         require(block.timestamp < deadline, 'Deadline has passed');
         require(msg.value >= minimumContribution, 'Minimum contribution not met');
   
         if(contributors[msg.sender] == 0) {
               noOfContributors++;
         }
   
         contributors[msg.sender] += msg.value;
         raisedAmount += msg.value;
      }
   
      function getBalance() public view returns(uint) {
         return address(this).balance;
      }

      function withdraw() public {
         require(msg.sender == admin, 'Only admin can withdraw');
         require(block.timestamp > deadline, 'Deadline has not passed');
         require(raisedAmount >= goal, 'Goal was not met');
         payable(msg.sender).transfer(address(this).balance);
      }

}