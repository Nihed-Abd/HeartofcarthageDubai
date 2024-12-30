import React, { useState } from 'react';
import Navbar from './global-components/navbar-v3';
import ShopGridV1 from './shop-components/shop-grid-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import BannerV5 from './section-components/banner-v5';

const OffPlan = () => {
    const [filters, setFilters] = useState({}); // Default to an empty object

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Navbar />
            <BannerV5 updateFilters={updateFilters} />
            <ShopGridV1 category="Off Plan" filters={filters} />
            <CallToActionV1 />
            <Footer />
        </div>
    );
};

export default OffPlan;
