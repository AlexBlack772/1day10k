const { func } = require("prop-types");
const { useEffect, useTransition } = require("react");

//useStateとは、Reactの機能で、stateを使うためのもの
const [state, setState] = useState(initialState);

setState(newState);


function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

const [state, setState] = useState() => {
  return {
    count: 0
  }
}

useEffect(() => {
   const timer = setInterval(() => {
       setState(state => ({
          count: state.count + 1
       }));
   })
   return () => {
      clearInterval(timer);
   }
}, []);

const value = useContext(MyContext);

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

const [state, dispatch] = useReducer(reducer, initialState);

const memoizedCallback = useCallback(
   () => {
       doSomething(a, b);
   }
   [a, b],
);

const refContainer = useRef(initialValue);

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

useImperativeHandle(ref, createHandle, [deps]);

function FancyInput(props, ref) {
   const inputRef = useRef();
   useImperativeHandle(ref, () => ({
      focus: () => {
         inputRef.current.focus();
      }
   }));
   return <input ref={inputRef} />;
}
   
function useFriendStatus(friendID) {
   const [isOnline, setIsOnline] = useState(null);

   function handleStatusChange(status) {
      setIsOnline(status.isOnline);
   }

   useEffect(() => {
      ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
      return () => {
         ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
      };
   });

   return isOnline;
}

const deferredValue = useDeferredValue(value, { timeoutMs: 1000 });

function Typeahead(props) {
   const [search, setSearch] = useState("");
   const deferredSearch = useDeferredValue(search, { timeoutMs: 200 });
   const results = useResource(fetchSearchResults(deferredSearch));

   return (
      <>
         <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
         />
         <Suspense fallback={<h1>Loading results...</h1>}>
            <ResultsList results={results} />
         </Suspense>
      </>
   );
}

//
const [isPending, startTransition] = useTransition()

startTransition(() => {
   setCount(count + 1);
}
)

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    })
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}

const id = useId();

function Checkbox() {
  const id = useId();
  return (
    <>
      <input id={id} type="checkbox" />
      <label htmlFor={id}>Checkbox</label>
    </>
  );
}

