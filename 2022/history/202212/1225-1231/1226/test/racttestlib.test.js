//containerとは、テスト対象のコンポーネントをレンダリングするためのDOM要素を指定するオプション
const table = document.createElement('table')

const { container } = render(<TableBody {...props} />, {
   container: document.body.appendChild(table),
})

//hydrateとは、DOM要素をReact要素にマウントするための関数
hydrate(<TableBody {...props} />, container)

//legacyRootとは、Reactのルート要素を指定するオプション
const { container, legacyRoot } = render(<TableBody {...props} />, {
   container: document.body.appendChild(table),
})

//wrapperとは、テスト対象のコンポーネントをレンダリングするためのDOM要素を指定するオプション
const { container, wrapper } = render(<TableBody {...props} />, {
   container: document.body.appendChild(table),
})

//queriesとは、DOM要素を取得するための関数を指定するオプション
const { container, queries } = render(<TableBody {...props} />, {
   container: document.body.appendChild(table),
})

