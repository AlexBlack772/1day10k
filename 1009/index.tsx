//useStateを使う
import React, { useState } from "react";
import ReactDOM from "react-dom";
//useStateを使う
const App = () => {
   //useStateを使う
   const [count, setCount] = useState(0);
   //useStateを使う
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
   );
}
   
//useEffect
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//useEffect
const App = () => {

   //useEffect
   useEffect(() => {
      console.log("rendered");
   });
   //useEffect
   return (
      <div>
         <p>useEffect</p>
      </div>
   );
}

//propsに型定義
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//propsに型定義
type Props = {
   name: string;
   age: number;
}
//propsに型定義
const App = (props: Props) => {
   //propsに型定義
   const { name, age } = props;
   //propsに型定義
   return (
      <div>
         <p>こんにちは{name}さん</p>
         <p>{age}歳です</p>
      </div>
   );
}
//画像を投稿する

