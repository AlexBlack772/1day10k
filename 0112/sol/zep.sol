//
revokeRole(bytes32 role, address account)

//
bytes32 public constant MY_ROLE = keccak256("MY_ROLE");

function grantRole(bytes32 role, address account) public {
    require(hasRole(role, msg.sender), "Sender must have role");
    _grantRole(role, account);
}


