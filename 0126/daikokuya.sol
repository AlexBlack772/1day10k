//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


interface IShop {
    function foo() external;
}

contract Shop {
   event Log(string message);

    function foo() external virtual {
        emit Log("A.foo called");
    }
}

contract Daikokuya is Shop {
    uint public test = 100;

   uint public kprice;
   mapping (address => uint) public balances;
   address public owner;

   event Set(address indexed sender, string message);

    constructor() {
         owner = msg.sender;
    }

   struct Customer {
       uint id;
       string name;
       uint age;
       uint balance;
   }

    Customer[] public customers;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

   /*
   function buy(address to,address form) public payable {
       require(msg.value == 0.1 ether);

   }

   function kaitori() public payable {
       payable(msg.sender).transfer(address(this).balance);
      }
    */
   receive() external payable {}
   fallback() external payable{}

   function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function foo() public virtual override {
        emit Log("C.foo called");
        //IShop.foo();
    }


   function set(uint _kprice) public {
       require(_kprice > 0, "Input must be greater than 0");
       if (_kprice > 0) {
           kprice = _kprice;
       } else {
           revert("kprice is not set");
       }
       if (_kprice<= 0) {
            revert("Input must be greater than 10");
        }
        emit Set(msg.sender, "kprice is set");
   }

   function get() public view returns(uint)  {
       return kprice;
   }

   function getMap(address _addr) public view returns (uint) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return balances[_addr];
    }

    function setMap(address _addr, uint _i) public {
        // Update the value at this address
        balances[_addr] = _i;
    }

    function removeMap(address _addr) public {
        // Reset the value to the default value.
        delete balances[_addr];
    }

    enum Zyoutai {
        machi,
        Uketori,
        Kyohi,
        Cancel
    }

    // Default value is the first element listed in
    // definition of the type, in this case "Pending"
    Zyoutai public zyoutai;

    // Returns uint
    // Pending  - 0
    // Shipped  - 1
    // Accepted - 2
    // Rejected - 3
    // Canceled - 4
    function getZ() public view returns (Zyoutai) {
        return zyoutai;
    }

    // Update status by passing uint into input
    function setZ(Zyoutai _status) public {
        zyoutai = _status;
    }

    // You can update to a specific enum like this
    function cancelZ() public {
        zyoutai = Zyoutai.Cancel;
    }

    // delete resets the enum to its first value, 0
    function resetZ() public {
        delete zyoutai;
    }

}

contract Users {
    struct User {
        string name;
        bool completed;
        uint age;

    }

    // An array of 'Todo' structs
    User[] public users;

    function create(string calldata _name,uint _age) public {
        // 3 ways to initialize a struct
        // - calling it like a function
        users.push(User(_name, false, _age));

        // key value mapping
        users.push(User({name: _name, completed: false,age: _age}));

        // initialize an empty struct and then update it
        User memory user;
        user.name = _name;
        user.age = _age;
        // todo.completed initialized to false

        users.push(user);
    }

    // Solidity automatically created a getter for 'todos' so
    // you don't actually need this function.
    function get(uint _index) public view returns (string memory name, bool completed,uint _age) {
        User storage user = users[_index];
        return (user.name, user.completed, user.age);
    }

    // update text
    function updateText(uint _index, string calldata _name) public {
        User storage user = users[_index];
        user.name = _name;
    }

    // update completed
    function toggleCompleted(uint _index) public {
        User storage user = users[_index];
        user.completed = !user.completed;
    }

    // update age
    function updateAge(uint _index, uint _age) public {
        User storage user = users[_index];
        user.age = _age;
    }
}

