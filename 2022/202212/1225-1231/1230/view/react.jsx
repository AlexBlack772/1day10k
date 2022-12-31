//useStateとは、Reactの機能で、stateを使うためのもの
const [state, setState] = useState(initialState);

setState(newState);

//useEffect(didUpdate)とは、Reactの機能で、副作用を使うためのもの
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
const memoizedCallback = useCallback(
   () => {
       doSomething(a, b);
   }
   , [a, b]
);

//useMemoとは、Reactの機能で、メモ化した値を使うためのもの
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

//useRefとは、Reactの機能で、参照を使うためのもの
const refContainer = useRef(initialValue);

//useImperativeHandleとは、Reactの機能で、カスタムフックの中で、外部から参照できる値を定義するためのもの
useImperativeHandle(ref, () => ({
   focus() {
         // ...
   }
}));

//useLayoutEffectとは、Reactの機能で、レイアウトの変更を同期的に行うためのもの
useLayoutEffect(() => {
   // DOMが更新された後に実行される
   // DOMを読み書きする場合はこちらを使う
}  
   , [input]);

//useDebugValueとは、Reactの機能で、カスタムフックのデバッグ用のラベルを設定するためのもの
useDebugValue(value);

//useDeferredValueとは、Reactの機能で、非同期に更新される値を使うためのもの
const deferredValue = useDeferredValue(value, { timeoutMs: 1000 });

//useTransitionとは、Reactの機能で、非同期に更新される値を使うためのもの
const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

startTransition(() => {
  setCount(count + 1);
});

//useIdとは、Reactの機能で、一意なIDを生成するためのもの
const id = useId();

//useSyncExternalStoreとは、Reactの機能で、外部のストアを同期的に読み書きするためのもの
const externalStore = useSyncExternalStore(subscribe, getSnapshot);

//useSyncExternalStoreExtraとは、Reactの機能で、外部のストアを同期的に読み書きするためのもの

//useInsertionEffectとは、Reactの機能で、レイアウトの変更を非同期的に行うためのもの
useInsertionEffect(didUpdate);

//