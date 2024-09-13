import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

function Registration() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  function handleFormSubmit(userObj) {
    axios.post('http://localhost:3000/userapi/new-user', userObj) // Send userObj to backend
      .then(response => {
        alert(response.data.message); // Show success message
        navigate('/signin'); // Redirect to sign-in page
      })
      .catch(error => {
        alert(error.response.data.message || 'Error occurred during registration'); // Handle error
      });
  }

  return (
    <div>
      <form className='w-25 h-50 d-block mx-auto mt-4' onSubmit={handleSubmit(handleFormSubmit)}>
        <h3 className='text-center '>Registration form</h3>
        <div className='m-3'>
          <label className='form-label' htmlFor='username'>Username</label>
          <input className='form-control' id='username' placeholder='Enter username' type='text' {...register('username', { required: true })} />
        </div>
        <div className='m-3'>
          <label className='form-label' htmlFor='rollno'>Roll NO</label>
          <input className='form-control' id='rollno' placeholder='Enter Roll NO' type='text' {...register('rollno', { required: true })} />
        </div>
        <div className='m-3'>
          <label className='form-label' htmlFor='branch'>Branch</label>
          <select className='form-control' id='branch' {...register('branch', { required: true })}>
            <option value=''>Select branch</option>
            <option value='cse'>CSE</option>
            <option value='ece'>ECE</option>
            <option value='eee'>EEE</option>
            <option value='mechanical'>Mechanical</option>
            <option value='civil'>Civil</option>
            <option value='cse-allied'>CSE-Allied</option>
          </select>
        </div>
        <div className='m-3'>
          <label className='form-label' htmlFor='year'>Year</label>
          <select className='form-control' id='year' {...register('year', { required: true })}>
            <option value=''>Select year</option>
            <option value='I'>I</option>
            <option value='II'>II</option>
            <option value='III'>III</option>
            <option value='IV'>IV</option>
          </select>
        </div>
        <div className='m-3'>
          <label className='form-label' htmlFor='email'>Email</label>
          <input className='form-control' id='email' placeholder='Enter Email' type='email' {...register('email', { required: true })} />
        </div>
        <div className='m-3'>
          <label className='form-label' htmlFor='password'>Password</label>
          <input className='form-control' id='password' placeholder='Enter Password' type='password' {...register('password', { required: true })} />
        </div>
        <button type='submit' className='btn btn-success d-block mx-auto'>Register</button>
        <h5>Do you have an account? <a href='/signin'>Login</a></h5>
      </form>
    </div>
  );
}

export default Registration;
