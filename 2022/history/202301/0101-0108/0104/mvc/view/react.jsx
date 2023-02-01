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

//useEffectとは、Reactの機能で、副作用を使うためのもの
useEffect(didUpdate);

useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});

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

//useImperativeHandleとは、Reactの機能で、カスタムフックのインスタンスを使うためのもの
useImperativeHandle(ref, createHandle, [deps]);

//useLayoutEffectとは、Reactの機能で、レイアウトの副作用を使うためのもの
useLayoutEffect(didUpdate);

//useDebugValueとは、Reactの機能で、デバッグ用のラベルを使うためのもの
useDebugValue(value);

//useDeferredValueとは、Reactの機能で、非同期に更新される値を使うためのもの
const deferredValue = useDeferredValue(value);

//useTransitionとは、Reactの機能で、非同期に更新される値を使うためのもの
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setCount(count + 1);
});

//useIdとは、Reactの機能で、IDを使うためのもの
const id = useId();

//useSyncExternalStoreとは、Reactの機能で、外部ストアを使うためのもの
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);

