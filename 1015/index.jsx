//関数の定義

import { useCallback } from "react";

//useEffectは、コンポーネントがマウントされた時に実行される
useCallback
//useCallbackは、関数をキャッシュする
//useCallbackは、第二引数に指定した値が変更された時にのみ関数を再定義する
//useCallbackは、第二引数に指定した値が変更されない限り、同じ関数を再利用する
//useCallbackは、第二引数に空の配列を指定すると、コンポーネントがマウントされた時にのみ関数を再定義する
