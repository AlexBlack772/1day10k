//一つの文字列を置換
function replaceString(str, before, after) {
   return str.replace(before, after);
}
console.log(replaceString('Hello World', 'World', 'JavaScript'));
//全ての文字列を置換
function replaceAllString(str, before, after) {
   return str.split(before).join(after);
}
//文字列を分割
function splitString(str, separator) {
   return str.split(separator);
}
//文字列を結合
function joinString(strArray, separator) {
   return strArray.join(separator);
}
//文字列を反転
function reverseString(str) {
   return str.split('').reverse().join('');
}
//文字列をソート
function sortString(str) {
   return str.split('').sort().join('');
}
//文字列をソート(逆順)
function sortStringReverse(str) {
   return str.split('').sort().reverse().join('');
}
//文字列をソート(大文字小文字区別なし)
function sortStringIgnoreCase(str) {
   return str.split('').sort(function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
   }).join('');
}
//文字列をソート(大文字小文字区別なし、逆順)
function sortStringIgnoreCaseReverse(str) {
   return str.split('').sort(function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
   }).reverse().join('');
}
//文字列の配列化
function stringToArray(str) {
   return str.split('');
}
//文字列の抽出
function substring(str, start, end) {
   return str.substring(start, end);
}
//文字列の抽出(左から)
function leftString(str, length) {
   return str.substring(0, length);
}
//引数を2倍にする関数
function double(x) {
   return x * 2;
}
//引数を3倍にする関数
function triple(x) {
   return x * 3;
}
//ひきすうを2乗する関数
function square(x) {
   return x * x;
}
//引数文字列の長さを返す関数
function stringLength(x) {
   return x.length;
}
//引数が文字列か判定する関数
function isString(x) {
   return typeof x === 'string';
}
//引数の最初の文字を返す関数
function firstCharacter(x) {
   return x.charAt(0);
}
//引数の最後の文字を返す関数
function lastCharacter(x) {
   return x.charAt(x.length - 1);
}
//引数の配列の長さを返す関数
function arrayLength(x) {
   return x.length;
}
//trueとfalseを入れ替える関数
function not1(x) {
   return !x;
}
const not2 = x => !x;
//引数が偶数か判定する関数
const isEven = x => x % 2 === 0;
//firebaseでパスワード認証
/*
firebase.auth().signInWithEmailAndPassword(email, password).then(() => { }).catch((error) => { });
//firebaseでメールアドレス認証
firebase.auth().createUserWithEmailAndPassword(email, password).then(() => { }).catch((error) => { });
//firebaseでログアウト
firebase.auth().signOut().then(() => { }).catch((error) => { });
//firebaseでログイン状態の監視
firebase.auth().onAuthStateChanged((user) => { });
//firebaseでログイン状態の取得
firebase.auth().currentUser;
//firebaseでsnsログイン
firebase.auth().signInWithRedirect(provider).then(() => { }).catch((error) => { });
//firebaseでsnsログインのリダイレクト
firebase.auth().getRedirectResult().then((result) => { }).catch((error) => { });
//auth().onAuthStateChanged
firebase.auth().onAuthStateChanged((user) => { });
//firebaseでユーザープロフィールの更新
firebase.auth().currentUser.updateProfile({ displayName: 'name', photoURL: 'url' }).then(() => { })
//firebaseでユーザープロフィールの取得
firebase.auth().currentUser.displayName;
firebase.auth().currentUser.photoURL;
//cloudfucntionでのユーザー作成
exports.createUser = functions.auth.user().onCreate((user) => { });
//cloudfucntionでのユーザー削除
exports.deleteUser = functions.auth.user().onDelete((user) => { });
//cloudfucntionでのユーザー更新
exports.updateUser = functions.auth.user().onUpdate((change) => { });
//cloudfunctionでのデータベースの作成
exports.createDatabase = functions.database.ref('/path').onCreate((snapshot, context) => { });
//cloudfunctionでのデータベースの削除
exports.deleteDatabase = functions.database.ref('/path').onDelete((snapshot, context) => { });
//cloudfunctionでのデータベースの更新
exports.updateDatabase = functions.database.ref('/path').onUpdate((change, context) => { });
//firebaseのauthでuserの更新を作成
firebase.auth().currentUser.updateProfile({ displayName: 'name', photoURL: 'url' }).then(() => { })
//firebaseのauthでuserの更新を削除
firebase.auth().currentUser.delete().then(() => { })
//authのuserのemailを更新
firebase.auth().currentUser.updateEmail('email').then(() => { })
//user.semdEmailVerificationでメールを送信
firebase.auth().currentUser.sendEmailVerification().then(() => { })  
//user.sendPasswordResetEmailでパスワードリセットメールを送信
firebase.auth().sendPasswordResetEmail('email').then(() => { })
//firestoreにデータを追加
db.collection('collection').add({ name: 'name', age: 20 })
//firestoreにデータを追加(ドキュメント指定));
db.collection('collection').doc('document').set({ name: 'name', age: 20 })
//firestoreのデータを取得document
db.collection('collection').doc('document').get().then((doc) => { })
//firestoreのデータを取得collection
db.collection('collection').get().then((snapshot) => { })
//firestore whereでデータを取得
db.collection('collection').where('name', '==', 'name').get().then((snapshot) => { })
//firestore orderByでデータを取得
db.collection('collection').orderBy('name').get().then((snapshot) => { })
//firestore limitでデータを取得
db.collection('collection').limit(1).get().then((snapshot) => { })
//firestore startAtでデータを取得
db.collection('collection').startAt('name').get().then((snapshot) => { })
//firestore endAtでデータを取得
db.collection('collection').endAt('name').get().then((snapshot) => { })
//firestore startAfterでデータを取得
db.collection('collection').startAfter('name').get().then((snapshot) => { })
//firestore endBeforeでデータを取得
db.collection('collection').endBefore('name').get().then((snapshot) => { })
//subcollectionのデータを取得
db.collection('collection').doc('document').collection('subcollection').get().then((snapshot) => { })
//collectionGroupでデータを取得
db.collectionGroup('collection').get().then((snapshot) => { })
//batch()で複数の処理をまとめる
const batch = db.batch();
batch.set(db.collection('collection').doc('document'), { name: 'name', age: 20 });
batch.commit().then(() => { })
//onsnapshotでデータを監視
db.collection('collection').onSnapshot((snapshot) => { })
//enablePersistenceでオフラインでのデータの取得
db.enablePersistence().catch((err) => { })
//runTransactionでトランザクションを実行
db.runTransaction((transaction) => {
   return transaction.get(db.collection('collection').doc('document')).then((doc) => {
      transaction.update(db.collection('collection').doc('document'), { name: 'name', age: 20 });
   });
})
//全文検索
db.collection('collection').where('name', '==', 'name').get().then((snapshot) => { })
//fireStoreApi
//firebase セキュリティルール
/*
service cloud.firestore {
   match / databases / { database } / documents {
      match / { document = ** } {
         allow read, write: if request.auth.uid != null;
      }
   }
}*/
//firebaseのセキュリティルール ログイン制御
/*
service cloud.firestore {
   match / databases / { database } / documents {
      match / cities / { city } {
         allow read: if request.auth.uid != null;
      }
   }
}*/
//firebaseのセキュリティルール データ検証
/*
service cloud.firestore {
   match / databases / { database } / documents {
      match / cities / { city } {
      
         allow read: if request.data.name == 'name';
      }
   }
}*/
//firestoreトリガー

