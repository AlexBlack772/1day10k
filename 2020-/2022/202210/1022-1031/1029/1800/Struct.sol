pragma solidity ^0.8.13;

//Todosとは、Todoリスト
contract Todos {
   //Todoとは、Todo
   struct Todo {
      //textとは、テキスト
      string text;
      //completedとは、完了済みかどうか
      bool completed;
   }

   //todosとは、Todoの配列
   Todo[] public todos;

   //createとは、Todoを作成する関数
   function create(string memory _text) public {
      todos.push(Todo(_text, false));
   }

   //getとは、Todoを取得する関数
   function get(uint _index) public view returns (string memory text, bool completed) {
      Todo storage todo = todos[_index];
      return (todo.text, todo.completed);
   }

   //updateTextとは、Todoのテキストを更新する関数
   function updateText(uint _index, string memory _text) public {
      Todo storage todo = todos[_index];
      todo.text = _text;
   }
   //toggleCompletedとは、Todoの完了済みを切り替える関数
   function toggleCompleted(uint _index) public {
      Todo storage todo = todos[_index];
      todo.completed = !todo.completed;
   }

   //toggleとは、Todoの完了状態を切り替える関数
   function toggle(uint _index) public {
      Todo storage todo = todos[_index];
      todo.completed = !todo.completed;
   }
   
}