import React from 'react';
import Navbar from './global-components/navbar-v3';
import PageHeader from './global-components/page-header';
import AboutV1 from './section-components/about-v1';
import Features from './section-components/features-v1';
import Team from './section-components/team-v1';
import Testimonial from './section-components/testimonial-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';


const About_v1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="About Us" />
        <AboutV1 />
        <Features  customClass="ltn__feature-area section-bg-1 pt-120 pb-90 mb-120---"/>
        <Testimonial />
       <CallToActionV1 />
        <Footer />
    </div>
}

export default About_v1

