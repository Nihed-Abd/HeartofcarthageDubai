import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Modal from 'react-bootstrap/Modal';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    phone: '',
    message: '',
    agree: false,
  });
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please fill out all required fields.',
        confirmButtonColor: '#f34f3f',
      });
      return;
    }

    if (!formData.agree) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms & Conditions',
        text: 'You must agree to the terms and conditions to proceed.',
        confirmButtonColor: '#f34f3f',
      });
      return;
    }

    try {
      await addDoc(collection(db, 'Messages'), {
        name: formData.name,
        email: formData.email,
        service: formData.service || 'Not Specified', // Fallback if no service is selected
        phone: formData.phone,
        message: formData.message,
        agree: formData.agree,
        timestamp: new Date().toISOString(),
      });

      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully.',
        confirmButtonColor: '#28a745',
      });

      // Reset form
      setFormData({ name: '', email: '', service: '', phone: '', message: '', agree: false });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  return (
    <div className="ltn__contact-message-area mb-120 mb--100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__form-box contact-form-box box-shadow white-bg">
              <h4 className="title-2">Get A Quote</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item">
                      <select
                        className="nice-select"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Select Service Type</option>
                        <option value="Property Management">Property Management</option>
                        <option value="Mortgage Service">Mortgage Service</option>
                        <option value="Consulting Service">Consulting Service</option>
                        <option value="Home Buying">Home Buying</option>
                        <option value="Home Selling">Home Selling</option>
                        <option value="Escrow Services">Escrow Services</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-phone ltn__custom-icon">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-item input-item-textarea ltn__custom-icon">
                  <textarea
                    name="message"
                    placeholder="Enter message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <p>
                  <label className="input-info-save mb-0">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                    />{' '}
                    I agree to the{' '}
                    <span
                      style={{ color: 'blue', cursor: 'pointer' }}
                      onClick={() => setShowTerms(true)}
                    >
                      terms and conditions
                    </span>
                    .
                  </label>
                </p>
                <div className="btn-wrapper mt-0">
                  <button
                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    type="submit"
                  >
                    Get a Free Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showTerms} onHide={() => setShowTerms(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome to Heart of Carthage!</p>
          <p>
            By using our website, you agree to the following terms and conditions. We specialize in real estate services in Dubai, offering properties that are ready to move into or available off-plan. These terms outline the responsibilities of both parties in ensuring a smooth transaction process.
          </p>
          <ul>
            <li>All information provided is accurate to the best of our knowledge but is subject to change.</li>
            <li>Users must provide truthful and complete details when contacting us.</li>
            <li>Heart of Carthage reserves the right to modify these terms at any time.</li>
            <li>All transactions are subject to verification and compliance with local laws.</li>
          </ul>
          <p>
            If you have any questions about these terms, please contact us directly through the provided channels on the website.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowTerms(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactForm;
