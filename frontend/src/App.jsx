import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/navbar/Navbar.jsx'
import Posts from './components/posts/Posts'
//importing components of react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/signup/Signup.jsx'
import Home from './Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
            <Route  path="/signup" element={<Signup />} />
          {/*  <Route path='/login' element={<Login/>} /> */}
            <Route path='*' element={<h1>Not Found</h1>}/>
          </Routes>
    </div>
    </Router>
  )
}

export default App
