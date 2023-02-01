// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function get() public view returns (uint256) {
        return count;
    }

    function decrement() public {
        count -= 1;
    }

}

contract Primitives {
    bool public boo = true;

    uint8 public u8 = 1;
    uint public u = 123;

    
}

contract Variables {
    string public text = "Hello World";
    uint public num = 123;

    function doSomething()  public {
        uint i = 456;
        uint timestamp = block.timestamp;
        address sender = msg.sender;
    }
}

contract Constants {
    address public constant owner = 0x
}

contract Immutable {
    address public immutable MY_ADDRESS 
}

contract Gas {
    uint public i = 0;

    function forever() public {
        while(true) {
            i += 1;
        }
    }
}

contract IfElse {
    function foo(uint x) public pure returns (uint) {
        if (x < 10) {
            return 0;
        } else if (x < 20) {
            return 1;
        } else {
            return 2;
        }
    }

    function ternary(uint x) public pure returns (uint) {
        return x < 10 ? 0 : 1;
    }


}

contract Loop {
    function loop() public {
        for (uint i = 0; i < 10; i++) {
            // do something
            if (i == 3) {
                continue;
            }
            if (i == 5) {
                break;
            }
        }

        uint j;
        while (j < 10) {
            j++;
        }
    } 
}

contract Mapping{
    mapping(address => uint) public myMap;

    function get(address _addr) public view returns (uint) {
        return myMap[_addr];
    }

    function set(address _addr, uint _i) public {
        myMap[_addr] = _i;
    }

    function remove(address _addr) public {
        delete myMap[_addr];
    }
}

contract NestedMapping {
    mapping(address => mapping(uint => bool)) public nested;

    function get(address _addr1, uint _i) public view returns (bool) {
        return nested[_addr1][_i];
    }

    function set(address _addr1, uint _i, bool _boo) public {
        nested[_addr1][_i] = _boo;
    }

    function remove(address _addr1, uint _i) public {
        delete nested[_addr1][_i];
    }
}

contract Array {
    uint[] public arr;
    uint[] public arr2 = [1,2,3];
    uint[10] public myFixedSizeArr;

    function get(uint i) public view returns (uint) {
        return arr[i];
    }

    function getArr() public view returns (uint[] memory) {
        return arr;
    }

    function push(uint i) public {
        arr.push(i);
    }

    function pop() public {
        arr.pop();
    }

    function getLength() public view returns (uint) {
        return arr.length;
    }

    function remove(uint index) public {
        delete arr[index];
    }

    function examples() external {
        uint[] memory a = new uint[](7);
    }
}

contract ArrayRemoveShifting {
    uint[] public arr
}
 
contract Enum {
    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }

    Status public status;

    function get() public view returns (Status) {
        return status;
    }

    function set(Status _status) public {
        status = _status;
    }

    function cancel() public {
        status = Status.Canceled;
    }

    function reset() public {
        delete status;
    }
}

contract Todos {
    struct Todo {
        string text;
        bool completed;
    }

    Todo[] public todos;

    function create(string calldata _text) public {
        todos.push(Todo(_text, false));

        todos.push(Todo({
            text: _text,
            completed: false
        }));

        Todo memory todo
        todo.text = _text;

        todos.push(todo);
    }

    function get(uint _index) public view returns (string memory text, bool completed) {
        Todo storage todo = todos[_index];
        return (todo.text, todo.completed);
    }

    function updateText(uint _index, string calldata _text) public {
        Todo storage todo = todos[_index];
        todo.text = _text;
    }

    function toogleCompleted(uint _index) public {
        Todo storage todo = todos[_index];
        todo.completed = !todo.completed;
    }

}

contract DataLocations {
    uint[] public arr;
    mapping(uint => address) map;
    struct MyStruct {
        uint foo;
    }
    mapping(uint => MyStruct) myStructs;

    function f() public {
        _f(arr, map, myStructs[1]);
        MyStruct storage myStruct = myStructs[1];
        MyStruct memory myMemStruct = MyStruct(0);
    }

    function _f(uint[] storage _arr, mapping(uint => address) storage _map, MyStruct storage _myStruct) internal {
    }

    function g(uint[] memory _arr) public returns (uint[] memory) {
        _arr[0] = 1;
        return _arr;
    }

    function h(uint calldata _arr) external {

    }
}

