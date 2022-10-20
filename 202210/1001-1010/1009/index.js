//文字列の分割の関数
function splitString(str, len) {
      var result = [];
      while (str.length > len) {
         result.push(str.substring(0, len));
         str = str.substring(len);
      }
      result.push(str);
      return result;
}
//文字列の結合の関数
function joinString(str, len) {
      var result = [];
      while (str.length > len) {
         result.push(str.substring(0, len));
         str = str.substring(len);
      }
      result.push(str);
      return result.join('');
}
//変数の定義
var str = "I couldn't believe that ";
//全ての文字列の置換 の関数
function replaceAll(str, before, after) {
      return str.split(before).join(after);
}
//2つの文字列を連結する関数
function concatString(str1, str2) {
      return str1 + str2;
}
//文字列の抽出の関数
function extractString(str, start, end) {
      return str.substring(start, end);
}
//文字列の長さの取得の関数
function getStringLength(str) {
      return str.length;
}
//引数を２倍にする関数
function doubleNumber(num) {
      return num * 2;
}
//引数を３倍にする関数
function tripleNumber(num) {
      return num * 3;
}
//jsonplaceholderのAPIを利用して、データを取得する関数
function getJsonData() {
      return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(function(response) {
         return response.json();
      })
      .then(function(json) {
         return json;
      });
}
//取得したデータを表示する関数
function displayData(data) {
      var result = '';
      for (var i = 0; i < data.length; i++) {
         result += data[i].title + ' ' + data[i].body + ' ';
      }
      return result;
}
//動的確認アラートの関数
function alertMessage(message) {
      alert(message);
}
//三項演算子の関数
function ternaryOperator(num) {
      return num % 2 === 0 ? '偶数' : '奇数';
}
//絞り込みの関数
function filterArray(array, num) {
      return array.filter(function(value) {
         return value > num;
      });
}
//分割代入の関数
function destructuringArray(array) {
      var [a, b, c] = array;
      return a + b + c;
}
console.logd(destructuringArray([1, 2, 3]));
//素数の判定の関数
function isPrimeNumber(num) {
      if (num < 2) {
         return false;
      }
      for (var i = 2; i < num; i++) {
         if (num % i === 0) {
            return false;
         }
      }
      return true;
}
//階乗
function factorial(num) {
      if (num === 0) {
         return 1;
      }
      return num * factorial(num - 1);
}
//2で割り切れる回数
function countDivideByTwo(num) {
      var count = 0;
      while (num % 2 === 0) {
         num /= 2;
         count++;
      }
      return count;
}
//最大公約数
function getGreatestCommonDivisor(num1, num2) {
      if (num2 === 0) {
         return num1;
      }
      return getGreatestCommonDivisor(num2, num1 % num2);
}
//最小公倍数
function getLeastCommonMultiple(num1, num2) {
      return num1 * num2 / getGreatestCommonDivisor(num1, num2);
}
//配列の最大値
function getMaxArray(array) {
      return Math.max.apply(null, array);
}
//配列の最小値
function getMinArray(array) { 
      return Math.min.apply(null, array);
}

//配列の合計値
function getSumArray(array) {
      return array.reduce(function(prev, current) {
         return prev + current;
      });
}
//配列の平均値
function getAverageArray(array) {
      return getSumArray(array) / array.length;
}

