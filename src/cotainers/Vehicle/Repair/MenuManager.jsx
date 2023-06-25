import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './Add'
import Update from './Update'
import Show from './Show'

function MenuManager() {
  return (
    <Routes>
      <Route path='/add' element={<Add/>} />
      <Route path='/update' element={<Update/>} />
      <Route path='/' element={<Show/>} />
    </Routes>
  )
}

export default MenuManager