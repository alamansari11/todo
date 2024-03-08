import React, { useState } from 'react'
import { server } from '../main';
import axios from 'axios';

function Home() {
  const [response,setResponse] = useState("");
  const submitHandler =async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.get(
        `${server}`,
          {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials:true,
          }
        )
        setResponse(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
    <form onSubmit={submitHandler}>
    <button type="submit">Check for server</button>
    </form>
    <p id="para">{response}</p>

    </div>
  )
}

export default Home