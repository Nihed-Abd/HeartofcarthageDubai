import React, { useState } from 'react';
import Navbar from './global-components/navbar-v3';
import ShopGridV1 from './shop-components/shop-grid-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import BannerReadyToMove from './section-components/bannerReadyToMove';

const ReadyToMove = () => {
    const [filters, setFilters] = useState({
        propertyType: '',
        location: '',
        bedrooms: '',
        budget: [0, 5000000],
    });

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    return (
        <div>
            <Navbar />
            <BannerReadyToMove updateFilters={updateFilters} />
            <ShopGridV1 category="Ready to Move" filters={filters} />
            <CallToActionV1 />
            <Footer />
        </div>
    );
};

export default ReadyToMove;
