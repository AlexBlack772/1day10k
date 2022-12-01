pragma solidity ^0.5.0;


contract UniDirectionalPayment {
    using ECDSA for bytes32;

    address payable public sender;
    address payable public receiver;

    uint256 public amount;

    constructor(address payable _recipient, uint256 _amount) public {
        owner = msg.sender;
        recipient = _recipient;
        amount = _amount;
    }

    function withdraw() public {
        require(msg.sender == owner);
        recipient.transfer(amount);
    }

    function getHash() public view returns (bytes32) {
        return keccak256(abi.encodePacked(address(this), amount));
    }
}