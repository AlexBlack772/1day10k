//
const { app } = require('electron')
app.on('window-all-closed', () => {
   app.quit()
})

const { clipboard } = require('electron')

clipboard.writeText('Example string', 'selection')
console.log(clipboard.readText('selection'))