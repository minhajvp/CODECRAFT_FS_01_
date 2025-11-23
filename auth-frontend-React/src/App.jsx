import { useEffect, useState } from 'react'
import { refreshAccessToken } from './auth'
import { BrowserRouter, Route,Routes,Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './pages/Dashboard'


function App() {
  const [Loading,setLoading] = useState(true)

  useEffect(()=>{
    (async()=>{
      try{
        const access = await refreshAccessToken()
        console.log('Refreshed Access token',access?'OK':'NO')
      }catch(error){
        console.log('Could not refresh access token'+error)
      }finally{
        setLoading(false)
      }
    })()
  },[])
  if(Loading)return <div>Loading....</div>
  return (

    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      
       <Route path='/dashboard' element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
        }/> 
      

    </Routes>
    </BrowserRouter>
  )
}

export default App
