pragma solidity ^0.8.17;

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint _amount) external {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

contract MultiSigWallet {
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    constructor(address[] memory _owners, uint _numConfirmationsRequired) {
        require(_owners.length > 0, "owners required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to,
        uint _value,
        bytes memory _data
    ) public onlyOwner {
        uint txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) notConfirmed(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(
        uint _txIndex
    )
        public
        view
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}

contract MerkleProof {
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf,
        uint index
    ) public pure returns (bool) {
        bytes32 hash = leaf;

        for (uint i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, proofElement));
            } else {
                hash = keccak256(abi.encodePacked(proofElement, hash));
            }

            index = index / 2;
        }

        return hash == root;
    }
}

contract TestMerkleProof is MerkleProof {
    bytes32[] public hashes;

    constructor() {
        string[4] memory transactions = [
            "alice -> bob",
            "bob -> dave",
            "carol -> alice",
            "dave -> bob"
        ];

        for (uint i = 0; i < transactions.length; i++) {
            hashes.push(keccak256(abi.encodePacked(transactions[i])));
        }

        uint n = transactions.length;
        uint offset = 0;

        while (n > 0) {
            for (uint i = 0; i < n - 1; i += 2) {
                hashes.push(
                    keccak256(
                        abi.encodePacked(hashes[offset + i], hashes[offset + i + 1])
                    )
                );
            }
            offset += n;
            n = n / 2;
        }
    }

    function getRoot() public view returns (bytes32) {
        return hashes[hashes.length - 1];
    }

    /* verify
    3rd leaf
    0xdca3326ad7e8121bf9cf9c12333e6b2271abe823ec9edfe42f813b1e768fa57b

    root
    0xcc086fcc038189b4641db2cc4f1de3bb132aefbd65d510d817591550937818c7

    index
    2

    proof
    0x8da9e1c820f9dbd1589fd6585872bc1063588625729e7ab0797cfc63a00bd950
    0x995788ffc103b987ad50f5e5707fd094419eb12d9552cc423bd0cd86a3861433
    */
}

pragma solidity ^0.8.17;

contract MerkleProof1 {
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf,
        uint index
    ) public pure returns (bool) {
        bytes32 hash = leaf;

        for (uint i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, proofElement));
            } else {
                hash = keccak256(abi.encodePacked(proofElement, hash));
            }

            index = index / 2;
        }

        return hash == root;
    }
}

contract TestMerkleProof1 is MerkleProof {
    bytes32[] public hashes;

    constructor() {
        string[4] memory transactions = [
            "alice -> bob",
            "bob -> dave",
            "carol -> alice",
            "dave -> bob"
        ];

        for (uint i = 0; i < transactions.length; i++) {
            hashes.push(keccak256(abi.encodePacked(transactions[i])));
        }

        uint n = transactions.length;
        uint offset = 0;

        while (n > 0) {
            for (uint i = 0; i < n - 1; i += 2) {
                hashes.push(
                    keccak256(
                        abi.encodePacked(hashes[offset + i], hashes[offset + i + 1])
                    )
                );
            }
            offset += n;
            n = n / 2;
        }
    }

    function getRoot() public view returns (bytes32) {
        return hashes[hashes.length - 1];
    }

    /* verify
    3rd leaf
    0xdca3326ad7e8121bf9cf9c12333e6b2271abe823ec9edfe42f813b1e768fa57b

    root
    0xcc086fcc038189b4641db2cc4f1de3bb132aefbd65d510d817591550937818c7

    index
    2

    proof
    0x8da9e1c820f9dbd1589fd6585872bc1063588625729e7ab0797cfc63a00bd950
    0x995788ffc103b987ad50f5e5707fd094419eb12d9552cc423bd0cd86a3861433
    */
}

library IterableMapping {
    // Iterable mapping from address to uint;
    struct Map {
        address[] keys;
        mapping(address => uint) values;
        mapping(address => uint) indexOf;
        mapping(address => bool) inserted;
    }

    function get(Map storage map, address key) public view returns (uint) {
        return map.values[key];
    }

    function getKeyAtIndex(Map storage map, uint index) public view returns (address) {
        return map.keys[index];
    }

    function size(Map storage map) public view returns (uint) {
        return map.keys.length;
    }

    function set(Map storage map, address key, uint val) public {
        if (map.inserted[key]) {
            map.values[key] = val;
        } else {
            map.inserted[key] = true;
            map.values[key] = val;
            map.indexOf[key] = map.keys.length;
            map.keys.push(key);
        }
    }

    function remove(Map storage map, address key) public {
        if (!map.inserted[key]) {
            return;
        }

        delete map.inserted[key];
        delete map.values[key];

        uint index = map.indexOf[key];
        uint lastIndex = map.keys.length - 1;
        address lastKey = map.keys[lastIndex];

        map.indexOf[lastKey] = index;
        delete map.indexOf[key];

        map.keys[index] = lastKey;
        map.keys.pop();
    }
}

