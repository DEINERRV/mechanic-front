import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Menu from './Menu'
import Add from './Add'
import SearchFilter from './SearchFilter'
import Show from './Show'
import Update from './Update'

function MenuManager() {
  return (
    <Routes>
      <Route path='/' element={<Menu />} />
      <Route path='/add' element={<Add/>} />
      <Route path='/search' element={<SearchFilter/>} />
      <Route path='/view' element={<Show/>} />
      <Route path='/update' element={<Update/>} />
    </Routes>
  )
}

export default MenuManager