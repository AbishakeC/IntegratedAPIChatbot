import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Signup = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { signup } = useAuth();

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen min-w-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-black text-white'>
            <div className='bg-black/40 p-8 rounded-lg shadow-2xl shadow-green-900/40 w-full max-w-md border border-emerald-800/50 backdrop-blur-sm'>
                <h2 className='text-3xl font-bold text-center mb-6 text-emerald-400'>Create Account</h2>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label className='block mb-1 text-sm text-emerald-200/80'>Username</label>
                        <input
                            type='text'
                            name='username'
                            placeholder='Choose a username'
                            className='w-full p-3 rounded bg-black/60 border border-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors'
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className='block mb-1 text-sm text-emerald-200/80'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            className='w-full p-3 rounded bg-black/60 border border-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors'
                            value={inputs.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className='block mb-1 text-sm text-emerald-200/80'>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Create a password'
                            className='w-full p-3 rounded bg-black/60 border border-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors'
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className='block mb-1 text-sm text-emerald-200/80'>Confirm Password</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm your password'
                            className='w-full p-3 rounded bg-black/60 border border-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors'
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type='submit'
                        className='mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-200'
                    >
                        Sign Up
                    </button>
                </form>

                <p className='mt-6 text-center text-sm text-gray-400'>
                    Already have an account? <Link to='/login' className='text-emerald-400 hover:text-emerald-300'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
