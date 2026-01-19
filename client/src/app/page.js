import React from 'react'
import Hero from './components/sections/Hero'
import Navbar from './components/layout/Navbar'
import NewArrivals from './components/sections/NewArrivals'

function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <NewArrivals />
    </main>
  )
}

export default Home