//配列の要素をランダムに並び替える関数
function shuffleArray(array) {
      return array.sort(function() {
         return Math.random() - 0.5;
      });
}
//配列の要素をランダムに取得する関数
function getRandomArray(array) {
      return array[Math.floor(Math.random() * array.length)];
}
//jsonのパースの関数
function parseJson(json) {
      return JSON.parse(json);
}
//jsonの文字列化の関数
function stringifyJson(json) {
      return JSON.stringify(json);
}
//jsonのバイト数の取得の関数
function getJsonByte(json) {
      return new Blob([json]).size;
}
//jsonのキーの取得の関数
function getJsonKeys(json) {
      return Object.keys(json);
}
//jsonの値の取得の関数
function getJsonValues(json) {
      return Object.values(json);
}
//jsonの要素数の取得の関数
function getJsonLength(json) {
      return Object.keys(json).length;
}  
//jsonの要素の追加の関数
function addJsonElement(json, key, value) {
      json[key] = value;
      return json;
}
//jsonの要素の削除の関数
function deleteJsonElement(json, key) {
      delete json[key];
      return json;
}
//jsonの要素の更新の関数
function updateJsonElement(json, key, value) {
      json[key] = value;
      return json;
}
//jsonの要素の検索の関数
function searchJsonElement(json, key) {
      return json[key];
}
//jsonの要素の存在確認の関数
function isExistJsonElement(json, key) {
      return json.hasOwnProperty(key);
}
//jsonからバイト配列に変換する関数
function convertJsonToByteArray(json) {
      return new TextEncoder().encode(json);
}
//バイト配列からjsonに変換する関数
function convertByteArrayToJson(byteArray) {
      return new TextDecoder().decode(byteArray);
}
//jsonの要素のソートの関数
function sortJsonElement(json) {
      return Object.keys(json).sort().reduce(function(result, key) {
         result[key] = json[key];
         return result;
      }, {});
}
//jsonをfetchで取得する関数
function fetchJson(url) {
      return fetch(url).then(function(response) {
         return response.json();
      });
}
//バイナリサーチの関数
function binarySearch(array, num) {
      var min = 0;
      var max = array.length - 1;
      while (min <= max) {
         var mid = Math.floor((min + max) / 2);
         if (array[mid] === num) {
            return mid;
         } else if (array[mid] < num) {
            min = mid + 1;
         } else {
            max = mid - 1;
         }
      }
      return -1;
}
//複数文字を繰り返して改行
function repeatString(string, num) {
      return string.repeat(num);
}
//文字列の長さを取得
function getStringLengthh(string) {
      return string.length;
}
//文字列のバイト数を取得
function getStringByte(string) {

      return new Blob([string]).size;
}
//1文字目を大文字に
function toUpperCaseFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
}
//1文字目を小文字に
function toLowerCaseFirst(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
}
//非破壊的pop
function popString(string) {
      return string.slice(0, -1);
}
//非破壊的push
function pushString(string, char) {
      return string + char;
}
//非破壊的shift
function shiftString(string) {
      return string.slice(1);
}
//非破壊的unshift
function unshiftString(string, char) {
      return char + string;
}
//非破壊的splice
function spliceString(string, index, num, char) {
      return string.slice(0, index) + char + string.slice(index + num);
}
//非破壊的reverse
function reverseString(string) {
      return string.split('').reverse().join('');
}
//非破壊的replace
function replaceString(string, before, after) {
      return string.replace(before, after);
}
//非破壊的split
function splitStringg(string, separator) {
      return string.split(separator);
}
//非破壊的join
function joinStringg(array, separator) {
      return array.join(separator);
}
//非破壊的sort
function sortString(string) {
      return string.split('').sort().join('');
}
//非破壊的slice
function sliceString(string, start, end) {
      return string.slice(start, end);
}
//非破壊的substring
function substringString(string, start, end) {
      return string.substring(start, end);
}
//非破壊的substr
function substrString(string, start, length) {
      return string.substr(start, length);
}
//非破壊的concat
function concatStringg(string, string2) {
      return string + string2;
}
//非破壊的indexOf
function indexOfString(string, char) {
      return string.indexOf(char);
}
//非破壊的lastIndexOf
function lastIndexOfString(string, char) {
      return string.lastIndexOf(char);
}
//非破壊的includes
function includesString(string, char) {
      return string.includes(char);
}
//非破壊的startsWith
function startsWithString(string, char) {
      return string.startsWith(char);
}
//非破壊的endsWith
function endsWithString(string, char) {
      return string.endsWith(char);
}
//非破壊的trim 
function trimString(string) {
      return string.trim();
}
//非破壊的trimStart
function trimStartString(string) {
      return string.trimStart();
}
//非破壊的trimEnd
function trimEndString(string) {
      return string.trimEnd();
}
//非破壊的padStart
function padStartString(string, length, char) {
      return string.padStart(length, char);
}
//非破壊的padEnd
function padEndString(string, length, char) {
      return string.padEnd(length, char);
}
//非破壊的repeat
function repeatStringg(string, num) {
      return string.repeat(num);
}
//非破壊的match
function matchString(string, regex) {
      return string.match(regex);
}
//全文検索
function searchAllString(string, regex) {
      return string.match(new RegExp(regex, 'g'));
}
//非破壊的search
function searchString(string, regex) {
      return string.search(regex);
}
/*
//firebase authのログイン
function firebaseAuthLogin(email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
}
//firebase authのログアウト
function firebaseAuthLogout() {
      return firebase.auth().signOut();
}
//firebase authのユーザー作成
function firebaseAuthCreateUser(email, password) {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
}
//firebase authのユーザー削除
function firebaseAuthDeleteUser() {
      return firebase.auth().currentUser.delete();
}
//firebase authのメールアドレス変更
function firebaseAuthChangeEmail(email) {
      return firebase.auth().currentUser.updateEmail(email);
}
//firebase authのパスワード変更
function firebaseAuthChangePassword(password) {
      return firebase.auth().currentUser.updatePassword(password);
}
//firebase authのメールアドレス確認 
function firebaseAuthEmailVerification() {
      return firebase.auth().currentUser.sendEmailVerification();
}
//firebase authのメールアドレス確認の再送
function firebaseAuthEmailVerificationResend() {
      return firebase.auth().currentUser.reload();
}
//パスワード認証のメールアドレス変更
function firebaseAuthChangeEmailPassword(email, password) {
      return firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, password));
}
//snsログイン
function firebaseAuthSnsLogin(provider) {
      return firebase.auth().signInWithPopup(provider);
}
//user.updateProfileを使ってユーザー名を変更
function firebaseAuthChangeUserName(name) {
      return firebase.auth().currentUser.updateProfile({
            displayName: name
      });
}
//user.updateProfileを使ってユーザー画像を変更
function firebaseAuthChangeUserImage(image) {
      return firebase.auth().currentUser.updateProfile({
            photoURL: image
      });
}
//firebase authのユーザー情報を取得
function firebaseAuthGetUser() {
      return firebase.auth().currentUser;
}
//user.getIdTokenを使ってトークンを取得
function firebaseAuthGetToken() {
      return firebase.auth().currentUser.getIdToken();
}
//user.updateProfileを使ってユーザー名を変更
function firebaseAuthChangeUserName(name) {
      return firebase.auth().currentUser.updateProfile({
            displayName: name
      });
}
//user.updateEmailを使ってメールアドレスを変更
function firebaseAuthChangeEmail(email) {
      return firebase.auth().currentUser.updateEmail(email);
}
//user.deleteを使ってユーザーを削除
function firebaseAuthDeleteUser() {
      return firebase.auth().currentUser.delete();
}
//user.sendEmailVerificationを使ってメールアドレス確認のメールを送信
function firebaseAuthEmailVerification() {
      return firebase.auth().currentUser.sendEmailVerification();
}
//user.reloadを使ってメールアドレス確認の再送
function firebaseAuthEmailVerificationResend() {
      return firebase.auth().currentUser.reload();
}
//auth.onAuthStateChangedを使ってログイン状態を監視
function firebaseAuthOnAuthStateChanged() {
      return firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                  //ログインしている時
            } else {
                  //ログインしていない時
            }
      });
}
//firestoreのデータを追加
function firebaseFirestoreAddData(collection, data) {
      return firebase.firestore().collection(collection).add(data);
}
//firestoreのデータを取得
function firebaseFirestoreGetData(collection, id) {
      return firebase.firestore().collection(collection).doc(id).get();
}
//firestoreのデータを更新
function firebaseFirestoreUpdateData(collection, id, data) {
      return firebase.firestore().collection(collection).doc(id).update(data);
}
//firestoreのデータを削除
function firebaseFirestoreDeleteData(collection, id) {
      return firebase.firestore().collection(collection).doc(id).delete();
}
//whereを使ってfirestoreのデータを取得
function firebaseFirestoreGetDataWhere(collection, field, operator, value) {
      return firebase.firestore().collection(collection).where(field, operator, value).get();
}
//orderByを使ってfirestoreのデータを取得
function firebaseFirestoreGetDataOrderBy(collection, field, order) {
      return firebase.firestore().collection(collection).orderBy(field, order).get();
}
//limitを使ってfirestoreのデータを取得
function firebaseFirestoreGetDataLimit(collection, limit) {
      return firebase.firestore().collection(collection).limit(limit).get();
}
//firestoreのデータを監視
function firebaseFirestoreOnSnapshot(collection, id) {
      return firebase.firestore().collection(collection).doc(id).onSnapshot(function (doc) {
            if (doc.exists) {
                  //データが存在する時
            } else {
                  //データが存在しない時
            }
      });
}
//firestoreでsubcollectionを使ってデータを追加
function firebaseFirestoreAddDataSubcollection(collection, id, subcollection, data) {
      return firebase.firestore().collection(collection).doc(id).collection(subcollection).add(data);
}
//firestoreでsubcollectionを使ってデータを取得
function firebaseFirestoreGetDataSubcollection(collection, id, subcollection, subid) {
      return firebase.firestore().collection(collection).doc(id).collection(subcollection).doc(subid).get();
}
//collectionGroupを使ってfirestoreのデータを取得
function firebaseFirestoreGetDataCollectionGroup(collection, id) {
      return firebase.firestore().collectionGroup(collection).doc(id).get();
}
//firestoreのドキュメントを削除する
function firebaseFirestoreDeleteDocument(collection, id) {
      return firebase.firestore().collection(collection).doc(id).delete();
}
//firestoreをbatchで一括更新
function firebaseFirestoreBatchUpdate(collection, id, data) {
      var batch = firebase.firestore().batch();
      var ref = firebase.firestore().collection(collection).doc(id);
      batch.update(ref, data);
      return batch.commit();
}
//firestoreをbatchで一括削除
function firebaseFirestoreBatchDelete(collection, id) {
      var batch = firebase.firestore().batch();
      var ref = firebase.firestore().collection(collection).doc(id);
      batch.delete(ref);
      return batch.commit();
}
//firestoreのonSnapshotを使ってデータを監視
function firebaseFirestoreOnSnapshot(collection, id) {
      return firebase.firestore().collection(collection).doc(id).onSnapshot(function (doc) {
            if (doc.exists) {
                  //データが存在する時
            } else {
                  //データが存在しない時
            }
      });
}
//enablePersistenceを使ってfirestoreのオフライン対応
function firebaseFirestoreEnablePersistence() {
      return firebase.firestore().enablePersistence();
}
//firestoreのrunTransactionを使ってトランザクションを実行
function firebaseFirestoreRunTransaction(collection, id, data) {
      return firebase.firestore().runTransaction(function (transaction) {
            var ref = firebase.firestore().collection(collection).doc(id);
            return transaction.get(ref).then(function (doc) {
                  if (doc.exists) {
                        transaction.update(ref, data);
                  }
            });
      });
}
//firestoreApiを使ってfirestoreのデータを取得
function firebaseFirestoreApiGetData(collection, id) {
      return firebase.firestore().collection(collection).doc(id).get();
}
//firestoreApiを使ってfirestoreのデータを更新
function firebaseFirestoreApiUpdateData(collection, id, data) {
      return firebase.firestore().collection(collection).doc(id).update(data);
}
//firestoreApiを使ってfirestoreのデータを削除
function firebaseFirestoreApiDeleteData(collection, id) {
      return firebase.firestore().collection(collection).doc(id).delete();
}
//getFirestoreを使ってfirestoreのデータを取得
function firebaseGetFirestoreGetData(collection, id) {
      return getFirestore().collection(collection).doc(id).get();
}
//getDocを使ってfirestoreのデータを取得
function firebaseGetDocGetData(collection, id) {
      return getDoc(doc(getFirestore(), collection, id));
}
//setDocを使ってfirestoreのデータを追加
function firebaseSetDocAddData(collection, id, data) {
      return setDoc(doc(getFirestore(), collection, id), data);
}
//updateDocを使ってfirestoreのデータを更新
function firebaseUpdateDocUpdateData(collection, id, data) {
      return updateDoc(doc(getFirestore(), collection, id), data);
}
//deleteDocを使ってfirestoreのデータを削除
function firebaseDeleteDocDeleteData(collection, id) {
      return deleteDoc(doc(getFirestore(), collection, id));
}
//onSnapshotを使ってfirestoreのデータを監視
function firebaseOnSnapshot(collection, id) {
      return onSnapshot(doc(getFirestore(), collection, id), function (doc) {
            if (doc.exists()) {
                  //データが存在する時
            } else {
                  //データが存在しない時
            }
      });
}
//createdAtを使ってfirestoreのデータを追加
function firebaseCreatedAtAddData(collection, data) {
      return firebase.firestore().collection(collection).add(data);
}
//updatedAtを使ってfirestoreのデータを更新
function firebaseUpdatedAtUpdateData(collection, id, data) {
      return firebase.firestore().collection(collection).doc(id).update(data);
}
//startAfterを使ってfirestoreのデータを取得
function firebaseStartAfterGetData(collection, id) {
      return firebase.firestore().collection(collection).startAfter(id).get();
}
//forEachを使ってfirestoreのデータを取得
function firebaseForEachGetData(collection) {
      return firebase.firestore().collection(collection).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                  //データを取得
            });
      });
}
//orderByを使ってfirestoreのデータを取得
function firebaseOrderByGetData(collection, field, order) {
      return firebase.firestore().collection(collection).orderBy(field, order).get();
}
//limitを使ってfirestoreのデータを取得
function firebaseLimitGetData(collection, limit) {
      return firebase.firestore().collection(collection).limit(limit).get();
}
//whereを使ってfirestoreのデータを取得
function firebaseWhereGetData(collection, field, operator, value) {
      return firebase.firestore().collection(collection).where(field, operator, value).get();
}
//commentを使ってfirestoreのデータを取得
function firebaseCommentGetData(collection, field, value) {
      return firebase.firestore().collection(collection).where(field, '==', value).get();
}
//addを使ってfirestoreのデータを追加
function firebaseAddAddData(collection, data) {
      return firebase.firestore().collection(collection).add(data);
}
//firestorageを使って画像をアップロード
function firebaseFirestorageUploadImage(collection, id, file) {
      return firebase.storage().ref(collection + '/' + id).put(file);
}
//firestorageを使って画像を削除
function firebaseFirestorageDeleteImage(collection, id) {
      return firebase.storage().ref(collection + '/' + id).delete();
}
//firestorageを使って画像を取得
function firebaseFirestorageGetImage(collection, id) {
      return firebase.storage().ref(collection + '/' + id).getDownloadURL();
}
//firestorageを使って画像を更新
function firebaseFirestorageUpdateImage(collection, id, file) {
      return firebase.storage().ref(collection + '/' + id).put(file);
}
//onSnapshotを使ってfirestorageのデータを監視
function firebaseOnSnapshot(collection, id) {
      return firebase.storage().ref(collection + '/' + id).on('state_changed', function (snapshot) {
            //進捗状況を取得
      });
}
//query,collection,getDocsを使ってfirestoreのデータを取得
function firebaseQueryGetDocsGetData(collection, field, operator, value) {
      return getDocs(query(collection(getFirestore(), collection), where(field, operator, value)));
}
//addDocを使ってfirestoreのデータを追加
function firebaseAddDocAddData(collection, data) {
      return addDoc(collection(getFirestore(), collection), data);
}
//storage().ref().put()を使ってfirestorageのデータをアップロード
function firebaseStorageRefPutUploadImage(collection, id, file) {
      return storage().ref(collection + '/' + id).put(file);
}
//docChangesを使ってfirestoreのデータを取得
function firebaseDocChangesGetData(collection) {
      return onSnapshot(collection(getFirestore(), collection), function (querySnapshot) {
            querySnapshot.docChanges().forEach(function (change) {
                  if (change.type === 'added') {
                        //データが追加された時
                  }
                  if (change.type === 'modified') {
                        //データが更新された時
                  }
                  if (change.type === 'removed') {
                        //データが削除された時
                  }
            });
      });
}
//onCreateを使ってfirestoreのデータを追加
function firebaseOnCreateAddData(collection, data) {
      return onCreate(collection(getFirestore(), collection), data);
}
//onUpdateを使ってfirestoreのデータを更新
function firebaseOnUpdateUpdateData(collection, data) {
      return onUpdate(collection(getFirestore(), collection), data);
}
//fileReaderを使って画像を取得
function firebaseFileReaderGetImage(file) {
      return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                  resolve(e.target.result);
            };
            reader.readAsDataURL(file);
      });
}
//onFinalizeを使ってfunctionsのデータを取得
function firebaseOnFinalizeGetData() {
      return onFinalize(function (object) {
            //データを取得
      });
}
//functions, onCreateを使ってfunctionsのデータを追加
function firebaseFunctionsOnCreateAddData(collection, data) {
      return onCreate(collection(getFirestore(), collection), data);
}
//cloudFunctions, httpsを使ってfunctionsのデータを取得
function firebaseCloudFunctionsHttpsGetData() {
      return https.onRequest(function (request, response) {
            //データを取得
      });
}
//algoliasearchを使ってfirestoreのデータを取得
function firebaseAlgoliasearchGetData(collection, field, value) {
      return client.initIndex(collection).search(value, {
            filters: field + ':' + value
      });
}
//cloudfirestoreを使ってfirestoreのデータを取得
function firebaseCloudfirestoreGetData(collection, field, operator, value) {
      return getDocs(query(collection(getFirestore(), collection), where(field, operator, value)));
}
//pubsub,onRunを使ってfunctionsのデータを取得
function firebasePubsubOnRunGetData() {
      return onRun(function (context) {
            //データを取得
      });
}
//pubsub,onPublishを使ってfunctionsのデータを取得
function firebasePubsubOnPublishGetData() {
      return onPublish(function (message) {
            //データを取得
      });
}
//vodストリーミングを使って動画を取得
function firebaseVodStreamingGetVideo() {
      return vod.getVideo();
}
//動画ライブ配信を使って、動画配信
function firebaseLiveStreamingGetVideo() {
      return live.getVideo();
}
//機械学習モジュールへのアクセスを使って、機械学習モジュールへのアクセス
function firebaseMachineLearningModuleAccessGetAccess() {
      return ml.getAccess();
}
//realtimeDatabaseを使って、オンラインのユーザーを検出
function firebaseRealtimeDatabaseGetOnlineUser() {
      return realtime.getOnlineUser();
}
//dbでaddDocを使ってfirestoreのデータを追加
function firebaseDbAddDocAddData(collection, data) {
      return db.addDoc(collection, data);
}
//firestorage,ref,childを使ってfirestorageのデータを取得
function firebaseFirestorageRefChildGetData(collection, id) {
      return storage().ref(collection).child(id).getDownloadURL();
}
//onSnapshot,docを使って、一覧表示
function firebaseOnSnapshotDocGetData(collection) {
      return onSnapshot(doc(getFirestore(), collection), function (doc) {
            //データを取得
      });
}
//doc,setDocをインポートして、firestoreのデータを更新
function firebaseDocSetDocUpdateData(collection, id, data) {
      return doc(getFirestore(), collection, id).setDoc(data);
}
//doc,deleteDocをインポートして、firestoreのデータを削除
function firebaseDocDeleteDocDeleteData(collection, id) {
      return doc(getFirestore(), collection, id).deleteDoc();
}
//doc,updateDocをインポートして、firestoreのデータを更新
function firebaseDocUpdateDocUpdateData(collection, id, data) {
      return doc(getFirestore(), collection, id).updateDoc(data);
}
//collecton,addDocをインポートして、firestoreのデータを追加
function firebaseCollectonAddDocAddData(collection, data) {
      return collection(getFirestore(), collection).addDoc(data);
}
//getFirestore,docをインポートして、firestoreのデータを取
function firebaseGetFirestoreDocGetData(collection, id) {
      return getFirestore().doc(collection, id);
}
//
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { onSnapshot, doc } from 'firebase/firestore';
import { storage } from 'firebase/storage';
//firestore,updateDocをインポートして、firestoreのデータを更新
function firebaseFirestoreUpdateDocUpdateData(collection, id, data) {
      return firestore().updateDoc(collection, id, data);
}
//firestore,deleteDocをインポートして、firestoreのデータを削除 
function firebaseFirestoreDeleteDocDeleteData(collection, id) {
      return firestore().deleteDoc(collection, id);
}
//firestore,collection,where,forEachをインポートして、firestoreのデータを取得
firebase.firestore
   .collection('messages')
   .where('uid', '==', userId)
   .get()
   .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
         this.likes.push(doc.data())
      })
   })

//firestore,doc,updateをインポートして、firestoreのデータを更新
firebase.firestore
   .doc(`messages/${messageId}`)
   .update({
      likes: firebase.firestore.FieldValue.arrayUnion(userId)
   })
//functions,firestore,でチャットルームを作成
exports.createUser = functions.firestore
   .document('users/{userId}')
   .onCreate((snap, context) => {
      firebase.firestore().collection('chatrooms').add({
      })
   });
//functions,firestore,でチャットルームを削除
exports.deleteUser = functions.firestore
   .document('users/{userId}')
   .onDelete((snap, context) => {
      firebase.firestore().collection('chatrooms').doc(chatroomId).delete()
   })
//functions,firestore,でチャットルームを更新
exports.updateUser = functions.firestore
   .document('users/{userId}')
   .onUpdate((snap, context) => {
      firebase.firestore().collection('chatrooms').doc(chatroomId).update({
      })
   })
//functions, firebaseで通知メールを送信
exports.sendMail = functions.firestore
         .document('users/{userId}')
         .onWrite((snap, context) => {
            const  asnc email = {
               from: gmailEmail,
               to: '受信するメールアドレス',
               subject: '件名',
               text: '本文'
            }
            try {
               await mailTransport.sendMail(email)
            } catch (e) {
               return e.message;
            }
         });
//firebase,storage,ref,childをインポートして、firestorageのデータを取得
firebase.storage().ref('images').child('image.jpg').getDownloadURL()
//functions,storage
exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => { })
//firestoreでバックアップ
exports.backup = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
   const bucket = admin.storage().bucket();
   const file = bucket.file('backup.json');
   const firestore = admin.firestore();
   const docs = await firestore.collection('messages').get();
   const data = docs.docs.map((doc) => doc.data());
   await file.save(JSON.stringify(data), { resumable: false });
})
//firebase,auth,でユーザーを作成
firebase.auth().createUserWithEmailAndPassword(email, password)
//firebase,auth,でユーザーを削除
firebase.auth().deleteUser(uid)
//firebase,auth,でユーザーを更新
firebase.auth().updateUser(uid, data)
//firebase,auth,でユーザーを取得
firebase.auth().getUser(uid)
//firebaseでパスワードを変更する
firebase.auth().updatePassword(password)
//sendPasswordResetEmailをインポートして、パスワードをリセットする
firebase.auth().sendPasswordResetEmail(email)
//getAuth,onAuthStateChangedをインポートして、ログイン状態を取得
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      console.log('ログインしています')
   } else {
      console.log('ログインしていません')
   }
})
//firebase,auth,currentuserをインポートして、ログイン状態を取得
firebase.auth().currentUser
//firebase,auth,signoutをインポートして、ログアウト
firebase.auth().signOut()
//連打防止  
const debounce = (func, wait) => {
   let timeout;
   return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
         func.apply(context, args);
      }, wait);
   };
}
//xss対策
const escapeHtml = (str) => {
   return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
}
//マッチンしたら、チャットルームを作成
exports.createUser = functions.firestore
   .document('users/{userId}')
   .onCreate((snap, context) => {
      firebase.firestore().collection('chatrooms').add({
      })
   });
//マッチングしたら、チャットルームを削除         
exports.deleteUser = functions.firestore
   .document('users/{userId}')
   .onDelete((snap, context) => {
      firebase.firestore().collection('chatrooms').doc(chatroomId).delete()
   })
//マッチングしたら、チャットルームを更新
exports.updateUser = functions.firestore

   .document('users/{userId}')
   .onUpdate((snap, context) => {
      firebase.firestore().collection('chatrooms').doc(chatroomId).update({
      })
   })
//メッセージを送信したら、通知メールを送信

import { collection, addDoc } from "firebase/firestore";
const db = firebase.firestore()
// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "chat"), {

});
//ルームメッセージを取得
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
const data = query(collection(db, "chats"), orderBy('createdAt', 'desc'), limit(n件));
const chats = await getDocs(data);
//ルームメッセージを取得
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
const data1 = query(collection(db, "chats"), orderBy('createdAt', 'desc'), limit(n件));
//ルームメッセージを削除する
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
const data2 = query(collection(db, "chats"), orderBy('createdAt', 'desc'), limit(n件));
const chats3 = await getDocs(data);
//ルームメッセージを更新する
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
const data4 = query(collection(db, "chats"), orderBy('createdAt', 'desc'), limit(n件));
const chats5 = await getDocs(data);
//ルームメッセージ一覧を取得
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
const data6 = query(collection(db, "chats"), orderBy('createdAt', 'desc'), limit(n件));
const chats7 = await getDocs(data);
//へのコメントへの返信
firebase.firestore().collection('todos').doc(todoのid).collection('comment').doc(commentのid).collection('comment').add()
//一覧表示、
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
   console.log("Current data: ", doc.data());
});
//import { doc, onSnapshot } from "firebase/firestore";

const unsub2 = onSnapshot(doc(db, "cities", "SF"), (doc) => {
   console.log("Current data: ", doc.data());
});
//一覧絞り込む
import { collection, query, where, getDocs } from "firebase/firestore";
const q = query(collection(db, "cities"), where("state", "==", "CA"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
   console.log(`${doc.id} => ${doc.data()}`);
})
//一覧ページネーション
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
const data5 = query(collection(db, "cities"), orderBy('createdAt', 'desc'), limit(n件));
const cities = await getDocs(data);
//一覧検索
import { collection, query, where, getDocs } from "firebase/firestore";
const q2 = query(collection(db, "cities"), where("state", "==", "CA"));
const querySnapshot2 = await getDocs(q);
querySnapshot.forEach((doc) => {
   console.log(`${doc.id} => ${doc.data()}`);
})
//一覧ソート
import { collection, query, orderBy, getDocs } from "firebase/firestore";
const q1 = query(collection(db, "cities"), orderBy("name"));
const querySnapshot1 = await getDocs(q);
querySnapshot.forEach((doc) => {
   console.log(`${doc.id} => ${doc.data()}`);
})
//doc,setDoc,firebaseを作成
import { doc, setDoc } from "firebase/firestore";
const docRef2 = doc(db, "cities", "new-city-id");
await setDoc(docRef, {
   name: "Tokyo",
   country: "Japan"
});
//ユーザープロフィールを作成
import { doc, setDoc } from "firebase/firestore";
const docRef3 = doc(db, "cities", "new-city-id");
await setDoc(docRef, {
   name: "Tokyo",
   country: "Japan"
});
//ユーザープロフィールを更新
import { doc, setDoc } from "firebase/firestore";
const docRef4 = doc(db, "cities", "new-city-id");
await setDoc(docRef, {
   name: "Tokyo",
   country: "Japan"
});
//ユーザープロフィールを削除
import { doc, setDoc } from "firebase/firestore";
const docRef5 = doc(db, "cities", "new-city-id");
await setDoc(docRef, {
   name: "Tokyo",
   country: "Japan"
});
//ユーザープロフィールを取得
import { doc, getDoc } from "firebase/firestore";
const docRef6 = doc(db, "cities", "new-city-id");
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
   console.log("Document data:", docSnap.data());
}
//ユーザー削除
firebase.firestore().collection('users').doc(id).delete()
//ユーザー更新
firebase.firestore().collection('users').doc(id).update()
//ユーザー取得
firebase.firestore().collection('users').doc(id).get()
//ユーザー一覧取得
firebase.firestore().collection('users').get()
//ユーザー一覧絞り込み
firebase.firestore().collection('users').where('name', '==', 'name').get()
//ユーザー一覧ソート
firebase.firestore().collection('users').orderBy('name', 'desc').get()
//ユーザー一覧ページネーション
firebase.firestore().collection('users').orderBy('createdAt', 'desc').limit(n件).get()
//ユーザー一覧検索
firebase.firestore().collection('users').where('name', '==', 'name').get()
//ユーザー詳細
firebase.firestore().collection('users').doc(id).get()
//既読処理
firebase.firestore().collection('users').doc(id).update()
//prisma,
*/
const result = await prisma.user.findUnique({
where: {
   id: 1,
  },
})

