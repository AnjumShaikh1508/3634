import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import AppRoutes from './Routes/AppRoutes'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
