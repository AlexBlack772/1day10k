//useRouterとは、next.jsの機能で、URLの情報を取得するためのフック
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

//withRouterとは、next.jsの機能で、URLの情報を取得するためのフック
import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.push('/about')}>
         Click me
      </button>
   )
}

import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   return (
      <button type="button" onClick={() => router.replace('/home')}>
         Click me
      </button>
   )
}

//router.beforePopStateとは、next.jsの機能で、URLの情報を取得するためのフック
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
   const router = useRouter()

   useEffect(() => {
      router.beforePopState(({ url, as, options }) => {
         // I only want to allow these two routes!
         if (as !== '/' && as !== '/other') {
            // Have SSR render bad routes as a 404.
            window.location.href = as
            return false
         }

         return true
      })
   }, [])

   return <p>Welcome to the page</p>
}

//import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
   const router = useRouter()

   useEffect(() => {
      const handleRouteChange = (url, { shallow }) => {
         console.log(
            `App is changing to ${url} ${shallow ? 'with' : 'without'
            } shallow routing`
         )
      }

      router.events.on('routeChangeStart', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
         router.events.off('routeChangeStart', handleRouteChange)
      }
   }, [])

   return <Component {...pageProps} />
}

//
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
   const router = useRouter()

   useEffect(() => {
      const handleRouteChangeError = (err, url) => {
         if (err.cancelled) {
            console.log(`Route to ${url} was cancelled!`)
         }
      }

      router.events.on('routeChangeError', handleRouteChangeError)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
         router.events.off('routeChangeError', handleRouteChangeError)
      }
   }, [])

   return <Component {...pageProps} />
}

//withRouterとは、next.jsの機能で、URLの情報を取得するためのフック
import { withRouter } from 'next/router'

function Page({ router }) {
   return <p>{router.pathname}</p>
}

export default withRouter(Page)


//
import Link from 'next/link'

function Posts({ posts }) {
   return (
      <ul>
         {posts.map((post) => (
            <li key={post.id}>
               <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                  {post.title}
               </Link>
            </li>
         ))}
      </ul>
   )
}

export default Posts



// 
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

//
import Link from 'next/link'

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
const MyButton = React.forwardRef(({ onClick, href }, ref) => {
   return (
      <a href={href} onClick={onClick} ref={ref}>
         Click Me
      </a>
   )
})

function Home() {
   return (
      <Link href="/about" passHref legacyBehavior>
         <MyButton />
      </Link>
   )
}

export default Home

//
export function middleware(req) {
   const nextUrl = req.nextUrl
   if (nextUrl.pathname === '/dashboard') {
      if (req.cookies.authToken) {
         return NextResponse.rewrite('/auth/dashboard')
      } else {
         return NextResponse.rewrite('/public/dashboard')
      }
   }
}

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

import Image from 'next/image'
const Example = () => (
   <div className="grid-element">
      <Image
         src="/example.png"
         fill
         sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
   </div>
)

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

//
import Script from 'next/script'

export default function Page() {
   return (
      <>
         <Script src="https://example.com/script.js" strategy="afterInteractive" />
      </>
   )
}

//workerとは
import Script from 'next/script'

export default function Home() {
   return (
      <>
         <Script src="https://example.com/script.js" strategy="worker" />
      </>
   )
}

//onErrorとは、
import Script from 'next/script'

export default function Page() {
   return (
      <>
         <Script
            src="https://example.com/script.js"
            onError={(e) => {
               console.error('Script failed to load', e)
            }}
         />
      </>
   )
}

//'next/head'とは、
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

//'next/head'とは、
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

//ampとは、ampのページを作成するためのコード
export const config = { amp: true }

function About(props) {
   return <h3>My AMP About Page!</h3>
}

export default About

//useAmpとは、ampのページを作成するためのコード
import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

function About(props) {
   const isAmp = useAmp()

   return (
      <div>
         <h3>My AMP About Page!</h3>
         {isAmp ? (
            <amp-img
               width="300"
               height="300"
               src="/my-img.jpg"
               alt="a cool image"
               layout="responsive"
            />
         ) : (
            <img width="300" height="300" src="/my-img.jpg" alt="a cool image" />
         )}
      </div>
   )
}

export default About

//nextResponseとは、serverのレスポンスを返すためのコード
//nextRequestとは、serverのリクエストを返すためのコード
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

//userAgentとは、
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
   const url = request.nextUrl
   const { device } = userAgent(request)
   const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
   url.searchParams.set('viewport', viewport)
   return NextResponse.rewrite(url)
}

//loaderとは、
import Image from 'next/legacy/image'

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

//onLoadingCompleteとは、
import Image from 'next/legacy/image'
import React from 'react'

const Example = () => {
   const lazyRoot = React.useRef(null)

   return (
      <div ref={lazyRoot} style={{ overflowX: 'scroll', width: '500px' }}>
         <Image lazyRoot={lazyRoot} src="/one.jpg" width="500" height="500" />
         <Image lazyRoot={lazyRoot} src="/two.jpg" width="500" height="500" />
      </div>
   )
}

