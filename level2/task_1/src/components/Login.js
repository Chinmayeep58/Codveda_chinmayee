import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [form, setform]=useState({email:'',password:''})
    const navigate=useNavigate()

    const handleChange = e => setform({ ...form, [e.target.name]: e.target.value });

    const handleSubmit=async e=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:3000/api/login',form)
            localStorage.setItem('token',res.data.token)
            alert('Login successful')
            navigate('/dashboard')
        }
        catch(err){
            console.log(err)
            alert('Login failed'+ err.response.data.error)
        }
    }

    return(
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email"  onChange={handleChange} required/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}