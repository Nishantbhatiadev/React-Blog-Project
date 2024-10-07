import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from "react-redux"
import authService from './appWrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'



const App = () => {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()


  useEffect(() => {
    authService.getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout({}))
        }
      })
      .finally(() => setloading(false))
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          //
          <main>
            <Outlet /> //ToDo
          </main>
          //
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default App