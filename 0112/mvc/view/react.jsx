//useStateoとは、stateを使うためのフック
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

//useEffectとは、副作用を使うためのフック
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

//useContextとは、コンテキストを使うためのフック
const value = useContext(MyContext);

//useReducerとは、reducerを使うためのフック
const [state, dispatch] = useReducer(reducer, initialArg, init);

//useCallbackとは、メモ化したコールバックを使うためのフック
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

//useMemoとは、メモ化した値を使うためのフック
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

//useRefとは、レンダー間で変更される可変な値を使うためのフック
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

//useImperativeHandleとは、カスタムフック内でuseImperativeHandleを使うためのフック
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

//useDebugValueとは、カスタムフックのデバッグ用のラベルを設定するためのフック
useDebugValue(value)

//useDeferredValueとは、非同期に更新される値を使うためのフック
const deferredValue = useDeferredValue(value);

//useTransitionとは、非同期に更新される値を使うためのフック
const [startTransition, isPending] = useTransition({
  timeoutMs: 3000
});

//useIdとは、IDを生成するためのフック
const id = useId();

//useSyncExternalStoreとは、外部ストアを同期的に読み取るためのフック
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);

//useInsertionEffectとは、レンダー後に副作用を実行するためのフック
useInsertionEffect(didUpdate);

