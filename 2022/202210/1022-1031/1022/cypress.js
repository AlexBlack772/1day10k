//cy.get().should('have.text', 'Cypress.io')
//cyとは、Cypressのコマンドを実行するためのオブジェクト
//getとは、要素を取得するためのコマンド
//shouldとは、要素の状態を検証するためのコマンド
cy.get('h1').should('have.text', 'Cypress.io')
//cy.contains()は、指定したテキストを含む要素を取得する
cy.contains('h1', 'Cypress.io')
//cy.get().should().invoke()は、要素の状態を検証するためのコマンド
//invokeとは、要素のメソッドを実行するためのコマンド
cy.get('h1').should('have.text', 'Cypress.io').invoke('text').then((text) => {
  expect(text).to.equal('Cypress.io')
})
//Cypress.Blob.method()は、Blobオブジェクトのメソッドを実行する
//Cypress.Blobは、Blobオブジェクトを操作するためのオブジェクト
//Blobとは、バイナリデータを扱うためのオブジェクト
cypress._.method()
//_.method()は、指定したメソッドを実行する
//_.method()は、Cypress._.method()のエイリアス
//cypress.cookies.debug()は、Cookieのデバッグを有効にする
//cypress.cookies.defaults()は、Cookieのデフォルトを設定する
//cypress.commands.add()は、コマンドを追加する
//cypress.commands.overwrite()は、コマンドを上書きする
//cypress.config()は、Cypressの設定を取得する
//cypress.env()は、環境変数を取得する
cypress.command.add()
cypress.command.overwrite()