//const functions = require('firebase-functions');
/*
exports.helloWorld = functions.firestore.document('cities/{cityId}').onCreate((snap, context) => {
   console.log('Hello logs!', context.params.cityId, snap.data());
})*/
//ド モルガンの法則を使用して、複数の条件を組み合わせる
const isShow = (data) => {
   return data.name == 'name' && data.age == 20;
}
//配列の2番目に小さい値
const secondSmallest = (arr) => {
   let first = arr[0];
   let second = arr[1];
   for (let i = 2; i < arr.length; i++) {
      if (arr[i] < first) {
         second = first;
         first = arr[i];
      } else if (arr[i] < second) {
         second = arr[i];
      }
   }
   return second;
}
//文字列のn文字目
const nthChar = (str, n) => {
   return str.slice(n - 1, n);
}  
//文字列を改行
const splitLines = (str) => {
   return str.split('');
}
//数値を繰り返した値
const repeat = (str, n) => {
   return str.repeat(n);
}
//文字列を逆順に
const reverseString2 = (str) => {
   return str.split('').reverse().join('');
}
//文字列の最初の文字を大文字に
const capitalize = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
}
//数値を繰り返し足した値
const repeat1 = (str, n) => {
   return str.repeat(n);
}
//整数の階乗
const factorial = (n) => {
   return n ? n * factorial(n - 1) : 1;
}
//n番目のフィボナッチ数
const fibonacci = (n) => {
   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
//m分n秒
const minutesToSeconds = (m) => {
   return m * 60;
}
//二次元配列の指定要素
const nthElement = (arr, n) => {
   return arr.flat()[n];
}
//シングルバイト文字列の文字数
const countChars = (str) => {
   return str.length;
}
//形式判定: yyyy-mm-dd
const isDate = (str) => {
   return /^\d{4}-\d{2}-\d{2}$/.test(str);
}
//形式判定: yyyy-mm-dd hh:mm:ss
const isDate1 = (str) => {
   return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str);
}
//形式判定: メールアドレス
const isEmail = (str) => {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}
//形式判定: 郵便番号
const isZipCode = (str) => {
   return /^\d{3}-\d{4}$/.test(str);
}
//形式判定: URL
const isUrl = (str) => {
   return /^(http|https):\/\/[^\s]+$/.test(str);
}
//形式判定: 半角英数字
const isAlphanumeric = (str) => {
   return /^[a-z0-9]+$/i.test(str);
}
//形式判定: 半角英字
const isAlpha = (str) => {
   return /^[a-z]+$/i.test(str);
}
//形式判定: 半角数字
const isNumeric = (str) => {
   return /^[0-9]+$/.test(str);
}
//2つの真偽値の論理積
const and = (a, b) => {
   return a && b;
}
//2つの真偽値の論理和
const or = (a, b) => {
   return a || b;
}
//2つの真偽値の排他的論理和
const xor = (a, b) => {
   return a != b;
}
//真偽値の否定
const not = (a) => {
   return !a;
}
//2つの真偽値の否定論理積
const nand = (a, b) => {
   return !(a && b);
}
//2つの真偽値の否定論理和
const nor = (a, b) => {
   return !(a || b);
}
//2つの真偽値の否定排他的論理和
const xnor = (a, b) => {
   return a == b;
}
//半加算器
const halfAdder = (a, b) => {

   return [a != b, a && b];
}
//全加算器
const fullAdder = (a, b, c) => {
   const [s1, c1] = halfAdder(a, b);
   const [s2, c2] = halfAdder(s1, c);
   return [s2, c1 || c2];
}
//2進数の加算
const addBinary = (a, b) => {
   return (a + b).toString(2);
}
//2進数の減算
const subtractBinary = (a, b) => {
   return (a - b).toString(2);
}
//2進数の乗算
const multiplyBinary = (a, b) => {
   return (a * b).toString(2);
}
//最も利益の出る購入株価
const maxProfit = (arr) => {
   let max = 0;
   let min = arr[0];
   for (let i = 1; i < arr.length; i++) {
      min = Math.min(min, arr[i]);
      max = Math.max(max, arr[i] - min);
   }
   return max;
}
console.log(maxProfit([7, 1,]));
//購入後の所持金
const getChange = (price, amount) => {
   return amount - price;
}
//2つの要素の和
const sum = (arr) => {
   return arr.reduce((a, b) => a + b, 0);
}
//2つの要素の差
const difference = (arr) => {
   return arr.reduce((a, b) => a - b);
}
//2つの要素の積
const product = (arr) => {
   return arr.reduce((a, b) => a * b);
}
//2つの要素の商

const quotient = (arr) => {
   return arr.reduce((a, b) => a / b);
}
//2つの要素の余り
const remainder = (arr) => {
   return arr.reduce((a, b) => a % b);
}
//2つの要素の最大公約数
const gcd = (arr) => {
   const [a, b] = arr;
   return b ? gcd([b, a % b]) : a;
}
//2つの要素の最小公倍数
const lcm = (arr) => {
   const [a, b] = arr;
   return (a * b) / gcd(arr);
}
//配列の要素をランダムに並び替える
const shuffle = (arr) => {
   return arr.sort(() => Math.random() - 0.5);
}
//配列の要素をランダムに取得する
const sample = (arr) => {
   return arr[Math.floor(Math.random() * arr.length)];
}
//xまたはyの約数
const divisors = (x, y) => {

   const arr = [];
   for (let i = 1; i <= Math.min(x, y); i++) {
      if (x % i === 0 && y % i === 0) {
         arr.push(i);
      }
   }
   return arr;
}
//xの約数
const divisorsOf = (x) => {
   const arr = [];
   for (let i = 1; i <= x; i++) {
      if (x % i === 0) {
         arr.push(i);
      }
   }
   return arr;
}
//xの素因数
const primeFactors = (x) => {
   const arr = [];
   for (let i = 2; i <= x; i++) {
      while (x % i === 0) {
         arr.push(i);
         x /= i;
      }
   }
   return arr;
}
primeFactors(100);
//xの素数判定
const isPrime = (x) => {
   return x === 2 || x > 2 && x % 2 && !divisorsOf(x).slice(2).some((v) => x % v === 0);
}
console.log(isPrime(1));
//xの階乗
const factorial1 = (x) => {

   return x < 2 ? 1 : x * factorial(x - 1);
}
//xの階乗の和
const sumOfFactorial = (x) => {

   return x < 2 ? 1 : x * sumOfFactorial(x - 1) + factorial(x);
}
//xの階乗の差

