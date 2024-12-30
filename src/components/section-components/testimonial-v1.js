import React, { Component } from 'react';
import { collection, query, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

class Testimonial extends Component {
  state = {
    testimonials: [],
  };

  componentDidMount() {
    this.fetchTestimonials();
  }

  fetchTestimonials = async () => {
    try {
      const testimonialsRef = collection(db, 'testimonials');
      const testimonialsSnapshot = await getDocs(testimonialsRef);
  
      const fetchedTestimonials = [];
  
      for (const testimonialDoc of testimonialsSnapshot.docs) {
        const testimonialData = testimonialDoc.data();
        testimonialData.id = testimonialDoc.id;
  
        // Debug: Log the testimonial data
        console.log('Testimonial Data:', testimonialData);
  
        // Validate `user` field
        if (typeof testimonialData.user === 'string') {
          const userRef = doc(db, testimonialData.user);
  
          try {
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
              testimonialData.userDetails = { id: userSnapshot.id, ...userSnapshot.data() };
            } else {
              console.warn(`User document not found for reference: ${testimonialData.user}`);
            }
          } catch (userError) {
            console.error(`Error fetching user details for: ${testimonialData.user}`, userError);
          }
        } else {
          console.warn(`Invalid user field in testimonial: ${testimonialDoc.id}`, testimonialData.user);
        }
  
        fetchedTestimonials.push(testimonialData);
      }
  
      this.setState({ testimonials: fetchedTestimonials });
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };
  

  formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  render() {
    const { testimonials } = this.state;
    const publicUrl = process.env.PUBLIC_URL + '/';

    return (
      <div className="ltn__testimonial-area section-bg-1--- bg-image-top pt-115 pb-70" style={{ backgroundImage: `url(${publicUrl}assets/img/bg/20.jpg)` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2--- text-center">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Testimonial</h6>
                <h1 className="section-title">Clients Feedback</h1>
              </div>
            </div>
          </div>
          <div className="row">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={testimonial.id}>
                  <div className="ltn__testimonial-item ltn__testimonial-item-7">
                    <div className="ltn__testimoni-info">
                      <p>
                        <i className="flaticon-left-quote-1" /> {testimonial.message || 'No feedback provided'}
                      </p>
                      <div className="ltn__testimoni-info-inner">
                        <div className="ltn__testimoni-img">
                          <img
                            src={testimonial.userDetails?.profilePicture || `${publicUrl}assets/img/default-user.jpg`}
                            alt={testimonial.userDetails?.name || 'User'}
                            style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="ltn__testimoni-name-designation">
                          <h5>{testimonial.userDetails?.name || 'Anonymous'}</h5>
                          <label>{testimonial.userDetails?.designation || 'Client'}</label>
                          <small className="d-block mt-1 text-muted">
                            {testimonial.timestamp ? this.formatDate(testimonial.timestamp) : ''}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No testimonials found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Testimonial;
