package 1015
//2つの合計値がyになる関数
func sum(x, y int) (int, int) {
	 return y - x, x
}
//素数の判定の関数
func isPrime(x int) bool {
	 for i := 2; i < x; i++ {
		  if x%i == 0 {
				return false
		  }
	 }
	 return true
}
//素因数分解の関数
func primeFactorization(x int) []int {
	 var ret []int
	 for i := 2; i <= x; i++ {
		  for x%i == 0 {
				ret = append(ret, i)
				x /= i
		  }
	 }
	 return ret
}
//素数の列挙の関数
func primeList(x int) []int {
	 var ret []int
	 for i := 2; i <= x; i++ {
		  if isPrime(i) {
				ret = append(ret, i)
		  }
	 }
	 return ret
}
//階乗の関数
func factorial(x int) int {
	 ret := 1
	 for i := 2; i <= x; i++ {
		  ret *= i
	 }
	 return ret
}
//最大公約数の関数
func gcd(x, y int) int {
	 for y != 0 {
		  x, y = y, x%y
	 }
	 return x
}
//最小公倍数の関数
func lcm(x, y int) int {
	 return x * y / gcd(x, y)
}
//約数の列挙の関数
func divisor(x int) []int {
	 var ret []int
	 for i := 1; i*i <= x; i++ {
		  if x%i == 0 {
				ret = append(ret, i)
				if i*i != x {
					 ret = append(ret, x/i)
				}
		  }
	 }
	 return ret
}
//約数の個数の関数
func divisorCount(x int) int {
	 ret := 0
	 for i := 1; i*i <= x; i++ {
		  if x%i == 0 {
				ret++
				if i*i != x {
					 ret++
				}
		  }
	 }
	 return ret
}
//約数の和の関数
func divisorSum(x int) int {
	 ret := 0
	 for i := 1; i*i <= x; i++ {
		  if x%i == 0 {
				ret += i
				if i*i != x {
					 ret += x / i
				}
		  }
	 }
	 return ret
}
//約数の列挙の関数
func divisorList(x int) []int {
	 var ret []int
	 for i := 1; i*i <= x; i++ {
		  if x%i == 0 {
				ret = append(ret, i)
				if i*i != x {
					 ret = append(ret, x/i)
				}
		  }
	 }
	 return ret
}
//型エイリアス
type Int int
//オブジェクト型
type Int struct {
	 x int
}
//コンストラクタ
func NewInt(x int) Int {
	 return Int{x}
}
//配列の最小値の関数
func minArray(x []int) int {
	 ret := x[0]
	 for _, v := range x {
		  ret = min(ret, v)
	 }
	 return ret
}
//配列の最大値の関数
func maxArray(x []int) int {
	 ret := x[0]
	 for _, v := range x {
		  ret = max(ret, v)
	 }
	 return ret
}
//配列の和の関数
func sumArray(x []int) int {
	 ret := 0
	 for _, v := range x {
		  ret += v
	 }
	 return ret
}
//配列の積の関数
func productArray(x []int) int {
	 ret := 1
	 for _, v := range x {
		  ret *= v
	 }
	 return ret
}
//配列の２番目に大きい値の関数
func secondMaxArray(x []int) int {
	 ret := x[0]
	 ret2 := x[0]
	 for _, v := range x {
		  if ret < v {
				ret2 = ret
				ret = v
		  } else if ret2 < v {
				ret2 = v
		  }
	 }
	 return ret2
}
//配列の２番目に小さい値の関数
func secondMinArray(x []int) int {
	 ret := x[0]
	 ret2 := x[0]
	 for _, v := range x {
		  if ret > v {
				ret2 = ret
				ret = v
		  } else if ret2 > v {
				ret2 = v
		  }
	 }
	 return ret2
}
//配列のソートの関数
func sortArray(x []int) []int {
	 sort.Ints(x)
	 return x
}
//文字列を改行する関数
func splitString(x string) []string {
	 return strings.Split(x, "

")
}
//文字列をスペースで分割する関数
func splitStringSpace(x string) []string {
	 return strings.Split(x, " ")
}
//文字列をスライスにする関数
func splitStringSlice(x string) []string {
	 return strings.Split(x, "")
}
//数値を繰り返したした関数
func repeatString(x string, y int) string {
	 return strings.Repeat(x, y)
}
//文字列を結合する関数
func joinString(x []string, y string) string {
	 return strings.Join(x, y)
}
//整数の１の位
func ones(x int) int {
	 return x % 10
}
//整数の１０の位
func tens(x int) int {
	 return x / 10 % 10
}
//整数の１００の位
func hundreds(x int) int {
	 return x / 100 % 10
}	
//配列をコピーして、新しい配列を返す関数
func copyArray(x []int) []int {
	 y := make([]int, len(x))
	 copy(y, x)
	 return y
}
//配列の中に要素を追加して、新しい配列を作成する関数
func appendArray(x []int, y int) []int {
	 z := make([]int, len(x)+1)
	 copy(z, x)
	 z[len(x)] = y
	 return z
}
//２つの配列を結合して、新しい配列を作成する関数
func concatArray(x []int, y []int) []int {
	 z := make([]int, len(x)+len(y))
	 copy(z, x)
	 copy(z[len(x):], y)
	 return z
}
//配列の中に要素があるかどうかを判定する関数
func containsArray(x []int, y int) bool {
	 for _, v := range x {
		  if v == y {
				return true
		  }
	 }
	 return false
}
//配列の中に要素があるかどうかを判定する関数
func containsArrayString(x []string, y string) bool {
	 for _, v := range x {
		  if v == y {
				return true
		  }
	 }
	 return false
}
//配列の中に要素があるかどうかを判定する関数
func containsArrayRune(x []rune, y rune) bool {
	 for _, v := range x {
		  if v == y {
				return true
		  }
	 }
	 return false
}
//配列オブジェクトのマージ
func mergeArray(x []int, y []int) []int {
	 return append(x, y...)
}
//配列の中に要素があるかどうかを判定する関数
func containsArrayInt(x []Int, y Int) bool {
	 for _, v := range x {
		  if v == y {
				return true
		  }
	 }
	 return false
}
//アラートを表示する関数
func alert(x string) {
	 fmt.Println(x)
}
//動作確認アラートを表示する関数
func alertTest(x string) {
	 fmt.Println(x)
}
//配列の中に要素があるかどうかを判定する関数
func containsArrayString(x []string, y string) bool {
	//_,とは、インデックスを返すが、インデックスは使わないという意味
	 for _, v := range x {
		  if v == y {
				return true
		  }
	 }
	 return false
}
//配列から選んで並び替えた中身を返す関数
func selectArray(x []int, y []int) []int {
	 z := []int{}
	 for _, v := range y {
		  z = append(z, x[v])
	 }
	 return z
}
//全ての順列を返す関数
func permutationArray(x []int) [][]int {
	 return permutation(x)
}
//配列から同じ数値を２つ選ぶ場合の数を返す関数
func combinationArray(x []int) [][]int {
	 return combination(x)
}
//サイコロの出目の総和を返す関数
func diceSum(x int) int {
	 return x * 7
}
//サイコロの出目が等しくなる確率を返す関数
func diceEqual(x int) float64 {
	 return 1 / float64(x)
}
//サイコロの出目が等しくならない確率を返す関数
func diceNotEqual(x int) float64 {
	 return 1 - diceEqual(x)
}
//サイコロの出目が等しくなる確率を返す関数
func diceEqual(x int) float64 {
	 return 1 / float64(x)
}
//サイコロの出目が等しくならない確率を返す関数
func diceNotEqual(x int) float64 {
	 return 1 - diceEqual(x)
}
//2で割り切れるかどうかを判定する関数
func isEven(x int) bool {
	 return x%2 == 0
}
//2で割り切れないかどうかを判定する関数
func isOdd(x int) bool {
	 return x%2 == 1
}
//配列の中に要素があるかどうかを判定する関数
func containsArrayInt(x []Int, y Int) bool {
	 for _, v := range x {
		  if v == y {
				return true
		  }
	 }
	 return false
}
//配列の中に要素があるかどうかを判定する関数
func containsArrayString(x []string, y string) bool {
	 for _, v := range x {
		  if v == y {
				return true
		  }
	 }
	 return false
}
//コンマの数を返す関数
func countComma(x string) int {
	 return strings.Count(x, ",")
}
//2進数のビット反転を返す関数
func bitReverse(x int) int {
	 return ^x
}
//２進数の２の補数を返す関数
func bitComplement(x int) int {
	 return ^x + 1
}
//２進数のビット反転を返す関数
func bitReverse(x int) int {
	 return ^x
}
//xかつyの倍数を返す関数
func multiple(x int, y int) int {
	 return x * y
}
//線形探索を行う関数
func linearSearch(x []int, y int) int {
	 for i, v := range x {
		  if v == y {
				return i
		  }
	 }
	 return -1
}
//2進数を10進数に変換する関数
func binaryToDecimal(x string) int {
	 i, _ := strconv.ParseInt(x, 2, 64)
	 return int(i)
}
//10進数を2進数に変換する関数
func decimalToBinary(x int) string {
	 return strconv.FormatInt(int64(x), 2)
}
//最大値と最小値を返す関数
//５より大きく２０より小さい数を返す関数
func between(x int, y int, z int) int {
	 if x < y && y < z {
		  return y
	 }
	 return 0
}
// １からnまたはnから１までの和を返す関数
func sum(x int) int {
	 return (x + 1) * x / 2
}