/* 結果
{
   ""data"": {
      ""getUser"": {
         id: 1,
            name: ""佐藤"",
               age: 18
      }
   }
} */
//prisma,where
const result1 = await prisma.user.findUnique({
   where: {
      id: 1,
   },
})
//prisma,select
const result2 = await prisma.user.findUnique({
   where: {
      id: 1,
   },
   select: {
      name: true,
   },
})
//prisma,include
const result3 = await prisma.user.findUnique({
   where: {
      id: 1,
   },
   include: {
      posts: true,
   },
})
//prisma,orderBy
const result4 = await prisma.user.findMany({
   orderBy: {
      age: "desc",
   },
})
//prisma,skip
const result5 = await prisma.user.findMany({
   skip: 1,
})
//prisma,take
const result6 = await prisma.user.findMany({
   take: 1,
})
//prisma,where
const result7 = await prisma.user.findMany({
   where: {
      age: {
         gt: 18,
      },
   },
})
//prisma,add
const result8 = await prisma.user.create({
   data: {
      name: "佐藤",

      age: 18,
   },
})
//prisma,update
const result9 = await prisma.user.update({
   where: {
      id: 1,
   },
   data: {
      name: "佐藤",
      age: 18,
   },
})
//prisma,delete
const result10 = await prisma.user.delete({
   where: {
      id: 1,
   },
})
//prisma,create
const result11 = await prisma.user.create({
   data: {
      name: "佐藤",
      age: 18,
   },
})
//prisma,update
const result12 = await prisma.user.update({
   where: {
      id: 1,
   },
   data: {
      name: "佐藤",
      age: 18,
   },
})
//prisma,delete
const result13 = await prisma.user.delete({
   where: {
      id: 1,
   },
})
//prisma,create
const result14 = await prisma.user.create({
   data: {
      name: "佐藤",
      age: 18,
   },
})
//doc,onSnapshot
import { doc, onSnapshot } from "firebase/firestore";
const docRef1 = doc(db, "cities", "SF");
onSnapshot(docRef, (doc) => {
   console.log("Current data: ", doc.data());
})
//collection,onSnapshot,query,where,orderBy,limit
//import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
const q5 = query(collection(db, "cities"), where("state", "==", "CA"), orderBy("name"), limit(3));
onSnapshot(q, (querySnapshot) => {
   querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
   });
})
//既読処理  1
firebase.firestore().collection('users').doc(id).update()
//未読表示  
firebase.firestore().collection('users').where('isRead', '==', false).get()
//
class City {
   constructor(name, state, country) {
      this.name = name;
      this.state = state;
      this.country = country;
   }
   toString() {
      return this.name + ', ' + this.state + ', ' + this.country;
   }
}

