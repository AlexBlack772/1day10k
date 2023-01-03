//RecoilRootとは、Recoilの状態を管理するためのコンポーネントです。RecoilRootを使用することで、Recoilの状態を管理することができます。RecoilRootは、アプリケーションのルートコンポーネントの中で使用する必要があります。RecoilRootを使用しない場合、Recoilの状態を管理することができません。
import { RecoilRoot } from "recoil";

function AppRoot() {
  return (
    <RecoilRoot>
      <ComponentThatUsesRecoil />
    </RecoilRoot>
  );
}

//atom<T>とは、
function atom<T>({
  key: string,

  default?: T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  effects?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>

//import {atom, useRecoilState} from 'recoil';

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

//selectorとは、
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

//atomとselectorの違いは、atomは値を保持するのに対して、selectorは値を計算するものです。
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

//proxySelectorとは、
const proxySelector = selector({
  key: 'ProxySelector',
  get: ({get}) => ({...get(myAtom), extraField: 'hi'}),
  set: ({set}, newValue) => set(myAtom, newValue),
});

//useResetRecoilStateとは、
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

//useRecoilValueとは、
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

//selectorFamily()とは、 
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

//useRecoilValueLoadableとは、
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

//RecoilLoadableとは、
interface RecoilLoadable {
  function of<T>(T | Promise<T>, Loadable<T>): Loadable<T>;
  function error<T>(mixed): Loadable<T>;
  function all(Array<mixed | Loadable<mixed> | Promise<mixed>>): Loadable<Array<mixed>>;
  function all({[string]: mixed | Loadable<mixed> | Promise<mixed>}): Loadable<{[string]: mixed}>;
  function loading(): Loadable<empty>;
  function isLoadable(mixed): boolean;
}

//useRecoilStateとは、
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

//useRecoilValue()とは、
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

//useSetRecoilState()とは、
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

//useRecoilCallback()とは、

//useResetRecoilState()とは、
import {todoListState} from "../atoms/todoListState";

const TodoResetButton = () => {
  const resetList = useResetRecoilState(todoListState);
  return <button onClick={resetList}>Reset</button>;
};

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

//function useGetRecoilValueInfo_UNSTABLE(): RecoilValue<T> => RecoilValueInfo<T>;

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

