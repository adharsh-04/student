import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Welcome Section */}
      <header className="welcome-header text-center">
        <h1>Welcome to Student App</h1>
        <p>Your gateway to exam essentials, printing services, student dashboard, and more. Login or register to explore all the features!</p>
      </header>

      {/* Features Overview */}
      <section className="overview-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            {/* Feature Cards */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card overview-card shadow">
                <div className="card-body">
                  <h3 className="card-title">Exam Essentials</h3>
                  <p>Access past papers, important questions, and study materials designed to help you succeed in exams.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card overview-card shadow">
                <div className="card-body">
                  <h3 className="card-title">Print Services</h3>
                  <p>Easily upload and print your documents at the college printing center. Fast, reliable, and affordable.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card overview-card shadow">
                <div className="card-body">
                  <h3 className="card-title">Student Dashboard</h3>
                  <p>Track your academic progress, attendance, upcoming events, and more in one centralized dashboard.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card overview-card shadow">
                <div className="card-body">
                  <h3 className="card-title">Scholarships</h3>
                  <p>Find scholarship opportunities tailored to your needs and boost your financial support for your studies.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card overview-card shadow">
                <div className="card-body">
                  <h3 className="card-title">Events</h3>
                  <p>Stay up to date with all the college events and register for workshops, seminars, and cultural programs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center py-5">
        <h2>Get Started Now</h2>
        <p className='text-white'> Join the Student App community by logging in or registering for free!</p>
        <div className="cta-buttons">
          <Link to="/signin" className="btn btn-secondary mx-2">Login</Link>
          <Link to="/signup" className="btn btn-secondary mx-2">Register</Link>
        </div>
      </section>

     
    </div>
  );
}

export default Home;
