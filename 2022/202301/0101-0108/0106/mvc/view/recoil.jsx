//
import { RecoilRoot } from "recoil";

function AppRoot() {
  return (
    <RecoilRoot>
      <ComponentThatUsesRecoil />
    </RecoilRoot>
  );
}


function atom<T>({
  key: string,

  default?: T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  effects?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>

//useRecoilStateとは、Recoilの状態を読み書きするためのカスタムフックのこと。
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

//
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

type ValueOrUpdater<T> = T | DefaultValue | ((prevValue: T) => T | DefaultValue);
type GetCallback =
  <Args, Return>(
    callback: CallbackInterface => (...Args) => Return,
  ) => (...Args) => Return;

type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilState = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ResetRecoilState = <T>(RecoilState<T>) => void;

type CachePolicy =
  | {eviction: 'lru', maxSize: number}
  | {eviction: 'keep-all'}
   | { eviction: 'most-recent' };
  
//
const mySelector = selector({
  key: 'MySelector',
  get: ({get}) => get(myAtom) * 100,
});

//
const toggleState = atom({key: 'Toggle', default: false});

const mySelector = selector({
  key: 'MySelector',
  get: ({get}) => {
    const toggle = get(toggleState);
    if (toggle) {
      return get(selectorA);
    } else {
      return get(selectorB);
    }
  },
});

//
const myQuery = selector({
  key: 'MyQuery',
  get: async ({get}) => {
    return await myAsyncQuery(get(queryParamState));
  }
});

//
import {atom, selector, useRecoilState, DefaultValue, useResetRecoilState} from 'recoil';

const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) =>
    set(
      tempFahrenheit,
      newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32
    ),
});

function TempCelsius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);
  const resetTemp = useResetRecoilState(tempCelsius);

  const addTenCelsius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);
  const reset = () => resetTemp();

  return (
    <div>
      Temp (Celsius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
      <br />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

//
import {selector, useRecoilValue} from 'recoil';

const myQuery = selector({
  key: 'MyDBQuery',
  get: async () => {
    const response = await fetch(getMyRequestUrl());
    return response.json();
  },
});

function QueryResults() {
  const queryResults = useRecoilValue(myQuery);

  return (
    <div>
      {queryResults.foo}
    </div>
  );
}

function ResultsSection() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <QueryResults />
    </React.Suspense>
  );
}

//selectorFamily()とは、Recoilの状態を表すオブジェクトのこと。
const menuItemState = selectorFamily({
  key: 'MenuItem',
  get: itemID => ({get, getCallback}) => {
    const name = get(itemNameQuery(itemID));
    const onClick = getCallback(({snapshot}) => async () => {
      const info = await snapshot.getPromise(itemInfoQuery(itemID));
      displayInfoModal(info);
    });
    return {
      title: `Show info for ${name}`,
      onClick,
    };
  },
});

const clockState = selector({
  key: 'clockState',
  get: ({get}) => {
    const hour = get(hourState);
    const minute = get(minuteState);
    const second = get(secondState); // will re-run every second

    return `${hour}:${minute}:${second}`;
  },
  cachePolicy_UNSTABLE: {
    // Only store the most recent set of dependencies and their values
    eviction: 'most-recent',
  },
});

//Loadableとは、
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

//useSetRecoilState<T>とは、
function useSetRecoilState<T>(state: RecoilState<T>): SetterOrUpdater<T>;

type SetterOrUpdater<T> = (T | (T => T)) => void;

//useRecoilStateLoadable()とは、
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

//useRecoilValueLoadable()とは、
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

//useGetRecoilValueInfo_UNSTABLE()とは、
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

//isRecoilValue()とは、
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
isRecoilValue({}); 

//atomFamily()とは、
const todoListState = atomFamily({
   key: 'todoListState',
   default: [],
});

//
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
  
//
const viewWidthForPaneState = atomFamily<number, PaneID>({
  key: 'ViewWidthForPane',
  default: 42,
});

function PaneView() {
  const paneID = useContext(PaneIDContext);
  const viewWidth = useRecoilValue(viewWidthForPaneState(paneID));
  ...
}

//
const viewWidthState = selector({
  key: 'ViewWidth',
  get: ({get}) => viewWidthForPane(get(currentPaneState)),
  set: ({get, set}, newValue) => set(viewWidthForPane(get(currentPaneState)), newValue),
});

function PaneView() {
  const viewWidth = useRecoilValue(viewWidthState);
  ...
}

//
function selectorFamily<T, P: Parameter>({
  key: string,

  get: P => ({
    get: GetRecoilValue
    getCallback: GetCallback<T>,
  }) =>
    T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  set: P => (
    {
      get: GetRecoilValue,
      set: SetRecoilValue,
      reset: ResetRecoilValue,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,

  cachePolicy_UNSTABLE?: CachePolicy,
}): P => RecoilState < T >

//
type ValueOrUpdater<T> =  T | DefaultValue | ((prevValue: T) => T | DefaultValue);

type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilValue = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ResetRecoilValue = <T>(RecoilState<T>) => void;

type GetCallback<T> =
  <Args, Return>(
    callback: ({node: RecoilState<T>, ...CallbackInterface}) => (...Args) => Return,
  ) => (...Args) => Return;

type CachePolicy =
  | {eviction: 'lru', maxSize: number}
  | {eviction: 'keep-all'}
  | {eviction: 'most-recent'};