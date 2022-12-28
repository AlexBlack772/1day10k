//文字列分割の関数
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
      return result;
}
//jsonplaceholderのAPIを利用して、データを取得する関数
function getJsonDate() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = function() {
         if (xhr.status === 200) {
            var json = xhr.response;
            var str = "";
            for (var i = 0; i < json.length; i++) {
               str += json[i].title + "";
            }
            var strArray = splitString(str, 40);
            var strArray2 = joinString(str, 40);
            var strArray3 = strArray2.join("");
            console.log(strArray);
            console.log(strArray2);
            console.log(strArray3);
         }
      }
   
}
//取得したデータを表示する関数
function showJsonDate() {
      getJsonDate();
}
//動的確認アラートの関数
function alertTest() {
      alert("動的確認アラート");
}
//firebase auth()でログインする関数
function login() {
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // ...
      });
}
//firebase auth()でsnsログインする関数
function snsLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
         // This gives you a Google Access Token. You can use it to access the Google API.
         var token = result.credential.accessToken;
         // The signed-in user info.
         var user = result.user;
         // ...
      }).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // The email of the user's account used.
         var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
         var credential = error.credential;
         // ...
      });
}
//firebase auth()でログアウトする関数
function logout() {
      firebase.auth().signOut().then(function() {
         // Sign-out successful.
      }).catch(function(error) {
         // An error happened.
      });
}
//firebase auth()でユーザー情報を取得する関数
function getUser() {
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
         } else {
            // User is signed out.
            // ...
         }
      });
}
//firebase auth()でユーザー情報を更新する関数
function updateUser() {
      var user = firebase.auth().currentUser;
      user.updateProfile({
         displayName: "Jane Q. User",
         photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
         // Update successful.
      }).catch(function(error) {
         // An error happened.
      });
}
//firebase auth()でユーザー情報を削除する関数
function deleteUser() {
      var user = firebase.auth().currentUser;
      user.delete().then(function() {
         // User deleted.
      }).catch(function(error) {
         // An error happened.
      });
}
//firebase auth()でメールアドレスを更新する関数
function updateEmail() {
      var user = firebase.auth().currentUser;
      var newEmail = document.getElementById("newEmail").value;
      user.updateEmail(newEmail).then(function() {
         // Update successful.
      }).catch(function(error) {
         // An error happened.
      });
}
//firebase auth()でパスワードを更新する関数
function updatePassword() {
      var user = firebase.auth().currentUser;
      var newPassword = document.getElementById("newPassword").value;
      user.updatePassword(newPassword).then(function() {
         // Update successful.
      }).catch(function(error) {
         // An error happened.
      });
}
//user.updateProfile()でユーザー情報を更新する関数
function updateProfile() {
      var user = firebase.auth().currentUser;
      var displayName = document.getElementById("displayName").value;
      var photoURL = document.getElementById("photoURL").value;
      user.updateProfile({
         displayName: displayName,
         photoURL: photoURL
      }).then(function() {
         // Update successful.
      }).catch(function(error) {
         // An error happened.
      });
}
//firebase userProfile()でユーザー画像を更新する関数
function updatePhoto() {
      var user = firebase.auth().currentUser;
      var photoURL = document.getElementById("photoURL").value;
      user.updateProfile({
         photoURL: photoURL
      }).then(function() {
         // Update successful.
      }).catch(function(error) {
         // An error happened.
      });
}
//firebase userProfile()でユーザー名を更新する関数
function updateName() {
      var user = firebase.auth().currentUser;
      var displayName = document.getElementById("displayName").value;
      user.updateProfile({
         displayName: displayName
      }).then(function() {
         // Update successful.
      }).catch(function(error) {
         // An error happened.
      });
}

//ドキュメントを監視する処理を実装する
userStatusFirestoreRef.onSnapshot((doc) => {
   let isOnline = doc.data().state == 'online';
});

//Cloud Firestoreをモニタリングする処理を実装する
/* 実装例 */
firebase
   .firestore()
   .collection('status')
   .where('state', '==', 'online')
   .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
         if (change.type === 'added') {
            const msg = 'User ' + change.doc.id + ' is online.'
            console.log(msg)
         }
         if (change.type === 'removed') {
            const msg = 'User ' + change.doc.id + ' is offline.'
            console.log(msg)
         }
      })
   })
//Cloud Firestoreをモニタリングする処理を実装する
/* 実装例 */
firebase

   .firestore()
   .collection('status')
   .where('state', '==', 'online')
   .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
         if (change.type === 'added') {
            const msg = 'User ' + change.doc.id + ' is online.'
            console.log(msg)
         }
         if (change.type === 'removed') {
            const msg = 'User ' + change.doc.id + ' is offline.'
            console.log(msg)
         }
      })
   }
//firebase.firestore().collection('users').doc(id).set()を実装する

//1分毎に実行する
setInterval(function () {
   //現在の日時を取得する
   var now = new Date();
   //現在の日時をフォーマットする
   var nowStr = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
   //現在の日時を表示する
   console.log(nowStr);
   //現在の日時をCloud Firestoreに保存する
   firebase.firestore().collection('users').doc(id).set({
      time: nowStr
   });
}

const mailTransport = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: gmailEmail,
      pass: gmailPassword
   }
})
//pubhubとは、Firebase Cloud Messagingを使用して、Webアプリケーションのユーザーに通知を送信するためのサービスです。
//onRunとは、Cloud Functions for Firebaseのエントリーポイントです。
exports.sendMail = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
   const email = {
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
//onCreateとは、Cloud Firestoreのドキュメントが作成されたときにトリガーされる関数です。
exports.createUser = functions.firestore
   .document('users/{userId}')
   .onCreate((snap, context) => {
      firebase.firestore().collection('chatrooms').add({
      })
   });
//onUpdateとは、Cloud Firestoreのドキュメントが更新されたときにトリガーされる関数です。
exports.updateUser = functions.firestore
   .document('users/{userId}')
   .onUpdate((change, context) => {
      const before = change.before.data();
      const after = change.after.data();
      if (before.name != after.name) {
         firebase.firestore().collection('chatrooms').add({
         })
      }
   }
//onDeleteとは、Cloud Firestoreのドキュメントが削除されたときにトリガーされる関数です。
exports.deleteUser = functions.firestore

   .document('users/{userId}')
   .onDelete((snap, context) => {
      firebase.firestore().collection('chatrooms').add({
      })
   }

//絞り込み機能を実装する
/* 実装例 */
//詳細を表示する
//一覧表示
      import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
   console.log("Current data: ", doc.data());
});
//onsnapshotを使用して、ドキュメントの変更を監視する
//

