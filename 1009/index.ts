//boolean型とは
//trueかfalseのどちらかの値をとる型
type booleans = true | false;
//Promise型とは
//非同期処理の結果を表す型
type promises = Promise<string>;
//コールバック関数の型定義
type callback = (value: string) => void;
//関数の返り値の型定義
type returns = string;
//オブジェクトのkeyをユニオン型に変換
type keys = keyof { a: string; b: number; };
//オブジェクトの型定義
type objects = { a: string; b: number; };
//配列からユニオン型変換
type unions = Array<string | number>;
//型エイリアスの型定義
type aliases = string;
//型ガード
type guards = string extends string ? true : false;
//partial型
type partials = Partial<{ a: string; b: number; }>;
//required型
type requireds = Required<{ a?: string; b?: number; }>;
//pick型
type picks = Pick<{ a: string; b: number; }, 'a'>;
//omit型
type omits = Omit<{ a: string; b: number; }, 'a'>;
//extract型
type extracts = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
//exclude型
type excludes = Exclude<'a' | 'b' | 'c', 'a' | 'f'>;
//nonNullable型
type nonNullables = NonNullable<string | null | undefined>;
//instanceof型
//type instances = string instanceof String;
//ジェネリック型
type generics = Array<string>;
//Promise型
//Promise型とは、非同期処理の結果を表す型
//Promise型は、コンストラクタ関数である
type promise = Promise<string>;
//readonly
type readonly = Readonly<{ a: string; b: number; }>;
//readonlyとは、readonly修飾子のこと
//readonly修飾子は、変数やプロパティに対して、再代入を禁止する修飾子
//定数オブジェクトとは、オブジェクトのプロパティを再代入できないオブジェクトのこと
//定数オブジェクトは、readonly修飾子を使用して定義する
//タプル型
//タプル型とは、配列の要素の型を指定する型
type tuples = [string, number];
//タプル型の要素には、readonly修飾子を使用することができる
//配列型
//配列型とは、配列の要素の型を指定する型
type arrays = Array<string>;
//配列型の要素には、readonly修飾子を使用することができる
//型エイリアス
//型エイリアスとは、型のエイリアスを定義する構文
//オブジェクト型
//オブジェクト型とは、オブジェクトの型を指定する型
type objects1 = { a: string; b: number; };
//オブジェクト型のプロパティには、readonly修飾子を使用することができる
//オブジェクト型のプロパティには、?を付与することで、オプショナルなプロパティにすることができる
//型推論
//型推論とは、型を明示的に指定しなくても、型を推論してくれる機能
//配列からユニオン型変換
type unions1 = Array<string | number>;
//ユニオン型
//ユニオン型とは、複数の型を指定する型
type unions2 = string | number;
//ユニオン型の要素には、readonly修飾子を使用することができる
//ユニオン型の要素には、?を付与することで、オプショナルなプロパティにすることができる
//型エイリアスの型定義
type aliases1 = string;
//型アサーション  
//型アサーションとは、型を明示的に指定する構文
//型アサーションは、as構文と尖括弧構文の2種類がある
//as構文
//尖括弧構文
//型ガード
//型ガードとは、型を判定する構文
//型ガード
//型ガードは、typeof構文、instanceof構文、in構文、is構文の4種類がある
//型ガードは、型アサーションと同様に、尖括弧構文とas構文の2種類がある
//typeof構文
//instanceof構文
//in構文
//型ガードhttpエラーハンドリング 
//is構文
//型ガードの型定義
type guards1 = string extends string ? true : false;
//partial型
//partial型とは、オブジェクトのプロパティをオプショナルにする型
type partials1 = Partial<{ a: string; b: number; }>;
//required型
//required型とは、オブジェクトのプロパティを必須にする型
type requireds1 = Required<{ a?: string; b?: number; }>;
//readonly型
//readonly型とは、オブジェクトのプロパティをreadonlyにする型
type readonlies1 = Readonly<{ a: string; b: number; }>;
//pick型
//pick型とは、オブジェクトのプロパティを指定して、新しいオブジェクトを作成する型
type picks1 = Pick<{ a: string; b: number; }, 'a'>;
//omit型
//omit型とは、オブジェクトのプロパティを指定して、新しいオブジェクトを作成する型
type omits1 = Omit<{ a: string; b: number; }, 'a'>;
//extract型
//extract型とは、ユニオン型から指定した型を抽出する型
type extracts1 = Extract<'a' | 'b' | 'c', 'a' | 'e'>;
//exclude型
//exclude型とは、ユニオン型から指定した型を除外する型
type excludes1 = Exclude<'a' | 'b' | 'c', 'a' | 'e'>;
//nonnullable型
//nonnullable型とは、nullとundefinedを除外する型
type nonnullables1 = NonNullable<string | null | undefined>;
//parameters型
//parameters型とは、関数の引数の型を取得する型
type parameters1 = Parameters<(a: string, b: number) => void>;
//returntype型
//returntype型とは、関数の戻り値の型を取得する型
type returntypes1 = ReturnType<(a: string, b: number) => string>;
//infer型
//infer型とは、型を推論する型
type infers1 = { a: string; b: number; } extends { a: infer A; b: infer B; } ? true : false;
//pick型の型定義
type picks2 = Pick<{ a: string; b: number; }, 'a' | 'b'>;
//omit型の型定義 
type omits2 = Omit<{ a: string; b: number; }, 'a' | 'b'>;
//extract型の型定義
type extracts2 = Extract<'a' | 'b' | 'c', 'a' | 'b' | 'd'>;
//exclude型の型定義
type excludes2 = Exclude<'a' | 'b' | 'c', 'a' | 'b' | 'd'>;
//nonnullable型の型定義
type nonnullables2 = NonNullable<string | null | undefined>;
//parameters型の型定義
type parameters2 = Parameters<(a: string, b: number) => void>;
//utility型
//utility型とは、型を変換する型
//utility型は、partial型、required型、readonly型、pick型、omit型、extract型、exclude型、nonnullable型、parameters型、returntype型、infer型の11種類がある
//utility型の型定義
type utilities1 = Partial<{ a: string; b: number; }>;
type utilities2 = Required<{ a?: string; b?: number; }>;
type utilities3 = Readonly<{ a: string; b: number; }>;
type utilities4 = Pick<{ a: string; b: number; }, 'a' | 'b'>;
type utilities5 = Omit<{ a: string; b: number; }, 'a' | 'b'>;
type utilities6 = Extract<'a' | 'b' | 'c', 'a' | 'b' | 'd'>;
type utilities7 = Exclude<'a' | 'b' | 'c', 'a' | 'b' | 'd'>;
type utilities8 = NonNullable<string | null | undefined>;
type utilities9 = Parameters<(a: string, b: number) => void>;
type utilities10 = ReturnType<(a: string, b: number) => string>;
type utilities11 = { a: string; b: number; } extends { a: infer A; b: infer B; } ? true : false;
//utility型の型定義
//index型
//index型とは、オブジェクトのプロパティを取得する型
type indexs1 = { a: string; b: number; }['a'];
//keyof型
//keyof型とは、オブジェクトのプロパティ名を取得する型
type keyofs1 = keyof { a: string; b: number; };
//mapped型
//mapped型とは、オブジェクトのプロパティを変換する型
type mappeds1 = { [K in keyof { a: string; b: number; }]: boolean; };
//readonlymapped型
//readonlymapped型とは、オブジェクトのプロパティをreadonlyに変換する型
type readonlymappeds1 = { readonly [K in keyof { a: string; b: number; }]: boolean; };
//index型の型定義
type indexs2 = { a: string; b: number; }['a' | 'b'];
//keyof型の型定義
type keyofs2 = keyof { a: string; b: number; } | 'c';
//mapped型の型定義
type mappeds2 = { [K in keyof { a: string; b: number; } | 'c']: boolean; };
//ジェネリクスで型変数を絞る
//ジェネリクスで型変数を絞るとは、型変数に制約をつけること
//
//ジェネリクスで型変数を絞る
