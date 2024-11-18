import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import './App.css'
import authService from './appWrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components/index/index'

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet /> //ToDo
          </main>
          <Footer />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default App