const differenceOfFactorial = (x) => {
   return x < 2 ? 1 : x * differenceOfFactorial(x - 1) - factorial(x);
}
//xの階乗の積
const productOfFactorial = (x) => {
   return x < 2 ? 1 : x * productOfFactorial(x - 1) * factorial(x);
}
//xの階乗の商
const quotientOfFactorial = (x) => {
   return x < 2 ? 1 : x * quotientOfFactorial(x - 1) / factorial(x);
}
//xの階乗の余り
const remainderOfFactorial = (x) => {
   return x < 2 ? 1 : x * remainderOfFactorial(x - 1) % factorial(x);

}
//リニアサーチ
const linearSearch = (arr, x) => {
   return arr.indexOf(x);
}
//バイナリサーチ
const binarySearch = (arr, x) => {
   let left = 0;
   let right = arr.length - 1;
   while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === x) {
         return mid;
      } else if (arr[mid] < x) {
         left = mid + 1;
      } else {
         right = mid - 1;
      }
   }
   return -1;
}
binarySearch([1, 2, 3, 4, 5], 3);
//バブルソート
const bubbleSort = (arr) => {
   for (let i = 0; i < arr.length; i++) {
      for (let j = arr.length - 1; j > i; j--) {
         if (arr[j - 1] > arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
         }
      }
   }
   return arr;
}
//選択ソート
const selectionSort = (arr) => {
   for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i; j < arr.length; j++) {
         if (arr[min] > arr[j]) {
            min = j;
         }
      }
      [arr[i], arr[min]] = [arr[min], arr[i]];
   }
   return arr;
}

//挿入ソート
const insertionSort = (arr) => {
   for (let i = 0; i < arr.length; i++) {
      let v = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > v) {
         arr[j + 1] = arr[j];
         j--;
      }
      arr[j + 1] = v;
   }
   return arr;
}

//ハッピー数の列挙
const happyNumbers = (n) => {
   const arr = [];
   for (let i = 1; i <= n; i++) {
      let num = i;
      while (num !== 1 && num !== 4) {
         num = num.toString().split('').reduce((a, b) => a + b * b, 0);
      }
      if (num === 1) {
         arr.push(i);
      }
   }
   return arr;
}
console.log(happyNumbers(10));
//アームストロング数の列挙
const armstrongNumbers = (n) => {

   const arr = [];
   for (let i = 1; i <= n; i++) {
      if (i.toString().split('').reduce((a, b) => a + b ** i.toString().length, 0) === i) {
         arr.push(i);
      }
   }
   return arr;
}
//2進数を10進数に変換
const bin2dec = (x) => {
   return parseInt(x, 2);
}
//8進数を10進数に変換
const oct2dec = (x) => {
   return parseInt(x, 8);
}
//16進数を10進数に変換
const hex2dec = (x) => {
   return parseInt(x, 16);
}
//2進数をビット反転
const bin2bit = (x) => {
   return x.split('').map((v) => v ^ 1).join('');
}
//コンマの数
const countComma = (x) => {
   return x.split(',').length - 1;
}
//最大の公約数
const gcd1 = (x, y) => {
   return y === 0 ? x : gcd(y, x % y);
}
//最小の公倍数
const lcm1 = (x, y) => {
   return x * y / gcd(x, y);
}
//約数の個数
const countDivisors = (x) => {
   return divisorsOf(x).length;
}
//素因数の個数
const countPrimeFactors = (x) => {
   return primeFactorsOf(x).length;
}
//素数の個数
const countPrimes = (x) => {
   return primes(x).length;
}
//素数の和
const sumOfPrimes = (x) => {
   return primes(x).reduce((a, b) => a + b, 0);
}
//素数の積
const productOfPrimes = (x) => {
   return primes(x).reduce((a, b) => a * b, 1);
}
//素数の差
const differenceOfPrimes = (x) => {
   return primes(x).reduce((a, b) => a - b, 0);
}
//素数の商
const quotientOfPrimes = (x) => {
   return primes(x).reduce((a, b) => a / b, 1);
}
//フィボナッチ数列
const fibonacci2 = (x) => {
   return x < 2 ? x : fibonacci(x - 1) + fibonacci(x - 2);
}
//2進数の2の補数
const bin2complement = (x) => {
   return bin2bit(x).split('').map((v, i) => i === 0 ? v : v ^ 1).join('');
}
console.log(bin2complement('1010'));
//2進数の1の補数
const bin2complement2 = (x) => {
   return bin2bit(x).split('').map((v, i) => i === 0 ? v : v ^ 0).join('');
}
//空のオブジェクト定義
const emptyObject = () => {
   return {};
}
//空の配列定義
const emptyArray = () => {
   return [];
}
//配列の最後の要素を削除する
/*
arr.pop();
//配列の最後に要素を追加する
arr.push();
//配列から"みかん"のindexを取得する
arr.indexOf("みかん");
//配列の最初の要素を削除する
const arr = ["りんご", "みかん", "バナナ"];
arr.shift();
//配列の最初に要素を追加する
const arr2 = ["りんご", "みかん", "バナナ"];
arr2.unshift("ぶどう");
//配列の要素を逆順にする
const arr3 = ["りんご", "みかん", "バナナ"];
arr3.reverse();
//配列の要素をソートする
const arr4 = ["りんご", "みかん", "バナナ"];
arr4.sort();
//配列の要素をランダムに並び替える
const arr5 = ["りんご", "みかん", "バナナ"];
arr5.sort(() => Math.random() - 0.5);
//配列の要素をコピーする
const arr6 = ["りんご", "みかん", "バナナ"];
const arr7 = arr6.slice();
//配列の要素を結合する
const arr8 = ["りんご", "みかん", "バナナ"];
const arr9 = ["ぶどう", "もも", "さくらんぼ"];
const arr10 = arr8.concat(arr9);
//配列の要素を削除する
const arr11 = ["りんご", "みかん", "バナナ"];   
arr11.splice(1, 1);
//配列の要素を置換する
const arr12 = ["りんご", "みかん", "バナナ"];
arr12.splice(1, 1, "ぶどう");
*/
//参加費用の比較
const price1 = 1000;
const price2 = 2000;
const main = () => {
   if (price1 < price2) {
      console.log("参加費用は" + price1 + "円です");
   } else {
      console.log("参加費用は" + price2 + "円です");
   }
}
//全ての順列
const permutations = (arr) => {
   if (arr.length === 1) return [arr];
   return arr.reduce((acc, v, i) => {
      return acc.concat(permutations(arr.slice(0, i).concat(arr.slice(i + 1))).map((v2) => [v].concat(v2)));
   }, []);
}
//全ての組み合わせ
const combinations = (arr) => {
   if (arr.length === 1) return [arr];
   return arr.reduce((acc, v, i) => {
      return acc.concat(combinations(arr.slice(i + 1)).map((v2) => [v].concat(v2)));
   }, []);
}
console.log(combinations([1, 2, 3, 4, 5]));
//素因数分解
const primeFactorsOf = (x) => {
   let arr = [];
   for (let i = 2; i <= x; i++) {
      while (x % i === 0) {
         arr.push(i);
         x /= i;
      }
   }
   return arr;
}
console.log(primeFactorsOf(100));