// cityを
const cityConverter = {
   toFirestore: (city) => {
      return {
         name: city.name,
         state: city.state,
         country: city.country
      };
   },
   fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new City(data.name, data.state, data.country);
   }
};
//
import { collection, query, where, getDocs } from "firebase/firestore";

const q4 = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot4 = await getDocs(q);
querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
});

// Message text passed from the client.
const text = data.text;
// Authentication / user information is automatically added to the request.
const uid = context.auth.uid;
const name = context.auth.token.name || null;
const picture = context.auth.token.picture || null;
const email = context.auth.token.email || null;

//画像送信
const bucket = admin.storage().bucket();
const file = bucket.file('images/' + context.auth.uid + '/' + Date.now() + '.png');
await file.save(data.image, { contentType: 'image/png' });
const imageUrl = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//画像取得
const bucket2 = admin.storage().bucket();
const file2 = bucket2.file('images/' + context.auth.uid + '/' + Date.now() + '.png');
const imageUrl2 = await file2.getSignedUrl({ action: 'read', expires: '03-09-2491' }); 
//画像削除
const bucket3 = admin.storage().bucket();
const file3 = bucket3.file('images/' + context.auth.uid + '/' + Date.now() + '.png');
await file3.delete();
//画像一覧
const bucket4 = admin.storage().bucket();
const [files2] = await bucket4.getFiles();
const urls2 = await Promise.all(files.map(async (file) => {
   const url = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
   return url;
}))
//画像一覧
const bucket5 = admin.storage().bucket();
const [files] = await bucket5.getFiles();
const urls = await Promise.all(files.map(async (file) => {

}))

