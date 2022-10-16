package 1015
//文字列の分割の関数
func split(s string, sep string) []string {
	 var ret []string
	 var i int
	 for {
		  j := strings.Index(s[i:], sep)
		  if j == -1 {
				break
		  }
		  ret = append(ret, s[i:i+j])
		  i += j + len(sep)
	 }
	 ret = append(ret, s[i:])
	 return ret
}
//配列の中身を表示する関数
func printSlice(s []string) {
	 fmt.Printf("len=%d cap=%d %v

", len(s), cap(s), s)
}
//文字列の結合の関数
func join(s []string, sep string) string {
	 var ret string
	 for i, v := range s {
		  if i > 0 {
				ret += sep
		  }
		  ret += v
	 }
	 return ret
}
//2つの配列の中身を比較する関数
func equal(x, y []string) bool {
	 if len(x) != len(y) {
		  return false
	 }
	 for i := range x {
		  if x[i] != y[i] {
				return false
		  }
	 }
	 return true
}
//文字列の抽出の関数
func slice(s string, low, high int) string {
	 if low < 0 {
		  low = 0
	 }
	 if high > len(s) {
		  high = len(s)
	 }
	 return s[low:high]
}
//文字列の置換の関数
func replace(s, old, new string) string {
	 var ret string
	 for i := 0; i < len(s); {
		  if strings.HasPrefix(s[i:], old) {
				ret += new
				i += len(old)
		  } else {
				ret += string(s[i])
				i++
		  }
	 }
	 return ret
}
//引数を+1する関数
func inc(x int) int {
	 return x + 1
}
//引数を-1する関数
func dec(x int) int {
	 return x - 1
}
//引数を2倍する関数
func double(x int) int {
	 return x * 2
}
//引数の文字数を判定する関数
func count(s string) int {
	 return len(s)
}
//空の配列を定義する
var empty []string
//配列の最初の要素を削除する
func removeFirst(s []string) []string {
	 return s[1:]
}
//配列の３番目の要素を削除する
func removeThird(s []string) []string {
	 return append(s[:2], s[3:]...)
}
//配列の最後の要素を削除する
func removeLast(s []string) []string {
	 return s[:len(s)-1]
}
//配列の最初の要素を追加する
func addFirst(s []string, e string) []string {
	 return append([]string{e}, s...)
}
//配列の３番目の要素を追加する
func addThird(s []string, e string) []string {
	 return append(s[:2], append([]string{e}, s[2:]...)...)
}
//配列の最後の要素を追加する
func addLast(s []string, e string) []string {
	 return append(s, e)
}
//配列の逆順にする
func reverse(s []string) []string {
	 var ret []string
	 for i := len(s) - 1; i >= 0; i-- {
		  ret = append(ret, s[i])
	 }
	 return ret
}
//配列の要素をシャッフルする
func shuffle(s []string) []string {
	 var ret []string
	 for len(s) > 0 {
		  i := rand.Intn(len(s))
		  ret = append(ret, s[i])
		  s = append(s[:i], s[i+1:]...)
	 }
	 return ret
}
//配列の要素をソートする
func sort(s []string) []string {
	 sort.Strings(s)
	 return s
}
//配列ないの要素を重複を除いてソートする
func uniq(s []string) []string {
	 sort.Strings(s)
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//配列の要素を重複を除いてソートする
func uniq2(s []string) []string {
	 sort.Strings(s)
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//配列オブジェクト定義する
type array []string
//配列の要素を重複を除いてソートする
func (s array) uniq() array {
	 sort.Strings(s)
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//非破壊的な配列の要素を重複を除いてソートする
func (s array) uniq2() array {
	 sort.Strings(s)
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//非破壊的繰り返しpush
func (s array) push(e string) array {
	 return append(s, e)
}
//非破壊的繰り返しpop
func (s array) pop() (array, string) {
	 return s[:len(s)-1], s[len(s)-1]
}
//非破壊的繰り返しshift
func (s array) shift() (array, string) {
	 return s[1:], s[0]
}
//非破壊的繰り返しunshift
func (s array) unshift(e string) array {
	 return append([]string{e}, s...)
}
//非破壊的繰り返しreverse
func (s array) reverse() array {
	 var ret []string
	 for i := len(s) - 1; i >= 0; i-- {
		  ret = append(ret, s[i])
	 }
	 return ret
}
//非破壊的繰り返しshuffle
func (s array) shuffle() array {
	 var ret []string
	 for len(s) > 0 {
		  i := rand.Intn(len(s))
		  ret = append(ret, s[i])
		  s = append(s[:i], s[i+1:]...)
	 }
	 return ret
}
//非破壊的繰り返しsort
func (s array) sort() array {
	 sort.Strings(s)
	 return s
}
//非破壊的繰り返しuniq
func (s array) uniq3() array {
	 sort.Strings(s)
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//非破壊的繰り返しuniq
func (s array) uniq4() array {
	 sort.Strings(s)
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//非破壊的fill
func (s array) fill(e string) array {
	 for i := 0; i < len(s); i++ {
		  s[i] = e
	 }
	 return s
}
//var排除する
func (s array) var() array {
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if s[i] != "var" {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//配列の最小値を返す
func (s array) min() string {
	 sort.Strings(s)
	 return s[0]
}
//配列の最大値を返す
func (s array) max() string {
	 sort.Strings(s)
	 return s[len(s)-1]
}
//配列の要素を重複を除いてソートする
func (s array) uniq5() array {
	 sort.Strings(s)
	 var ret []string
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//配列の２番目に小さい値を返す
func (s array) second() string {
	 sort.Strings(s)
	 return s[1]
}
//配列の３番目に小さい値を返す
func (s array) third() string {
	 sort.Strings(s)
	 return s[2]
}
//文字列のn文字目の文字を返す
func (s array) charAt(n int) string {
	 return string(s[n])
}
//文字列を改行する関数
func (s array) nl() string {
	 return string(s) + "

"
}
//文字列を改行する関数
func (s array) nl2() string {
	 return string(s) + "

"
}
//数値を繰り返したした値
func (s array) repeat(n int) string {
	 var ret string
	 for i := 0; i < n; i++ {
		  ret += string(s)
	 }
	 return ret
}
//整数の桁数
func (s array) digit() int {
	 return len(s)
}
//整数の階乗
func (s array) factorial() int {
	 n, _ := strconv.Atoi(string(s))
	 if n == 0 {
		  return 1
	 }
	 return n * array(strconv.Itoa(n-1)).factorial()
}
//整数の階乗
func (s array) factorial2() int {
	 n, _ := strconv.Atoi(string(s))
	 if n == 0 {
		  return 1
	 }
	 return n * array(strconv.Itoa(n-1)).factorial()
}
//数値列挙1-100する関数
func (s array) range() array {
	 var ret []string
	 for i := 0; i < 100; i++ {
		  ret = append(ret, strconv.Itoa(i))
	 }
	 return ret
}
//数値列挙1-100する関数
func (s array) range2() array {
	 var ret []string
	 for i := 0; i < 100; i++ {
		  ret = append(ret, strconv.Itoa(i))
	 }
	 return ret
}
//文字列列挙a~zする関数
func (s array) range3() array {
	 var ret []string
	 for i := 97; i < 123; i++ {
		  ret = append(ret, string(i))
	 }
	 return ret
}
//fizzbuzzする関数
func (s array) fizzbuzz() array {
	 var ret []string
	 for i := 1; i < 101; i++ {
		  if i%15 == 0 {
				ret = append(ret, "FizzBuzz")
		  } else if i%3 == 0 {
				ret = append(ret, "Fizz")
		  } else if i%5 == 0 {
				ret = append(ret, "Buzz")
		  } else {
				ret = append(ret, strconv.Itoa(i))
		  }
	 }
	 return ret
}
//配列の要素を重複を除いてソートする
func (s array) uniq6() array {
//二次元配列の和を求める
func (s array) sum() int {
	 var ret int
	 for i := 0; i < len(s); i++ {
		  ret += s[i]
	 }
	 return ret
}
//二次元配列の積を求める
func (s array) product() int {
	 var ret int
	 for i := 0; i < len(s); i++ {
		  ret *= s[i]
	 }
	 return ret
}
//二次元配列の最小値を求める
func (s array) min2() int {
	 sort.Ints(s)
	 return s[0]
}
//二次元配列の最大値を求める
func (s array) max2() int {
	 sort.Ints(s)
	 return s[len(s)-1]
}
//二次元配列の要素を重複を除いてソートする
func (s array) uniq7() array {
	 sort.Ints(s)
	 var ret []int
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//二次元配列の２番目に小さい値を求める
func (s array) second2() int {
	 sort.Ints(s)
	 return s[1]
}
//二次元配列の３番目に小さい値を求める
func (s array) third2() int {
	 sort.Ints(s)
	 return s[2]
}
//二次元配列の要素を重複を除いてソートする
func (s array) uniq8() array {
	 sort.Ints(s)
	 var ret []int
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//二次元配列の２番目に小さい値を求める
func (s array) second3() int {
	 sort.Ints(s)
	 return s[1]
}
//二次元配列の３番目に小さい値を求める
func (s array) third3() int {
	 sort.Ints(s)
	 return s[2]
}
//二次元配列の要素を重複を除いてソートする
func (s array) uniq9() array {
	 sort.Ints(s)
	 var ret []int
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//二次元配列の２番目に小さい値を求める
func (s array) second4() int {
	 sort.Ints(s)
	 return s[1]
}
//二次元配列の３番目に小さい値を求める
func (s array) third4() int {
	 sort.Ints(s)
	 return s[2]
}
//二次元配列の要素を重複を除いてソートする
func (s array) uniq10() array {
	 sort.Ints(s)
	 var ret []int
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append

ret, s[i])
//二次元配列の２番目に小さい値を求める
func (s array) second5() int {
	 sort.Ints(s)
	 return s[1]
}
//二次元配列の３番目に小さい値を求める
func (s array) third5() int {
	 sort.Ints(s)
	 return s[2]
}
//二次元配列の要素を重複を除いてソートする
func (s array) uniq11() array {
	 sort.Ints(s)
	 var ret []int
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//二次元配列の２番目に小さい値を求める
func (s array) second6() int {
	 sort.Ints(s)
	 return s[1]
}
//二次元配列の３番目に小さい値を求める
func (s array) third6() int {
	 sort.Ints(s)
	 return s[2]
}
//二次元配列の要素を重複を除いてソートする
func (s array) uniq12() array {
	 sort.Ints(s)
	 var ret []int
	 for i := 0; i < len(s); i++ {
		  if i == 0 || s[i-1] != s[i] {
				ret = append(ret, s[i])
		  }
	 }
	 return ret
}
//二次元配列の２番目に小さい値を求める
func (s array) second7() int {
	 sort.Ints(s)
	 return s[1]
}
//二次元配列の３番目に小さい値を求める
func (s array) third7() int {
	 sort.Ints(s)
	 return s[2]
}
//２つの合計がyになる計算式の関数
func 