contract TestIterableMap {
    using IterableMapping for IterableMapping.Map;

    IterableMapping.Map private map;

    function testIterableMap() public {
        map.set(address(0), 0);
        map.set(address(1), 100);
        map.set(address(2), 200); // insert
        map.set(address(2), 200); // update
        map.set(address(3), 300);

        for (uint i = 0; i < map.size(); i++) {
            address key = map.getKeyAtIndex(i);

            assert(map.get(key) == i * 100);
        }

        map.remove(address(1));

        // keys = [address(0), address(3), address(2)]
        assert(map.size() == 3);
        assert(map.getKeyAtIndex(0) == address(0));
        assert(map.getKeyAtIndex(1) == address(3));
        assert(map.getKeyAtIndex(2) == address(2));
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

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract ERC20 is IERC20 {
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name = "Solidity by Example";
    string public symbol = "SOLBYEX";
    uint8 public decimals = 18;

    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(uint amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }
}

contract TokenSwap {
    IERC20 public token1;
    address public owner1;
    uint public amount1;
    IERC20 public token2;
    address public owner2;
    uint public amount2;

    constructor(
        address _token1,
        address _owner1,
        uint _amount1,
        address _token2,
        address _owner2,
        uint _amount2
    ) {
        token1 = IERC20(_token1);
        owner1 = _owner1;
        amount1 = _amount1;
        token2 = IERC20(_token2);
        owner2 = _owner2;
        amount2 = _amount2;
    }

    function swap() public {
        require(msg.sender == owner1 || msg.sender == owner2, "Not authorized");
        require(
            token1.allowance(owner1, address(this)) >= amount1,
            "Token 1 allowance too low"
        );
        require(
            token2.allowance(owner2, address(this)) >= amount2,
            "Token 2 allowance too low"
        );

        _safeTransferFrom(token1, owner1, owner2, amount1);
        _safeTransferFrom(token2, owner2, owner1, amount2);
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}

interface IERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint balance);

    function ownerOf(uint tokenId) external view returns (address owner);

    function safeTransferFrom(address from, address to, uint tokenId) external;

    function safeTransferFrom(
        address from,
        address to,
        uint tokenId,
        bytes calldata data
    ) external;

    function transferFrom(address from, address to, uint tokenId) external;

    function approve(address to, uint tokenId) external;

    function getApproved(uint tokenId) external view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(
        address owner,
        address operator
    ) external view returns (bool);
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
    event Transfer(address indexed from, address indexed to, uint indexed id);
    event Approval(address indexed owner, address indexed spender, uint indexed id);
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    // Mapping from token ID to owner address
    mapping(uint => address) internal _ownerOf;

    // Mapping owner address to token count
    mapping(address => uint) internal _balanceOf;

    // Mapping from token ID to approved address
    mapping(uint => address) internal _approvals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) public isApprovedForAll;

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC165).interfaceId;
    }

    function ownerOf(uint id) external view returns (address owner) {
        owner = _ownerOf[id];
        require(owner != address(0), "token doesn't exist");
    }

    function balanceOf(address owner) external view returns (uint) {
        require(owner != address(0), "owner = zero address");
        return _balanceOf[owner];
    }

    function setApprovalForAll(address operator, bool approved) external {
        isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function approve(address spender, uint id) external {
        address owner = _ownerOf[id];
        require(
            msg.sender == owner || isApprovedForAll[owner][msg.sender],
            "not authorized"
        );

        _approvals[id] = spender;

        emit Approval(owner, spender, id);
    }

    function getApproved(uint id) external view returns (address) {
        require(_ownerOf[id] != address(0), "token doesn't exist");
        return _approvals[id];
    }

    function _isApprovedOrOwner(
        address owner,
        address spender,
        uint id
    ) internal view returns (bool) {
        return (spender == owner ||
            isApprovedForAll[owner][spender] ||
            spender == _approvals[id]);
    }

    function transferFrom(address from, address to, uint id) public {
        require(from == _ownerOf[id], "from != owner");
        require(to != address(0), "transfer to zero address");

        require(_isApprovedOrOwner(from, msg.sender, id), "not authorized");

        _balanceOf[from]--;
        _balanceOf[to]++;
        _ownerOf[id] = to;

        delete _approvals[id];

        emit Transfer(from, to, id);
    }

    function safeTransferFrom(address from, address to, uint id) external {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(msg.sender, from, id, "") ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint id,
        bytes calldata data
    ) external {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(msg.sender, from, id, data) ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function _mint(address to, uint id) internal {
        require(to != address(0), "mint to zero address");
        require(_ownerOf[id] == address(0), "already minted");

        _balanceOf[to]++;
        _ownerOf[id] = to;

        emit Transfer(address(0), to, id);
    }

    function _burn(uint id) internal {
        address owner = _ownerOf[id];
        require(owner != address(0), "not minted");

        _balanceOf[owner] -= 1;

        delete _ownerOf[id];
        delete _approvals[id];

        emit Transfer(owner, address(0), id);
    }
}

contract MyNFT is ERC721 {
    function mint(address to, uint id) external {
        _mint(to, id);
    }

    function burn(uint id) external {
        require(msg.sender == _ownerOf[id], "not owner");
        _burn(id);
    }
}

contract Factory {
    event Log(address addr);

    // Deploys a contract that always returns 42
    function deploy() external {
        bytes memory bytecode = hex"69602a60005260206000f3600052600a6016f3";
        address addr;
        assembly {
            // create(value, offset, size)
            addr := create(0, add(bytecode, 0x20), 0x13)
        }
        require(addr != address(0));

        emit Log(addr);
    }
}

interface IContract {
    function getMeaningOfLife() external view returns (uint);
}