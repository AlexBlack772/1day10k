//useStateとは、Reactの機能で、状態を保持するためのものです。
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

//useEffectとは、Reactの機能で、コンポーネントのライフサイクルを管理するためのものです。
useEffect(() => {
   // マウント時に実行したい処理
   return () => {
      // アンマウント時に実行したい処理
   };
}, [state]);

useEffect(() => {
     const subscription = props.source.subscribe();
     return () => {
       // Clean up the subscription
       subscription.unsubscribe();
     };
});

//useContextとは、Reactの機能で、コンテキストを利用するためのものです。
const value = useContext(MyContext);

useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);

//useReducerとは、Reactの機能で、状態を保持するためのものです。
const [state, dispatch] = useReducer(reducer, initialArg, init);

dispatch(action);

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

//useCallbackとは、Reactの機能で、関数をキャッシュするためのものです。
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedCallback = useCallback(
   () => {
       doSomething(a, b);
   }
   [a, b]
);

//useMemoとは、Reactの機能で、値をキャッシュするためのものです。
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

//useRefとは、Reactの機能で、参照を保持するためのものです。
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

//useImperativeHandleとは、Reactの機能で、子コンポーネントの参照を親コンポーネントから操作するためのものです。
useImperativeHandle(ref, createHandle, [deps])

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

//useLayoutEffectとは、Reactの機能で、レンダリング後に実行する処理を定義するためのものです。
useLayoutEffect(() => {
   // マウント時に実行したい処理
   return () => {
      // アンマウント時に実行したい処理
   };
}
   , [state]);

//useDebugValue(value)とは、Reactの機能で、カスタムフックのデバッグ用のラベルを設定するためのものです。
useDebugValue(value)


//useDeferredValueとは、Reactの機能で、非同期処理の結果を保持するためのものです。
const deferredValue = useDeferredValue(value);

function Typeahead() {
  const query = useSearchQuery('');
  const deferredQuery = useDeferredValue(query);

  // Memoizing tells React to only re-render when deferredQuery changes,
  // not when query changes.
  const suggestions = useMemo(() =>
    <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  );

  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">
        {suggestions}
      </Suspense>
    </>
  );
}

//useTransitionとは、Reactの機能で、非同期処理の開始と終了を管理するためのものです。
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setCount(count + 1);
});