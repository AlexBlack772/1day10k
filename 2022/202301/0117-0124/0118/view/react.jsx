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
useLayoutEffect(didUpdate);

//useDebugValueとは、Reactの機能で、カスタムフックのデバッグ用のラベルを設定するためのもの
useDebugValue(value);

//useDeferredValueとは、Reactの機能で、非同期に更新される値を保持するためのもの
const deferredValue = useDeferredValue(value);

//useTransitionとは、Reactの機能で、非同期に更新される値を保持するためのもの
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setCount(count + 1);
})

//useIdとは、Reactの機能で、一意なIDを生成するためのもの
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

//useSyncExternalStoreとは、Reactの機能で、外部ストアを同期的に読み取るためのもの
const externalStore = useSyncExternalStore(subscribe, getSnapshot);

const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
);

//useInsertionEffectとは、Reactの機能で、レンダー後に副作用を実行するためのもの
useInsertionEffect(didUpdate);


