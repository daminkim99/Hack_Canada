import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import App from './App.jsx'
import Landing from './pages/landing.jsx'
import Finder from './pages/finder.jsx'
import Login from './pages/login.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
        <Route index element={<Landing/>}/>
      <Route path='/' element={<App/>}>
        <Route path="finder" element={<Finder/>}/>
        <Route path="login" element={<Login/>}/>
      </Route>
    </Routes>

  </Router>
)
