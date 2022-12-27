pragma solidity ^0.8.13;

contract Door {

    uint public time;

    event Open(address indexed _from, uint _time);
    event Close(address indexed _from, uint _time);

    struct DoorState {
        bool open;
        uint time;
    }

    DoorState public doorState;

    function open() public {
        doorState.open = true;
        doorState.time = block.timestamp;
        emit Open(msg.sender, block.timestamp);
    }

    function close() public {
        doorState.open = false;
        doorState.time = block.timestamp;
        emit Close(msg.sender, block.timestamp);
    }
}
