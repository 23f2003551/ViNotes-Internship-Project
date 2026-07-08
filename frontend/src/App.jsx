import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Home from './components/Home';
function App() {
  
  const isLoggedIn = localStorage.getItem("username");

  return (
    <>
       <Routes>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route
          path="/"
          element={
            isLoggedIn
            ? <Navigate to="/home" />
            : <Navigate to="/signin" />
          }
        />
       </Routes>
      
      
    </>
  )
}

export default App
