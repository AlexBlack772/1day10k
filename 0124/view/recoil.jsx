//
const todoListState = atom({
   key: 'TodoList',
   default: [],
});

function TodoList() {
   const todoList = useRecoilValue(todoListState); 

   return (
      <>
         <TodoItemCreater />

         {todoList.map((todoItem) => (
            <TodoItem key={todoItem.id} item={todoItem} />
         ))}
      </>
   )
}

function TodoItemCreater() {
   const [inputValue, setInputValue] = useState('');
   const setTodoList = useSetRecoilState(todoListState);

   const addItem = () => {
      setTodoList((oldTodoList) => [
         ...oldTodoList,
         {
            id: getId(),
            text: inputValue,
            isComplete: false,
         },
      ]);
      setInputValue('');
   };

   const onChange = ({target: {value}}) => {
      setInputValue(value);
   };

   return (
      <div>
         <input type="text" value={inputValue} onChange={onChange} />
         <button onClick={addItem}>Add</button>
      </div>
   );
}

let id = 0;
function getId() {
   return id++;
}

function TodoItem({ item }) {
   const index = useRecoilValue(todoListFilterState);
   const [todoList, setTodoList] = useRecoilState(todoListState);
   const editItemText = ({target: {value}}) => {
      const newList = replaceItemAtIndex(todoList, index, {
         ...item,
         text: value,
      });

      setTodoList(newList);
   };

   const toggleItemCompletion = () => {
      const newList = replaceItemAtIndex(todoList, index, {
         ...item,
         isComplete: !item.isComplete,
      });

      setTodoList(newList);
   };

   const deleteItem = () => {
      const newList = removeItemAtIndex(todoList, index);

      setTodoList(newList);
   };

   return (
      <div>
         <input type="text" value={item.text} onChange={editItemText} />
         <input
            type="checkbox"
            checked={item.isComplete}
            onChange={toggleItemCompletion}
         />
         <button onClick={deleteItem}>X</button>
      </div>
   );
}  

const todoListFilterState = atom({
   key: 'TodoListFilterState',
   default: 'Show All',
});

const filteredTodoListState = selector({
   key: 'FilteredTodoList',
   get: ({get}) => {
      const filter = get(todoListFilterState);
      const list = get(todoListState);

      switch (filter) {
         case 'Show Completed':
            return list.filter((item) => item.isComplete);
         case 'Show Uncompleted':
            return list.filter((item) => !item.isComplete);
         default:
            return list;
      }
   }
});

function TodoList() {
   const todoList = useRecoilValue(filteredTodoListState);
   
}