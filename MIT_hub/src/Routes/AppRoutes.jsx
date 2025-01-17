import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import MarketPlace from '../Pages/MarketPlace'
import Packages from '../Pages/Packages'
import Profile from '../Pages/Profile'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/marketplace' element={<MarketPlace />}/>
            <Route path='/packages' element={<Packages />}/>
            <Route path='/profile' element={<Profile />}/>
        </Routes>
    </div>
  )
}

export default AppRoutes