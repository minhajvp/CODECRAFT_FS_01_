import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../global.css";



export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const Submit= async(e)=>{
        e.preventDefault();
        try {
            const res = await API.post('authentication/token/',{username,password})
            const access = res.data.access;

            localStorage.setItem('access',access)
            nav('/dashboard');

        }catch(error){
            alert('Login Failed'+error.response?.data || error.message)
        }
    }

    return(
        <>
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Login Page</h1>

      <form onSubmit={Submit} className="space-y-4 text-left">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Not Registered?{" "}
        <Link to="/register" className="text-blue-600 hover:underline font-medium">
          Register here
        </Link>
      </p>
    </div>
  </div>
</>

    )
}