//RecoilRootとは、Recoilの状態を管理するためのコンポーネントです。
import { RecoilRoot } from "recoil";

function AppRoot() {
  return (
    <RecoilRoot>
      <ComponentThatUsesRecoil />
    </RecoilRoot>
  );
}

//atom<T>とは、Recoilの状態を表すための関数です。
function atom<T>({
  key: string,

  default?: T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  effects?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>


//useRecoilState()とは、Recoilの状態を読み書きするためのフックです。
function useRecoilState<T>(recoilState: RecoilState<T>): [T, SetterOrUpdater<T>]

//useRecoilState()とは、Recoilの状態を読み書きするためのフックです。
function useRecoilState<T>(recoilState: RecoilValueReadOnly<T>): [T]

//useSetRecoilState()とは、Recoilの状態を書き込むためのフックです。
function useSetRecoilState<T>(recoilState: RecoilState<T>): SetterOrUpdater<T>

//useResetRecoilState()とは、Recoilの状態をリセットするためのフックです。
function useResetRecoilState<T>(recoilState: RecoilState<T>): () => void

//useRecoilCallback()とは、Recoilの状態を読み書きするためのフックです。
function useRecoilCallback<T, A, B, C, D, E, F, G, H>(
   fn: (RecoilValue<T>, RecoilValue<A>, RecoilValue < B >, RecoilValue < C >, RecoilValue < D >, RecoilValue < E >, RecoilValue < F >, RecoilValue < G >, RecoilValue < H >) => (opts: { set: SetRecoilState, get: GetRecoilValue }) => void,
      deps ?: $ReadOnlyArray < mixed >,
): (RecoilValue < T >, RecoilValue < A >, RecoilValue < B >, RecoilValue < C >, RecoilValue < D >, RecoilValue < E >, RecoilValue < F >, RecoilValue < G >, RecoilValue < H >) => void

import {atom, useRecoilState} from 'recoil';

const counter = atom({
  key: 'myCounter',
  default: 0,
});

function Counter() {
  const [count, setCount] = useRecoilState(counter);
  const incrementByOne = () => setCount(count + 1);

  return (
    <div>
      Count: {count}
      <br />
      <button onClick={incrementByOne}>Increment</button>
    </div>
  );
}

//atomFamily()とは、Recoilの状態を表すための関数です。
function atomFamily<T, P>({
   key: string,
   default: T | Promise <T > | Loadable < T > | WrappedValue < T > | RecoilValue < T > | ((P) => T | Promise < T > | Loadable < T > | WrappedValue < T > | RecoilValue < T >),
      effects ?: $ReadOnlyArray < AtomEffect < T >>,
      dangerouslyAllowMutability ?: boolean,
   }): (P) => RecoilState < T >
      
//selector<T>とは、Recoilの状態を表すための関数です。
function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue,
    getCallback: GetCallback,
  }) => T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
  cachePolicy_UNSTABLE?: CachePolicy,
})

//selector()とは、Recoilの状態を表すための関数です。
const mySelector = selector({
  key: 'MySelector',
  get: ({get}) => get(myAtom) * 100,
});

//selectorFamily()とは、Recoilの状態を表すための関数です。
const proxySelector = selector({
  key: 'ProxySelector',
  get: ({get}) => ({...get(myAtom), extraField: 'hi'}),
  set: ({set}, newValue) => set(myAtom, newValue),
});

//promiseSelector()とは、Recoilの状態を表すための関数です。
const myQuery = selector({
  key: 'MyQuery',
  get: async ({get}) => {
    return await myAsyncQuery(get(queryParamState));
  }
});

//Loadable<T>とは、Recoilの状態を表すための関数です。
function UserInfo({userID}) {
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}

//RecoilLoadable<T>とは、Recoilの状態を表すための関数です。
interface RecoilLoadable {
  function of<T>(T | Promise<T>, Loadable<T>): Loadable<T>;
  function error<T>(mixed): Loadable<T>;
  function all(Array<mixed | Loadable<mixed> | Promise<mixed>>): Loadable<Array<mixed>>;
  function all({[string]: mixed | Loadable<mixed> | Promise<mixed>}): Loadable<{[string]: mixed}>;
  function loading(): Loadable<empty>;
  function isLoadable(mixed): boolean;
}

RecoilLoadable.of(123);

