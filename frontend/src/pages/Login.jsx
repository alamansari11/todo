import { Link } from 'react-router-dom';
import { useState,useContext } from 'react'
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';
import { context } from "../main";
import { Navigate } from 'react-router-dom';

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(context);
  const submitHandler =async (e)=>{
    setLoading(true);
    e.preventDefault();
    try {
      console.log(name,email,password);
   const {data} = await axios.post(
    `${server}/api/v1/users/login`,
      {
      email,password
      },
      {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials:true,
      }
    );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.log("some error");
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }
  if(isAuthenticated) return <Navigate to="/" />;
  return (
    <div className='login'>
    <section>
      <form onSubmit={submitHandler}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email"  placeholder="Email" required/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" required/>
        <button type="submit" disabled={loading}>Login</button>
        <h4>OR</h4>
        <Link to="/register">Signup</Link>
      </form>
    </section>
  
    </div>
  )
}
export default Login;