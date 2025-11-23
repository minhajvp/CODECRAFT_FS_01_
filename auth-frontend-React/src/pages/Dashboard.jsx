import { useEffect, useState } from "react";
import API from "../api";
import { logout, refreshAccessToken } from "../auth";
import "../global.css";





export default function Dashboard(){
    const [message,setMessage] = useState('Loading...')

    useEffect(()=>{
        (async()=>{
            try{
                const access = localStorage.getItem('access')
            let res;
            try{
                res = await API.get('authentication/protected/',
                    {headers:{Authorization : `Bearer ${access}`}})
            }catch(error){
                if(error.response?.status === 401){
                    const newAccess = await refreshAccessToken()
                   
                    res = await API.get('authentication/protected/',
                    {headers:{Authorization : `Bearer ${newAccess}`}})
                }
                    
                else{
                       throw error
                    }
                    }
            setMessage(res.data.message)
            
            }catch(error){
                setMessage('Failed to load Data')
            }
            
        })();
    },[])

    return(
       <>
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Dashboard
      </h1>
      <h4 className="text-lg text-gray-600 mb-6">
        {message}
      </h4>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-md transition"
      >
        Logout
      </button>
    </div>
  </div>
</>

    )
}