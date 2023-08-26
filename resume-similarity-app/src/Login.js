import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, getIdToken } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from './logo.png'



export default function Login(props) {
    const navigate = useNavigate();

    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [open3, setOpen3] = React.useState(false);
    const [resetemail, setresetemail] = useState("")




    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

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
        paddingBottom: '45px'
    }
    async function senduserdetails() {
       
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                localStorage.setItem("userPresent", true);
                window.location.reload();
                // props.getuser(user)
            })
            .catch((error) => {
               console.log(error);
            });
            
            

            // localStorage.setItem('rooms', JSON.stringify([...JSON.parse(localRooms), roomid]))
            


    }

    const resetPassword = () => {
        sendPasswordResetEmail(auth, resetemail)
            .then(() => {
                alert("check email")
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const getIdTokenPromise = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                if (user) {
                    getIdToken(user).then((idToken) => {
                        resolve(idToken);
                    }, (error) => {
                        resolve(null);
                    });
                } else {
                    resolve(null);
                }
            });
        });
    };
    getIdTokenPromise()
    return (

        <div className='login' style={loginstyle}>
            <h3 style={{ color: 'white', fontWeight: '400', fontSize: '42px', marginBottom: '10px', }}>Login</h3>
            <img src={Logo} style={{ width: '140px', marginBottom: '1px', marginTop: '10px' }} alt="" />
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
            {/* <button sx={{ marginTop: '21px', fontFamily: 'Poppins', color: 'white', fontSize: '13px', textTransform: 'lowercase' }} onClick={handleClickOpen3} variant="text">Forgot Password ?</button> */}
           
            <button style={{ marginTop: '19px', width: '115px', backgroundColor: '#4F64FD',marginBottom: '15px', color: 'white', padding: '12px 5px', borderRadius: '12px', cursor: 'pointer', fontSize:'16px',boxShadow:'20px' }} onClick={senduserdetails}>Login</button>
            <a onClick={() => props.setSignUp(true)} style={{ marginBottom: '5px', marginTop: '1px', color: 'white', backgroundColor:'transparent', fontSize: '15px', textDecoration:'underline', cursor:'pointer', textUnderlineOffset:'5px'}}>Don't have an account ?</a>

        </div>
    )
};