//非破壊的splice
const array3 = [1, 2, 3, 4, 5];
const newArray = array.slice(0, 2).concat(array.slice(3));
//破壊的splice
const array4 = [1, 2, 3, 4, 5];
array.splice(2, 1);
//配列オブジェクトのマージ
const array5 = [1, 2, 3, 4, 5];
const array6 = [6, 7, 8, 9, 10];
const array7 = array5.concat(array6);
//配列オブジェクト絞り込む取得
const array8 = [1, 2, 3, 4, 5];
const array9 = array8.filter((item) => item > 3);
//配列オブジェクトのマッピング
const array10 = [1, 2, 3, 4, 5];
const array11 = array10.map((item) => item * 2);   
//配列オブジェクトからオブジェクトを取得
const array12 = [
   { id: 1, name: '佐藤' },
   { id: 2, name: '鈴木' },
   { id: 3, name: '高橋' },
   { id: 4, name: '田中' },
   { id: 5, name: '伊藤' },
];
const array13 = array12.find((item) => item.id === 3);
//配列オブジェクトからプロパティの値を取得
const array14 = [
   { id: 1, name: '佐藤' },
   { id: 2, name: '鈴木' },
   { id: 3, name: '高橋' },
   { id: 4, name: '田中' },
   { id: 5, name: '伊藤' },
];
const array15 = array14.map((item) => item.name);
//配列オブジェクトのソート
const array16 = [1, 2, 3, 4, 5];
const array17 = array16.sort((a, b) => a - b);
//配列をコピーして、新しい配列を作成
const array18 = [1, 2, 3, 4, 5];
const array19 = [...array18];
//配列オブジェクトの要素を削除
const array20 = [1, 2, 3, 4, 5];
const array21 = array20.filter((item) => item !== 3);
//配列オブジェクトの要素を追加
const array22 = [1, 2, 3, 4, 5];
const array23 = [...array22, 6];
//配列オブジェクトの要素を置き換え
const array24 = [1, 2, 3, 4, 5];
const array25 = array24.map((item) => item === 3 ? 6 : item);
//配列オブジェクトの要素を置き換え
const array26 = [1, 2, 3, 4, 5];
const array27 = array26.map((item) => item === 3 ? 6 : item);
//オブジェクトのプロパティを削除
const object1 = { id: 1, name: '佐藤', age: 20 };
const { age, ...object2 } = object1;
//オブジェクトのプロパティを追加
const object3 = { id: 1, name: '佐藤' };
const object4 = { ...object3, age: 20 };
//オブジェクトのプロパティを置き換え
const object5 = { id: 1, name: '佐藤', age: 20 };
const object6 = { ...object5, age: 30 };
//オブジェクトのプロパティの値変更
const object7 = { id: 1, name: '佐藤', age: 20 };
const object8 = { ...object7, age: object7.age + 1 };
//配列の最初の要素を削除する
const array28 = [1, 2, 3, 4, 5];
array28.shift();
//配列の最後の要素を削除する
const array29 = [1, 2, 3, 4, 5];
array29.pop();
//配列の最初に要素を追加する
const array30 = [1, 2, 3, 4, 5];
array30.unshift(0);
//配列の最後に要素を追加する
const array31 = [1, 2, 3, 4, 5];
array31.push(6);
//配列の最初の要素を取得する
const array32 = [1, 2, 3, 4, 5];
const first = array32[0];
//配列の最後の要素を取得する
const array33 = [1, 2, 3, 4, 5];
const last = array33[array33.length - 1];
//配列の最初の要素を削除する
const array34 = [1, 2, 3, 4, 5];
const [first1, ...rest] = array34;
//配列から"ミカン"を削除する
const array35 = ['りんご', 'みかん', 'バナナ'];
const array36 = array35.filter((item) => item !== 'みかん');
//配列から"バナナ"を追加する
const array37 = ['りんご', 'みかん', 'バナナ'];
const array38 = [...array37, 'バナナ'];
//配列から"バナナ"を置き換える
const array39 = ['りんご', 'みかん', 'バナナ'];
const array40 = array39.map((item) => item === 'バナナ' ? 'ぶどう' : item);
//配列から"バナナ"を
const array41 = ['りんご', 'みかん', 'バナナ'];
const array42 = array41.map((item) => item === 'バナナ' ? 'ぶどう' : item);
//配列から"バナナ"を削除する
const array43 = ['りんご', 'みかん', 'バナナ'];
const array44 = array43.filter((item) => item !== 'バナナ');
//配列のそれぞれの要素を2倍にする
const array45 = [1, 2, 3, 4, 5];
const array46 = array45.map((item) => item * 2);
//配列を絞り込む
const array47 = [1, 2, 3, 4, 5];
const array48 = array47.filter((item) => item % 2 === 0);
//配列をソートする
const array49 = [1, 2, 3, 4, 5];
const array50 = array49.sort((a, b) => a - b);
//idで配列をソートする
const array51 = [
      { id: 1, name: '佐藤' },
      { id: 2, name: '鈴木' },
      { id: 3, name: '高橋' },
      { id: 4, name: '田中' },
      { id: 5, name: '伊藤' },
];
const array52 = array51.sort((a, b) => a.id - b.id);
//作成日で配列をソートする
const array53 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },
      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array54 = array53.sort((a, b) => new Date(a.created) - new Date(b.created));
