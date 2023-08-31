import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth'
import { storage, } from './firebase'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Logo from './logo.png'




export default function Signup(props) {
    const navigate = useNavigate();

    const auth = getAuth()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setName] = useState('')
   
    
    

    async function signup() {
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    localStorage.setItem("userPresent", true);
                    window.location.reload();
                    // console.log(auth.currentUser);
                    // props.getuser(auth.currentUser)
                }).catch((error) => {
                });

            })
            .catch((error) => {
               console.log(error)
            });
    }



    return (
        <div className='login' style={loginstyle}>
            <h3 style={{ color: 'white', fontWeight: '400', fontSize: '42px', marginBottom: '10px', marginTop: '-20px' }}>Signup</h3>
            <img src={Logo} style={{ width: '140px', marginBottom: '1px', marginTop: '10px' }} alt="" />

            <input
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '85%', marginTop: '29px', fontSize: '13.75px', fontFamily: 'Poppins', backgroundColor: '#3C393F', height: '45px', border: 'none', outline: 'none', borderRadius: '7px', color: 'white', padding: '6px 13px' }}
                placeholder="Choose a Usename"
            />
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '85%', marginTop: '29px', fontSize: '13.75px', fontFamily: 'Poppins', backgroundColor: '#3C393F', height: '45px', border: 'none', outline: 'none', borderRadius: '7px', color: 'white', padding: '6px 13px' }}
                placeholder="Enter email"
            />

            <input
                type="password"
                value={password}
                onChange={e => setpassword(e.target.value)}
                style={{ width: '85%', marginTop: '29px', fontSize: '13.75px', fontFamily: 'Poppins', backgroundColor: '#3C393F', height: '45px', border: 'none', outline: 'none', borderRadius: '7px', color: 'white', padding: '6px 13px' }}
                placeholder="Enter password"
            />
            

            <button onClick={() => signup()} style={{ marginTop: '35px',marginBottom: '15px', width: '115px', backgroundColor: '#4F64FD', color: 'white', padding: '12px 5px', borderRadius: '8px', cursor: 'pointer', fontSize:'16px' }} >Sign Up</button>
            <a onClick={() => props.setSignUp(false)} style={{ marginBottom: '5px', marginTop: '1px', color: 'white', backgroundColor:'transparent', fontSize: '15px', textDecoration:'underline', cursor:'pointer', textUnderlineOffset:'5px'}}>Already have an account ?</a>
        </div>
    )
}
const loginstyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '452px',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit-content',
    padding: '62px 21px',
    backgroundColor: '#252329',
    borderRadius: '18px',
    textAlign: 'center',
}
