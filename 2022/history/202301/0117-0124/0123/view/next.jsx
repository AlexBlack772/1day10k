import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
   const router = useRouter()

   let className = children.props.className || ''
   if (router.pathname === href) {
      className = `${className} active`
   }

   return 
      
}

export function Page() {
   const router = useRouter()

   return (
      <div>
         <button onClick={() => router.push('/0123/view/next')}>Next</button>
      </div>
      
   )
}

const useUser = () => ({ user: null, loading: false })

export default function Page2() {
   const { user, loading } = useUser()
   const router = useRouter()

   useEffect(() => {
      if (!loading && !user) {
         router.push('/0123/view/next')
      }
   }, [user, loading])
   return <p>Redirecting</p>

}

import Link from 'next/link'

export default function Page3() {

   const router = useRouter()
   const [count, setCount] = useState(0)

   return (
      <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>Click me</button>
         <Link href="/0123/view/next">?</Link>
      </div>
   )

}


export default function MyApp({ Component, pageProps }) {
   const router = useRouter()
   return <Component {...pageProps} />
}

export default function Page5() {
   const router = useRouter()

   useEffect(() => {
      router.beforePopState(({ url, as, options }) => {
         if (as !== router.asPath) {
            router.push(as)
         }

         return true
      })
   }, [])



}

import { useEffect } from 'react'

export default function MyApp2({ Component, pageProps }) {
   const router = useRouter()

   useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log('App is changing to: ', url, shallow)
    }
      router.events.on('routeChangeStart', handleRouteChange)

      return () => {
         router.events.off('routeChangeStart', handleRouteChange)
      }
   }, [])

   return <Component {...pageProps} />

}


export async function getStaticProps() {
   const res = await fetch('https://api.github.com/repos/vercel/next.js')
   const data = await res.json()

   return { props: { stars: data.stargazers_count } }

}


export async function getStaticPaths() {
   return {
      paths: [
         { params: { id: '1' } },
         { params: { id: '2' } },
      ],
      fallback: true,
   }
}

export async function getStaticProps(context) {
   return {
      props: {
         post: {
            title: 'My great post',
            content: 'This is my post content',
         },

      }
   }
}

export async function getStaticProps() {
   const res = await fetch('https://api.github.com/repos/vercel/next.js')
   const posts = await res.json()

   return {
      props: {
         posts,
      },
      revalidate: 1,
   }
}

export default async function handler(req, res) {
   if 
}

