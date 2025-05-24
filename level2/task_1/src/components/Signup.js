import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [form, setform]=useState({name:'',email:'',password:'',role:''});
    const navigate=useNavigate();

    const handleChange=e=>setform({...form, [e.target.name]: e.target.value});

    const handleSubmit=async e=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:3000/api/signup',form);
            alert('Signup successful');
            navigate('/login');
        }
        catch(err){
            alert('Error signing up');
            console.log(err)
        }
    }

    return(
        <div className="form-container">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} required/>
                <input name="email" placeholder="Email" onChange={handleChange} required/>
                <input name="password" placeholder="Password" onChange={handleChange} required/>
                <input name="role" placeholder="Role" onChange={handleChange} required/>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}