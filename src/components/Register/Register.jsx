import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        // 1. prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');
        // 2. Collect from data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name, email, password);
        // Validate
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add at least one uppercase character.')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Please add at least two number characters.')
            return;
        }
        else if (password.length < 6) {
            setError('Please add at least six characters in your password.')
            return;
        }

        //3. Create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();
                setSuccess('User has been created successfully.')
                sendVerificationEmail(result.user);
                updateUserData(result.user, name);
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            })
    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert('Please verify your email address')
        })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
        .then( () => {
            console.log('User name updated');
        })
        .catch(error => {
            setError(error.message)
        })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div className='flex justify-center font-sans'>
            <div>
                <h4 className='mt-1 text-xl font-medium flex justify-center'>Please Register</h4>
                <form onSubmit={handleSubmit}>
                    <input className='border border-black p-3 w-96 rounded-lg mt-3' type="text" name="name" id="name" placeholder='Type Your Name' required />
                    <br />
                    <input onChange={handleEmailChange} className='border border-black p-3 w-96 rounded-lg mt-3' type="email" name="email" id="email" placeholder='Type Your Email' required />
                    <br />
                    <input onBlur={handlePasswordBlur} className='border border-black p-3 w-96 mt-4 rounded-lg' type="password" name="password" id="password" placeholder='Type Your Password' required />
                    <br />
                    <p className='text-red-500'>{error}</p>
                    <p className='text-green-500'>{success}</p>
                    <div className='flex justify-center'>
                        <input className='mt-5 bg-sky-500 text-white text-base font-medium p-2 rounded-md w-28' type="submit" value="Register" />
                    </div>
                </form>
                <p className='text-sm mt-2'>Already have an account? Please <Link to="/login" className='text-blue-500'>Login.</Link></p>
            </div>
        </div>
    );
};

export default Register;