//switch文
const main1 = () => {
   const num = 2;
   switch (num) {
      case 1:
         console.log("1です");
         break;
      case 2:
         console.log("2です");
         break;
      default:
         console.log("1でも2でもありません");
         break;
   }
}
//switch文とは、条件分岐を行うための構文です。switch文は、条件式の評価結果によって、処理を分岐させることができます。switch文の構文は、次のようになります。
/*
switch (条件式) {
   case 値1:
      // 値1の場合の処理
      break;
   case 値2:

      // 値2の場合の処理
      break;
   default:

      // どのcaseにも当てはまらない場合の処理
      break;
}*/
//switch文の条件式には、次のような値を指定できます。
//while文
const main2 = () => {
   let num = 0;
   while (num < 5) {
      console.log(num);
      num++;
   }
}
//while文は、条件式がtrueの間、処理を繰り返し実行します。while文の構文は、次のようになります。
//三項演算子
const main3 = () => {
   const num = 2;
   const str = num % 2 === 0 ? "偶数" : "奇数";
   console.log(str);
}
//三項演算子は、条件式 ? 式1 : 式2 のように記述します。条件式がtrueの場合は、式1が評価され、falseの場合は、式2が評価されます。
//
//setTimeout
const main4 = () => {
   setTimeout(() => {
      console.log("3秒経過");
   }, 3000);
}
//setTimeoutは、指定した時間が経過した後に、指定した処理を実行します。setTimeoutの構文は、次のようになります。
//setInterval
const main5 = () => {
   setInterval(() => {
      console.log("3秒経過");
   }, 3000);
}
//setIntervalは、指定した時間ごとに、指定した処理を実行します。setIntervalの構文は、次のようになります。
//clearTimeout
const main6 = () => {
   const id = setTimeout(() => {
      console.log("3秒経過");
   }, 3000);
   clearTimeout(id);
}
//clearTimeoutは、setTimeoutで設定した処理をキャンセルします。clearTimeoutの構文は、次のようになります。
//clearInterval
const main7 = () => {
   const id = setInterval(() => {
      console.log("3秒経過");
   }, 3000);
   clearInterval(id);
}
//clearIntervalは、setIntervalで設定した処理をキャンセルします。clearIntervalの構文は、次のようになります。
//Promise
const main8 = () => {
   const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve("成功");
      }, 3000);
   });
   promise.then((str) => {
      console.log(str);
   });
}
//Promiseは、非同期処理を行うためのオブジェクトです。Promiseの構文は、次のようになります。
//new Promise((resolve, reject) => {
//   // 非同期処理
//   resolve("成功");
//   reject("失敗");
//});
//Promiseのコンストラクタには、resolveとrejectの2つの引数が渡されます。非同期処理が成功した場合は、resolveを呼び出し、失敗した場合は、rejectを呼び出します。Promiseのthenメソッドには、成功時の処理を登録できます。thenメソッドの構文は、次のようになります。
//fetch
const main9 = () => {
   fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         console.log(data);
      });
}
//fetchは、Web APIを呼び出すための関数です。fetchの構文は、次のようになります。
//async/await
const main10 = async () => {
   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
   const data = await response.json();
   console.log(data);
}
//async/awaitは、Promiseをより簡潔に記述するための構文です。async/awaitの構文は、次のようになります。
//Object.keys
const main11 = () => {
   const obj = {
      a: 1,
      b: 2,
      c: 3,
   };
   console.log(Object.keys(obj));
}
//Object.keysは、オブジェクトのキーを配列で取得します。Object.keysの構文は、次のようになります。
//Object.values
const main12 = () => {
   const obj = {
      a: 1,
      b: 2,
      c: 3,
   };
   console.log(Object.values(obj));
}

