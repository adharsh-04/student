import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onLoginSubmit = async (userObj) => {
        try {
            const response = await axios.post('http://localhost:3000/userapi/login', userObj);
            alert(response.data.message); // Show success message

            // Check the response object
            console.log(response.data);

            // Store JWT token and username in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username); // Store the username

            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            alert(error.response.data.message || 'Login failed'); // Handle error
        }
    };

    return (
        <div className='container mt-2'>
            <div className='row justify-content-center'>
                <div className='col-lg-4 col-md-6 col-sm-6'>
                    <div className='card shadow'>
                        <div className='card-title text-center border-bottom'>
                            <div className='card-body'>
                                <h2 className='p-3'>Signin</h2>
                                <form onSubmit={handleSubmit(onLoginSubmit)}>
                                    <div className='mb-4'>
                                        <label htmlFor='username' className='form-label'>Username:</label>
                                        <input
                                            type='text'
                                            id='username'
                                            {...register('username', { required: true })}
                                            className='form-control'
                                            placeholder='Enter username'
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='password' className='form-label'>Password:</label>
                                        <input
                                            type='password'
                                            id='password'
                                            {...register('password', { required: true })}
                                            className='form-control'
                                            placeholder='Enter password'
                                        />
                                    </div>
                                    <button type="submit" className='btn btn-info d-block m-auto'>Login</button>
                                    <h5>To create a new account? <a href='/signup'>Register</a></h5>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