contract Function {
    function returnMany() public pure returns (uint, bool, uint) {
        return (1, true, 2);
    }

    function named() public pure returns (uint x, bool b, uint y) {
        return (1, true, 2);
    }

    function assigned() public pure returns (uint x, bool b, uint y) {
        x = 1;
        b = true;
        y = 2;
    }

    function destructuringAssignment() public pure returns (uint, bool, uint, uint, uint) {
        (uint i, bool b, uint j) = returnMany();
        (uint x, , uint y) = (4, 5, 6);
        return (i, b, j, 4, 5);
    }

    function arrayInput(uint[] memory _arr) public {

    }

    uint[] public arr;

    function arrayOutput() public view returns (uint[] memory) {
        return arr;
    }

}

contract XYZ {
    function someFuncWithManyInputs(
        uint x,
        uint y,
        uint z,
        address a,
        bool b,
        string memory c
    ) 
}

contract ViewAndPure {
    uint public x = 1;

    function addToX(uint y) public returns (uint) {
        return x + y;
    }

    function add(uint i, uint j) public pure returns (uint) {
        return i + j;
    }
}

//
contract Error {
    function testRequire(uint _i) public pure {
        // Require should be used to validate conditions such as:
        // - inputs
        // - conditions before execution
        // - return values from calls to other functions
        require(_i > 10, "Input must be greater than 10");
    }

    function testRevert(uint _i) public pure {
        // Revert is useful when the condition to check is complex.
        // This code does the exact same thing as the example above
        if (_i <= 10) {
            revert("Input must be greater than 10");
        }
    }

    uint public num;

    function testAssert() public view {
        // Assert should only be used to test for internal errors,
        // and to check invariants.

        // Here we assert that num is always equal to 0
        // since it is impossible to update the value of num
        assert(num == 0);
    }

    // custom error
    error InsufficientBalance(uint balance, uint withdrawAmount);

    function testCustomError(uint _withdrawAmount) public view {
        uint bal = address(this).balance;
        if (bal < _withdrawAmount) {
            revert InsufficientBalance({balance: bal, withdrawAmount: _withdrawAmount});
        }
    }
}

contract Account {
    uint public balance;
    uint public constant MAX_UINT = 2**256 - 1;

    function deposit(uint _amount) public {
        uint oldBalance = balance;
        uint newBalance = balance + _amount;

        // Check for overflow
        require(newBalance >= oldBalance, "Overflow");

        balance = newBalance;

        assert(balance >= oldBalance);
    }

    function withdraw(uint _amount) public {
        uint oldBalance = balance;

        require(balance >= _amount, "Insufficient balance");

        if (_amount > oldBalance) {
            revert();
        }

        uint newBalance = oldBalance - _amount;
        balance = newBalance;
    }

}

contract FunctionModifier {
    address public owner;
    uint public x = 10;
    bool public locked;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }

    function changeOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
        owner = _newOwner;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    function decrement(uint i) public noReentrancy {
        x -= i;

        if (i > 1) {
            decrement(i - 1);
        }
    }
}

contract Event {
    event Log(address indexed sender, string message);

    event AnotherLog();

    function test() public {
        emit Log(msg.sender, "Hello");
        emit AnotherLog();
    }
}

contract X {
    string public name;

}

contract Y {
    string public text;

    constructor(string memory _text) {
        text = _text;
    }
}

contract B is X("myName"), Y("myText") {
    
}

contract C is X,Y {
    constructor(string memory _name, string memory _text) X(_name) Y(_text) {   
    }
}

contract A {
    function foo() public virtual returns (string memory) {
        return "A";
    }
}

contract B is A {
    function foo() public override returns (string memory) {
        return "B";
    }
}

