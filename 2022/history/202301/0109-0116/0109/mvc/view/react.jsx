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

//useDebugValue(value)とは、Reactの機能で、カスタムフックのデバッグ用のラベルを使うためのもの
useDebugValue(value);

//useDeferredValue(value)とは、Reactの機能で、非同期に更新される値を使うためのもの
const deferredValue = useDeferredValue(value);

//useTransition()とは、Reactの機能で、非同期に更新される値を使うためのもの
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setCount(count + 1);
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

//useId()とは、Reactの機能で、IDを使うためのもの
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
};

//useSyncExternalStore()とは、Reactの機能で、外部ストアを使うためのもの
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);

//useInsertionEffect()とは、Reactの機能で、DOMを使うためのもの
useInsertionEffect(didUpdate);

//