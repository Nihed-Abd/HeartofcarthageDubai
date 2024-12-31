import React from 'react';
import Navbar from './global-components/navbar-v3';
import Banner from './section-components/banner-v3';
import SearchForm from './section-components/search-form';
import Features from './section-components/features-v1';
import FeaturedItem from './section-components/featured-item-v1';
import Video from './section-components/video-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import Aboutv1 from './section-components/about-v1';
import Testimonial from './section-components/testimonial-v1';
import DownloadApp from './section-components/downloadApp';
const Home = () => {
    return <div>
        <Navbar />
        <Banner />
        <Aboutv1 />
        <DownloadApp />
        <Features customClass="ltn__feature-area section-bg-1--- pt-115 pb-90 mb-120---"/>
        <FeaturedItem />
        <Testimonial />
        <Video />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Home

