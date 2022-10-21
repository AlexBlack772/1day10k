//valutとは、ユーザーがデポジットしたトークンを保管するコントラクト
contract Vault {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    // The token to be held.
    IERC20 public token;

    // The address of the account which may call `transfer`.
    address public guardian;

    constructor(IERC20 _token) public {
        token = _token;
        guardian = msg.sender;
    }

    function setGuardian(address _guardian) external {
        require(msg.sender == guardian, "!guardian");
        guardian = _guardian;
    }

    function transfer(address _to, uint256 _amount) external {
        require(msg.sender == guardian, "!guardian");
        token.safeTransfer(_to, _amount);
    }
}
//addressとは、アドレスのこと