

function todoCreate() {
  var todo = new Todo();
  todo.name = "New todo";
  todo.save();
}

function todoList() {
   return Todo.all();
}  


function todoDelete(id) {
  var todo = Todo.load(id);
  todo.delete();
}

function todoUpdate(id, name) {
   var todo = Todo.load(id);
   todo.name = name;
   todo.save();
}
   
