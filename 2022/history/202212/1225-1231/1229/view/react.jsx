//useStateとは、Reactの機能で、stateを使うためのもの
const [state, setState] = useState(initialState);

setState(newState);

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}

const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

//useEffectとは、Reactの機能で、副作用を使うためのもの
useEffect(() => {
   // 副作用の処理
}, [依存する値]);

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


//useCallbackとは、Reactの機能で、メモ化したコールバックを使うためのもの
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

//useMemoとは、Reactの機能で、メモ化した値を使うためのもの
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

//useRefとは、Reactの機能で、レンダー間で値を保持するためのもの
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

//useImperativeHandleとは、Reactの機能で、子コンポーネントに公開するインスタンス値をカスタマイズするためのもの
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

//useLayoutEffectとは、Reactの機能で、レイアウトの変更を同期的に行うためのもの
useLayoutEffect(() => {
   // レイアウトの変更を同期的に行う
   // DOMの更新を行う
   // ブラウザに描画を依頼する
}
)

//useDebugValue(value)とは、Reactの機能で、カスタムフックのデバッグ用のラベルを設定するためのもの
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}

//useDeferredValue(value)とは、Reactの機能で、非同期に更新される値を取得するためのもの
const value = useDeferredValue(value, config);


//useTransition(config)とは、Reactの機能で、非同期に更新される値を取得するためのもの
const [startTransition, isPending] = useTransition(config);

//useMutableSourceとは、Reactの機能で、外部のデータソースを監視するためのもの
const source = useMutableSource(
   mutableSource,
   getSnapshot,
   subscribe
);

//useIdとは、Reactの機能で、IDを生成するためのもの
const id = useId();

//useSyncExternalStoreとは、Reactの機能で、外部のデータソースを監視するためのもの
const value = useSyncExternalStore(
   subscribe,
   getSnapshot,
   getServerSnapshot
);

//useInsertionEffectとは、Reactの機能で、レイアウトの変更を同期的に行うためのもの
useInsertionEffect(() => {
   // レイアウトの変更を同期的に行う
   // DOMの更新を行う
   // ブラウザに描画を依頼する
}
)