//Object.valuesは、オブジェクトの値を配列で取得します。Object.valuesの構文は、次のようになります。
//Object.entries
const main13 = () => {
   const obj = {
      a: 1,
      b: 2,
      c: 3,
   };
   console.log(Object.entries(obj));
}
console.log(main13())
//Object.entriesは、オブジェクトのキーと値を配列で取得します。Object.entriesの構文は、次のようになります。
//Object.assign
const main14 = () => {
   const obj1 = {
      a: 1,
      b: 2,
      c: 3,
   };
   const obj2 = {
      d: 4,
      e: 5,
      f: 6,
   };
   const obj3 = Object.assign(obj1, obj2);
   console.log(obj3);
}
console.log(main14())
//Object.assignは、オブジェクトをマージします。Object.assignの構文は、次のようになります。
//実行の結果
//{a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
//Object.assignは、第1引数に指定したオブジェクトに、第2引数以降のオブジェクトをマージします。Object.assignは、第1引数に空のオブジェクトを指定することもできます。
//throw
const main15 = () => {
   const error = new Error("エラーが発生しました");
   throw error;
}
//console.log(main15())
//throwは、エラーを発生させます。throwの構文は、次のようになります。
//実行の結果
//Error: エラーが発生しました
//try/catch
const main16 = () => {
   try {
      const error = new Error("エラーが発生しました");
      throw error;
   } catch (e) {
      console.log(e);
   }
}
console.log(main16())
//try/catchは、エラーをキャッチします。try/catchの構文は、次のようになります。
//実行の結果
//Error: エラーが発生しました
//クラス
/*
class Main17 {
   constructor(name) {
      this.name = name;
   }
   hello() {
      console.log("hello " + this.name);
   }
}
const main17 = () => {
   const main17 = new Main17("Tom");
   main17.hello();
}*/
//クラスは、オブジェクトを生成するための設計図です。クラスの構文は、次のようになります。
//継承
class Main18 {
   constructor(name) {
      this.name = name;
   }
   hello() {
      console.log("hello " + this.name);
   }
}
class Main18Sub extends Main18 {
   constructor(name, age) {
      super(name);
      this.age = age;
   }
   hello() {
      console.log("hello " + this.name + "(" + this.age + ")");
   }
}
const main18 = () => {
   const main18 = new Main18Sub("Tom", 28);
   main18.hello();
}
console.log(main18())
//継承は、クラスの機能を継承することです。継承の構文は、次のようになります。
//実行の結果
//hello Tom(28)
//継承元のクラスのコンストラクタを呼び出すには、superを使用します。継承元のクラスのメソッドをオーバーライドするには、同じ名前のメソッドを定義します。
//モジュール
/*const main19 = () => {
   console.log("hello world");
}

export default main19;*/
//モジュールは、JavaScriptのファイルをモジュールとして扱うことができます。モジュールの構文は、次のようになります。
//モジュールのインポート
/*import main191 from "./main19.js";
const main20 = () => {
   main19();
}*/
//モジュールのインポートは、モジュールをインポートします。モジュールのインポートの構文は、次のようになります。
//実行の結果
//hello world
//モジュールのエクスポート
/*
const main21 = () => {
   console.log("hello world");
}
export { main21 };*/
//Dateオブジェクトとは、日付や時刻を扱うためのオブジェクトです。Dateオブジェクトの構文は、次のようになります。
//実行の結果
//2020-08-01T00:00:00.000Z
const day = new Date();
//bind
const main22 = () => {
   const obj = {
      name: "Tom",
      hello: function () {
         console.log("hello " + this.name);
      }
   };
   const hello = obj.hello.bind(obj);
   hello();
}
console.log(main22())
//bindは、関数のthisを固定します。bindの構文は、次のようになります。
//実行の結果
//hello Tom
//bindは、関数のthisを固定します。bindの構文は、次のようになります。
//sealed
const main23 = () => {
   const obj = {
      a: 1,
      b: 2,
   };
   Object.seal(obj);
   obj.c = 3;
   console.log(obj);
}
console.log(main23());
//sealedは、オブジェクトを封印します。sealedの構文は、次のようになります。
//実行の結果
//{a: 1, b: 2}
//generator
function* main24() {
   yield 1;
   yield 2;
   yield 3;
}
const main242 = () => {
   const generator = main24();
   console.log(generator.next());
   console.log(generator.next());
   console.log(generator.next());
   console.log(generator.next());
}
console.log(main242());
//generatorは、イテレータを生成します。generatorの構文は、次のようになります。
//実行の結果
//{value: 1, done: false}
//call
const main25 = () => {
   const obj = {
      name: "Tom",
      hello: function () {
         console.log("hello " + this.name);
      }
   };
   obj.hello.call(obj);
}
console.log(main25());
//callは、関数を呼び出します。callの構文は、次のようになります。
//実行の結果
//イベントを追加する
document.addEventListener("DOMContentLoaded", () => {
   const main = () => {
      console.log("hello world");
   }
   main();
})
//イベントを追加するには、addEventListenerを使用します。addEventListenerの構文は、次のようになります。
//実行の結果
//hello world
//document.getElementById
const main26 = () => {
   const element = document.getElementById("main26");
   element.textContent = "hello world";
}
console.log(main26());
//document.getElementByIdは、idを指定して要素を取得します。document.getElementByIdの構文は、次のようになります。
//実行の結果
//hello world
//document.getElementsByClassName
const main27 = () => {
   const elements = document.getElementsByClassName("main27");
   for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = "hello world";
   }
}
console.log(main27());
//document.getElementsByClassNameは、クラス名を指定して要素を取得します。document.getElementsByClassNameの構文は、次のようになります。
//実行の結果
//hello world
//element.textContent
const main28 = () => {
   const element = document.getElementById("main28");
   element.textContent = "hello world";
}
console.log(main28());
//element.textContentは、要素のテキストを取得または設定します。element.textContentの構文は、次のようになります。
//実行の結果
//hello world
//document.querySelector
const main29 = () => {
   const element = document.querySelector("#main29");
   element.textContent = "hello world";
}
console.log(main29());
//document.querySelectorは、CSSセレクターを指定して要素を取得します。document.querySelectorの構文は、次のようになります。
//実行の結果
//hello world
//document.querySelectorAll
const main30 = () => {
   const elements = document.querySelectorAll(".main30");
   for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = "hello world";
   }
}
console.log(main30());
//document.querySelectorAllは、CSSセレクターを指定して要素を取得します。document.querySelectorAllの構文は、次のようになります。
//実行の結果
//hello world
//createElement
const main31 = () => {
   const element = document.createElement("div");
   element.textContent = "hello world";
   document.body.appendChild(element);
}
console.log(main31());
//createElementは、要素を作成します。createElementの構文は、次のようになります。
//実行の結果
//hello world
//element.appendChild
const main32 = () => {
   const element = document.createElement("div");
   element.textContent = "hello world";
   document.body.appendChild(element);
}
console.log(main32());
//element.appendChildは、要素を追加します。element.appendChildの構文は、次のようになります。
//実行の結果   
//hello world
//element.firstElementChild
const main33 = () => {
   const element = document.getElementById("main33");
   element.firstElementChild.textContent = "hello world";
}
console.log(main33());
//element.firstElementChildは、要素の最初の子要素を取得します。element.firstElementChildの構文は、次のようになります。
//実行の結果
//hello world
//element.lastElementChild
const main34 = () => {
   const element = document.getElementById("main34");
   element.lastElementChild.textContent = "hello world";
}
console.log(main34());
//element.lastElementChildは、要素の最後の子要素を取得します。element.lastElementChildの構文は、次のようになります。
//実行の結果
//hello world
//element.remove()
const main35 = () => {
   const element = document.getElementById("main35");
   element.remove();
}
console.log(main35());
//element.remove()は、要素を削除します。element.remove()の構文は、次のようになります。
//実行の結果
//hello world
//element.innerHtml
const main36 = () => {
   const element = document.getElementById("main36");
   element.innerHTML = "hello world";
}
console.log(main36());
//element.innerHtmlは、要素のHTMLを取得または設定します。element.innerHtmlの構文は、次のようになります。
//実行の結果
//hello world
//element.setAttribute
const main37 = () => {
   const element = document.getElementById("main37");
   element.setAttribute("class", "main37");
}
console.log(main37());
//element.setAttributeは、要素の属性を設定します。element.setAttributeの構文は、次のようになります。
//実行の結果
//hello world
//window.content
const main38 = () => {
   window.content = "hello world";
}
console.log(main38());
//window.contentは、ウィンドウのコンテンツを取得または設定します。window.contentの構文は、次のようになります。
//実行の結果
//hello world
//window.open
const main39 = () => {
   window.open("https://www.google.com/");
}
console.log(main39());
//window.openは、新しいウィンドウを開きます。window.openの構文は、次のようになります。
//実行の結果
//hello world
//window.onload
const main40 = () => {
   window.onload = () => {
      const element = document.getElementById("main40");
      element.textContent = "hello world";
   }
}
console.log(main40());
//window.onloadは、ウィンドウが読み込まれたときに実行されるイベントです。window.onloadの構文は、次のようになります。
//実行の結果
//hello world
//innerWidth
const main41 = () => {
   const element = document.getElementById("main41");
   element.textContent = window.innerWidth;
}
console.log(main41());
//innerWidthは、ウィンドウの幅を取得します。innerWidthの構文は、次のようになります。
//実行の結果
//hello world
//history
const main42 = () => {
   history.back();
}
console.log(main42());
//historyは、ブラウザの履歴を操作します。historyの構文は、次のようになります。
//実行の結果
//hello world
//e.preventDefault
const main43 = () => {
   const element = document.getElementById("main43");
   element.addEventListener("click", (e) => {
      e.preventDefault();
      element.textContent = "hello world";
   });
}
console.log(main43());
//e.preventDefaultは、イベントのデフォルトの動作をキャンセルします。e.preventDefaultの構文は、次のようになります。
//実行の結果
//hello world
//devicePixelRatio
const main44 = () => {
   const element = document.getElementById("main44");
   element.textContent = devicePixelRatio;
}
console.log(main44());
//devicePixelRatioは、デバイスのピクセル比を取得します。devicePixelRatioの構文は、次のようになります。
//実行の結果
//hello world
//配列のメソッド,push
const main45 = () => {
   const array = [1, 2, 3];
   array.push(4);
   console.log(array);
}
console.log(main45());
//配列のメソッド,pushは、配列の末尾に要素を追加します。配列のメソッド,pushの構文は、次のようになります。
//pop
const main46 = () => {
   const array = [1, 2, 3];
   array.pop();
   console.log(array);
}
console.log(main46());
//配列のメソッド,popは、配列の末尾の要素を削除します。配列のメソッド,popの構文は、次のようになります。
//shift
const main47 = () => {
   const array = [1, 2, 3];
   array.shift();
   console.log(array);
}
console.log(main47());
//配列のメソッド,shiftは、配列の先頭の要素を削除します。配列のメソッド,shiftの構文は、次のようになります。
//unshift
const main48 = () => {
   const array = [1, 2, 3];
   array.unshift(0);
   console.log(array);
}
console.log(main48());
//配列のメソッド,unshiftは、配列の先頭に要素を追加します。配列のメソッド,unshiftの構文は、次のようになります。
//splice
const main49 = () => {
   const array = [1, 2, 3];
   array.splice(1, 0, 4);
   console.log(array);
}
console.log(main49());
//配列のメソッド,spliceは、配列の指定した位置に要素を追加または削除します。配列のメソッド,spliceの構文は、次のようになります。
//reduce
const main50 = () => {

   const array = [1, 2, 3];
   const result = array.reduce((a, b) => {
      return a + b;
   });
   console.log(result);
}
console.log(main50());
//配列のメソッド,reduceは、配列の要素を一つにまとめます。配列のメソッド,reduceの構文は、次のようになります。
//map
const main51 = () => {
   const array = [1, 2, 3];
   const result = array.map((a) => {
      return a * 2;
   });
   console.log(result);
}
console.log(main51());
//配列のメソッド,mapは、配列の要素を変換します。配列のメソッド,mapの構文は、次のようになります。
//filter
const main52 = () => {
   const array = [1, 2, 3];
   const result = array.filter((a) => {
      return a % 2 === 0;
   });
   console.log(result);
}
console.log(main52());
//配列のメソッド,filterは、配列の要素を絞り込みます。配列のメソッド,filterの構文は、次のようになります。
//find
const main53 = () => {
   const array = [1, 2, 3];
   const result = array.find((a) => {
      return a === 2;
   });
   console.log(result);
}
console.log(main53());
//配列のメソッド,findは、配列の要素を検索します。配列のメソッド,findの構文は、次のようになります。
//findIndex
const main54 = () => {
   const array = [1, 2, 3];
   const result = array.findIndex((a) => {
      return a === 2;
   });
   console.log(result);
}
console.log(main54());
//配列のメソッド,findIndexは、配列の要素のインデックスを検索します。配列のメソッド,findIndexの構文は、次のようになります。
//includes
const main55 = () => {
   const array = [1, 2, 3];
   const result = array.includes(2);
   console.log(result);
}
console.log(main55());
//配列のメソッド,includesは、配列の要素が含まれているかを判定します。配列のメソッド,includesの構文は、次のようになります。
//forEach
const main56 = () => {
   const array = [1, 2, 3];
   array.forEach((a) => {
      console.log(a);
   });
}
console.log(main56());
//配列のメソッド,forEachは、配列の要素を順番に処理します。配列のメソッド,forEachの構文は、次のようになります。
//every
const main57 = () => {
   const array = [1, 2, 3];
   const result = array.every((a) => {
      return a % 2 === 0;
   });
   console.log(result);
}
console.log(main57());
//配列のメソッド,everyは、配列の要素がすべて条件を満たしているかを判定します。配列のメソッド,everyの構文は、次のようになります。
//some
const main58 = () => {
   const array = [1, 2, 3];
   const result = array.some((a) => {
      return a % 2 === 0;
   });
   console.log(result);
}
console.log(main58());
//配列のメソッド,someは、配列の要素のいずれかが条件を満たしているかを判定します。配列のメソッド,someの構文は、次のようになります。
//sort
const main59 = () => {
   const array = [1, 2, 3];
   const result = array.sort((a, b) => {
      return a - b;
   });
   console.log(result);
}
console.log(main59());
//配列のメソッド,sortは、配列の要素をソートします。配列のメソッド,sortの構文は、次のようになります。
//useEffect
const main60 = () => {
   const [count, setCount] = useState(0);
   useEffect(() => {
      console.log('useEffect');
   }, [count]);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
   );
}
console.log(main60());
//useEffectは、コンポーネントがマウントされた時、または、更新された時に処理を実行します。useEffectの構文は、次のようになります。
//useRef
const main61 = () => {
   const inputRef = useRef(null);
   const onClick = () => {
      inputRef.current.focus();
   };
   return (
      <div>
         <input type="text" ref={inputRef} />
         <button onClick={onClick}>フォーカス</button>
      </div>
   );
}
console.log(main61());
//useRefは、DOMを操作するために使用します。useRefの構文は、次のようになります。
//useContext
const main62 = () => {
   const [count, setCount] = useState(0);
   const value = useMemo(() => {
      return { count, setCount };
   }, [count]);
   return (
      <CountContext.Provider value={value}>
         <Counter />
      </CountContext.Provider>
   );
}
const Counter = () => {
   const { count, setCount } = useContext(CountContext);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
   );
}
const CountContext = createContext(null);
console.log(main62());
//useContextは、コンテキストを使用するために使用します。useContextの構文は、次のようになります。
//useReducer
const main63 = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   return (
      <div>
         <p>{state.count}</p>
         <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      </div>
   );
}
const initialState = { count: 0 };
const reducer = (state, action) => {
   switch (action.type) {
      case 'increment':
         return { count: state.count + 1 };
      default:
         return state;
   }
}
console.log(main63());
//useReducerは、stateとdispatchを返します。useReducerの構文は、次のようになります。
//useCallback
const main64 = () => {
   const [count, setCount] = useState(0);
   const onClick = useCallback(() => {
      setCount(count + 1);
   }, [count]);
   return (
      <div>
         <p>{count}</p>
         <button onClick={onClick}>+1</button>
      </div>
   );
}
console.log(main64());
//useCallbackは、関数をキャッシュします。useCallbackの構文は、次のようになります。
//useMemo
const main65 = () => {
   const [count, setCount] = useState(0);
   const onClick = useCallback(() => {
      setCount(count + 1);
   }, [count]);
   const double = useMemo(() => {
      return count * 2;
   }, [count]);
   return (
      <div>
         <p>{double}</p>
         <button onClick={onClick}>+1</button>
      </div>
   );
}
console.log(main65());
//useMemoは、値をキャッシュします。useMemoの構文は、次のようになります。
//useLayoutEffect
const main66 = () => {
   const [count, setCount] = useState(0);
   useLayoutEffect(() => {
      console.log('useLayoutEffect');
   }, [count]);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
   );
}
console.log(main66());
//useLayoutEffectは、useEffectと同じく、コンポーネントがマウントされた時、または、更新された時に処理を実行します。useLayoutEffectの構文は、次のようになります。
//useImperativeHandle
const main67 = () => {
   const ref = useRef(null);
   const onClick = () => {
      ref.current.focus();
   };
   return (
      <div>
         <Input ref={ref} />
         <button onClick={onClick}>フォーカス</button>
      </div>
   );
}
const Input = forwardRef((props, ref) => {
   const inputRef = useRef(null);
   useImperativeHandle(ref, () => ({
      focus: () => {
         inputRef.current.focus();
      },
   }));
   return <input type="text" ref={inputRef} />;
})
console.log(main67());
//useImperativeHandleは、子コンポーネントの関数を親コンポーネントから呼び出すために使用します。useImperativeHandleの構文は、次のようになります。
//useDebugValue
const main68 = () => {
   const [count, setCount] = useState(0);
   useDebugValue(count);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
   );
}
console.log(main68());
//useDebugValueは、カスタムフックのデバッグ用のラベルを設定します。useDebugValueの構文は、次のようになります。
//useTransition
const main69 = () => {
   const [count, setCount] = useState(0);
   const [isPending, startTransition] = useTransition();
   return (
      <div>
         <p>{count}</p>
         <button
            onClick={() => {
               startTransition(() => {
                  setCount(count + 1);
               });
            }}
         >
            {isPending ? 'pending...' : '+1'}
         </button>
      </div>
   );
}
console.log(main69());
//useTransitionは、非同期処理を行う際に、ユーザーの操作をブロックすることなく、コンポーネントを更新するために使用します。useTransitionの構文は、次のようになります。
//useDeferredValue
const main70 = () => {
   const [count, setCount] = useState(0);
   const deferredCount = useDeferredValue(count, { timeoutMs: 3000 });
   return (
      <div>
         <p>{deferredCount}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
   );
}
console.log(main70());
//useDeferredValueは、非同期処理を行う際に、ユーザーの操作をブロックすることなく、コンポーネントを更新するために使用します。useDeferredValueの構文は、次のようになります。
//useOpaqueIdentifier
const main71 = () => {
   const [count, setCount] = useState(0);
   const id = useOpaqueIdentifier();
   return (
      <div>
         <p>{id}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
   );
}
console.log(main71());
//useOpaqueIdentifierは、コンポーネントの再レンダリング時に、一意のIDを生成します。useOpaqueIdentifierの構文は、次のようになります。
//useMutableSource
const main72 = () => {
   const [count, setCount] = useState(0);
   const source = useMemo(() => new Source(), []);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
         <Child source={source} />
      </div>
   );
}
const Child1 = ({ source }) => {
   const value = useMutableSource(source, getSnapshot, subscribe);
   return <p>{value}</p>;
}
console.log(main72());
//useMutableSourceは、コンポーネントの再レンダリング時に、一意のIDを生成します。useMutableSourceの構文は、次のようになります。
//useSyncExternalStore
const main73 = () => {
   const [count, setCount] = useState(0);
   const store = useMemo(() => new Store(), []);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
         <Child store={store} />
      </div>
   );
}
const Child2 = ({ store }) => {
   const value = useSyncExternalStore(subscribe, getSnapshot, store);
   return <p>{value}</p>;
}
console.log(main73());
//useSyncExternalStoreは、コンポーネントの再レンダリング時に、一意のIDを生成します。useSyncExternalStoreの構文は、次のようになります。
//useMutableSource
const main74 = () => {
   const [count, setCount] = useState(0);
   const source = useMemo(() => new Source(), []);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
         <Child source={source} />
      </div>
   );
}
const Child3 = ({ source }) => {
   const value = useMutableSource(source, getSnapshot, subscribe);
   return <p>{value}</p>;
}
console.log(main74());
//useMutableSourceは、コンポーネントの再レンダリング時に、一意のIDを生成します。useMutableSourceの構文は、次のようになります。
//useSyncExternalStore
const main75 = () => {
   const [count, setCount] = useState(0);
   const store = useMemo(() => new Store(), []);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
         <Child store={store} />
      </div>
   );
}
const Child = ({ store }) => {
   const value = useSyncExternalStore(subscribe, getSnapshot, store);
   return <p>{value}</p>;
}
console.log(main75());
//useSyncExternalStoreは、コンポーネントの再レンダリング時に、一意のIDを生成します。useSyncExternalStoreの構文は、次のようになります。
//useMutableSource
const main76 = () => {
   const [count, setCount] = useState(0);
   const source = useMemo(() => new Source(), []);
   return (
      <div>
         <p>{count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
         <Child source={source} />
      </div>
   );
}
const Child5 = ({ source }) => {  
   const value = useMutableSource(source, getSnapshot, subscribe);
   return <p>{value}</p>;
}
console.log(main76());
//useMutableSourceは、コンポーネントの再レンダリング時に、一意のIDを生成します。useMutableSourceの構文は、次のようになります。
//chakraui
const main77 = () => {
   return (
      <ChakraProvider>
         <Button colorScheme="teal">Button</Button>
      </ChakraProvider>
   );
}
console.log(main77());
//chakrauiの構文は、次のようになります。
//materialui
const main78 = () => {
   return (
      <ThemeProvider theme={theme}>
         <Button variant="contained" color="primary">
            Hello World
         </Button>
      </ThemeProvider>
   );
}
console.log(main78());
//materialuiの構文は、次のようになります。
//reactstrap
const main79 = () => {

   return (
      <div>
         <Button color="primary">primary</Button>{' '}
         <Button color="secondary">secondary</Button>{' '}
         <Button color="success">success</Button>{' '}
         <Button color="info">info</Button>{' '}
         <Button color="warning">warning</Button>{' '}
         <Button color="danger">danger</Button>{' '}
         <Button color="link">link</Button>
      </div>
   );
}
console.log(main79());
//reactstrapの構文は、次のようになります。
//nextAuth
const main80 = () => {
   return (
      <div>
         <h1>NextAuth.js</h1>
         <p>
            <a href="/api/auth/signin">Sign in</a>
         </p>
      </div>
   );
}
console.log(main80());
//nextAuthの構文は、次のようになります。
//nextjs
const main81 = () => {
   return (
      <div>
         <h1>Next.js</h1>
         <p>
            <a href="/about">About</a>
         </p>
      </div>
   );
}
console.log(main81());
//nextjsの構文は、次のようになります。
//getServerSideProps
const main82 = () => {
   return (
      <div>
         <h1>Get Server Side Props</h1>
      </div>
   );
}
export const getServerSideProps = async () => {
   return {
      props: {},
   };
}
console.log(main82());
//getServerSidePropsの構文は、次のようになります。
//userEvent
const main83 = () => {
   const { getByRole } = render(<Button>Click me</Button>);
   userEvent.click(getByRole('button'));
}
console.log(main83());
//userEventの構文は、次のようになります。
//reactTestingLibrary
const main84 = () => {
   const { getByText } = render(<Button>Click me</Button>);
   fireEvent.click(getByText('Click me'));
}
console.log(main84());
//reactTestingLibraryの構文は、次のようになります。
//reactHookForm
const main85 = () => {
   const { register, handleSubmit, watch, errors } = useForm();
   const onSubmit = data => console.log(data);
   console.log(watch('example'));
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <input name="example" defaultValue="test" ref={register} />
         <input name="exampleRequired" ref={register({ required: true })} />
         {errors.exampleRequired && <span>This field is required</span>}
         <input type="submit" />
      </form>
   );
}
console.log(main85());
//reactHookFormの構文は、次のようになります。
//reactQuery
const main86 = () => {

   const { isLoading, error, data } = useQuery('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
         res.json()
      )
   );

   if (isLoading) return 'Loading...';

   if (error) return 'An error has occurred: ' + error.message;

   return (
      <div>
         <h1>{data.name}</h1>
         <p>{data.description}</p>
         <strong>👀 {data.subscribers_count}</strong>{' '}
         <strong>✨ {data.stargazers_count}</strong>{' '}
         <strong>🍴 {data.forks_count}</strong>
      </div>
   );
}
console.log(main86());
//reactQueryの構文は、次のようになります。
//reactRouter
const main87 = () => {
   return (
      <Router>
         <div>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/about">About</Link>
               </li>
               <li>
                  <Link to="/users">Users</Link>
               </li>
            </ul>
            <hr />
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route path="/about">
                  <About />
               </Route>
               <Route path="/users">
                  <Users />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}
console.log(main87());
//reactRouterの構文は、次のようになります。
//swr
const main88 = () => {
   const { data, error } = useSWR('/api/user', fetcher);

   if (error) return <div>failed to load</div>;
   if (!data) return <div>loading...</div>;
   return <div>hello {data.name}!</div>;
}
console.log(main88());
//swrの構文は、次のようになります。
//userSWR
const main89 = () => {
   const { data, error } = useSWR('/api/user', fetcher);

   if (error) return <div>failed to load</div>;
   if (!data) return <div>loading...</div>;
   return <div>hello {data.name}!</div>;
}
console.log(main89());
//userSWRの構文は、次のようになります。
//reactQuery
const main90 = () => {
   
      const { isLoading, error, data } = useQuery('repoData', () =>
         fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
            res.json()
         )
      );
   
      if (isLoading) return 'Loading...';
   
      if (error) return 'An error has occurred: ' + error.message;
   
      return (
         <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
         </div>
      );
}
   
