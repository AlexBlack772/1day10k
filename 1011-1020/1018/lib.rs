//２つの文字列を連結する関数
fn concat(s1: &str, s2: &str) -> String {
    let mut s = String::new();
    s.push_str(s1);
    s.push_str(s2);
    s
}
//一つの文字列置換
fn replace(s: &str, old: &str, new: &str) -> String {
    let mut result = String::new();
    let mut start = 0;
    for (i, c) in s.char_indices() {
        if s[i..].starts_with(old) {
            result.push_str(&s[start..i]);
            result.push_str(new);
            start = i + old.len();
        }
    }
    result.push_str(&s[start..]);
    result
}
//引数を２倍する関数
fn double(x: i32) -> i32 {
    x * 2
}
//引数を３倍する関数
fn triple(x: i32) -> i32 {
    x * 3
}
//ジェネリックな関数
fn apply<F>(f: F, x: i32) -> i32
    where F: Fn(i32) -> i32
{
    f(x)
}
//ジェネリックオブジェクトの型生成
fn create_fn() -> Box<Fn()> {
    let text = "Fn".to_owned();
    Box::new(move || println!("This is a: {}", text))
}
//ジェネリクスオブジェクトの型定義
fn create_fnmut() -> Box<FnMut()> {
    let text = "FnMut".to_owned();
    Box::new(move || println!("This is a: {}", text))
}
//ジェネリクスの関数
fn apply_fn<F>(f: F)
    where F: Fn()
{
    f()
}
//参照透過性
fn pure_function(x: i32) -> i32 {
    x + 1
}
//非破壊的な関数
fn add_one(x: &mut i32) {
    *x += 1;
}
//mapを使う関数
//Fとは、ジェネリクスの型,fnmutとは、
fn map<T, F>(input: Vec<T>, mut f: F) -> Vec<T>
    where F: FnMut(T) -> T
{
    let mut result = Vec::new();
    for x in input {
        result.push(f(x));
    }
    result
}
//非破壊的pop関数
fn pop<T>(v: &mut Vec<T>) -> Option<T> {
    if v.is_empty() {
        None
    } else {
        Some(v.remove(0))
    }
}
//非破壊的push関数
fn push<T>(v: &mut Vec<T>, x: T) {
    v.push(x);
}
//非破壊的reverse関数
fn reverse<T>(v: &mut Vec<T>) {
    let mut i = 0;
    let mut j = v.len() - 1;
    while i < j {
        v.swap(i, j);
        i += 1;
        j -= 1;
    }
}
//非破壊的splice関数
fn splice<T>(v: &mut Vec<T>, start: usize, end: usize) -> Vec<T> {
    let mut result = Vec::new();
    let mut i = start;
    while i < end {
        result.push(v.remove(start));
        i += 1;
    }
    result
}
//非破壊的insert関数
fn insert<T>(v: &mut Vec<T>, index: usize, x: T) {
    let mut i = v.len();
    while i > index {
        v.swap(i - 1, i);
        i -= 1;
    }
    v[index] = x;
}
//非破壊的sort関数
fn sort<T: Ord>(v: &mut Vec<T>) {
    let mut i = 0;
    while i < v.len() {
        let mut j = i;
        while j > 0 && v[j - 1] > v[j] {
            v.swap(j - 1, j);
            j -= 1;
        }
        i += 1;
    }
}
//配列の最小値
fn min<T: Ord>(v: &[T]) -> Option<&T> {
    if v.is_empty() {
        None
    } else {
        let mut min = &v[0];
        for x in &v[1..] {
            if x < min {
                min = x;
            }
        }
        Some(min)
    }
}
//配列の最大値
fn max<T: Ord>(v: &[T]) -> Option<&T> {
    if v.is_empty() {
        None
    } else {
        let mut max = &v[0];
        for x in &v[1..] {
            if x > max {
                max = x;
            }
        }
        Some(max)
    }
}
//配列の２番目に大きい値
fn second_largest<T: Ord>(v: &[T]) -> Option<&T> {
    if v.len() < 2 {
        None
    } else {
        let mut largest = &v[0];
        let mut second_largest = &v[1];
        if second_largest > largest {
            mem::swap(&mut largest, &mut second_largest);
        }
        for x in &v[2..] {
            if x > largest {
                second_largest = largest;
                largest = x;
            } else if x > second_largest {
                second_largest = x;
            }
        }
        Some(second_largest)
    }
}
//文字列のn文字目
fn nth_char(s: &str, n: usize) -> Option<char> {
    s.chars().nth(n)
}
//文字列の改行
fn split_at(s: &str, n: usize) -> Option<(&str, &str)> {
    let mut chars = s.chars();
    let mut i = 0;
    while i < n {
        match chars.next() {
            Some(_) => i += 1,
            None => return None,
        }
    }
    let mid = chars.as_str().as_ptr() as usize - s.as_ptr() as usize;
    Some((&s[..mid], &s[mid..]))
}
//1文字を繰り返して改行
fn repeat(c: char, n: usize) -> String {
    let mut s = String::new();
    for _ in 0..n {
        s.push(c);
    }
    s
}
//数値を繰り返したした値
fn repeat_generic<T>(x: T, n: usize) -> Vec<T>
    where T: Clone
{
    let mut v = Vec::new();
    for _ in 0..n {
        v.push(x.clone());
    }
    v
}
//文字列を繰り返した値
fn repeat_generic_string<T: ToString>(x: T, n: usize) -> String {
    let mut s = String::new();
    for _ in 0..n {
        s.push_str(&x.to_string());
    }
    s
}
//整数の階乗
fn factorial(n: u64) -> u64 {
    if n == 0 {
        1
    } else {
        n * factorial(n - 1)
    }
}
//数値列挙
fn range(start: i32, end: i32) -> Vec<i32> {
    let mut v = Vec::new();
    let mut i = start;
    while i < end {
        v.push(i);
        i += 1;
    }
    v
}
//文字列列挙
fn range_string(start: char, end: char) -> String {
    let mut s = String::new();
    let mut c = start;
    while c < end {
        s.push(c);
        c = (c as u8 + 1) as char;
    }
    s
}
//fizzbuzz
fn fizzbuzz(n: i32) -> String {
    let mut s = String::new();
    for i in 1..n + 1 {
        if i % 15 == 0 {
            s.push_str("FizzBuzz");
        } else if i % 3 == 0 {
            s.push_str("Fizz");
        } else if i % 5 == 0 {
            s.push_str("Buzz");
        } else {
            s.push_str(&i.to_string());
        }
        s.push(' ');
    }
    s
}
//素数判定
fn is_prime(n: u64) -> bool {
    if n < 2 {
        false
    } else {
        let mut i = 2;
        while i * i <= n {
            if n % i == 0 {
                return false;
            }
            i += 1;
        }
        true
    }
}
//二次元配列の和
fn sum_matrix(m: &Vec<Vec<i32>>) -> i32 {
    let mut sum = 0;
    for row in m {
        for &x in row {
            sum += x;
        }
    }
    sum
}
//二次元配列の転置
//&Vec<Vec<i32>>とは、Vec<Vec<i32>>への参照
fn transpose(m: &Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut t = Vec::new();
    for i in 0..m[0].len() {
        let mut row = Vec::new();
        for j in 0..m.len() {
            row.push(m[j][i]);
        }
        t.push(row);
    }
    t
}
//二次元配列の行列式
fn determinant(m: &Vec<Vec<i32>>) -> i32 {
    if m.len() == 2 {
      //[][]とは、配列の配列のこと
        m[0][0] * m[1][1] - m[0][1] * m[1][0]
    } else {
        let mut det = 0;
        for i in 0..m.len() {
            det += m[0][i] * cofactor(m, 0, i);
        }
        det
    }
}
//二次元配列の余因子
fn cofactor(m: &Vec<Vec<i32>>, row: usize, col: usize) -> i32 {
    let mut minor = Vec::new();
    for i in 0..m.len() {
        if i != row {
            let mut row = Vec::new();
            for j in 0..m.len() {
                if j != col {
                    row.push(m[i][j]);
                }
            }
            minor.push(row);
        }
    }
    let det = determinant(&minor);
    if (row + col) % 2 == 0 {
        det
    } else {
        -det
    }
}
//二次元配列の逆行列
fn inverse(m: &Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let det = determinant(m);
    let mut inv = Vec::new();
    for i in 0..m.len() {
        let mut row = Vec::new();
        for j in 0..m.len() {
            row.push(cofactor(m, j, i) / det);
        }
        inv.push(row);
    }
    inv
}
//二次元配列の掛け算
fn mul_matrix(m1: &Vec<Vec<i32>>, m2: &Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut m = Vec::new();
    for i in 0..m1.len() {
        let mut row = Vec::new();
        for j in 0..m2[0].len() {
            let mut sum = 0;
            for k in 0..m1[0].len() {
                sum += m1[i][k] * m2[k][j];
            }
            row.push(sum);
        }
        m.push(row);
    }
    m
}
//二次元配列の各行の和
fn sum_rows(m: &Vec<Vec<i32>>) -> Vec<i32> {
    let mut v = Vec::new();
    for row in m {
        let mut sum = 0;
        for &x in row {
            sum += x;
        }
        v.push(sum);
    }
    v
}
//配列の要素比較
fn compare_array(a: &[i32], b: &[i32]) -> bool {
    if a.len() != b.len() {
        false
    } else {
        for i in 0..a.len() {
            if a[i] != b[i] {
                return false;
            }
        }
        true
    }
}
//大文字を小文字に変換
fn to_lower(s: &str) -> String {
    let mut t = String::new();
    for c in s.chars() {
        if c.is_uppercase() {
            t.push(c.to_lowercase().next().unwrap());
        } else {
            t.push(c);
        }
    }
    t
}
//シングルバイト文字列の文字数
fn count_chars(s: &str) -> usize {
    let mut count = 0;
    for c in s.chars() {
        if c.len_utf8() == 1 {
            count += 1;
        }
    }
    count
}
//マルチバイトを含む文字列の文字数
fn count_chars2(s: &str) -> usize {
    let mut count = 0;
    for c in s.chars() {
        if c.len_utf8() > 1 {
            count += 1;
        }
    }
    count
}
//文字列の逆順
fn reverse(s: &str) -> String {
    let mut t = String::new();
    for c in s.chars().rev() {
        t.push(c);
    }
    t
}
//回文判定
fn is_palindrome(s: &str) -> bool {
    let mut t = String::new();
    for c in s.chars() {
        if c.is_alphanumeric() {
            t.push(c.to_lowercase().next().unwrap());
        }
    }
    t == reverse(&t)
}
//形式判定メールアドレス
fn is_email(s: &str) -> bool {
    let mut at = false;
    let mut dot = false;
    for c in s.chars() {
        if c == '@' {
            at = true;
        } else if c == '.' {
            dot = true;
        }
    }
    at && dot
}
//形式判定URL
fn is_url(s: &str) -> bool {
    let mut dot = false;
    for c in s.chars() {
        if c == '.' {
            dot = true;
        }
    }
    dot
}
//形式判定IPアドレス
fn is_ip(s: &str) -> bool {
    let mut count = 0;
    for c in s.chars() {
        if c == '.' {
            count += 1;
        }
    }
    count == 3
}
//形式判定日付
fn is_date(s: &str) -> bool {
    let mut count = 0;
    for c in s.chars() {
        if c == '/' {
            count += 1;
        }
    }
    count == 2
}
//形式判定時刻
fn is_time(s: &str) -> bool {
    let mut count = 0;
    for c in s.chars() {
        if c == ':' {
            count += 1;
        }
    }
    count == 1
}
//形式判定電話番号
fn is_phone(s: &str) -> bool {
    let mut count = 0;
    for c in s.chars() {
        if c == '-' {
            count += 1;
        }
    }
    count == 1
}
//形式判定郵便番号
fn is_zip(s: &str) -> bool {
    let mut count = 0;
    for c in s.chars() {
        if c == '-' {
            count += 1;
        }
    }
    count == 0
}
//形式判定カード番号
fn is_card(s: &str) -> bool {
    let mut count = 0;
    for c in s.chars() {
        if c == '-' {
            count += 1;
        }
    }
    count == 3
}
//2つの合計値がy以下になる全ての計算式の数
fn count_combinations(x: &[i32], y: i32) -> i32 {
    let mut count = 0;
    for i in 0..x.len() {
        for j in 0..x.len() {
            if x[i] + x[j] <= y {
                count += 1;
            }
        }
    }
    count
}
//2つの合計値がy以下になる全ての計算式の数
fn count_combinations2(x: &[i32], y: i32) -> i32 {
    let mut count = 0;
    for i in 0..x.len() {
        for j in i..x.len() {
            if x[i] + x[j] <= y {
                count += 1;
            }
        }
    }
    count
}
//公倍数の関数
fn lcm(x: i32, y: i32) -> i32 {
    let mut a = x;
    let mut b = y;
    while b != 0 {
        let r = a % b;
        a = b;
        b = r;
    }
    x * y / a
}
//最大公約数の関数
fn gcd(x: i32, y: i32) -> i32 {
    let mut a = x;
    let mut b = y;
    while b != 0 {
        let r = a % b;
        a = b;
        b = r;
    }
    a
}
//素数判定
fn is_prime(x: i32) -> bool {
    if x < 2 {
        return false;
    }
    for i in 2..x {
        if x % i == 0 {
            return false;
        }
    }
    true
}
//素数判定2
fn is_prime2(x: i32) -> bool {
    if x < 2 {
        return false;
    }
    for i in 2..(x as f64).sqrt() as i32 + 1 {
        if x % i == 0 {
            return false;
        }
    }
    true
}
//素因数分解
fn factorize(x: i32) -> Vec<i32> {
    let mut v = Vec::new();
    let mut n = x;
    for i in 2..x {
        while n % i == 0 {
            v.push(i);
            n /= i;
        }
    }
    v
}
//素因数分解の式が偶数になるか
fn is_even_factorize(x: i32) -> bool {
    let mut n = x;
    for i in 2..x {
        while n % i == 0 {
            n /= i;
        }
    }
    n == 1
}
//素因数分解の式が奇数になるか
fn is_odd_factorize(x: i32) -> bool {
    let mut n = x;
    for i in 2..x {
        while n % i == 0 {
            n /= i;
        }
    }
    n != 1
}
//階乗
fn factorial(x: i32) -> i32 {
    let mut n = 1;
    for i in 1..x + 1 {
        n *= i;
    }
    n
}
//階乗の和
fn factorial_sum(x: i32) -> i32 {
    let mut n = 0;
    for i in 1..x + 1 {
        n += factorial(i);
    }
    n
}
//配列から選ぶ組み合わせ
fn combination(x: &[i32], y: i32) -> i32 {
    let mut count = 0;
    for i in 0..x.len() {
        for j in i + 1..x.len() {
            if x[i] + x[j] == y {
                count += 1;
            }
        }
    }
    count
}
//配列から選ぶ組み合わせ
fn combination2(x: &[i32], y: i32) -> i32 {
    let mut count = 0;
    for i in 0..x.len() {
        for j in i + 1..x.len() {
            for k in j + 1..x.len() {
                if x[i] + x[j] + x[k] == y {
                    count += 1;
                }
            }
        }
    }
    count
}

//配列から選んで並び替え
fn permutation(x: &[i32], y: i32) -> i32 {
    let mut count = 0;
    for i in 0..x.len() {
        for j in 0..x.len() {
            for k in 0..x.len() {
                if x[i] + x[j] + x[k] == y {
                    count += 1;
                }
            }
        }
    }
    count
}
//配列から選んで並び替え
fn permutation2(x: &[i32], y: i32) -> i32 {
    let mut count = 0;
    for i in 0..x.len() {
        for j in 0..x.len() {
            for k in 0..x.len() {
                for l in 0..x.len() {
                    if x[i] + x[j] + x[k] + x[l] == y {
                        count += 1;
                    }
                }
            }
        }
    }
    count
}
//全ての順列
fn permutation_all(x: &[i32]) -> Vec<Vec<i32>> {
    let mut v = Vec::new();
    for i in 0..x.len() {
        for j in 0..x.len() {
            for k in 0..x.len() {
                for l in 0..x.len() {
                    v.push(vec![x[i], x[j], x[k], x[l]]);
                }
            }
        }
    }
    v
}