RecoilLoadable.error(new Error('ERROR'));

RecoilLoadable.all([
  RecoilLoadable.of(1),
  RecoilLoadable.of(10),
  RecoilLoadable.of(100),
]).map(([a, b, c]) => a + b + c);

//useRecoilState<T>()とは、Recoilの状態を読み書きするためのフックです。
import {atom, selector, useRecoilState} from 'recoil';

const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32),
});

function TempCelsius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);

  const addTenCelsius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);

  return (
    <div>
      Temp (Celsius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}

//useRecoilValue(state)とは、Recoilの状態を読み込むためのフックです。
function useRecoilValue<T>(state: RecoilValue<T>): T;

import {atom, selector, useRecoilValue} from 'recoil';

const namesState = atom({
  key: 'namesState',
  default: ['', 'Ella', 'Chris', '', 'Paul'],
});

const filteredNamesState = selector({
  key: 'filteredNamesState',
  get: ({get}) => get(namesState).filter((str) => str !== ''),
});

function NameDisplay() {
  const names = useRecoilValue(namesState);
  const filteredNames = useRecoilValue(filteredNamesState);

  return (
    <>
      Original names: {names.join(',')}
      <br />
      Filtered names: {filteredNames.join(',')}
    </>
  );
}

//useSetRecoilState(state)とは、Recoilの状態を書き込むためのフックです。
import {atom, useSetRecoilState} from 'recoil';

const namesState = atom({
  key: 'namesState',
  default: ['Ella', 'Chris', 'Paul'],
});

function FormContent({setNamesState}) {
  const [name, setName] = useState('');
  
  return (
    <>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setNamesState(names => [...names, name])}>Add Name</button>
    </>
)}

// This component will be rendered once when mounting
function Form() {
  const setNamesState = useSetRecoilState(namesState);
  
  return <FormContent setNamesState={setNamesState} />;
}

//useResetRecoilState(state)とは、Recoilの状態をリセットするためのフックです。
import { atom, useResetRecoilState } from 'recoil';

//useRecoilStateLoadable(state)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function UserInfo({userID}) {
  const [userNameLoadable, setUserName] = useRecoilStateLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}

//useRecoilValueLoadable(state)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function UserInfo({ userID }) {
   const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
   switch (userNameLoadable.state) {
      case 'hasValue':
         return <div>{userNameLoadable.contents}</div>;
      case 'loading':
         return <div>Loading...</div>;
      case 'hasError':
         throw userNameLoadable.contents;
   }
}

//useRecoilValueLoadable(state)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function UserInfo({userID}) {
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}

//useGetRecoilValueInfo_UNSTABLE()とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function useGetRecoilValueInfo_UNSTABLE(): RecoilValue<T> => RecoilValueInfo<T>;

interface RecoilValueInfo<T> {
  loadable?: Loadable<T>;
  isActive: boolean;
  isSet: boolean;
  isModified: boolean; // TODO report modified selectors
  type: 'atom' | 'selector';
  deps: Iterable<RecoilValue<T>>;
  subscribers: {
    nodes: Iterable<RecoilValue<T>>,
    components: Iterable<ComponentInfo>,
  };
}

interface ComponentInfo {
  name: string;
}

//useRecoilRefresher_UNSTABLE(state)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function useRecoilRefresher_UNSTABLE<T>(state: RecoilValue<T>): () => void;
const myQuery = selector({
  key: 'MyQuery',
  get: () => fetch(myQueryURL),
});

function MyComponent() {
  const data = useRecoilValue(myQuery);
  const refresh = useRecoilRefresher_UNSTABLE(myQuery);

  return (
    <div>
      Data: {data}
      <button onClick={() => refresh()}>Refresh</button>
    </div>
  );
}

//isRecoilValue(value)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
import {atom, selector, isRecoilValue} from 'recoil';

const counter = atom({
  key: 'myCounter',
  default: 0,
});

const strCounter = selector({
  key: 'myCounterStr',
  get: ({get}) => String(get(counter)),
});

isRecoilValue(counter); // true
isRecoilValue(strCounter); // true

isRecoilValue(5); // false
isRecoilValue({}); // false

//atomFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function atomFamily<T, P: Parameter>({
  key: string,

  default?:
    | T
    | Promise<T>
    | Loadable<T>
    | WrappedValue<T>
    | RecoilValue<T>
    | (P => T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>),

  effects?:
    | $ReadOnlyArray<AtomEffect<T>>
    | (P => $ReadOnlyArray<AtomEffect<T>>),

  dangerouslyAllowMutability?: boolean,
}): P => RecoilState < T >

//selectorFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
const elementPositionStateFamily = atomFamily({
  key: 'ElementPosition',
  default: [0, 0],
});

function ElementListItem({elementID}) {
  const position = useRecoilValue(elementPositionStateFamily(elementID));
  return (
    <div>
      Element: {elementID}
      Position: {position}
    </div>
  );
}

//atomFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
const viewWidthForPaneState = atomFamily<number, PaneID>({
  key: 'ViewWidthForPane',
  default: 42,
});

function PaneView() {
  const paneID = useContext(PaneIDContext);
  const viewWidth = useRecoilValue(viewWidthForPaneState(paneID));
  ...
}

//selectorFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
const elementPositionStateFamily = atomFamily({
   key: 'ElementPosition',
   default: [0, 0],
});

function ElementListItem({ elementID }) {
   const position = useRecoilValue(elementPositionStateFamily(elementID));
   return (
      <div>
         
         Element: {elementID}
         Position: {position}
      </div>
   );
}

//selectorFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function selectorFamily<T, P: Parameter>({
  key: string,

  get: P => ({
    get: GetRecoilValue
    getCallback: GetCallback<T>,
  }) =>
    T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  dangerouslyAllowMutability?: boolean,
}): P => RecoilValueReadOnly < T >

//interfaceとは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
type Primitive = void | null | boolean | number | string;
interface HasToJSON {
  toJSON(): Parameter;
}
type Parameter =
  | Primitive
  | HasToJSON
  | $ReadOnlyArray<Parameter>
  | $ReadOnly<{[string]: Parameter}>
  | $ReadOnlySet<Parameter>
   | $ReadOnlyMap<Parameter, Parameter>;
  
//selectorFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
const myDataQuery = selectorFamily({
  key: 'MyDataQuery',
  get: (queryParameters) => async ({get}) => {
    const response = await asyncDataRequest(queryParameters);
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
});

function MyComponent() {
  const data = useRecoilValue(myDataQuery({userID: 132}));
  return <div>...</div>;
}

//selectorFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
const myDataQuery = selectorFamily({
   key: 'MyDataQuery',
   get: (queryParameters) => async ({ get }) => {
      const response = await asyncDataRequest(queryParameters);
      if (response.error) {
         throw response.error;
      }
      return response.data;
   }
});

//constSelectorとは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function constSelector<T: Parameter>(constant: T): RecoilValueReadOnly<T>

//
const myQuery = selector({
  key: 'MyQuery',
  get: ({get}) => {
    const loadable = get(noWait(dbQuerySelector));

    return {
      hasValue: {data: loadable.contents},
      hasError: {error: loadable.contents},
      loading: {data: 'placeholder while loading'},
    }[loadable.state];
  }
});

//waitForAll(dependencies)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function FriendsInfo() {
  const [friendA, friendB] = useRecoilValue(
    waitForAll([friendAState, friendBState])
  );
  return (
    <div>
      Friend A Name: {friendA.name}
      Friend B Name: {friendB.name}
    </div>
  );
}

//selectorFamily(options)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friends = get(waitForAll(
      friendList.map(friendID => userInfoQuery(friendID))
    ));
    return friends;
  },
});


//waitForAllSettled(dependencies)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function FriendsInfo() {
   const [friendA, friendB] = useRecoilValue(
      waitForAllSettled([friendAState, friendBState])
   );
   return (
      <div>
         
         Friend A Name: {friendA.name}
         Friend B Name: {friendB.name}
      </div>
   );
}

//waitForAny(dependencies)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function waitForAny(dependencies: {[string]: RecoilValue<>}):
   RecoilValueReadOnly<UnwrappedObjectOfLoadables>
  

//useRecoilTransaction_UNSTABLE(callback, deps)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function useRecoilTransaction_UNSTABLE<T>(
   callback: (RecoilTransactionInterface) => T,
   deps?: Array<mixed>,
): T

interface TransactionInterface {
  get: <T>(RecoilValue<T>) => T;
  set: <T>(RecoilState<T>,  (T => T) | T) => void;
  reset: <T>(RecoilState<T>) => void;
}

