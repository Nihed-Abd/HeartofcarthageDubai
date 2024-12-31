import React, { Component } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

class Testimonial extends Component {
  state = {
    testimonials: [],
  };

  componentDidMount() {
    this.fetchTestimonials();
  }

  fetchTestimonials = async () => {
    try {
      const testimonialsRef = collection(db, "testimonials");
      const testimonialsQuery = query(testimonialsRef, orderBy("date", "desc"), limit(6)); // Fetch latest 6 testimonials
      const testimonialsSnapshot = await getDocs(testimonialsQuery);

      const fetchedTestimonials = testimonialsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      this.setState({ testimonials: fetchedTestimonials });
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  formatDate = (timestamp) => {
    if (!timestamp) return "Date not available";
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  truncateMessage = (message, maxWords = 20) => {
    const words = message.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : message;
  };

  render() {
    const { testimonials } = this.state;
    const publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div
        className="ltn__testimonial-area section-bg-1--- bg-image-top pt-115 pb-70"
        style={{ backgroundImage: `url(${publicUrl}assets/img/bg/20.jpg)` }}
      >
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
                        <i className="flaticon-left-quote-1" />{" "}
                        {this.truncateMessage(testimonial.message || "No feedback provided", 20)}
                      </p>
                      <div className="ltn__testimoni-info-inner">
                        <div className="ltn__testimoni-img">
                          <img
                            src={testimonial.picture || `${publicUrl}assets/img/default-user.jpg`}
                            alt={testimonial.userName || "User"}
                            style={{
                              width: "75px",
                              height: "75px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="ltn__testimoni-name-designation">
                          <h5>{testimonial.userName || "Anonymous"}</h5>
                          <small className="d-block mt-1 text-muted">
                            {this.formatDate(testimonial.date)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No testimonials found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Testimonial;
