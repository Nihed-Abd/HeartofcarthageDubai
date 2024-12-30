import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV1 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="ltn__about-us-area pt-120 pb-90 ">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-6 align-self-center">
			        <div className="about-us-img-wrap about-img-left">
			          <img src={publicUrl+"assets/img/aboutus.png"} alt="About Us Image" />
			          <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
			            
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-6 align-self-center">
			        <div className="about-us-info-wrap">
			          <div className="section-title-area ltn__section-title-2--- mb-20">
			            <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">About Us</h6>
			            <h1 className="section-title">The Heart of Carthage <span>.</span></h1>
			            <p>
						At The Heart of Carthage, we are your gateway to Dubai's most prestigious properties. Our passionate team, in collaboration with esteemed partners, is committed to transforming your real estate aspirations into reality. With a focus on integrity and innovation, we provide personalized guidance at every step, ensuring your experience is seamless and rewarding.</p>
			          </div>
			          <ul className="ltn__list-item-half clearfix">
							<li>
								<i className="fas fa-handshake" /> 
								Personalized Service
							</li>
							<li>
								<i className="fas fa-gavel" />
								Expert Negotiation
							</li>
							<li>
								<i className="fas fa-chart-bar" /> 
								Comprehensive Market Knowledge
							</li>
							<li>
								<i className="fas fa-rocket" /> 
								Innovative Marketing Strategies
							</li>
						</ul>
			          <div className="ltn__callout bg-overlay-theme-05  mt-30">
			            <p>" Find not just a property, but a place to call home ."</p>
			          </div>
			          <div className="btn-wrapper animated go-top">
			            <Link to="/about" className="theme-btn-1 btn btn-effect-1"> More About Us </Link>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default AboutV1