contract C is A {
    function foo() public pure virtual override returns (string memory) {
        return "C";
    }
}

contract D is B, C {
    function foo() public pure override(B, C) returns (string memory) {
        return super.foo();
    
    }
}

contract E is C, B {
    function foo() public pure override(C, B) returns (string memory) {
        return super.foo();
    }
}

contract F is A, B {
    function foo() public pure override(A, B) returns (string memory) {
        return super.foo();
    }
}

contract A {
    string public name = "A";
    function getName() public view returns (string memory) {
        return name;
    }
}

contract C is A {
    constructor() {
        name = "C";
    }
}

contract A {
    event Log(string message);

    function foo() public virtual {
        emit Log("foo");
    }

    function bar() public virtual {
        emit Log("bar");
    }

}

contract B is A {
    function foo() public override {
        emit Log("foo in B");
        A.foo();
    }

    function bar() public virtual override {
        emit Log("bar in B");
        super.bar();
    }
}

contract C is A {
    function foo() public virtual override {
        emit Log("foo in C");
        A.foo();
    }

    function bar() public virtual override {
        emit Log("bar in C");
        super.bar();
    }
}

contract D is B, C {
    function foo() public override(B, C) {
        super.foo();
    }

    function bar() public override(B, C) {
        super.bar();
    }
}

contract Base {
    function privateFunc() private pure returns (string memory) {
        return "private";
    }

    function testPrivateFunc() public pure returns (string memory) {
        return privateFunc();
    }  

}

contract Payable{
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function deposit() public payable {
        // Accept Ether
    }

    function notPayable() public {
        // Cannot accept Ether
    }


}

contract UniswapV3Flash {
    address private contrant FACTORY = 0x1F98431c8aD98523631AE4a59f267346ea31F984;

    struct FlashCallbackData {
        uint amount0;
        uint amount1;
        address caller;
    }

    IERC20 private immutable token0;
    IERC20 private immutable token1;

    IUniswapV3Pool private immutable pool;

    constructor(address _token0, address _token1, uint24 _fee) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);

        pool = IUniswapV3Pool(
            getPoolKey(_token0, _token1, _fee)
        );
    }

    function getPool(
        address _token0,
        address _token1,
        uint24 _fee
    ) public pure returns (address) {
        PoolAddress.PoolKey memory poolKey = PoolAddress.PoolKey(
             _token0,
             _token1,
             _fee
        );
        return PoolAddress(FACTORY, poolKey);
    }

    function flash(
        uint _amount0,
        uint _amount1
    ) external {
        b memory data = FlashCallbackData(
            _amount0,
            _amount1,
            msg.sender
        );

        pool.flash(
            address(this),
            abi.encode(data),
            _amount0,
            _amount1
        );
    }

    function uniswapV3FlashCallback(
        uint fee0,
        uint fee1,
        bytes calldata data
    ) external {
        require(msg.sender == address(pool), "Invalid caller");

        FlashCallbackData memory decoded = abi.decode(data, (FlashCallbackData));

        if (fee0> 0) {
            token0.transferFrom(decoded.caller, address(this), fee0);
            token0.transfer(address(pool),decoded.amount0 + fee0);
        }

        if(fee1 > 0) {
            token1.transferFrom(decoded.caller, address(this), fee1);
            token1.transfer(address(pool), decoded.amount1 + fee1);
        }

    }
}

library PoolAddress {
    bytes32 internal constant POOL_INIT_CODE_HASH = 0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f;

    struct PoolKey {
        address token0;
        address token1;
        uint24 fee;
    }

    function getPoolKey(
        address tokenA,
        address tokenB,
        uint24 fee
    ) internal pure returns (PoolKey memory) {
        if (tokenA > tokenB) (tokenA, tokenB) = (tokenB, tokenA);
        return PoolKey({token0: tokenA, token1: tokenB, fee: fee});
    }

    function computeAddress(
        address factory,
        PoolKey memory key
    ) internal pure returns (address pool) {
        pool = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            hex"ff",
                            factory,
                            keccak256(abi.encode(poolKey)),
                            POOL_INIT_CODE_HASH
                        )
                    )
                )
            )
        );
    }

}

