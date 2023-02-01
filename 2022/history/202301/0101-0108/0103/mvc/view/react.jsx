//useStateとは、stateを使うためのフック
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

//useRefとは、レンダー間で値を保持するためのフック
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

//useImperativeHandleとは、カスタムフック内でrefを使うためのフック
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

//useLayoutEffectとは、レイアウトの変更を同期的に行うためのフック
useLayoutEffect(didUpdate);

//useDebugValueとは、カスタムフックのデバッグ用のラベルを設定するためのフック
useDebugValue(value);

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}

//useDeferredValueとは、非同期に更新される値を保持するためのフック
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

//useTransitionとは、非同期に更新される値を保持するためのフック
const [startTransition, isPending] = useTransition({
   timeoutMs: 3000
});

startTransition(() => {
  setCount(count + 1);
})

//useIdとは、IDを生成するためのフック
const id = useId();

function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}

//useSyncExternalStoreとは、外部ストアを同期的に読み込むためのフック
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);

const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
);

const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
  () => INITIAL_SERVER_SNAPSHOT.selectedField,
);

//useInsertionEffectとは、レンダー後にDOMを変更するためのフック
useInsertionEffect(didUpdate);