//配列の要素を合計する
const array55 = [1, 2, 3, 4, 5];
const sum = array55.reduce((total, item) => total + item, 0);
//配列の要素を合計する
const array56 = [1, 2, 3, 4, 5];
const sum1 = array56.reduce((total, item) => total + item, 0);
//カウントを取得する
const array57 = [1, 2, 3, 4, 5];
const count = array57.reduce((total, item) => total + 1, 0);
//名前でソートする
const array58 = [
      { id: 1, name: '佐藤' },
      { id: 2, name: '鈴木' },
      { id: 3, name: '高橋' },
      { id: 4, name: '田中' },
      { id: 5, name: '伊藤' },
];
const array59 = array58.sort((a, b) => a.name.localeCompare(b.name));
//チェックで絞り込む
const array60 = [
      { id: 1, name: '佐藤', checked: true },
      { id: 2, name: '鈴木', checked: false },
      { id: 3, name: '高橋', checked: true },
      { id: 4, name: '田中', checked: false },
      { id: 5, name: '伊藤', checked: true },
];
const array61 = array60.filter((item) => item.checked);
//チェックを取得する
const array62 = [
      { id: 1, name: '佐藤', checked: true },
      { id: 2, name: '鈴木', checked: false },
      { id: 3, name: '高橋', checked: true },
      { id: 4, name: '田中', checked: false },
      { id: 5, name: '伊藤', checked: true },
];
const array63 = array62.filter((item) => item.checked);
//三項演算子
const array64 = [1, 2, 3, 4, 5];
const array65 = array64.map((item) => item % 2 === 0 ? '偶数' : '奇数');
//ユーザー情報編集
//期限を取得する
const array66 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },
      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array67 = array66.map((item) => {

      const created = new Date(item.created);
      const today = new Date();
      const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      return {
            ...item,
            diff,
      };
}
);
//期限を設定する
const array68 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },
      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array69 = array68.map((item) => {
      
            const created = new Date(item.created);
            const today = new Date();
            const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
            return {
                  ...item,
                  diff,
                  expired: diff > 3,
            };
}
);
//アクセス制限の機能を設定
if (user.role === 'admin') {
      //管理者の場合
}
else {
      //管理者以外の場合
}
//アクセス制限の機能を三項演算子で
const array70 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },

      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array71 = array70.map((item) => {

      const created = new Date(item.created);
      const today = new Date();
      const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      return {
            ...item,
            diff,
            expired: diff > 3,
      };
}
);
//期限切れのユーザーを取得する
const array72 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },
      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array73 = array72.map((item) => {
      
            const created = new Date(item.created);
            const today = new Date();
            const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
            return {
                  ...item,
                  diff,
                  expired: diff > 3,
            };
}
);
const array74 = array73.filter((item) => item.expired);
//期限の追加などの要素追加（期限、内容、作成日、更新日など）
const array75 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },

      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array76 = array75.map((item) => {

      const created = new Date(item.created);
      const today = new Date();
      const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      return {
            ...item,
            diff,
            expired: diff > 3,
      };
}
);

