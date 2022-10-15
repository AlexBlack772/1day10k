//import { useEffect } from "react/cjs/react.production.min";

//userのタイプ
type User = {
   name: string;
   age: number;

   //メソッド
   greet: (message: string) => void;
};

//userのオブジェクト
const user: User = {
   name: "Max",
   age: 30,
   greet(message: string) {
      console.log(message + " " + this.name);
   }
};

//userのオブジェクトのメソッドを呼び出す
user.greet("Hello, I am");
//booleanのタイプ
type Admin = {
   name: string;
   age: number;
   privileges: string[];
};
//型の結合
type ElevatedUser = User & Admin;
//型の結合したオブジェクト
const e1: ElevatedUser = {
   name: "Max",
   age: 30,
   privileges: ["create-server"],
   greet(message: string) {

   }
};
//型エイリアス
type Combinable1 = string | number;

//型推論
//type Universal = Combinable & Numeric;
//オブジェクトの型undefined
let u1: undefined = undefined;
//intersection型
type UnknownEmployee = Admin | User;
//intersection型のオブジェクト
function printEmployeeInformation(emp: UnknownEmployee) {
   console.log("Name: " + emp.name);
   if ("privileges" in emp) {
      console.log("Privileges: " + emp.privileges);
   }
   if ("age" in emp) {
      console.log("Age: " + emp.age);
   }
}
//関数の型の定義
type AddFn = (a: number, b: number) => number;
//リテラル型
type Combinable = "as-number";
//readonly
type ReadonlyUser = {
   readonly name: string;
   age: number;
};
//never型
function generateError(message: string, code: number): never {
   throw { message: message, errorCode: code };
}
//型ガード
function add1(a: Combinable, b: Combinable) {
   if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
   }
   return a + b;
}
//ジェネリック型
function merge<T extends object, U extends object>(objA: T, objB: U) {
   return Object.assign(objA, objB);
}
//ジェネリック型のオブジェクト
const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
//ジェネリック型の関数
//function countAndDescribe<T extends string | number>(element: T[]): [T[], string] { }


//freshmanのタイプ
/*
type Freshman = {
}; Freshman = {
   name: "Max",
   age: 30,
   hobbies: ["Sports"],
   greet(message: string) {
      console.log(message + " " + this.name);
   }
};*/
//freshmanのオブジェクト
/*
const user1: Freshman = {
   name: "Max",
   age: 30,
   hobbies: ["Sports"],
}
*/
//instanceofの型
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
   const result = n1 + n2;
   cb(result);
}
//アクセス制御
class Department {

}
//Partial型
//Partial型とは、オブジェクトのプロパティをすべてオプショナルにする型

type PartialUser = Partial<User>;
//Pick型
//Pick型とは、オブジェクトのプロパティを指定して、そのプロパティだけを持つ型を作成する型
type PickUser = Pick<User, "name" | "age">;
//Readonly型
type ReadonlyUser1 = Readonly<User>;
//Record型
type RecordUser = Record<"name" | "age", string>;
//型のエイリアス
type User1 = {
   name: string;
   age: number;
};
//required型
type RequiredUser = Required<User>;
//Exclude型
type ExcludeUser = Exclude<"a" | "b" | "c", "a">;
//Extract型
//extract型とは、指定した型のうち、指定した型のみを抽出する型
type ExtractUser = Extract<"a" | "b" | "c", "a" | "f">;
//NonNullable型
//nonnullable型とは、nullとundefinedを除外する型
type NonNullableUser = NonNullable<string | number | undefined>;
//ReturnType型
//returntype型とは、関数の戻り値の型を取得する型
type ReturnTypeUser = ReturnType<() => string>;
//omit型
//omit型とは、指定した型から指定したプロパティを除外する型
type OmitUser = Omit<User, "name" | "age">;
//omit型のオブジェクト
const omitUser: OmitUser = {
   greet(message: string) {
      console.log(message + " " + this.name);
   }
};
//omit型のオブジェクトのメソッドを呼び出す
omitUser.greet("Hello, I am");
//record型
//record型とは、指定した型のプロパティを持つオブジェクトを作成する型
type RecordUser1 = Record<"name" | "age", string>;
//record型の実装
const recordUser: RecordUser1 = {
   name: "Max",
   age: "30",
};
//record型のオブジェクトのプロパティを呼び出す
console.log(recordUser.name);
//enum型
//enum型とは、列挙型のこと
enum Role {
   ADMIN = "ADMIN",
   READ_ONLY = 100,
   AUTHOR = "AUTHOR",
}
//enum型のオブジェクト
//関数オーバーロード
//関数オーバーロードとは、関数の引数や戻り値の型を指定すること
function combine(input1: number | string, input2: number | string) {
}
//関数オーバーロードの実装

//@Request()とは、リクエストオブジェクトを取得すること
//@Response()とは、レスポンスオブジェクトを取得すること
//nest.jsのコントローラー
//@Param()とは、パラメーターを取得すること
//@Body()とは、リクエストボディを取得すること
//@Query()とは、クエリパラメーターを取得すること
/*
@Controller('cats')
export class CatsController {
   @Get()
   findAll(): string {
      return 'This action returns all cats';
   }
   @Get(':id')
   findOne(@Param() params): string {
      console.log(params.id);
      return `This action returns a #${params.id} cat`;
   }
   @Post()
   create(@Body() createCatDto: CreateCatDto) {
      return 'This action adds a new cat';
   }
   @Delete(':id')
   remove(@Param('id') id: string) {
      return `This action removes a #${id} cat`;
   }
}
*/

