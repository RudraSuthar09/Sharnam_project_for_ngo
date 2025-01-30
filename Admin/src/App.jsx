import React from 'react'
import Navbar from './components/Navbar/Navbar '
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { Orders } from './Pages/Orders/Orders'
import List from './Pages/List/List'
import Add from './Pages/Add/add'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>

        </Routes>

      </div>
    </div>
  )
}

export default App