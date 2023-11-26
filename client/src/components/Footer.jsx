import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../CSS/Footer.css';

function Footer({ currentYear }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h4>
            <FontAwesomeIcon icon={faEnvelope} /> Contact Information
          </h4>
          <p>Email: info@bowvalleycollege.ca</p>
          <p>Phone: 403-410-1400</p>
          <p>Toll-Free: 1-866-428-2669</p>
        </div>
        <div className="directory">
          <h4>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Directory
          </h4>
          <p>CALGARY DOWNTOWN</p>
          <p>Bow Valley College</p>
          <p>345 - 6 Avenue SE,</p>
          <p>Calgary, AB T2G 4V1</p>
          <p>ALL CAMPUSES</p>
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} Bow Valley College</p>
        </div>
      </div>
      <div className="social-icons">
        <a href="#" className="social-icon">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" className="social-icon">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="social-icon">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" className="social-icon">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
