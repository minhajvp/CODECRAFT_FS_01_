import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../global.css";





export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const Create = async (e) => {
        e.preventDefault();
        try {
            await API.post("authentication/register/", {
                username,email,password});
                alert("Registration Successful");
                nav("/login");
        } catch (error) {
            alert("Registration Failed"+JSON.stringify(error.response?.data ||error.message));
        }}
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Registration Page
    </h1>

    <form onSubmit={Create} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Register
      </button>
    </form>
  </div>
</div>

    )
}