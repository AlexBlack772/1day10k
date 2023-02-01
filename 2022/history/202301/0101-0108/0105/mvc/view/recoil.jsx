//RecoilRootとは、Recoilの状態を管理するためのコンポーネントです。
import { RecoilRoot } from "recoil";

function AppRoot() {
  return (
    <RecoilRoot>
      <ComponentThatUsesRecoil />
    </RecoilRoot>
  );
}

//atom<T>()とは、Recoilの状態を定義するための関数です。
function atom<T>({
  key: string,

  default?: T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  effects?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>

//
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

//
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

//
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

//
interface RecoilLoadable {
  function of<T>(T | Promise<T>, Loadable<T>): Loadable<T>;
  function error<T>(mixed): Loadable<T>;
  function all(Array<mixed | Loadable<mixed> | Promise<mixed>>): Loadable<Array<mixed>>;
  function all({[string]: mixed | Loadable<mixed> | Promise<mixed>}): Loadable<{[string]: mixed}>;
  function loading(): Loadable<empty>;
  function isLoadable(mixed): boolean;
}

// Resolves to [1, 2, 3]
RecoilLoadable.all([1, RecoilLoadable.of(2), Promise.resolve(3)]);

// Resolves to {value: 1, loadable: 2, promise: 3}
RecoilLoadable.all({
  value: 1,
  loadable: RecoilLoadable.of(2),
  promise: Promise.resolve(3),
});

// Never resolves
RecoilLoadable.loading();

//
function useRecoilState<T>(state: RecoilState<T>): [T, SetterOrUpdater<T>];

type SetterOrUpdater<T> = (T | (T => T)) => void;

//

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

//useRecoilValue()とは、useRecoilState()の第一引数のみを返す関数です。
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

//useSetRecoilState()とは、useRecoilState()の第二引数のみを返す関数です。
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

//
import {todoListState} from "../atoms/todoListState";

const TodoResetButton = () => {
  const resetList = useResetRecoilState(todoListState);
  return <button onClick={resetList}>Reset</button>;
};

//
function useRecoilStateLoadable<T>(state: RecoilState<T>): [Loadable<T>, (T | (T => T)) => void]

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

//useRecoilValueLoadable()とは、useRecoilStateLoadable()の第一引数のみを返す関数です。
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