//期限の追加などの要素追加（期限、内容、作成日、更新日など）三項演算子

//ステータスでスタイルを変更する
const array77 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },
      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array78 = array77.map((item) => {
      
            const created = new Date(item.created);
            const today = new Date();
            const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
            return {
                  ...item,
                  diff,
                  expired: diff > 3,
            };
}
);

//ステータスでスタイルを変更する三項演算子
const array79 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },
      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array80 = array79.map((item) => {
            
                  const created = new Date(item.created);
                  const today = new Date();
                  const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
                  return {
                        ...item,
                        diff,
                        expired: diff > 3,
                  };
}
)
//ステータスでスタイルを変更する三項演算子
const array81 = [
      { id: 1, name: '佐藤', created: '2020-01-01' },
      { id: 2, name: '鈴木', created: '2020-01-02' },
      { id: 3, name: '高橋', created: '2020-01-03' },
      { id: 4, name: '田中', created: '2020-01-04' },
      { id: 5, name: '伊藤', created: '2020-01-05' },
];
const array82 = array81.map((item) => {

      const created = new Date(item.created);
      const today = new Date();
      const diff = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      return {
            ...item,
            diff,
            expired: diff > 3,
      };
}
);

//getServerSidePropsでデータを取得する
export async function getServerSideProps() {
      const res = await fetch('http://localhost:3000/api/users');
      const users = await res.json();
      return {
            props: {
                  users,
            },
      };
}

//next/amp
import Image from 'next/image';
//数値列挙 1~100
const array83 = [...Array(100).keys()].map((item) => item + 1);
//firebase.auth().currentUser.sendEmailVerification()
firebase.auth().currentUser.updateProfile({displayName: '佐藤'})
//ssrとは、サーバーサイドレンダリングのことで、サーバー側でhtmlを生成して、クライアントに返すことを指す。
//クライアントサイドレンダリングとは、htmlを生成してから、データを取得することを指す。
//クライアントサイドレンダリングの場合、htmlを生成してから、データを取得するため、htmlが表示されてから、データが表示されるまでの間に、画面が空白になってしまう。
//chmod
//chmod 777とは、ファイルのパーミッションを777にすることを指す。
//フィルパーミッション777とは、
//chmod 755
//chmod 644
//chmod 600
//chmod 400
//chmod 000

