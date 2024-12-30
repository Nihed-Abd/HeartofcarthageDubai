import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

class FeaturedItemV1 extends Component {
  state = {
    properties: [],
  };

  componentDidMount() {
    this.fetchProperties();
  }

  fetchProperties = async () => {
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(6));
      const querySnapshot = await getDocs(q);
      const fetchedProperties = [];

      for (const docSnapshot of querySnapshot.docs) {
        const property = { id: docSnapshot.id, ...docSnapshot.data() };
        property.image = property.images?.[0] || `${process.env.PUBLIC_URL}/assets/img/default-property.jpg`;

        if (property.projectOwner) {
          try {
            const projectOwnerSnapshot = await getDoc(property.projectOwner);
            if (projectOwnerSnapshot.exists()) {
              property.ownerDetails = { id: projectOwnerSnapshot.id, ...projectOwnerSnapshot.data() };
            }
          } catch (error) {
            console.warn(`Failed to fetch project owner for property ID: ${property.id}`);
          }
        }

        fetchedProperties.push(property);
      }

      this.setState({ properties: fetchedProperties });
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  render() {
    const { properties } = this.state;
    const publicUrl = process.env.PUBLIC_URL + '/';

    return (
      <div>
        <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area ltn__section-title-2--- text-center">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Properties</h6>
                  <h1 className="section-title">Featured Listings</h1>
                </div>
              </div>
            </div>
            <div className="row">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={property.id}>
                    <div className="ltn__product-item ltn__product-item-4 text-center---">
                      <div className="product-img go-top" style={{ height: '250px', overflow: 'hidden' }}>
                        <Link to={`/property/${property.id}`}>
                          <img
                            src={property.image}
                            alt={property.title || 'Property'}
                            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                          />
                        </Link>
                        <div className="product-badge">
                          <ul>
                            <li className="sale-badge bg-green">{property.category || 'N/A'}</li>
                          </ul>
                        </div>
                        <div className="product-img-location-gallery">
                          <div className="product-img-location go-top">
                            <ul>
                              <li>
                                <Link to="/contact">
                                  <span>
                                    <i className="flaticon-pin" />{' '}
                                    {this.truncateText(property.address || 'Address not specified', 15)}
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product-img-gallery go-top">
                            <ul>
                              <li>
                                <i className="fas fa-camera" /> {property.images?.length || 0}
                              </li>
                              <li>
                                <i className="fas fa-film" /> 1
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="product-info">
                        <div className="product-price">
                          <span>
                            {property.price ? `${property.price.toLocaleString()} AED` : 'Price not available'}
                          </span>
                        </div>
                        <h2 className="product-title go-top">
                          <Link to={`/property/${property.id}`}>
                            {property.title?.length > 20
                              ? `${property.title.substring(0, 20)}...`
                              : property.title || 'Untitled'}
                          </Link>
                        </h2>
                        <div className="product-description">
                          <p>
                            {this.truncateText(property.description || 'No description available', 100)}
                          </p>
                        </div>
                        <ul className="ltn__list-item-2 ltn__list-item-2-before">
                          <li>
                            <span>
                              {property.nbrBedRooms || 0} <i className="flaticon-bed" />
                            </span>
                            Bedrooms
                          </li>
                          <li>
                            <span>
                              {property.nbrBathroom || 0} <i className="flaticon-clean" />
                            </span>
                            Bathrooms
                          </li>
                          <li>
                            <span>
                              {property.espace || 0} <i className="flaticon-square-shape-design-interface-tool-symbol" />
                            </span>
                            Sq. Ft.
                          </li>
                        </ul>
                      </div>
                      <div className="product-info-bottom">
                        {property.ownerDetails && (
                          <div className="real-estate-agent go-top">
                            <div className="agent-img">
                              <Link to={`/project-owner/${property.ownerDetails.id}`}>
                                <img
                                  src={property.ownerDetails.logo || `${publicUrl}/assets/img/default-owner.jpg`}
                                  alt={property.ownerDetails.name || 'Owner'}
                                />
                              </Link>
                            </div>
                            <div className="agent-brief">
                              <h6>
                                <Link to={`/project-owner/${property.ownerDetails.id}`}>
                                  {property.ownerDetails.name || 'Unknown Owner'}
                                </Link>
                              </h6>
                              <small>Developer</small>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No properties found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedItemV1;
