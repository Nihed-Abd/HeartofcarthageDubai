import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import ShogGrid from './shop-components/shop-right-sidebar';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const Search = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Shop" />
        <ShogGrid />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Search

