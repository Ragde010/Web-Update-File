import React, {useRef, useState} from "react";
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Message() {
    const form = useRef();
    const [user_name, setUserName] =useState("")
    const [user_email, setUserEmail] =useState("")
    const [message, setMessage] =useState("")
   
    const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_xlnz68u', 'template_y9fzbjg', form.current, 'mXFwic0W6xveA-GHr')
        .then((result) => {
            console.log(result.text);
            toast.success('Email sent successfully!', {
              position: 'top-right',
              autoClose: 3000, // 3 seconds
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            setUserName("");
            setUserEmail("");
            setMessage("");
        }, (error) => {
            console.log(error.text);
        });
    };
   
  return (
    <div className="card p-4 shadow ">
      <h2 className="mb-4" style={{ color: 'darkblue', fontWeight: 600 }}>Contact Admin</h2>
    <form ref={form} onSubmit={sendEmail}>
      <div className="mb-2">
      <label className="form-label">Name</label>
      <input className="form-control rounded-1 border-2 " type="text" name="user_name" value={user_name} onChange={(e) => setUserName(e.target.value)} />
      </div>
    <div className="mb-2">
    <label className="form-label">Email</label>
    <input className="form-control rounded-1 border-2 "type="email" name="user_email" value={user_email} onChange={(e) => setUserEmail(e.target.value)}/>
    </div>
    <div className="mb1">
    <label className="form-label">Message</label>
    <textarea className="form-control border-2" name="message" placeholder="Send your concern related to the courses/programs.."rows="4" value={message} onChange={(e) => setMessage(e.target.value)}/>
    <button className="btn btn-primary mt-3 border-dark "style={{ backgroundColor: 'darkblue'}} type="submit" value="Send" >SEND </button>
    </div>
  </form>
  <ToastContainer />
    </div>
  )
}

export default Message

    
