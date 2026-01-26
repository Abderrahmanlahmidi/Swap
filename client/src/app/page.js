import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from './components/layout/Navbar'
import Loading from './components/layout/Loading'

const Hero = dynamic(() => import('./components/sections/Hero'), {
  loading: () => <Loading />,
  ssr: true
})

const NewArrivals = dynamic(() => import('./components/sections/NewArrivals'), {
  loading: () => <div className="h-96 flex items-center justify-center bg-neutral-900 border-t border-neutral-800"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>,
  ssr: true
})

function Home() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Hero />
        <NewArrivals />
      </Suspense>
    </main>
  )
}

export default Home