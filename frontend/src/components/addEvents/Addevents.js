import React, { useState } from 'react';
import axios from 'axios';
import useForm from 'react-hook-form'
import './AddEvents.css';

const AddEvents = () => {
   let [register,handleSubmit]=useForm();

   function onSubmit(obj){
    console.log(obj)
   }

    return (
        <div id="container" style={{width:"100vw"}}>
            <div id="image-section" style={{width:"50vw"}}>
                <img src='https://img.freepik.com/free-vector/silhouette-party-crowd-grunge-background_1048-2542.jpg' alt='' className='w-50' id='image'/>
            </div>
            <div id="form-section" style={{width:"50vw"}}>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center text-primary' style={{fontFamily:"italic"}}>Event Registration Form</h3>
                    <label>
                        Event Name:
                        <input type="text" id="eventname" {...register('eventname')} required />
                    </label>
                    <label>
                        Event Picture:
                        <input type="file" id="eventPicture" {...register('eventPicture')} />
                    </label>
                    <label>
                        Organized By:
                        <input type="text" name="organizedBy" id="organized" {...register('organized')} required />
                    </label>
                    <label>
                        Faculty Coordinators:
                        {eventData.facultyCoordinators.map((coord, index) => (
                            <input
                                key={index}
                                type="text"
                                value={coord}
                                onChange={(e) => handleFacultyCoordinatorChange(index, e.target.value)}
                            />
                        ))}
                    </label>
                    <label>
                        Registrations Available:
                        <input type="number" id="registrationsAvailable" {...register('registrationAvailable')}  required/>
                    </label>
                    <label>
                        Event Start Date:
                        <input type="date" name="startDate" required />
                    </label>
                    <label>
                        Event End Date:
                        <input type="date" id="endDate" required />
                    </label>
                    <label>
                        Registration End Date:
                        <input type="date" id="registrationEndDate"  required />
                    </label>
                    <label>
                        Entry Fee (optional):
                        <input type="number" id="entryFee" />
                    </label>
                    <label>
                        Availability:
                        <select name="availability" value={eventData.availability} onChange={handleChange}>
                            <option value="All">All Branches</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Civil">Civil</option>
                            <option value="Allied">Allied Branches</option>
                        </select>
                    </label>
                    <button type="submit">Register Event</button>
                </form>
            </div>
        </div>
    );
};

export default AddEvents;
