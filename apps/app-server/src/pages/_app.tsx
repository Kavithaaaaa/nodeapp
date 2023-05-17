import { ReactElement, ReactNode, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from '@/components/theme/layout'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}