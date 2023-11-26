import React, { useState } from 'react'
import axios from 'axios';

function Message() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    

    
    const handleMessage = (e) =>{
        e.preventDefault();
        console.log({name,email,message});
        axios.post('http://localhost:3001/message', {name, email, message})
        .then((response) => {
            alert("Message Sent!")
            console.log(response.data);
            setName("")
            setEmail("")
            setMessage("")
        })
        .catch((error) => console.log(error))
    }
  return (
   
      <div className="card p-4 shadow">
        <h2 className="mb-4">Contact Admin</h2>
        <form onSubmit={handleMessage}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input type="text" className="form-control rounded-1" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input type="email" className="form-control rounded-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-1">
            <label htmlFor="message" className="form-label">
              <strong>Message</strong>
            </label>
            <textarea className="form-control" value={message} rows="4" onChange={(e) => setMessage(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
   
 
  )
}

export default Message