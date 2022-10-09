//useStateのインポート
import React, { useState } from "react";
//コンポーネントのインポート
import { Button } from "./Button";
import { Display } from "./Display";
//Appコンポーネントの定義
export const App = () => {
   //countとsetCountの定義
   const [count, setCount] = useState(0);
   //increment関数の定義
   const increment = () => {
      setCount(count + 1);
   };
   //decrement関数の定義
   const decrement = () => {
      setCount(count - 1);
   };
   //returnの定義
   return (
      <div>
         <Display count={count} />
         <Button increment={increment} decrement={decrement} />
      </div>
   );
}
//Buttonコンポーネントの定義
export const Button = (props) => {
   //returnの定義
   return (
      <div>
         <button onClick={props.increment}>+1</button>
         <button onClick={props.decrement}>-1</button>
      </div>
   );
}
//Displayコンポーネントの定義
export const Display = (props) => {
   //returnの定義
   return <div>{props.count}</div>;
}
//index.jsの定義
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
//index.jsの定義
ReactDOM.render(<App />, document.getElementById("root"));
//index.htmlの定義
/*
< !DOCTYPE html >
   < html lang="en" >
      < head >
         < meta charset="UTF-8" >
            < meta name="viewport" content="width=device-width, initial-scale=1.0" >
               < title > Document </title>
            </head>
            <body>
               <div id="root"></div>
               <script src="index.jsx"></script>
            </body>
         </html>
*/
// Language: javascript
// Path: 1010/index.jsx
//useStateのインポート
import React, {useState} from "react";
//コンポーネントのインポート
import { Button } from "./Button";
//Appコンポーネントの定義
export const App1 = () => {
   //countとsetCountの定義
   const [count, setCount] = useState(0);
   //increment関数の定義
   const increment = () => {
      setCount(count + 1);
   };
   //decrement関数の定義
   const decrement = () => {
      setCount(count - 1);
   };
   //returnの定義
   return (
      <div>
         <Button increment={increment} decrement={decrement} />
         <div>{count}</div>
      </div>
   );
}
//Buttonコンポーネントの定義
export const Button = (props) => {
   //returnの定義
   return (
      <div>
         <button onClick={props.increment}>+1</button>
         <button onClick={props.decrement}>-1</button>
      </div>
   );
}
//絞り込み機能の実装
//Appコンポーネントの定義
export const App2 = () => {
   //countとsetCountの定義
   const [count, setCount] = useState(0);
   //increment関数の定義
   const increment = () => {
      setCount(count + 1);
   };
   //decrement関数の定義
   const decrement = () => {
      setCount(count - 1);
   };
   //returnの定義
   return (
      <div>
         <Button increment={increment} decrement={decrement} />
         <div>{count}</div>
      </div>
   );
}

//期限：2021年4月30日
// Language: javascript
// Path: 1011/index.jsx
//useStateのインポート
import React, { useState } from "react";
//コンポーネントのインポート
import { Button } from "./Button";
//Appコンポーネントの定義
export const App = () => {

   //countとsetCountの定義
   const [count, setCount] = useState(0);
   //increment関数の定義
   const increment = () => {
      setCount(count + 1);
   };
   //decrement関数の定義
   const decrement = () => {
      setCount(count - 1);
   };
   //returnの定義
   return (
      <div>
         <Button increment={increment} decrement={decrement} />
         <div>{count}</div>
      </div>
   );
}
//Buttonコンポーネントの定義
//useMemoのインポート
import React, { useMemo } from "react";
//useCallbackのインポート
import React, { useCallback } from "react";
//useCallbackの定義
export const Button1 = React.memo((props) => {
   //incrementとdecrementの定義
   const increment = useCallback(() => props.increment(), [props.increment]);
   const decrement = useCallback(() => props.decrement(), [props.decrement]);
   //returnの定義
   return (
      <div>
         <button onClick={increment}>+1</button>
         <button onClick={decrement}>-1</button>
      </div>
   );
})

//createを作成する
//doリスト
//const doList = ["do1", "do2", "do3"];
//いいね機能を作成する
const iineCount = addEventListener("click", () => {
   console.log("いいね");
});

talkRoom.map((talk, index) => {
   return (
      <div key={index}>
         <div>{talk}</div>
         <button onClick={() => iine(index)}>いいね</button>
         <div>{iineCount[index]}</div>
      </div>
   );
}