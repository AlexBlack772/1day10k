//<Type>とは、型引数と呼ばれるもので、関数の引数として渡された型をそのまま返す関数を定義することができる
function identity<Type>(arg: Type): Type {
  return arg;
}

function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}


//throwとは、例外を発生させることができる
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}

//型ガードとは、型の範囲を絞り込むことができる
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + input;
  }
  if (typeof padding === "string") {
    return padding + input;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

//
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

//
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
                        
(parameter) padding: number
  }
  return padding + input;
           
(parameter) padding: string
}

//$ExpectErrorとは、エラーが発生することを期待することができる
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

//typeofとは、変数の型を取得することができる
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

//instanceofとは、オブジェクトが特定のクラスのインスタンスであるかどうかを判定することができる
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {
                       
(parameter) strs: string[]
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
                   
(parameter) strs: string
    }
  }
}
//interfaceとは、オブジェクトの型を定義することができる
interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
                           
(property) Container.value: number
 
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

//
function multiplyValue(container: Container, factor: number) {
  if (container.value) {
    console.log(container.value);

    (property) Container.value: number
  }
}

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

//
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
               
    (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
               
    (parameter) x: string
  }
}

//
function isNumber(x: any): x is number {
  return typeof x === "number";
}