console.log(main90());
//reactQueryの構文は、次のようになります。
//useQuery
const main91 = () => {
   const { isLoading, error, data } = useQuery('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
         res.json()
      )
   );

   if (isLoading) return 'Loading...';

   if (error) return 'An error has occurred: ' + error.message;

   return (
      <div>
         <h1>{data.name}</h1>
         <p>{data.description}</p>
         <strong>👀 {data.subscribers_count}</strong>{' '}
         <strong>✨ {data.stargazers_count}</strong>{' '}
         <strong>🍴 {data.forks_count}</strong>
      </div>
   );
}
console.log(main91());
//useQueryの構文は、次のようになります。
//useSWR
const main92 = () => {
   const { data, error } = useSWR('/api/user', fetcher);

   if (error) return <div>failed to load</div>;
   if (!data) return <div>loading...</div>;
   return <div>hello {data.name}!</div>;
}
console.log(main92());
//useSWRの構文は、次のようになります。
//<BrowserRouter>
const main93 = () => {
   return (
      <BrowserRouter>
         <div>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/about">About</Link>
               </li>
               <li>
                  <Link to="/users">Users</Link>
               </li>
            </ul>
            <hr />
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route path="/about">
                  <About />
               </Route>
               <Route path="/users">
                  <Users />
               </Route>
            </Switch>
         </div>
      </BrowserRouter>
   );
}
console.log(main93());
//<BrowserRouter>の構文は、次のようになります。
//<Head>
const main94 = () => {
   return (
      <Head>
         <title>My page title</title>
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
   );
}
console.log(main94());
//getServerSideProps
export async function getServerSideProps(context) {
   return {
      props: {
         // props for your component
      }
   }
}
//getServerSidePropsの構文は、次のようになります。
//getStaticPaths
export async function getStaticPaths() {
   return {
      paths: [
         { params: { id: '1' } },
         { params: { id: '2' } }
      ],
      fallback: false
   };
}
//getStaticPathsの構文は、次のようになります。
//reduxとは、次のようになります。
<Link href="/about">
   <a>About Page</a>
