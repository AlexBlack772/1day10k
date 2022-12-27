//数を２倍にする関数
fn double(x: i32) -> i32 {
    x * 2
}

//文字列変数を変更する関数
fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
//2つの数を足す関数
fn add(x: i32, y: i32) -> i32 {
    x + y
}
//全ての文字列置換
fn replace_all(s: &mut String, from: &str, to: &str) {
    while let Some(i) = s.find(from) {
        s.replace_range(i..i + from.len(), to);
    }
}
//文字列の配列化
fn split(s: &str) -> Vec<&str> {
    let mut v = Vec::new();
    let mut start = 0;
    for (i, c) in s.char_indices() {
        if c == ' ' {
            v.push(&s[start..i]);
            start = i + c.len_utf8();
        }
    }
    v.push(&s[start..]);
    v
}
//文字列抽出
fn extract(s: &str, start: usize, end: usize) -> &str {
    &s[start..end]
}
//文字列の長さ
fn len(s: &str) -> usize {
    s.len()
}
//文字列の分割
fn split_at(s: &str, mid: usize) -> (&str, &str) {
    s.split_at(mid)
}
//引数文字列の文字数を返す関数
fn count(s: &str) -> usize {
    s.chars().count()
}
//引数の文字数が10文字以上かどうかを返す関数
fn is_long(s: &str) -> bool {
    s.len() >= 10
}
//引数の文字列を大文字に変換する関数
fn to_upper(s: &str) -> String {
    s.to_uppercase()
}
//引数の文字列を小文字に変換する関数
fn to_lower(s: &str) -> String {
    s.to_lowercase()
}
//引数の文字列を逆順にする関数
fn reverse(s: &str) -> String {
    s.chars().rev().collect()
}
//引数の最初の文字を返す関数
fn first(s: &str) -> char {
    s.chars().next().unwrap()
}
//trueとfalseを逆にする関数
fn not(b: bool) -> bool {
    !b
}
//空の配列を定義する
fn empty_array() -> Vec<i32> {
    Vec::new()
}
//空のハッシュマップを定義する
fn empty_hashmap() -> HashMap<String, i32> {
    HashMap::new()
}
//配列の２番目の要素を返す関数
fn second(v: Vec<i32>) -> i32 {
    v[1]
}
//配列の最後の要素を返す関数
fn last(v: Vec<i32>) -> i32 {
    v[v.len() - 1]
}
//配列の最初の要素を返す関数
fn first(v: Vec<i32>) -> i32 {
    v[0]
}
//配列の要素数を返す関数
fn len(v: Vec<i32>) -> usize {
    v.len()
}
//配列からミカンのindexを取得する
fn find_orange(v: Vec<&str>) -> Option<usize> {
    v.iter().position(|&x| x == "orange")
}
//配列にリンゴが含まれているかどうかを返す関数
fn has_apple(v: Vec<&str>) -> bool {
    v.iter().any(|&x| x == "apple")
}
//配列の３番目の要素を削除する
fn remove_third(v: Vec<i32>) -> Vec<i32> {
    let mut v = v;
    v.remove(2);
    v
}
//配列の最後の要素を削除する
fn remove_last(v: Vec<i32>) -> Vec<i32> {
    let mut v = v;
    v.pop();
    v
}
//配列のそれぞれの要素をログ出力する
fn print_each(v: Vec<i32>) {
    for i in v {
        println!("{}", i);
    }
}
//文字コード順に並び替える
fn sort(v: Vec<i32>) -> Vec<i32> {
    let mut v = v;
    v.sort();
    v
}
//配列の要素を逆順にする
fn reverse(v: Vec<i32>) -> Vec<i32> {
    let mut v = v;
    v.reverse();
    v
}
//配列の要素を文字列に変換する
fn join(v: Vec<i32>) -> String {
    v.iter().map(|i| i.to_string()).collect::<Vec<_>>().join(" ")
}
//昇順ソートする
fn sort(v: Vec<i32>) -> Vec<i32> {
    let mut v = v;
    v.sort();
    v
}
//降順ソートする
fn sort_desc(v: Vec<i32>) -> Vec<i32> {
    let mut v = v;
    v.sort();
    v.reverse();
    v
}
//配列の要素を合計する
fn sum(v: Vec<i32>) -> i32 {
    v.iter().fold(0, |sum, i| sum + i)
}
//配列の要素を掛け合わせる
fn product(v: Vec<i32>) -> i32 {
    v.iter().fold(1, |product, i| product * i)
}
//配列の要素を２乗する
fn square(v: Vec<i32>) -> Vec<i32> {
    v.iter().map(|i| i * i).collect()
}
//配列の要素を２乗根にする
fn sqrt(v: Vec<i32>) -> Vec<i32> {
    v.iter().map(|i| (i as f64).sqrt() as i32).collect()
}
//配列の要素を２倍にする
fn double(v: Vec<i32>) -> Vec<i32> {
    v.iter().map(|i| i * 2).collect()
}
//配列の要素を半分にする
fn half(v: Vec<i32>) -> Vec<i32> {
    v.iter().map(|i| i / 2).collect()
}
//降順ソートする
fn sort_desc(v: Vec<i32>) -> Vec<i32> {
    let mut v = v;
    v.sort();
    v.reverse();
    v
}
//配列の要素を合計する
fn sum(v: Vec<i32>) -> i32 {
    v.iter().fold(0, |sum, i| sum + i)
}
//配列の要素を掛け合わせる
fn product(v: Vec<i32>) -> i32 {
    v.iter().fold(1, |product, i| product * i)
}
//配列構造体を定義する
struct Array {
    v: Vec<i32>,
}
//配列構造体のメソッドを定義する
impl Array {
    //配列の要素を２乗する
    fn square(&self) -> Vec<i32> {
        self.v.iter().map(|i| i * i).collect()
    }
    //配列の要素を２乗根にする
    fn sqrt(&self) -> Vec<i32> {
        self.v.iter().map(|i| (i as f64).sqrt() as i32).collect()
    }
    //配列の要素を２倍にする
    fn double(&self) -> Vec<i32> {
        self.v.iter().map(|i| i * 2).collect()
    }
    //配列の要素を半分にする
    fn half(&self) -> Vec<i32> {
        self.v.iter().map(|i| i / 2).collect()
    }
    //降順ソートする
    fn sort_desc(&self) -> Vec<i32> {
        let mut v = self.v.clone();
        v.sort();
        v.reverse();
        v
    }
    //配列の要素を合計する
    fn sum(&self) -> i32 {
        self.v.iter().fold(0, |sum, i| sum + i)
    }
    //配列の要素を掛け合わせる
    fn product(&self) -> i32 {
        self.v.iter().fold(1, |product, i| product * i)
    }
}
//配列構造体を構造体から取得
fn get_array() -> Array {
    Array {
        v: vec![1, 2, 3, 4, 5],
    }
}
//配列構造体のメソッドを呼び出す
fn main() {
    let array = get_array();
    println!("{:?}", array.square());
    println!("{:?}", array.sqrt());
    println!("{:?}", array.double());
    println!("{:?}", array.half());
    println!("{:?}", array.sort_desc());
    println!("{}", array.sum());
    println!("{}", array.product());
}
//配列オブジェクトから絞り込み取得
fn main() {
    let array = vec![1, 2, 3, 4, 5];
    let array = array.iter().filter(|&i| i % 2 == 0).collect::<Vec<_>>();
    println!("{:?}", array);
}
//配列オブジェクトのマージ
fn main() {
    let array1 = vec![1, 2, 3, 4, 5];
    let array2 = vec![6, 7, 8, 9, 10];
    let array = array1.iter().chain(array2.iter()).collect::<Vec<_>>();
    println!("{:?}", array);
}
//配列オブジェクトの重複を削除
fn main() {
    let array = vec![1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    let array = array.iter().cloned().collect::<HashSet<_>>();
    println!("{:?}", array);
}
//２つの配列を結合して、新しい配列を作成する関数
fn merge_array(array1: Vec<i32>, array2: Vec<i32>) -> Vec<i32> {
    array1.iter().chain(array2.iter()).cloned().collect()
}
//コピーして新しい配列を作成する関数
fn copy_array(array: Vec<i32>) -> Vec<i32> {
    array.iter().cloned().collect()
}
//配列をソートする関数
fn sort_array(array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.sort();
    array
}
//配列を降順ソートする関数
fn sort_desc_array(array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.sort();
    array.reverse();
    array
}
//配列の要素を合計する関数
fn sum_array(array: Vec<i32>) -> i32 {
    array.iter().fold(0, |sum, i| sum + i)
}
//配列の要素を掛け合わせる関数
fn product_array(array: Vec<i32>) -> i32 {
    array.iter().fold(1, |product, i| product * i)
}
//配列の要素を２乗する関数
fn square_array(array: Vec<i32>) -> Vec<i32> {
    array.iter().map(|i| i * i).collect()
}
//配列の要素を２乗根にする関数
fn sqrt_array(array: Vec<i32>) -> Vec<i32> {
    array.iter().map(|i| (i as f64).sqrt() as i32).collect()
}
//boolean型の配列を作成する関数
fn make_bool_array(array: Vec<i32>) -> Vec<bool> {
    array.iter().map(|i| i % 2 == 0).collect()
}
//number型の配列を作成する関数
fn make_number_array(array: Vec<i32>) -> Vec<i32> {
    array.iter().map(|i| i * 2).collect()
}
//参照透過性を保つために、配列をコピーしてから処理する
fn main() {
    let array = vec![1, 2, 3, 4, 5];
    println!("{:?}", square_array(copy_array(array)));
    println!("{:?}", sqrt_array(copy_array(array)));
    println!("{:?}", make_number_array(copy_array(array)));
    println!("{:?}", make_bool_array(copy_array(array)));
    println!("{:?}", sort_array(copy_array(array)));
    println!("{:?}", sort_desc_array(copy_array(array)));
    println!("{}", sum_array(copy_array(array)));
    println!("{}", product_array(copy_array(array)));
    println!("{:?}", merge_array(copy_array(array), copy_array(array)));
}
//配列の要素を２乗する関数
fn square_array(array: Vec<i32>) -> Vec<i32> {
    array.iter().map(|i| i * i).collect()
}
//非破壊的pushメソッド
fn push_array(array: Vec<i32>, i: i32) -> Vec<i32> {
    let mut array = array;
    array.push(i);
    array
}
//非破壊的popメソッド
fn pop_array(array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.pop();
    array
}
//非破壊的unshiftメソッド
fn unshift_array(array: Vec<i32>, i: i32) -> Vec<i32> {
    let mut array = array;
    array.insert(0, i);
    array
}
//非破壊的shiftメソッド
fn shift_array(array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.remove(0);
    array
}
//非破壊的concatメソッド
fn concat_array(array1: Vec<i32>, array2: Vec<i32>) -> Vec<i32> {
    let mut array = array1;
    array.extend(array2);
    array
}
//非破壊的sliceメソッド
fn slice_array(array: Vec<i32>, start: usize, end: usize) -> Vec<i32> {
    let mut array = array;
    array.drain(start..end);
    array
}
//非破壊的spliceメソッド
fn splice_array(array: Vec<i32>, start: usize, delete_count: usize, insert_array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.splice(start..start + delete_count, insert_array);
    array
}
//非破壊的reverseメソッド
fn reverse_array(array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.reverse();
    array
}
//非破壊的sortメソッド
fn sort_array(array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.sort();
    array
}
//非破壊的sort_descメソッド
fn sort_desc_array(array: Vec<i32>) -> Vec<i32> {
    let mut array = array;
    array.sort();
    array.reverse();
    array
}
//非破壊的sumメソッド
fn sum_array(array: Vec<i32>) -> i32 {
    array.iter().fold(0, |sum, i| sum + i)
}
//非破壊的productメソッド
fn product_array(array: Vec<i32>) -> i32 {
    array.iter().fold(1, |product, i| product * i)
}
//配列の２番目に大きい値を返す関数
fn second_largest(array: Vec<i32>) -> i32 {
    let mut array = array;
    array.sort();
    array[array.len() - 2]
}
//文字列の改行を削除する関数
fn remove_newline(string: String) -> String {
    string.replace("
", "")
}
//文字列の空白を削除する関数
fn remove_whitespace(string: String) -> String {
    string.replace(" ", "")
}
//文字列の改行
fn add_newline(string: String) -> String {
    string + "

"
}
//整数の桁数を返す関数
fn count_digits(i: i32) -> i32 {
    i.to_string().len() as i32
}
//整数の1の位を返す関数
fn ones_digit(i: i32) -> i32 {
    i % 10
}
//整数の10の位を返す関数
fn tens_digit(i: i32) -> i32 {
    (i / 10) % 10
}
//整数の100の位を返す関数
fn hundreds_digit(i: i32) -> i32 {
    (i / 100) % 10
}
//指定行から指定行までの配列の和
fn sum_array_slice(array: Vec<i32>, start: usize, end: usize) -> i32 {
    array[start..end].iter().fold(0, |sum, i| sum + i)
}
//指定行から指定行までの配列の積
fn product_array_slice(array: Vec<i32>, start: usize, end: usize) -> i32 {
    array[start..end].iter().fold(1, |product, i| product * i)
}
//fizzbuzz
fn fizzbuzz(i: i32) -> String {
    if i % 15 == 0 {
        "FizzBuzz".to_string()
    } else if i % 3 == 0 {
        "Fizz".to_string()
    } else if i % 5 == 0 {
        "Buzz".to_string()
    } else {
        i.to_string()
    }
}
//配列の要素を結合する関数
fn merge_array(array1: Vec<i32>, array2: Vec<i32>) -> Vec<i32> {
    let mut array = Vec::new();
    for i in 0..array1.len() {
        array.push(array1[i]);
        array.push(array2[i]);
    }
    array
}
//配列の要素を結合する関数
fn merge_array2(array1: Vec<i32>, array2: Vec<i32>) -> Vec<i32> {
    let mut array = Vec::new();
    for i in 0..array1.len() {
        array.push(array1[i]);
    }
    for i in 0..array2.len() {
        array.push(array2[i]);
    }
    array
}
//二次元配列の指定要素
fn get_array2(array: Vec<Vec<i32>>, i: usize, j: usize) -> i32 {
    array[i][j]
}
//二次元配列の指定行
fn get_row(array: Vec<Vec<i32>>, i: usize) -> Vec<i32> {
    array[i].clone()
}
//二次元配列の和
fn sum_array2(array: Vec<Vec<i32>>) -> i32 {
    let mut sum = 0;
    for i in 0..array.len() {
        for j in 0..array[i].len() {
            sum += array[i][j];
        }
    }
    sum
}
//二次元配列の積
fn product_array2(array: Vec<Vec<i32>>) -> i32 {
    let mut product = 1;
    for i in 0..array.len() {
        for j in 0..array[i].len() {
            product *= array[i][j];
        }
    }
    product
}
//二次元配列の行数
fn count_rows(array: Vec<Vec<i32>>) -> usize {
    array.len()
}
//二次元配列の列数
fn count_columns(array: Vec<Vec<i32>>) -> usize {
    array[0].len()
}
//二次元配列の行列を入れ替える関数
fn transpose(array: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut array2 = Vec::new();
    for i in 0..array[0].len() {
        let mut row = Vec::new();
        for j in 0..array.len() {
            row.push(array[j][i]);
        }
        array2.push(row);
    }
    array2
}
//二次元配列の行列を入れ替える関数
fn transpose2(array: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut array2 = Vec::new();
    for i in 0..array[0].len() {
        array2.push(Vec::new());
    }
    for i in 0..array.len() {
        for j in 0..array[i].len() {
            array2[j].push(array[i][j]);
        }
    }
    array2
}

//二次元配列の各行の和
fn sum_rows(array: Vec<Vec<i32>>) -> Vec<i32> {
    let mut array2 = Vec::new();
    for i in 0..array.len() {
        let mut sum = 0;
        for j in 0..array[i].len() {
            sum += array[i][j];
        }
        array2.push(sum);
    }
    array2
}
//配列の要素比較
fn compare_array(array1: Vec<i32>, array2: Vec<i32>) -> bool {
    if array1.len() != array2.len() {
        return false;
    }
    for i in 0..array1.len() {
        if array1[i] != array2[i] {
            return false;
        }
    }
    true
}
//大文字を小文字に変換する関数
fn to_lower_case(string: String) -> String {
    string.to_lowercase()
}
//小文字を大文字に変換する関数
fn to_upper_case(string: String) -> String {
    string.to_uppercase()
}
//配列の要素を結合する関数
fn merge_array3(array1: Vec<i32>, array2: Vec<i32>) -> Vec<i32> {
    let mut array = Vec::new();
    for i in 0..array1.len() {
        array.push(array1[i]);
    }
    for i in 0..array2.len() {
        array.push(array2[i]);
    }
    array
}
//回分判定
fn is_palindrome(string: String) -> bool {
    let mut string2 = String::new();
    for i in 0..string.len() {
        string2.push(string.chars().nth(string.len() - i - 1).unwrap());
    }
    string == string2
}
//