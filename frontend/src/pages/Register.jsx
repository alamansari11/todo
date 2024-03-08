import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { server } from '../main';
import toast from 'react-hot-toast';

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const submitHandler =async (e)=>{
    e.preventDefault();
    try {
      console.log(name,email,password);
   const {data} = await axios.post(
    `${server}/api/v1/users/new`,
      {
      name,email,password
      },
      {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials:true,
      }
    );
      toast.success(data.message);
    } catch (error) {
      console.log("some erro");
      toast.error("some error");
     
    }
  }
  
  return (
    <div className='register'>
    <section>
      <form onSubmit={submitHandler}>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name"  placeholder='Name' required/>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email"  placeholder="Email" required/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" required/>
        <button type="submit">Sign up</button>
        <h4>OR</h4>
        <Link to="/login">Login</Link>
      </form>
    </section>
  
    </div>
  )
}

export default Register