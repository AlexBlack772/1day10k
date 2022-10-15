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
//
