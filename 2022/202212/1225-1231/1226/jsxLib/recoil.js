//atom()とは、Recoilの状態を表すオブジェクトを作成する関数です。
function atom<T>({
   key: string,

   default?: T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

   effects?: $ReadOnlyArray<AtomEffect<T>>,

   dangerouslyAllowMutability?: boolean,
}): RecoilState<T>

//selector()とは、Recoilの状態を表すオブジェクトを作成する関数です。
function selector<T>({
   key: string,

   get: ({
      get: GetRecoilValue,
      getCallback: GetCallback,
   }) => T | Promise < T > | Loadable < T > | WrappedValue < T > | RecoilValue < T >,

      set ?: (
         {
            get: GetRecoilValue,
            set: SetRecoilState,
            reset: ResetRecoilState,
         },
         newValue: T | DefaultValue,
      ) => void,

      dangerouslyAllowMutability ?: boolean,
      cachePolicy_UNSTABLE ?: CachePolicy,
})

//useRecoilState()とは、Recoilの状態を読み書きするためのカスタムフックです。
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

//useRecoilState()とは、Recoilの状態を読み書きするためのカスタムフックです。
function useRecoilState<T>(state: RecoilState<T>): [T, SetterOrUpdater<T>];

type SetterOrUpdater<T> = (T | (T => T)) => void;

//useRecoilValue()とは、Recoilの状態を読み取るためのカスタムフックです。
function useRecoilValue<T>(recoilValue: RecoilValue<T>): T;

//useSetRecoilState()とは、Recoilの状態を書き込むためのカスタムフックです。(読み取りはできない
function useSetRecoilState<T>(state: RecoilState<T>): SetterOrUpdater<T>;

type SetterOrUpdater<T> = (T | (T => T)) => void;

//useResetRecoilState()とは、Recoilの状態をリセットするためのカスタムフックです。
function useResetRecoilState(state: RecoilState<mixed>): () => void;

//useRecoilStateLoadable()とは、Recoilの状態を読み書きするためのカスタムフックです。
function useRecoilStateLoadable<T>(state: RecoilState<T>): [Loadable<T>, SetterOrUpdater<T>];

type SetterOrUpdater<T> = (T | (T => T)) => void;

//useRecoilValueLoadable()とは、Recoilの状態を読み取るためのカスタムフックです。
function useRecoilValueLoadable<T>(recoilValue: RecoilValue<T>): Loadable<T>;

//useRecoilValueLoadable()とは、Recoilの状態を読み取るためのカスタムフックです。
function useRecoilValueLoadable<T>(recoilValue: RecoilValue<T>): Loadable<T>;

//useGetRecoilValueInfo_UNSTABLE()とは、Recoilの状態を読み取るためのカスタムフックです。
function useGetRecoilValueInfo_UNSTABLE(): GetRecoilValueInfo;

//useRecoilRefresher()とは、Recoilの状態を読み取るためのカスタムフックです。
function useRecoilRefresher(): () => void;

//isRecoilValue(value)とは、Recoilの状態を読み取るためのカスタムフックです。
function isRecoilValue(value: mixed): boolean;

//atomFamily()とは、Recoilの状態を読み取るためのカスタムフックです。
function atomFamily<T, P>({
   key: string,

   default: T | ((param: P) => T | Promise<T> | Loadable<T>),

   effects_UNSTABLE ?: $ReadOnlyArray<AtomEffect<T>>,
}): (param: P) => RecoilState < T >;

//selectorFamily()とは、Recoilの状態を読み取るためのカスタムフックです。
function selectorFamily<T, P>({
   key: string,
})

//constSelector()とは、Recoilの状態を読み取るためのカスタムフックです。
function constSelector<T>(value: T): RecoilValueReadOnly<T>;

//errorSelector()とは、Recoilの状態を読み取るためのカスタムフックです。
function errorSelector(error: Error): RecoilValueReadOnly<Error>;

//noWait()とは、Recoilの状態を読み取るためのカスタムフックです。
function noWait<T>(promise: Promise<T>): RecoilValueReadOnly<T>;

//waitForNone()とは、Recoilの状態を読み取るためのカスタムフックです。
function waitForNone<T>(recoilValues: $ReadOnlyArray<RecoilValue<T>>): RecoilValueReadOnly<T>;

//waitForAll()とは、Recoilの状態を読み取るためのカスタムフックです。
function waitForAll<T>(recoilValues: $ReadOnlyArray<RecoilValue<T>>): RecoilValueReadOnly<T>;

//waitForAny()とは、Recoilの状態を読み取るためのカスタムフックです。
function waitForAny<T>(recoilValues: $ReadOnlyArray<RecoilValue<T>>): RecoilValueReadOnly<T>;

//waitForAllSettled()とは、Recoilの状態を読み取るためのカスタムフックです。
function waitForAllSettled<T>(recoilValues: $ReadOnlyArray<RecoilValue<T>>): RecoilValueReadOnly<T>;

//waitForNone()とは、Recoilの状態を読み取るためのカスタムフックです。
function waitForNone<T>(recoilValues: $ReadOnlyArray<RecoilValue<T>>): RecoilValueReadOnly<T>;

//useRecoilTransactionObserver_UNSTABLE()とは、Recoilの状態を読み取るためのカスタムフックです。
function useRecoilTransactionObserver_UNSTABLE(callback: (Snapshot) => void): void;

//useRecoilSnapshot()とは、Recoilの状態を読み取るためのカスタムフックです。
function useRecoilSnapshot(): Snapshot;

//useGoToSnapshot()とは、Recoilの状態を読み取るためのカスタムフックです。
function useGoToSnapshot(): Snapshot => void;