interface IUniswapV3Pool {
    function flash(
        address recipient,
        bytes calldata data,
        uint amount0,
        uint amount1,
        bytes calldata data
    ) external;
}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

     event Transfer(address indexed from,address indexed to, uint value);

     event Approval(address indexed owner, address indexed spender, uint value);

}

interface IWETH is IERC20 {
    function deposit() external payable;

    function withdraw(uint amount) external;
}

contract Vault {
    IERC20 public immutable token;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function _mint(address _to, uint _shares) private {
        balanceOf[_to] += _shares;
        totalSupply += _shares;
    }

    function _burn(address _from, uint _shares) private {
        balanceOf[_from] -= _shares;
        totalSupply -= _shares;
    }

    function deposit(uint _amount) external {
        uint shares;
        if (totalSupply == 0) {
            shares =  _amount;
        } else {
            shares = (_amount * totalSupply) / token.balanceOf(address(this));
        }

        token.transferFrom(msg.sender, address(this), _amount);
        _mint(msg.sender, shares);

    }

    function withdraw(uint _shares) external {
        uint amount = (token.balanceOf(address(this)) * _shares) / totalSupply;
        token.transfer(msg.sender, amount);
        _burn(msg.sender, _shares);
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

     event Transfer(address indexed from,address indexed to, uint value);

     event Approval(address indexed owner, address indexed spender, uint value);


}

contract StakingRewards {
    IERC public immutable rewardsToken;
    IERC public immutable stakingToken;

    address public owner;

    uint public duration;
    uint public finishAt;
    uint public updatedAt;
    uint public rewardRate;
    uint public rewardPerTokenStored;

    mapping(address => uint) public userRewardPerTokenPaid;
    mapping(address => uint) public rewards;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor(
        address _rewardsToken,
        address _stakingToken,
        
    ) {
        rewardsToken = IERC(_rewardsToken);
        stakingToken = IERC(_stakingToken);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        }
        _;
    }

    function lastTimeRewardApplicable() public view returns (uint) {
        return _min(finishAt, block.timestamp);
    }

    function rewardPerToken() public view returns (uint) {
        if (totalSupply == 0) {
            return rewardPerTokenStored;
        }

        return
            rewardPerTokenStored +
            ((lastTimeRewardApplicable() - updatedAt) * rewardRate * 1e18) /
            totalSupply;
    }

    function stake(uint _amount) external updateReward(msg.sender) {
        require(finishAt == 0, "Finished");
        require(_amount > 0, "Cannot stake 0");

        totalSupply += _amount;
        balanceOf[msg.sender] += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(uint amount) external updateReward(msg.sender) {
        require(_amount > 0, "Cannot withdraw 0");

        totalSupply -= amount;
        balanceOf[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, _amount);
    }

    function earned(address _account) public view returns (uint) {
        return
            (balanceOf[_account] * (rewardPerToken() - userRewardPerTokenPaid[_account])) /
            1e18 +
            rewards[_account];
    }

    function getReward() external updateReward(msg.sender) {
        uint reward = earned(msg.sender);
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardsToken.transfer(msg.sender, reward);
        }
    }

    function setRewardDuration(uint _duration) external onlyOwner {
        require(finishAt < block.timestamp, "Finished");
        duration = _duration;
    }

    function notifyRewardAmount(uint _amount) external onlyOwner updateReward(address(0)) {
        if( block.timestamp >= finishAt ) {
            rewardRate = _amount / duration;
        } else {
            uint remaining = finishAt - block.timestamp;
            uint leftover = remaining * rewardRate;
            rewardRate = (_amount + leftover) / duration;
        }
        require(finishAt < block.timestamp, "Finished");
        require(_reward > 0, "Cannot notify 0");

        rewardsToken.transferFrom(msg.sender, address(this), _reward);

        rewardRate = _reward / duration;
        updatedAt = block.timestamp;
        finishAt = block.timestamp + duration;
    }

}

