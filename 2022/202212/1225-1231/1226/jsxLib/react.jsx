//useStateとは、Reactの機能で、stateを使うためのもの
const [state, setState] = useState(initialState);
setState(newState);

//useEffectとは、Reactの機能で、ライフサイクルを使うためのもの
useEffect(() => {
   // ここに処理を書く
}, [state]);

useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});

useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);

//useContextとは、Reactの機能で、コンテキストを使うためのもの
const value = useContext(MyContext);

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

//useReducerとは、Reactの機能で、reducerを使うためのもの
const [state, dispatch] = useReducer(reducer, initialArg, init);

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

const [state, dispatch] = useReducer(reducer, { count: initialCount });

//useCallbackとは、Reactの機能で、関数をキャッシュするためのもの
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

//useMemoとは、Reactの機能で、値をキャッシュするためのもの
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

//useRefとは、Reactの機能で、参照を使うためのもの
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

//useImperativeHandleとは、Reactの機能で、子コンポーネントの参照を使うためのもの
useImperativeHandle(ref, createHandle, [deps]);

function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

//useLayoutEffectとは、Reactの機能で、レイアウトを使うためのもの
useLayoutEffect(() => {
   // レイアウトを変更する処理
   // DOMの更新を行う
   // レイアウトの計算を行う
   // など
}
)

//useDebugValueとは、Reactの機能で、カスタムフックのデバッグを行うためのもの
useDebugValue(value);

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}

//useTransitionとは、Reactの機能で、トランジションを使うためのもの
const [startTransition, isPending] = useTransition({
   timeoutMs: 3000
});

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}

//useDeferredValueとは、Reactの機能で、遅延値を使うためのもの
const deferredValue = useDeferredValue(value, { timeoutMs: 1000 });

//useIdとは、Reactの機能で、IDを使うためのもの
const id = useId();

function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
};

//useSyncExternalStoreとは、Reactの機能で、外部ストアを使うためのもの
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);

//useInsertionEffectとは、Reactの機能で、挿入を使うためのもの
useInsertionEffect(() => {
   // レイアウトを変更する処理
   // DOMの更新を行う
   // レイアウトの計算を行う
   // など
}
)
useInsertionEffect(didUpdate);

//useOpaqueIdentifierとは、Reactの機能で、不透明な識別子を使うためのもの
const id = useOpaqueIdentifier();

//useStateとは、Reactの機能で、stateを使うためのもの
const [state, setState] = useState(initialState);

setState(newState);

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}

const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});


//useEffectとは、Reactの機能で、副作用を使うためのもの
useEffect(didUpdate);
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});

useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);

//useContextとは、Reactの機能で、コンテキストを使うためのもの
const value = useContext(MyContext);

//useReducerとは、Reactの機能で、reducerを使うためのもの
const [state, dispatch] = useReducer(reducer, initialArg, init);


const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

//useCallbackとは、Reactの機能で、コールバックを使うためのもの
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

//useMemoとは、Reactの機能で、メモ化を使うためのもの
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

//useRefとは、Reactの機能で、参照を使うためのもの
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

//useImperativeHandleとは、Reactの機能で、命令的なハンドルを使うためのもの
useImperativeHandle(ref, createHandle, [deps]);
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