function useRecoilTransaction_UNSTABLE<Args>(
  callback: TransactionInterface => (...Args) => void,
  deps?: $ReadOnlyArray<mixed>,
): (...Args) => void

//useRecoilTransactionとは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
const goForward = useRecoilTransaction_UNSTABLE(({get, set}) => (distance) => {
  const heading = get(headingState);
  const position = get(positionState);
  set(positionState, {
    x: position.x + cos(heading) * distance,
    y: position.y + sin(heading) * distance,
  });
});

//useRecoilCallback(callback, deps)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
type CallbackInterface = {
  snapshot: Snapshot,
  gotoSnapshot: Snapshot => void,
  set: <T>(RecoilState<T>, (T => T) | T) => void,
  reset: <T>(RecoilState<T>) => void,
  refresh: <T>(RecoilValue<T>) => void,
  transact_UNSTABLE: ((TransactionInterface) => void) => void,
};

function useRecoilCallback<Args, ReturnValue>(
  callback: CallbackInterface => (...Args) => ReturnValue,
  deps?: $ReadOnlyArray<mixed>,
): (...Args) => ReturnValue

//useRecoilCallback(callback, deps)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
import {atom, useRecoilCallback} from 'recoil';

const itemsInCart = atom({
  key: 'itemsInCart',
  default: 0,
});

function CartInfoDebug() {
  const logCartItems = useRecoilCallback(({snapshot}) => async () => {
    const numItemsInCart = await snapshot.getPromise(itemsInCart);
    console.log('Items in cart: ', numItemsInCart);
  }, []);

  return (
    <div>
      <button onClick={logCartItems}>Log Cart Items</button>
    </div>
  );
}

//Snapshotとは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
class Snapshot {
  retain(): () => void;
  isRetained(): boolean;

  // Accessors to inspect snapshot state
  getLoadable: <T>(RecoilValue<T>) => Loadable<T>;
  getPromise: <T>(RecoilValue<T>) => Promise<T>;

  // API to transform state to a new immutable Snapshot
  map: (MutableSnapshot => void) => Snapshot;
  asyncMap: (MutableSnapshot => Promise<void>) => Promise<Snapshot>;

  // Get a StoreID similar to useRecoilStoreID()
  getStoreID: () => StoreID;

  // Developer Tools API
  getID: () => SnapshotID;
  getNodes_UNSTABLE: ({
    isModified?: boolean,
  } | void) => Iterable<RecoilValue<mixed>>;
  getInfo_UNSTABLE: <T>(RecoilValue<T>) => {...};
}

function snapshot_UNSTABLE(initializeState?: (MutableSnapshot => void)): Snapshot
//
function MyComponent() {
  const logState = useRecoilCallback(({snapshot}) => () => {
    console.log("State: ", snapshot.getLoadable(myAtom).contents);

    const newSnapshot = snapshot.map(({set}) => set(myAtom, 42));
  });
}</T>

//useRecoilTransactionObserver_UNSTABLE(callback)とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
                                         function useRecoilTransactionObserver_UNSTABLE(

//useRecoilSnapshot()とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。
function DebugObserver() {
  useRecoilTransactionObserver_UNSTABLE(({snapshot}) => {
    window.myDebugState = {
      a: snapshot.getLoadable(atomA).contents,
      b: snapshot.getLoadable(atomB).contents,
    };
  });
  return null;
}

function MyApp() {
  return (
    <RecoilRoot>
      <DebugObserver />
      ...
    </RecoilRoot>
  );
}

//useRecoilSnapshot()とは、Recoilの状態を読み込み、読み込み中の状態を表すためのフックです。

//useGotoRecoilSnapshot(snapshot)とは、recoilのスナップショットを読み込み、読み込み中の状態を表すためのフックです。
function TransactionButton(): React.Node {
  const snapshot = useRecoilSnapshot(); // Subscribe to all state changes
  const modifiedSnapshot = snapshot.map(({set}) => {
    set(atomA, x => x + 1);
    set(atomB, x => x * 2);
  });
  const gotoSnapshot = useGotoRecoilSnapshot();
  return <button onClick={() => gotoSnapshot(modifiedSnapshot)}>Perform Transaction</button>;
}

//useRecoilBridgeAcrossReactRoots()とは、recoilのブリッジ