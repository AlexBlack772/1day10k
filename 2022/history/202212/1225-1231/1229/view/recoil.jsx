//atom<T>とは、RecoilState<T>を返す関数
function atom<T>({
  key: string,

  default?: T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  effects?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>

//useRecoilState()とは、RecoilState<T>を返す関数
function useRecoilState<T>(recoilState: RecoilState<T>): [T, SetterOrUpdater<T>]

//useRecoilValue(): RecoilValue<T>を返す関数
function useRecoilValue<T>(recoilValue: RecoilValue<T>): T

//useSetRecoilState(): SetterOrUpdater<T>を返す関数
function useSetRecoilState<T>(recoilState: RecoilState<T>): SetterOrUpdater<T>