</Link>
//素数判定
const main95 = () => {
   const isPrime = (num) => {
      for (let i = 2; i < num; i++) {
         if (num % i === 0) {
            return false;
         }
      }
      return num > 1;
   }
   console.log(isPrime(7));
}
console.log(main95());

//素数判定の構文は、次のようになります。
//nPmの基本公式
const main96 = () => {
   const nPm = (n, p, m) => {
      return (n ** p) % m;
   }
   console.log(nPm(2, 3, 5));
}
//nPmの基本公式の構文は、次のようになります。
//配列から選ぶ組み合わせ
const main97 = () => {
   const combination = (arr, num) => {
      const result = [];
      if (num === 1) return arr.map((v) => [v]);
      arr.forEach((v, idx, arr) => {
         const fixed = v;
         const restArr = arr.slice(idx + 1);
         const combinationArr = combination(restArr, num - 1);
         const combineFix = combinationArr.map((v) => [fixed, ...v]);
         result.push(...combineFix);
      });
      return result;
   }
   console.log(combination([1, 2, 3, 4, 5], 3));
}
console.log(main97());
//配列から選ぶ組み合わせの構文は、次のようになります。
//配列から選んで並び変えた中身
const main98 = () => {
   const permutation = (arr, selectNum) => {
      const result = [];
      if (selectNum === 1) return arr.map((v) => [v]);
      arr.forEach((v, idx, arr) => {
         const fixed = v;
         const restArr = arr.filter((_, index) => index !== idx);
         const permutationArr = permutation(restArr, selectNum - 1);
         const combineFix = permutationArr.map((v) => [fixed, ...v]);
         result.push(...combineFix);
      });
      return result;
   }
   console.log(permutation([1, 2, 3, 4, 5], 3));
}
console.log(main98());
//配列から選んで並び変えた中身の構文は、次のようになります。
//配列から同じ数値を２つ選ぶ場合の数
const main99 = () => {
   const combination = (arr, num) => {
      const result = [];
      if (num === 1) return arr.map((v) => [v]);
      arr.forEach((v, idx, arr) => {
         const fixed = v;
         const restArr = arr.slice(idx);
         const combinationArr = combination(restArr, num - 1);
         const combineFix = combinationArr.map((v) => [fixed, ...v]);
         result.push(...combineFix);
      });
      return result;
   }
   console.log(combination([1, 2, 3, 4, 5], 2));
}
console.log(main99());
//配列から同じ数値を２つ選ぶ場合の数の構文は、次のようになります。
//サイコロの出目の総和
const main100 = () => {
   const dice = (n) => {
      const result = [];
      for (let i = 1; i <= n; i++) {
         for (let j = 1; j <= n; j++) {
            result.push(i + j);
         }
      }
      return result;
   }
   console.log(dice(6));
}
console.log(main100());
//サイコロの出目の総和の構文は、次のようになります。
//recoil,selectorとは
const main101 = () => {
   const selector = selector({
      key: 'todoListStatsState',
      get: ({ get }) => {
         const todoList = get(todoListState);
         const totalNum = todoList.length;
         const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
         const totalUncompletedNum = totalNum - totalCompletedNum;
         const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
         return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted,
         };
      },
   });
}
//recoil,selectorの構文は、次のようになります。
//recoil,atomとは
const main102 = () => {
   const todoListState = atom({
      key: 'todoListState',
      default: [],
   });
}
//recoil,atomの構文は、次のようになります。
//recoil,useRecoilStateとは
const main103 = () => {
   const [todoList, setTodoList] = useRecoilState(todoListState);
}
//recoil,useRecoilStateの構文は、次のようになります。

