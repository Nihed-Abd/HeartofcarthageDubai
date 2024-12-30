import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FaBed, FaBath, FaRulerCombined, FaDollarSign } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ShopDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [projectOwner, setProjectOwner] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertyDoc = doc(db, 'properties', id);
        const propertySnap = await getDoc(propertyDoc);

        if (propertySnap.exists()) {
          setProperty(propertySnap.data());
        } else {
          console.error('No such property document!');
        }
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    fetchPropertyData();
  }, [id]);

  useEffect(() => {
    const fetchProjectOwner = async () => {
      if (property?.projectOwner) {
        try {
          const ownerRef =
            typeof property.projectOwner === 'string'
              ? doc(db, 'projectOwners', property.projectOwner)
              : property.projectOwner;
  
          const ownerSnap = await getDoc(ownerRef);
  
          if (ownerSnap.exists()) {
            const ownerData = ownerSnap.data();
            setProjectOwner({ id: ownerSnap.id, ...ownerData }); // Add the id
          } else {
            console.error('No such project owner document!');
          }
        } catch (error) {
          console.error('Error fetching project owner data:', error);
        }
      }
    };
  
    fetchProjectOwner();
  }, [property]);
  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    e.persist(); // Persist the event to avoid React nullifying it
  
    const formData = new FormData(e.target);
    const messageData = {
      name: formData.get('yourname'),
      email: formData.get('youremail'),
      phone: formData.get('phoneNumber'),
      message: formData.get('yourmessage'),
      service: '',
      timestamp: serverTimestamp(),
      agree: true,
    };
  
    try {
      await addDoc(collection(db, 'Messages'), messageData);
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      e.target.reset(); // Reset the form after submission
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending your message. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error sending message:', error);
    }
  };
  

  if (!property) {
    return <div>Loading...</div>;
  }

  const {
    title,
    address,
    description,
    nbrBedRooms,
    nbrBathroom,
    price,
    espace,
    features,
    images,
    video,
    type,
    category,
    status,
    createdAt,
    mapLocationLat,
    mapLocationLng,
    floorPlan,
    paymentMethods,
  } = property;

  const formattedDate = createdAt
    ? new Date(createdAt.seconds * 1000).toLocaleDateString()
    : 'N/A';

  return (
    <div className="ltn__shop-details-area pb-10">
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-lg-8 col-md-12">
            <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-category">
                    <span className="bg-orange">{type}</span>
                  </li>
                  <li className="ltn__blog-category">
                    <span className="bg-orange">{category}</span>
                  </li>
                  {category === 'Ready to Move' && (
                    <li className="ltn__blog-category">
                      <span className="bg-orange">For {status}</span>
                    </li>
                  )}
                  <li className="ltn__blog-date">
                    <i className="far fa-calendar-alt" /> {formattedDate}
                  </li>
                </ul>
              </div>
              <h1>{title}</h1>
              <label>
                <span className="ltn__secondary-color">
                  <i className="flaticon-pin" />
                </span>{' '}
                {address}
              </label>
              <h4 className="title-2">Description</h4>
              <p>{description}</p>
              <h4 className="title-2">Property Detail</h4>
              <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                <ul>
                  <li>
                    <FaDollarSign className="me-2" /> <label>Price:</label> <span>AED {price}</span>
                  </li>
                  <li>
                    <FaBed className="me-2" /> <label>Bedrooms:</label> <span>{nbrBedRooms}</span>
                  </li>
                  <li>
                    <FaBath className="me-2" /> <label>Bathrooms:</label> <span>{nbrBathroom}</span>
                  </li>
                  <li>
                    <FaRulerCombined className="me-2" /> <label>Space:</label> <span>{espace} sqft</span>
                  </li>
                </ul>
              </div>
              {/* Payment Methods */}
              {paymentMethods && paymentMethods.length > 0 && (
                <div className="payment-plan mb-60">
                  <h4 className="title-2">Payment Plan</h4>
                  <ul className="list-group">
                    {paymentMethods.map((method, index) => (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        <span>{method.method}</span>
                        <span>{method.percentage}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <h4 className="title-2">Facts and Features</h4>
              <div className="property-detail-feature-list clearfix mb-45">
                <div className="d-flex flex-wrap">
                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="badge rounded-pill"
                      style={{
                        backgroundColor: 'var(--ltn__secondary-color-2)',
                        color: 'white',
                        margin: '5px',
                        padding: '10px 15px',
                        fontSize: '14px',
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <h4 className="title-2">From Our Gallery</h4>
              <div className="ltn__property-details-gallery mb-30">
                <div className="row">
                  {images.map((image, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <button
                        onClick={() => {
                          setLightboxOpen(true);
                          setLightboxIndex(index);
                        }}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <img
                          src={image}
                          alt={`Property Image ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <h4 className="title-2">Location</h4>
              <div className="property-details-google-map mb-60">
                <iframe
                  src={`https://www.google.com/maps?q=${mapLocationLat},${mapLocationLng}&z=15&output=embed`}
                  width="100%"
                  height="450"
                  style={{ border: '0' }}
                  allowFullScreen
                  loading="lazy"
                  title="Property Location"
                ></iframe>
              </div>
              <br></br>
              <h4 className="title-2">Floor Plan</h4>
              {floorPlan ? (
                <div className="ltn__apartments-plan-area product-details-apartments-plan mb-60">
                  <button
                    onClick={() => setIsFloorPlanOpen(true)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={floorPlan}
                      alt="Floor Plan"
                      style={{ width: '100%' }}
                    />
                  </button>
                </div>
              ) : (
                <p>No floor plan available.</p>
              )}
              <h4 className="title-2">Property Video</h4>
              <div className="ltn__video-container mb-60" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <video width="100%" height="450" controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="col-lg-4">
            <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
            <div className="widget ltn__author-widget">
                  <div className="ltn__author-widget-inner text-center">
                    {projectOwner && (
                      <>
                        <Link to={`/ProjectOwner/${projectOwner.id}`}>
                          <img
                            src={projectOwner.logo}
                            alt={projectOwner.name}
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                          />
                        </Link>
                        <Link to={`/ProjectOwner/${projectOwner.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <h5>{projectOwner.name}</h5>
                        </Link>
                      </>
                    )}
                  </div>
                </div>  
              <div className="widget ltn__form-widget">
                <h4 className="ltn__widget-title ltn__widget-title-border-2">Drop Message For Book</h4>
                <form onSubmit={handleSendMessage}>
                  <input type="text" name="yourname" placeholder="Your Name*" required />
                  <input type="email" name="youremail" placeholder="Your e-Mail*" required />
                  <input type="text" name="phoneNumber" placeholder="Your Phone Number*" required />
                  <textarea name="yourmessage" placeholder="Write Message..." required></textarea>
                  <button type="submit" className="btn theme-btn-1">Send Message</button>
                </form>
              </div>
              <div className="widget ltn__social-media-widget">
                <h4 className="ltn__widget-title ltn__widget-title-border-2">Follow us</h4>
                <div className="ltn__social-media-2">
                  <ul>
                    <li><a href="#" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="#" title="Linkedin"><i className="fab fa-linkedin" /></a></li>
                    <li><a href="#" title="Instagram"><i className="fab fa-instagram" /></a></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      {lightboxOpen && images && (
        <Lightbox
          mainSrc={images[lightboxIndex]}
          nextSrc={images[(lightboxIndex + 1) % images.length]}
          prevSrc={images[(lightboxIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % images.length)
          }
          onMovePrevRequest={() =>
            setLightboxIndex((lightboxIndex + images.length - 1) % images.length)
          }
        />
      )}
      {isFloorPlanOpen && (
        <Lightbox
          mainSrc={floorPlan}
          onCloseRequest={() => setIsFloorPlanOpen(false)}
        />
      )}
    </div>
  );
};

export default ShopDetails;
