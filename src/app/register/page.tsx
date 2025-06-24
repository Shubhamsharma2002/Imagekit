"use client";
import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react'

const RegisterPage = () => {
   const[email , setEmail] = useState("")
   const [password , setPassword] = useState("")
   const [confirmPassword , setConfirmPassword] = useState("")
   const router = useRouter();
   const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(password !== confirmPassword){
        alert("password do not match");
        return;
      }
      try {
             const res =  await fetch ("/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    email,
                    password,
                })
             })
             const data = await res.json();
             if(!res.ok){
                throw new Error(data.error || "Registrtion failed")
             }
             console.log(data);
             router.push("/login");
             
      } catch (error) {
        console.error(error);
      }

   }
    return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
      >
        Register
      </button>
    </form>
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
</div>

  )
}

export default RegisterPage