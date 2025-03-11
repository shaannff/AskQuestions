import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import Questions from "./components/Questions.jsx"


function App() {

 

  return (
    <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path="/questions" element={<Questions/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
