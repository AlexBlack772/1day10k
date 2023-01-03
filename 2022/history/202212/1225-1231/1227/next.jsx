//getServerSidePropsとは、サーバーサイドで実行される関数で、propsを返す
export async function getServerSideProps(context) {
   return {
      props: {}, // will be passed to the page component as props
   }
}

//getStaticPathsとは、静的なページを生成するための関数で、pathsを返す
export async function getStaticPaths() {
   return {
      paths: [
         // See the "paths" section below
      ],
      fallback: true || false
   };
}

//getStaticPropsとは、静的なページを生成するための関数で、propsを返す
export async function getStaticProps(context) {
   return {
      props: {}, // will be passed to the page component as props
   }
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
   return {
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      fallback: false, // can also be true or 'blocking'
   }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
   return {
      // Passed to the page component as props
      props: { post: {} },
   }
}

export default function Post({ post }) {
   // Render post...
}

//useRouterとは、ルーティングの情報を取得するためのフック
import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
   const router = useRouter()
   const style = {
      marginRight: 10,
      color: router.asPath === href ? 'red' : 'black',
   }

   const handleClick = (e) => {
      e.preventDefault()
      router.push(href)
   }

   return (
      <a href={href} onClick={handleClick} style={style}>
         {children}
      </a>
   )
}

export default ActiveLink

//next/routerとは、ルーティングの情報を取得するためのフック
import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.push('/about')}>
         Click me
      </button>
   )
}

//withRouterとは、ルーティングの情報を取得するためのHOC
import { withRouter } from 'next/router'

function Page({ router }) {
   return <p>{router.pathname}</p>
}

export default withRouter(Page)

//router.events.onとは、ルーティングのイベントを取得するためのフック
import { withRouter } from 'next/router'

function Page({ router }) {
   return <p>{router.pathname}</p>
}

export default withRouter(Page)

//router.reloadとは、ページをリロードするためのフック
import { useRouter } from 'next/router'

import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.reload()}>
         Click here to reload
      </button>
   )
}

//router.backとは、ページを戻るためのフック
import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.back()}>
         Click here to go back
      </button>
   )
}

//import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.back()}>
         Click here to go back
      </button>
   )
}

//router.beforePopStateとは、ページを戻る前に処理を実行するためのフック
import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (as !== '/' || as !== '/other') {
         // Have SSR render bad routes as a 404.
         window.location.href
      }

      // If you return false, the navigation will be blocked
      return true
   })

   return (
      <button type="button" onClick={() => router.back()}>
         
      </button>
   )
}

//router.pushとは、ページを遷移するためのフック
import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.push('/about')}>
         Click me
      </button>
   )
}

//router.replaceとは、ページを遷移するためのフック
import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.replace('/home')}>
         Click me
      </button>
   )
}

import Link from 'next/link'
import styled from 'styled-components'

// This creates a custom component that wraps an <a> tag
const RedLink = styled.a`
  color: red;
`

function NavLink({ href, name }) {
   return (
      <Link href={href} passHref legacyBehavior>
         <RedLink>{name}</RedLink>
      </Link>
   )
}

export default NavLink

//next.imageとは、画像を表示するためのコンポーネント
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
   return (
      <Image
         loader={myLoader}
         src="me.png"
         alt="Picture of the author"
         width={500}
         height={500}
      />
   )
}

module.exports = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'example.com',
            port: '',
            pathname: '/account123/**',
         },
      ],
   },
}

//next/imageとは、画像を表示するためのコンポーネント

//next/scriptとは、外部スクリプトを読み込むためのコンポーネント
import Script from 'next/script'

export default function Dashboard() {
   return (
      <>
         <Script src="https://example.com/script.js" />
      </>
   )
}

//
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
   return (
      <>
         <Script
            src="https://example.com/script.js"
            strategy="beforeInteractive"
         />
         <Component {...pageProps} />
      </>
   )
}

import Script from 'next/script'

export default function Page() {
   return (
      <>
         <Script src="https://example.com/script.js" strategy="lazyOnload" />
      </>
   )
}

//next/scriptとは、外部スクリプトを読み込むためのコンポーネント
import Script from 'next/script'

//onLoadとは、スクリプトが読み込まれた時に実行するためのフック
export default function Page() {
   return (
      <>
         <Script
            src="https://example.com/script.js"
            onLoad={() => {
               console.log('Script loaded!')
            }}
         />
      </>
   )
}

//onErrorとは、スクリプトが読み込まれなかった時に実行するためのフック
export default function Page() {
   return (
      <>
         <Script
            src="https://example.com/script.js"
            onError={() => {
               console.log('Script failed to load!')
            }}
         />
      </>
   )
}

//onReadyとは、スクリプトが読み込まれた時に実行するためのフック
export default function Page() {
   return (
      <>
         <Script
            src="https://example.com/script.js"
            onReady={() => {
               console.log('Script ready!')
            }}
         />
      </>
   )
}

//next/headとは、ページのヘッダーを管理するためのコンポーネント
import Head from 'next/head'

function IndexPage() {
   return (
      <div>
         <Head>
            <title>My page title</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
         <p>Hello world!</p>
      </div>
   )
}

export default IndexPage

import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage

//next/headとは、ページのヘッダーを管理するためのコンポーネント
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    fetch('https://my-analytics-platform.com', {
      method: 'POST',
      body: JSON.stringify({ pathname: req.nextUrl.pathname }),
    })
  )

  return NextResponse.next()
}