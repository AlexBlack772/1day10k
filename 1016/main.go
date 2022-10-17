//数を２倍にする関数
func double(x int) int {
	return x * 2
}
//数を３倍にする関数
func triple(x int) int {
	return x * 3
}
//引数の最後の文字を消す関数
func removeLastChar(s string) string {
	return s[:len(s)-1]
}
//引数の最初の文字を消す関数
func removeFirstChar(s string) string {
	return s[1:]
}
//引数の文字を大文字にする関数
func toUpper(s string) string {
	return strings.ToUpper(s)
}
//引数の文字を小文字にする関数
func toLower(s string) string {
	return strings.ToLower(s)
}
//引数の文字を逆にする関数
func reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
//引数の文字をランダムにする関数
func shuffle(s string) string {
	r := []rune(s)
	for i := range r {
		j := rand.Intn(i + 1)
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
//引数の文字をランダムにする関数
func shuffle2(s string) string {
	r := []rune(s)
	for i := len(r) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
//引数の文字をランダムにする関数
func shuffle3(s string) string {
	r := []rune(s)
	for i := len(r) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
//オブジェクトのnameプロパティを削除する
func removeNameProperty(m map[string]interface{}) map[string]interface{} {
	delete(m, "name")
	return m
}
//空の配列を定義する
func emptyArray() []int {
	return []int{}
}
//配列の２番目の要素をログで出力する
func logSecondElement(array []int) {
	fmt.Println(array[1])
}
//配列の２番目の要素を削除する
func removeSecondElement(array []int) []int {
	return append(array[:1], array[2:]...)
}
//配列の最後の要素を削除する
func removeLastElement(array []int) []int {
	return array[:len(array)-1]
}
//
