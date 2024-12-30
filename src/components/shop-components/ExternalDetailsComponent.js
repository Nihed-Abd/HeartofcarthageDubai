import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FaBed, FaBath, FaRulerCombined, FaDollarSign } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ExternalDetails = () => {
  const { id } = useParams();
  const [externalProject, setExternalProject] = useState(null);
  const [projectOwner, setProjectOwner] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);

  useEffect(() => {
    const fetchExternalProjectData = async () => {
      try {
        const projectDoc = doc(db, 'externalProjects', id);
        const projectSnap = await getDoc(projectDoc);

        if (projectSnap.exists()) {
          setExternalProject(projectSnap.data());
        } else {
          console.error('No such external project document!');
        }
      } catch (error) {
        console.error('Error fetching external project data:', error);
      }
    };

    fetchExternalProjectData();
  }, [id]);

  useEffect(() => {
    const fetchProjectOwner = async () => {
      if (externalProject?.projectOwner) {
        try {
          const ownerRef =
            typeof externalProject.projectOwner === 'string'
              ? doc(db, 'projectOwners', externalProject.projectOwner)
              : externalProject.projectOwner;

          const ownerSnap = await getDoc(ownerRef);

          if (ownerSnap.exists()) {
            const ownerData = ownerSnap.data();
            setProjectOwner({ id: ownerSnap.id, ...ownerData });
          } else {
            console.error('No such project owner document!');
          }
        } catch (error) {
          console.error('Error fetching project owner data:', error);
        }
      }
    };

    fetchProjectOwner();
  }, [externalProject]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    e.persist();

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
      e.target.reset();
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

  if (!externalProject) {
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
  } = externalProject;

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
              <h4 className="title-2">Project Details</h4>
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
              {features && (
                <>
                  <h4 className="title-2">Features</h4>
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
                </>
              )}
              <h4 className="title-2">Gallery</h4>
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
                          alt={`External Project Image ${index + 1}`}
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
            </div>
          </div>
          {/* Right Section */}
          <div className="col-lg-4">
            <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
              {projectOwner && (
                <div className="widget ltn__author-widget">
                  <div className="ltn__author-widget-inner text-center">
                    <Link to={`/ProjectOwner/${projectOwner.id}`}>
                      <img
                        src={projectOwner.logo}
                        alt={projectOwner.name}
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                      />
                    </Link>
                    <Link
                      to={`/ProjectOwner/${projectOwner.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h5>{projectOwner.name}</h5>
                    </Link>
                  </div>
                </div>
              )}
              <div className="widget ltn__form-widget">
                <h4 className="ltn__widget-title ltn__widget-title-border-2">Drop Message For Booking</h4>
                <form onSubmit={handleSendMessage}>
                  <input type="text" name="yourname" placeholder="Your Name*" required />
                  <input type="email" name="youremail" placeholder="Your Email*" required />
                  <input type="text" name="phoneNumber" placeholder="Your Phone Number*" required />
                  <textarea name="yourmessage" placeholder="Write Message..." required></textarea>
                  <button type="submit" className="btn theme-btn-1">Send Message</button>
                </form>
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
    </div>
  );
};

export default ExternalDetails;
