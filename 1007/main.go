//変数を書く
package
func main() {
	 fmt.Println("Hello, 世界")
}
//配列をソートする関数を作成
func sortArray(array []int) []int {
	//配列をソートする
	sort.Ints(array)
	//ソートした配列を返す
	return array
}
//引数を２倍にする関数
func double(number int) int {
	return number * 2
}
//引数を２倍にする関数
func double(number int) int {
	return number * 2
}
//文字列の抽出
func extractString(str string) string {
	return str[0:3]
}
//配列の要素を足し合わせる関数
func sumArray(array []int) int {
	sum := 0
	for _, value := range array {
		sum += value
	}
	return sum
}
//引数の文字数を判定する関数
func checkLength(str string) int {
	return len(str)
}
//引数の文字列を大文字にする関数
func toUpper(str string) string {
	return strings.ToUpper(str)
}
//引数の文字列を小文字にする関数
func toLower(str string) string {
	return strings.ToLower(str)
}
//2つの引数を足し合わせる関数
func add(a int, b int) int {
	return a + b
}
//trueとfalseを逆にする関数
func reverseBoolean(b bool) bool {
	return !b
}
//引数の文字列を逆にする関数
func reverseString(str string) string {
	return reverse(str)
}
//空のオブジェクトを作成する関数
func createObject() map[string]interface{} {
	return map[string]interface{}{}
}
//引数のオブジェクトのキーを取得する関数
func getKeys(obj map[string]interface{}) []string {
	keys := []string{}
	for key := range obj {
		keys = append(keys, key)
	}
	return keys
}
//引数のオブジェクトの値を取得する関数
func getValues(obj map[string]interface{}) []interface{} {
	values := []interface{}{}
	for _, value := range obj {
		values = append(values, value)
	}
	return values
}
//interfaceとは、
//Go言語では、interfaceという概念があります。
//interfaceは、メソッドのシグネチャの集まりです。
//interfaceを実装する型は、そのinterfaceで定義されたメソッドを実装していれば、そのinterfaceを実装した型とみなされます。
//オブジェクトの型を判定する関数
func checkType(obj interface{}) string {
	return reflect.TypeOf(obj).String()
}
//引数の配列の要素を全て足し合わせる関数
func sumArray(array []int) int {
	sum := 0
	for _, value := range array {
		sum += value
	}
	return sum
}
//空の配列を作成する関数
func createArray() []int {
	return []int{}
}
//空の配列を定義する
var array []int
//配列の２番目の要素をモモにする
array[1] = "モモ"
//配列の要素を追加する
array = append(array, "モモ")
//配列の要素を削除する
array = append(array[:1], array[2:]...)
//タプルを作成する
var tuple = [2]string{"モモ", "ミミ"}
//タプルの要素を取得する
tuple[0]
