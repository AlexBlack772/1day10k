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

onst[(state, setState)] = useState(() => {
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

//useImperativeHandleとは、Reactの機能で、子コンポーネントに公開するインスタンス値を変更するためのもの
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

//useDebugValueとは、Reactの機能で、カスタムフックのデバッグ用のラベルを設定するためのもの
useDebugValue(value)

//useDeferredValueとは、Reactの機能で、非同期に更新される値を使うためのもの
const deferredValue = useDeferredValue(value);

//useTransitionとは、Reactの機能で、非同期に更新される値を使うためのもの
const [isPending, startTransition] = useTransition();

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

//useIdとは、Reactの機能で、IDを生成するためのもの
const id = useId();

//useSyncExternalStoreとは、Reactの機能で、外部ストアを同期的に読み取るためのもの
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);

//useInsertionEffectとは、Reactの機能で、レンダー後に副作用を実行するためのもの
useInsertionEffect(didUpdate);

