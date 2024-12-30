import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './shop-sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ShopGrid = () => {
    const [filters, setFilters] = useState({
        category: [],
        propertyType: [],
        priceRange: [1000, 5000000],
        bedrooms: [],
        bathrooms: [],
        status: [],
    });
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [sortOption, setSortOption] = useState('newest');

    // Fetch properties from Firestore
    useEffect(() => {
        const fetchProperties = async () => {
            const querySnapshot = await getDocs(collection(db, 'properties'));
            const fetchedProperties = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProperties(fetchedProperties);
            setFilteredProperties(fetchedProperties);
        };

        fetchProperties();
    }, []);

    // Apply filters and sort
    useEffect(() => {
        const applyFiltersAndSort = () => {
            let filtered = properties.filter((property) => {
                const matchesCategory =
                    !filters.category.length || filters.category.includes(property.category);
                const matchesType =
                    !filters.propertyType.length || filters.propertyType.includes(property.type);
                const matchesPrice =
                    property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
                const matchesBedrooms =
                    !filters.bedrooms.length ||
                    filters.bedrooms.some((bedroom) => {
                        if (bedroom === '4+') {
                            return parseInt(property.nbrBedRooms, 10) >= 4;
                        }
                        return property.nbrBedRooms.split('-').includes(bedroom);
                    });
                const matchesBathrooms =
                    !filters.bathrooms.length ||
                    filters.bathrooms.some((bathroom) => {
                        if (bathroom === '4+') {
                            return parseInt(property.nbrBathroom, 10) >= 4;
                        }
                        return property.nbrBathroom.split('-').includes(bathroom);
                    });
                const matchesStatus =
                    !filters.status.length || filters.status.includes(property.status);

                return (
                    matchesCategory &&
                    matchesType &&
                    matchesPrice &&
                    matchesBedrooms &&
                    matchesBathrooms &&
                    matchesStatus
                );
            });

            // Apply sorting
            switch (sortOption) {
                case 'lowestPrice':
                    filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
                    break;
                case 'highestPrice':
                    filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
                    break;
                case 'bedrooms':
                    filtered = filtered.sort(
                        (a, b) => parseInt(b.nbrBedRooms || 0, 10) - parseInt(a.nbrBedRooms || 0, 10)
                    );
                    break;
                default: // Sort by newest (createdAt or timestamp)
                    filtered = filtered.sort(
                        (a, b) => new Date(b.createdAt || b.timestamp).getTime() - new Date(a.createdAt || a.timestamp).getTime()
                    );
            }

            setFilteredProperties(filtered);
        };

        applyFiltersAndSort();
    }, [filters, properties, sortOption]);

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="ltn__product-area ltn__product-gutter">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mb-100">
                        <div className="ltn__shop-options">
                            <ul className="justify-content-start">
                                <li>
                                    <div className="ltn__grid-list-tab-menu">
                                        <div className="nav">
                                            <a className="active show" data-bs-toggle="tab" href="#liton_product_grid">
                                                <i className="fas fa-th-large" />
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="short-by text-center">
                                        <select className="nice-select" onChange={handleSortChange} value={sortOption}>
                                            <option value="newest">Sort by Newest</option>
                                            <option value="lowestPrice">Sort by Price: Low to High</option>
                                            <option value="highestPrice">Sort by Price: High to Low</option>
                                            <option value="bedrooms">Sort by Bedrooms</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="liton_product_grid">
                                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                                    <div className="row">
                                        {filteredProperties.length > 0 ? (
                                            filteredProperties.map((property) => (
                                                <div key={property.id} className="col-lg-6 col-sm-6 col-12">
                                                    <div
                                                        className="ltn__product-item ltn__product-item-4 ltn__product-item-5"
                                                        style={{
                                                            padding: '15px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                            }}
                                                        >
                                                            <Link to={`/property/${property.id}`}>{property.title}</Link>
                                                        </h2>
                                                        <ul
                                                            className="ltn__list-item-2--- ltn__plot-brief"
                                                            style={{ textAlign: 'left', marginBottom: '10px' }}
                                                        >
                                                            <li>
                                                                <i className="fas fa-bed" style={{ color: '#ff5a3c', marginRight: '5px' }} />
                                                                {property.nbrBedRooms} Bedrooms
                                                            </li>
                                                            <li>
                                                                <i className="fas fa-bath" style={{ color: '#ff5a3c', marginRight: '5px' }} />
                                                                {property.nbrBathroom} Bathrooms
                                                            </li>
                                                        </ul>
                                                        <div className="product-price">
                                                            <span>{property.price} AED</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No properties match your filters.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Sidebar onFilterChange={handleFilterChange} />
                </div>
            </div>
        </div>
    );
};

export default ShopGrid;
