import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './Add'
import Update from './Update'

function MenuManager() {
  return (
    <Routes>
      <Route path='/add' element={<Add/>} />
      <Route path='/update' element={<Update/>} />
    </Routes>
  )
}

export default MenuManager