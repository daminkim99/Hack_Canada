import React from 'react'
import {Outlet} from 'react-router-dom'

const App= () => {
  return(
    <div>
      <header>
      <h1>Whatever</h1>
      <nav>
        <a href="/">Home</a> |
        <a href="/finder">Finder</a> |
        <a href="/login">Login</a>|
      </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
export default App