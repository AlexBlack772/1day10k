//app.onとは、Electronアプリケーションのイベントを監視するためのメソッドです。
const { app } = require('electron')
app.on('window-all-closed', () => {
   app.quit()
})