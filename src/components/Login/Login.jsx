import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // Validation
        setError('');
        setSuccess('');

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add at least one uppercase character.')
            return;
        }
        else if (!/[!@#$&*]/.test(password)) {
            setError('Please add a special character.')
            return;
        }
        else if (password.length < 6) {
            setError('Please add at least six characters in your password')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if (!loggedUser.emailVerified) {

                }
                event.target.reset();
                setSuccess('User login successful.')
            })
            .catch(error => {
                setError(error.message)
            })

    }

    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Pleass provide your email address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then( () => {
            alert('Pleass check your email')
        })
        .catch(error => {
            console.log(error);
            setError(error.message);
        })
    }

    return (
        <div className='font-sans'>
            <h2 className='flex justify-center text-xl font-medium mt-20'>Please login</h2>
            <div className="flex justify-center mt-5">
                <form onSubmit={handleLogin} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email address</label>
                        <input type="email" ref={emailRef} id="email" name='email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <input type="password" id="password" name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" required />
                        <p className='text-red-500'>{error}</p>
                        <p className='text-green-500'>{success}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
                    </div>
                    <p className='text-xs font-sans font-thin my-3'>Forget Password? Please <button onClick={handleResetPassword} className='text-blue-500'>Reset Password</button></p>
                    <div>
                        <p className='text-xs font-sans font-thin'>New to this website? Please<Link to="/register" className='text-blue-500'> Register.</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;