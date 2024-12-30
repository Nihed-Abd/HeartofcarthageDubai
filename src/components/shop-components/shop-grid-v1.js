import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ShopGridV1 = ({ category, filters }) => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Fetch properties from Firestore
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'properties'));
                const fetchedProperties = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter((property) => category === 'All' || property.category === category);
                setProperties(fetchedProperties);
                setFilteredProperties(fetchedProperties); 
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [category]);

    // Apply filters whenever filters or properties change
    useEffect(() => {
        const applyFilters = () => {
            const filtered = properties.filter((property) => {
                const matchesType =
                    !filters.propertyType || property.type === filters.propertyType;
                const matchesLocation =
                    !filters.location || property.address === filters.location;
                const matchesBedrooms =
                    !filters.bedrooms ||
                    (filters.bedrooms === '4+'
                        ? property.nbrBedRooms && property.nbrBedRooms >= 4
                        : property.nbrBedRooms && property.nbrBedRooms == filters.bedrooms);
                const price = parseInt(property.price, 10);
                const matchesBudget =
                    !filters.budget ||
                    (price >= filters.budget[0] && price <= filters.budget[1]);
                const matchesStatus =
                    filters.status === 'All' || !filters.status || property.status === filters.status;

                return (
                    matchesType &&
                    matchesLocation &&
                    matchesBedrooms &&
                    matchesBudget &&
                    matchesStatus
                );
            });

            setFilteredProperties(filtered);
        };

        applyFilters();
    }, [filters, properties]);

    // Show loading spinner
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ltn__product-area ltn__product-gutter mb-100">
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ltn__shop-options">
                            <ul>
                                <li>
                                    <div className="short-by text-center">
                                        <select className="nice-select">
                                            <option>Default sorting</option>
                                            <option>Sort by Newest</option>
                                            <option>Sort by Bedrooms number</option>
                                            <option>Sort by price: low to high</option>
                                            <option>Sort by price: high to low</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="showing-product-number text-right">
                                        <span>
                                            Showing {filteredProperties.length} of {properties.length} results
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            {/* Grid View */}
                            <div className="tab-pane fade active show" id="liton_product_grid">
                                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                                    <div className="row">
                                        {filteredProperties.map((property) => (
                                            <div key={property.id} className="col-lg-4 col-sm-6 col-12">
                                                <div
                                                    className="ltn__product-item ltn__product-item-4 ltn__product-item-5"
                                                    style={{
                                                        padding: '15px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                        transition: 'transform 0.3s',
                                                    }}
                                                >
                                                    <div
                                                        className="product-img"
                                                        style={{
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            marginBottom: '10px',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        <Link to={`/property/${property.id}`}>
                                                            <img
                                                                src={property.images[0]}
                                                                alt={property.title}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '250px',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                        </Link>
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                top: '10px',
                                                                left: '10px',
                                                                backgroundColor: '#ff5a3c',
                                                                color: '#fff',
                                                                padding: '5px 10px',
                                                                borderRadius: '5px',
                                                                fontSize: '12px',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            {property.status}
                                                        </div>
                                                    </div>
                                                    <h2
                                                        className="product-title"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <Link to={`/property/${property.id}`}>{property.title}</Link>
                                                    </h2>
                                                    <div
                                                        className="product-img-location"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <ul>
                                                            <li>
                                                                <i
                                                                    className="flaticon-pin"
                                                                    style={{ color: '#ff5a3c' }}
                                                                />{' '}
                                                                {property.address}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <ul
                                                        className="ltn__list-item-2--- ltn__plot-brief"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <li>
                                                            <i
                                                                className="fas fa-bed"
                                                                style={{
                                                                    color: '#ff5a3c',
                                                                    marginRight: '5px',
                                                                }}
                                                            ></i>
                                                            <span>{property.nbrBedRooms}</span> Bedrooms
                                                        </li>
                                                        <li>
                                                            <i
                                                                className="fas fa-bath"
                                                                style={{
                                                                    color: '#ff5a3c',
                                                                    marginRight: '5px',
                                                                }}
                                                            ></i>
                                                            <span>{property.nbrBathroom}</span> Bathrooms
                                                        </li>
                                                    </ul>
                                                    <ul
                                                        className="ltn__list-item-2--- ltn__plot-brief"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <li>
                                                            <i
                                                                className="fas fa-ruler-combined"
                                                                style={{
                                                                    color: '#ff5a3c',
                                                                    marginRight: '5px',
                                                                }}
                                                            ></i>
                                                            <span>{property.espace}</span> square Ft
                                                        </li>
                                                    </ul>
                                                    <div
                                                        className="product-hover-action"
                                                        style={{
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <ul>
                                                            <li>
                                                                <a
                                                                    href="#"
                                                                    title="Wishlist"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#liton_wishlist_modal"
                                                                >
                                                                    <i
                                                                        className="flaticon-heart-1"
                                                                        style={{
                                                                            color: '#ff5a3c',
                                                                        }}
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span className="go-top">
                                                                    <Link
                                                                        to={`/property/${property.id}`}
                                                                        title="Product Details"
                                                                    >
                                                                        <i
                                                                            className="flaticon-add"
                                                                            style={{
                                                                                color: '#ff5a3c',
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="product-info-bottom">
                                                        <div
                                                            className="product-price"
                                                            style={{
                                                                textAlign: 'left',
                                                            }}
                                                        >
                                                            <i
                                                                className="fas fa-tag"
                                                                style={{
                                                                    color: '#ff5a3c',
                                                                    marginRight: '5px',
                                                                }}
                                                            ></i>
                                                            <span>{property.price} AED</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopGridV1;
