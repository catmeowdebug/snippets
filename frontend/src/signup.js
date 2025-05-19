import React,{useState} from 'react';
import './loginandsignup.css'
function Signup() {
    const[name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const[message,setmessage]=useState('');
    const handlesignup=async(e)=>{
        e.preventDefault();
        const res= await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({name,email,password}),
        });
        const data=await res.json();
        if(res.ok){
            alert("User created successfully!");

        }else{
            alert(data.message || 'Signup failed');
        }
    };
    return (
        <div className="auth-container">
            <h2>Signup</h2>
            {message && <p className="auth-message">{message}</p>}
            <form className="auth-form" onSubmit={handlesignup}>
                <input
                    className="auth-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                />
                <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />
                <button className="auth-button" type="submit">Signup</button>
            </form>
        </div>
    );

}
export default Signup