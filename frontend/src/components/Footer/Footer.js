import React from 'react';
import './Footer.css'; // Custom CSS for styling

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center mb-3">
            <h5>Media</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-4 text-center mb-3">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Help</a></li>
              <li><a href="#" className="text-white">Support</a></li>
              <li><a href="#" className="text-white">FAQ</a></li>
            </ul>
          </div>
          <div className="col-md-4 text-center mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><span>Phone: 87989379832</span></li>
              <li><a href="#" className="text-white">Email Us</a></li>
              <li><a href="#" className="text-white">More Details</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center py-3">
          <p className="mb-0">&copy; 2024 StudentApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
