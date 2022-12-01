pragma solidity ^0.8.13;

contract todo {
      uint public taskCount = 0;
   
      struct Task {
         uint id;
         string content;
         bool completed;
      }
   
      mapping(uint => Task) public tasks;
   
      event TaskCreated(
         uint id,
         string content,
         bool completed
      );
   
      event TaskCompleted(
         uint id,
         bool completed
      );

      event TaskDeleted(
         uint id
      );

      event TaskUpdated(
         uint id,
         string content
      );
   
      constructor() {
         createTask("Check out dappuniversity.com");
      }
   
      function createTask(string memory _content) public {
         taskCount ++;
         tasks[taskCount] = Task(taskCount, _content, false);
         emit TaskCreated(taskCount, _content, false);
      }
   
      function toggleCompleted(uint _id) public {
         Task memory _task = tasks[_id];
         _task.completed = !_task.completed;
         tasks[_id] = _task;
         emit TaskCompleted(_id, _task.completed);
      }

      function deleteTask(uint _id) public {
         delete tasks[_id];
         taskCount--;
      }

      function updateTask(uint _id, string memory _content) public {
         Task memory _task = tasks[_id];
         _task.content = _content;
         tasks[_id] = _task;
      }


}