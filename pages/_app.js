import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Layout } from '../src/components/Layout'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default MyApp
