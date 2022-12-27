//useRouterとは、next.jsの機能で、ページ遷移を行うための関数
import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "red" : "black",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;


//router.pushとは、ページ遷移を行う関数
//router.asPathとは、現在のページのパスを取得する関数

//router.prefetchとは、ページ遷移を行う前に、次のページを読み込む関数
router.prefetch(url, as, options);

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) router.push('/dashboard')
    })
  }, [])

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  )
}

//beforePopStateとは、ブラウザの戻るボタンを押したときに、ページ遷移を行う関数
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

//router.backとは、ブラウザの戻るボタンを押したときに、ページ遷移を行う関数
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
  )
}

//router.reloadとは、ページをリロードする関数
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.reload()}>
      Click here to reload
    </button>
  )
}

//router.eventsとは、ページ遷移のイベントを取得する関数
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
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


//Linkとは、ページ遷移を行うためのコンポーネント
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  )
}

export default Home


//getInitialPropsとは、ページ遷移を行う前に、データを取得する関数
function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page

//getServerSidePropsとは、ページ遷移を行う前に、データを取得する関数
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  }
}

//getStaticPropsとは、ページ遷移を行う前に、データを取得する関数
export async function getStaticProps(context) {
  return {
    props: {
      // props for your component
    },
  }
}

//getStaticPathsとは、ページ遷移を行う前に、データを取得する関数
export async function getStaticPaths() {
  return {
    paths: [
      // See the "paths" section below
    ],
    fallback: true,
  }
}

//Context parameterとは、ページ遷移を行う前に、データを取得する関数
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  }
}

//getStaticProps return valuesとは、ページ遷移を行う前に、データを取得する関数
export async function getStaticProps() {
  return {
    props: {
      // props for your component
    },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1, // In seconds
  }
}

//next/scriptとは、ページ遷移を行う前に、データを取得する関数
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}

//next/imageとは、ページ遷移を行う前に、データを取得する関数
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    </div>
  )
}

//next/headとは、ページ遷移を行う前に、データを取得する関数
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

//next/headとは、ページ遷移を行う前に、データを取得する関数
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

//next/ampとは、ページ遷移を行う前に、データを取得する関数
export const config = { amp: true }

export const config = { amp: true }

function About(props) {
  return <h3>My AMP About Page!</h3>
}

export default About

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

//next/serverとは、ページ遷移を行う前に、データを取得する関数
import { createServer } from 'http'

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

//NextRequestとは、ページ遷移を行う前に、データを取得する関数
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}

//NextResponseとは、ページ遷移を行う前に、データを取得する関数
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

//getInitialPropsとは、ページ遷移を行う前に、データを取得する関数
function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page

//getServerSidePropsとは、ページ遷移を行う前に、データを取得する関数
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  }
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}

//getStaticPathsとは、ページ遷移を行う前に、データを取得する関数
// pages/posts/[id].js

function Post({ post }) {
  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post

//getStaticPropsとは、ページ遷移を行う前に、データを取得する関数
export async function getStaticProps(context) {
  return {
    props: {
      // props for your component
    },
  }
}

//next/routerとは、ページ遷移を行う前に、データを取得する関数
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

import { useRouter } from 'next/router'

//useRouterとは、ページ遷移を行う前に、データを取得する関数
export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/about')}>
      Click me
    </button>
  )
}

//next/linkとは、ページ遷移を行う前に、データを取得する関数
import Link from 'next/link'

//Linkとは、ページ遷移を行う前に、データを取得する関数
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  )
}

export default Home

//next/linkとは、ページ遷移を行う前に、データを取得する関数
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

//next/imageとは、ページ遷移を行う前に、データを取得する関数
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

//next/imageとは、ページ遷移を行う前に、データを取得する関数
import Image from 'next/image'

//getSessionとは、ページ遷移を行う前に、データを取得する関数
import { getSession } from 'next-auth/client'

async function myFunction() {
  const session = await getSession()
  /* ... */
}

//getCsrfTokenとは、ページ遷移を行う前に、データを取得する関数
import { getCsrfToken } from 'next-auth/client'
async function myFunction() {
  const csrfToken = await getCsrfToken()
  /* ... */
}

//getProvidersとは、ページ遷移を行う前に、データを取得する関数

import { getProviders } from "next-auth/react"

export default async (req, res) => {
  const providers = await getProviders()
  console.log("Providers", providers)
  res.end()
}

//signInとは、ページ遷移を行う前に、データを取得する関数
import { signIn } from 'next-auth/client'

signIn('github')
import { signIn } from "next-auth/react"

export default () => <button onClick={() => signIn()}>Sign in</button>