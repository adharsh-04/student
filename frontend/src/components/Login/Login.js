import React from 'react'
import {useForm} from "react-hook-form" 
import { useNavigate } from 'react-router-dom';

function Login() {
  let {register,handleSubmit}=useForm();
  let navigate=useNavigate();

  function onLoginSuubmit(userObj){
    console.log(userObj)
    navigate('/dashboard')
  }

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
      <div className='col-lg-4 col-md-6 col-sm-6'>
        <div className='card shadow'>
          <div className='card-title text-center border-bottom'>
            <div className='card-body'>
              <h2 className='p-3'> Signin</h2>
              <form  onSubmit={handleSubmit(onLoginSuubmit)}>
                <div className='mb-4'>
                <label htmlFor='username' className='form-label'>Username:</label>
                <input 
                type='text'
                id="username"
                {...register("username")}
                className='form-control'
                placeholder='Enter username'
                />
                </div>
                <div className='mb-4'>
                <label htmlFor='username' className='form-label'>Password:</label>
                <input 
                type='password'
                id="password"
                {...register("password")}
                className='form-control'
                placeholder='Enter password'
                />
                </div>
                 <button type="submit" className='btn btn-info d-block m-auto'>Login</button>
                 <h5>To create new account? <a href='signup' >Register</a></h5>
              </form>

            </div>
          </div>

        </div>

      </div>
      </div>
    </div>
  )
}

export default Login